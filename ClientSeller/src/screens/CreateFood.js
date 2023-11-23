import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {Axios} from "../helpers/axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from "react-redux";
import { FETCH_PROFILE, fetchServer } from '../../store/actions/actionCreators';
import ToastManager, { Toast } from "toastify-react-native";

function CreateFood({ navigation }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const handleCreate = async () => {
    try {
      if (!name || !description || !stock || !price)  {
        Toast.error("Please fill all form")
        return
      }

      if (loading) {
        Toast.info("Image is still uploading")
        return
      }

      if (!imageUrl) {
        Toast.error("Please upload an image")
        return
      }
      const access_token = await AsyncStorage.getItem("access_token")
      // console.log({
      //   name,
      //   description,
      //   stock,
      //   price,
      //   imageUrl
      // })
      const {data} = await Axios({
        method: "post",
        url: "/foods",
        data: {
          name: name,
          description: description,
          stock: stock,
          price: price,
          imageUrl: imageUrl
        },
        headers: {
          access_token: access_token
        }
      })
      dispatch(fetchServer("/stores/users", FETCH_PROFILE))
      navigation.navigate("ProfilePage")
    } catch (error) {
      console.log(error.response.data)
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    try {
      setLoading(true)
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        quality: 1,
      });
      let formData = new FormData()
      if (!result.canceled) {
        setImage(result.assets[0].uri);

         // ImagePicker saves the taken photo to disk and returns a local URI to it
        let localUri = result.assets[0].uri;
        let filename = localUri.split('/').pop();

        // Infer the type of the image
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;

        // Upload the image using the fetch and FormData APIs
        let formData = new FormData();
        // Assume "photo" is the name of the form field the server expects
        formData.append('image', { uri: localUri, name: filename, type });

        Toast.info("Image uploading")

        const {data} = await Axios({
          method: "post",
          url: "/foods/images",
          data: formData,
          headers: {
            'content-type': 'multipart/form-data',
          },
        })

        // console.log("image uploaded")
        Toast.success("Upload successfull")
        setImageUrl(data.url)
        setLoading(false)
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  };
  

  return (
    <View style={styles.container}>
      <ToastManager 
      width={"90%"}
      />
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.backText} onPress={() => navigation.goBack()}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Create Food</Text>
      </View>
      <View style={styles.formFlex}>
        <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
        placeholderTextColor="#aaa" 
      />
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={(text) => setDescription(text)}
        placeholderTextColor="#aaa" 
      />
      <Text style={styles.label}>Stock</Text>
      <TextInput
        style={styles.input}
        placeholder="Stock"
        inputMode='numeric'
        value={stock}
        onChangeText={(int) => setStock(int)}
        placeholderTextColor="#aaa" 
      />
      <Text style={styles.label}>Price</Text>
      <TextInput
        style={styles.input}
        placeholder="Price"
        inputMode='numeric'
        value={price}
        onChangeText={(int) => setPrice(int)}
        placeholderTextColor="#aaa" 
      />
      </View>
      <View style={styles.spaceFlex}>
      <TouchableOpacity
        style={[styles.buttonImage]}
        onPress={pickImage}
      >
        <Text style={styles.buttonText}>Upload Image</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button]}
        onPress={handleCreate}
      >
        <Text style={styles.buttonText}>Create</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    padding: 20,
  },
  formFlex: {
    flex: 4,
  },
  spaceFlex: {
    flex: 5,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    marginLeft: 45
  },
  input: {
    height: 50,
    paddingHorizontal: 23,
    borderColor: "gray",
    backgroundColor: "#EBECF0",
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
    color: "#000",
  },
  header: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'start',
    marginBottom: 16,
    alignItems: "center",
  },
  backText: {
    fontSize: 18,
    color: "#5db075",
  },
  button: {
    marginTop: 40,
    backgroundColor: "#5db075",
    padding: 10,
    borderRadius: 20,
    marginBottom: 'auto',
  },
  buttonImage: {
    marginTop: 85,
    backgroundColor: "#5db075",
    padding: 10,
    borderRadius: 20,
    marginLeft: 'auto'
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
  },
  label:{
    fontSize: 16,
  }
});

export default CreateFood;