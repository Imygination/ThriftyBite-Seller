import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import { Axios } from "../helpers/axios";
import AsyncStorage from '@react-native-async-storage/async-storage';


function ProfilePage({navigation}) {
    const [products, setProducts] = useState([])
    const [profile, setProfile] = useState(null)
    
    async function fetchStore() {
        try {
            const access_token = await AsyncStorage.getItem("access_token")
            const {data} = await Axios({
                method: "get",
                url: "/stores/users",
                headers: {
                    access_token: access_token
                }
            })
            setProfile({
                name: data.name,
                address: data.address
            })
            setProducts(data.Food)
        } catch (error) {
            console.log(error.response.data)
        }
    }
    
    async function handleLogout() {
        await AsyncStorage.clear()
        navigation.navigate("LoginPage")
    }

    useEffect(() => {

        fetchStore()
    }, [])

    return (
        <>
            <View style={styles.header}>
                <View style={styles.navbar}>
                    <Text style={styles.navItem}>
                    </Text>
                    <Text style={styles.navItem}>
                        Profile
                    </Text>
                    <TouchableOpacity 
                    onPress={handleLogout}
                    style={styles.navItem}>
                        <Text style={styles.logout}>
                            Logout
                        </Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.title}>
                    {profile ? profile.name : "Loading Profile"}
                </Text>
                <Text style={styles.subTitle}>
                    {profile ? profile.address : ""}
                </Text>
                <TouchableOpacity style={styles.addButton}>
                    <Text style={styles.buttonText}>
                        Add Product
                    </Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.content}>
                {products.map((el, index) => {
                    return (
                        <ProductCard
                        product={el}
                        key={index}
                        />
                    )
                })}
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    header: {
        // backgroundColor: "#5db075",
        // flex: 1,
        marginBottom: 10
    },
    navbar: {
        backgroundColor: "#5db075",
        marginTop: 30,
        paddingVertical: 10,
        width: "100%",
        flexDirection: "row",
        paddingBottom: 9
    },
    navItem: {
        flex: 1,
        textAlign: "center",
        color: "white",
        fontWeight: "600",
        fontSize: 17,
    },
    logout: {
        flex: 1,
        textAlign: "center",
        color: "white",
        fontWeight: "600",
        fontSize: 17,
    },
    title: {
        marginTop: 20,
        fontSize: 40,
        fontWeight: "bold",
        textAlign: "center",
        // color: "white"
    },
    subTitle: {
        textAlign: "center",
        marginHorizontal: 30,
        marginTop: 20,
        // color: "white"
    },
    addButton:{
        marginTop: 20,
        alignSelf: "center",
        backgroundColor: "#5db075",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 50,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        color: "white"
    },
    content: {
        // flex: 2
        marginTop: 10
    }
})

export default ProfilePage;