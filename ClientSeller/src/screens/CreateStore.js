import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

function CreateStore({ navigation }) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [location, setLocation] = useState('');

  const handleCreate = () => {
    console.log('Create Food...');
    navigation.navigate('CreateFood');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.backText} onPress={() => navigation.goBack()}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Create Store</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={(text) => setAddress(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="location"
        value={location}
        onChangeText={(int) => setLocation(int)}
      />
      <Button title="Send" onPress={handleCreate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  backText: {
    fontSize: 18,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default CreateStore;