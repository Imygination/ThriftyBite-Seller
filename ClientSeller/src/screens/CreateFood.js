import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {Axios} from "../helpers/axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

function CreateFood({ navigation }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("")
  const [loadingImage, setLoadingImage] = useState(true)

  const handleCreate = async () => {
    try {
      const access_token = await AsyncStorage.getItem("access_token")
      console.log({
        name,
        description,
        stock,
        price,
        imageUrl
      })
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
      navigation.navigate("ProfilePage")
    } catch (error) {
      console.log(error.response.data)
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    setLoadingImage(true)
    try {
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

        const {data} = await Axios({
          method: "post",
          url: "/foods/images",
          data: formData,
          headers: {
            'content-type': 'multipart/form-data',
          },
        })

        console.log("image uploaded")
        setImageUrl(data.url)
      }
      setLoadingImage(false)
    } catch (error) {
      console.log(error)
      setLoadingImage(false)
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.backText} onPress={() => navigation.goBack()}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Create Food</Text>
      </View>
      <View style={styles.formFlex}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
        placeholderTextColor="#aaa" 
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={(text) => setDescription(text)}
        placeholderTextColor="#aaa" 
      />
      <TextInput
        style={styles.input}
        placeholder="Stock"
        value={stock}
        onChangeText={(int) => setStock(int)}
        placeholderTextColor="#aaa" 
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
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
});

export default CreateFood;