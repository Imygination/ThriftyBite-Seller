import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Axios } from "../helpers/axios";
import { useDispatch, useSelector } from "react-redux";
import { FETCH_PROFILE, fetchServer } from "../../store/actions/actionCreators";
import ToastManager, { Toast } from "toastify-react-native";

function CreateStore({ navigation }) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [region, setRegion] = useState({
    latitude: -6.910599832880549,
    longitude: 107.62152321144464,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const dispatch = useDispatch()
  const onRegionChange = (region) => {
    // console.log(region, "<<<< REGION CHANGE");
    setRegion(region);
  };

  const [markerOne, setMarkerOne] = useState({
    coordinate: {
      latitude: -6.910599832880549,
      longitude: 107.62152321144464,
    },
    title: `CONTOH 1`,
    description: "CONTOH DESCRIPTION",
  });

  const handleCreate = async () => {
    if (!name || !address) {
      Toast.error("Enter all form")
      return
    }
    try {
      const token = await AsyncStorage.getItem("access_token");
      const { data } = await Axios({
        method: "post",
        url: "/stores",
        data: {
          name,
          address,
          latitude: markerOne.coordinate.latitude,
          longitude: markerOne.coordinate.longitude,
        },
        headers: {
          access_token: token,
        },
      });
      // console.log(data);
      dispatch(fetchServer("/stores/users", FETCH_PROFILE))
      navigation.navigate("ProfilePage");
    } catch (error) {
      console.log(error.response.data);
      Toast.error(error.response.data.message)
    }
  };

  return (
    <View style={styles.container}>
      <ToastManager 
      width={"90%"}
      />
      <View style={styles.header}>
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
        <View style={{ marginBottom: 10 }}>
          <Text>
            REGION LatLong : {region.latitude} {region.longitude}
          </Text>
          <Text>
            Marker One LatLong : {markerOne.coordinate.latitude}{" "}
            {markerOne.coordinate.longitude}
          </Text>
        </View>

        <MapView
          style={styles.map}
          region={region}
          // onRegionChange={onRegionChange}
          onPress={(e) => {
            console.log(e.nativeEvent, "<<<<<< INI LOKASI NYA");
            setMarkerOne({
              ...markerOne,
              coordinate: e.nativeEvent.coordinate,
            });
          }}
        >
          <Marker
            onPress={(e) => console.log(e.nativeEvent, "MARKERR NYA DIPIJITT")}
            coordinate={markerOne.coordinate}
            title={markerOne.title}
            description={markerOne.description}
          />
        </MapView>
      </View>
      <View style={styles.spaceFlex}></View>
      <TouchableOpacity style={[styles.button]} onPress={handleCreate}>
        <Text style={styles.buttonText}>Create</Text>
      </TouchableOpacity>
    </View>
  );
}

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
    fontWeight: "bold",
    marginLeft: 50,
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
    flexDirection: "row",
    justifyContent: "start",
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
  map: {
    width: "100%",
    height: "100%",
  },
});

export default CreateStore;
