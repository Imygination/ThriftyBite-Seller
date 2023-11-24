import React, { useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Axios } from "../helpers/axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from "react-redux";
import { FETCH_PROFILE, fetchServer } from "../../store/actions/actionCreators";
import ToastManager, { Toast } from "toastify-react-native";


function LoginPage({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch()

  const handleLogin = async () => {
    if (!email || !password) {
      Toast.error("Enter email and password")
      return
    }
    try {
      const {data} = await Axios({
        method: "post",
        url: "/login",
        data: {
          email,
          password
        }
      })
      // console.log(data)
      await AsyncStorage.setItem("access_token", data.access_token)
      dispatch(fetchServer("/stores/users", FETCH_PROFILE))
        .catch((error) => {
          if (error.response.data.message === "Store not found") {
              navigation.navigate("CreateStore")
              return
          }
        })
      Toast.success("Login successfull")
      navigation.navigate("ProfilePage");
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
        <Text style={styles.title}>Login</Text>
        <TouchableOpacity>
          <Text
            style={styles.signUpText}
            onPress={() => navigation.push("SignUpPage")}
          >
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
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
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 50,
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
  title: {
    fontSize: 40,
    fontWeight: "bold",
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
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
    alignItems: "center",
  },
  signUpText: {
    fontSize: 18,
    color: "#5db075",
  },
  button: {
    marginTop: 100,
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

export default LoginPage;
