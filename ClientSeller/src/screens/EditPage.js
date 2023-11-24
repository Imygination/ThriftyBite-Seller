import React, { useEffect, useState } from "react"
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native"
import { Axios } from "../helpers/axios"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useDispatch } from "react-redux"
import { FETCH_PROFILE, fetchServer } from "../../store/actions/actionCreators"
import { useRoute } from "@react-navigation/native";


function EditPage({ navigation }) {
    const {product} = useRoute().params
    const [name, setName] = useState(product.name)
    const [description, setDescription] = useState(product.description)
    const [stock, setStock] = useState(`${product.stock}`)
    const [price, setPrice] = useState(`${product.price}`)
    const dispatch = useDispatch()
    useEffect(() => {
        if (!product) {
            navigation.navigate("ProfilePage")
        }
    })

    async function handleEdit() {
        try {
            const access_token = await AsyncStorage.getItem("access_token")
            const {data} = await Axios({
                method: "put",
                url: `/foods/${product.id}`,
                headers: {
                    access_token: access_token
                },
                data: {
                    name,
                    description,
                    stock,
                    price
                }
            })

            dispatch(fetchServer("/stores/users", FETCH_PROFILE))
                .then(() => {
                    navigation.navigate("ProfilePage")
                })
                .catch((error) => {
                if (error.response.data.message === "Store not found") {
                    navigation.navigate("CreateStore")
                    return
                }
                })
        } catch (error) {
            console.log(error.response.data)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity>
                    <Text style={styles.backText} onPress={() => navigation.goBack()}>
                        Back
                    </Text>
                </TouchableOpacity>
                <Text style={styles.title}>Edit Food</Text>
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
                    inputMode="numeric"
                    defaultValue={stock}
                    onChangeText={(int) => setStock(int)}
                    placeholderTextColor="#aaa"
                />
                <Text style={styles.label}>Price</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Price"
                    inputMode="numeric"
                    defaultValue={price}
                    onChangeText={(int) => setPrice(int)}
                    placeholderTextColor="#aaa"
                />
                <Text>
                    Set stock to 0 to hide it from marketplace
                </Text>
            </View>
            <View style={styles.spaceFlex}>
                <TouchableOpacity style={[styles.button]} onPress={handleEdit}>
                    <Text style={styles.buttonText}>Edit Food</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

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
        fontWeight: "bold",
        marginLeft: 45,
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
        marginTop: 100,
        backgroundColor: "#5db075",
        padding: 10,
        borderRadius: 20,
        marginBottom: "auto",
    },
    buttonImage: {
        marginTop: 85,
        backgroundColor: "#5db075",
        padding: 10,
        borderRadius: 20,
        marginLeft: "auto",
    },
    buttonText: {
        color: "white",
        textAlign: "center",
        fontSize: 18,
    },
    label:{
    fontSize: 16,
    }
})

export default EditPage
