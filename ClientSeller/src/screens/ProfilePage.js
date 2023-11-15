import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import ProductCard from "../components/ProductCard";
import { useState } from "react";

function ProfilePage() {
    const [products, setProducts] = useState(["","","","","","","",""])
    return (
        <>
            <View style={styles.header}>
                <View style={styles.navbar}>
                    <Text style={styles.navItem}>
                    </Text>
                    <Text style={styles.navItem}>
                        Profile
                    </Text>
                    <Text style={styles.navItem}>
                        Logout
                    </Text>
                </View>
                <Text style={styles.title}>
                    Nama Toko
                </Text>
                <Text style={styles.subTitle}>
                    Alamat toko: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
                </Text>
                <TouchableOpacity>
                    <Text style={styles.addButton}>
                        Add Product
                    </Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.content}>
                {products.map((el, index) => {
                    return (
                        <ProductCard
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
        justifyContent: "space-around",
        borderTopColor: "transparent",
        borderEndColor: "transparent",
        borderStartColor: "transparent",
        borderBottomColor: "white",
        borderWidth: 2,
        paddingBottom: 9
    },
    navItem: {
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
        textAlign: "center",
        alignSelf: "center",
        fontSize: 20,
        fontWeight: "bold",
        backgroundColor: "#5db075",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 50,
        color: "white"
    },
    content: {
        // flex: 2
        marginTop: 10
    }
})

export default ProfilePage;