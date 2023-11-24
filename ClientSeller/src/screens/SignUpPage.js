import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Axios } from "../helpers/axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ToastManager, { Toast } from "toastify-react-native";

function SignUpPage({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = async () => {
    if (!username || !email || !password || !phoneNumber) {
      Toast.error("Enter all form")
      return
    }
    try {
      const {data} = await Axios({
        method: "post",
        url: "/register",
        data: {
          username,
          email,
          password,
          phoneNumber,
          role: "seller"
        }
      })
      // console.log(data)
      navigation.navigate('LoginPage');
    } catch (error) {
      console.log(error.response.data)
      Toast.error(error.response.data.message)
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    AsyncStorage.getItem("access_token")
      .then((result) => {
        if (result) {
          navigation.navigate("ProfilePage")
        }
      })
      .catch((error) => {
        console.log(error)
      })
  })

  return (
    <View style={styles.container}>
      <ToastManager 
      width={"90%"}
      />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Entypo name="cross" size={30} color="gray" />
        </TouchableOpacity>
        <Text style={styles.title}>Sign Up</Text>
        <TouchableOpacity>
          <Text
            style={styles.loginText}
            onPress={() => navigation.push("LoginPage")}
          >
            Login
          </Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
        placeholderTextColor="#aaa" 
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholderTextColor="#aaa" 
      />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          inputMode='numeric'
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
          placeholderTextColor="#aaa" 
        />
      <View style={styles.passwordInput}>
        <TextInput
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.passwordInputText}
          placeholder="Enter Password"
          placeholderTextColor="#aaa" 
        />
        <MaterialCommunityIcons
          name={showPassword ? "eye-off" : "eye"}
          size={24}
          color="#aaa"
          style={styles.icon}
          onPress={toggleShowPassword}
        />
      </View>
      <TouchableOpacity
        style={[styles.button]}
        onPress={handleSignUp}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  icon: {
    marginLeft: 10,
  },
  passwordInput: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    backgroundColor: "#EBECF0",
    paddingHorizontal: 14,
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
  },
  passwordInputText: {
    flex: 1,
    height: 40,
    padding: 8,
    color: "#000",
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
  title: {
    fontSize: 40,
    fontWeight: "bold",
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
    alignItems: "center",
  },
  loginText: {
    fontSize: 18,
    color: "#5db075",
  },
  button: {
    marginTop: 60,
    backgroundColor: "#5db075",
    padding: 10,
    borderRadius: 20,
  },
  loginText: {
    fontSize: 18,
    color: "#5db075",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
  },
});

export default SignUpPage;