import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

function CreateFood({ navigation }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState('');
  const [price, setPrice] = useState('');

  const handleCreate = () => {
    console.log('Create Food...');
  };

  const handleUploadImage = () => {
    console.log('Upload Image...');
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
        onPress={handleUploadImage}
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