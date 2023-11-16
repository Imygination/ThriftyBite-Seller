import React, { useState } from 'react';
import { View, Text, TextInput,StyleSheet, TouchableOpacity } from 'react-native';

function CreateStore({ navigation }) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [location, setLocation] = useState('');

  const handleCreate = () => {
    console.log('Create Store...');
    navigation.navigate('ProfilePage');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.backText} onPress={() => navigation.goBack()}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Create Store</Text>
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
        placeholder="Address"
        value={address}
        onChangeText={(text) => setAddress(text)}
        placeholderTextColor="#aaa" 
      />
      <TextInput
        style={styles.input}
        placeholder="location"
        value={location}
        onChangeText={(int) => setLocation(int)}
        placeholderTextColor="#aaa" 
      />
      </View>
      <View style={styles.spaceFlex}>

      </View>
      <TouchableOpacity
        style={[styles.button]}
        onPress={handleCreate}
      >
        <Text style={styles.buttonText}>Create</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
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
    marginLeft: 50
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
    marginTop: 50,
    backgroundColor: "#5db075",
    padding: 10,
    borderRadius: 20,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
  },
});

export default CreateStore;