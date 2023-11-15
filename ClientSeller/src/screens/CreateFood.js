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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.backText} onPress={() => navigation.goBack()}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Create Food</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={(text) => setDescription(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Stock"
        value={stock}
        onChangeText={(int) => setStock(int)}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        secureTextEntry
        value={price}
        onChangeText={(text) => setPrice(text)}
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

export default CreateFood;