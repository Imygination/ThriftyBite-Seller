import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

function ProductCard(props) {
    const {product} = props
    const navigation = useNavigation()
    return (
        <TouchableOpacity
        onPress={() => {
            navigation.navigate("EditPage", {product: product})
        }}
        style={styles.productCard}>
            <Image
            source={{
                uri: product.imageUrl
            }}
            style={styles.image}
            />
            <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>
                    {product.name} 
                </Text>
                <Text>
                    Stock: {product.stock}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    productCard: {
        // backgroundColor: "#5db075",
        height: 100,
        width: "85%",
        alignSelf: "center",
        flexDirection: "row",
        marginVertical: 10
    },
    image: {
        width: 80,
        height: 80,
        alignSelf: "baseline",
        borderRadius: 10
    },
    cardContent: {
        marginStart: 20,
        width: "65%",
        borderStartColor: "transparent",
        borderTopColor: "transparent",
        borderEndColor: "transparent",
        borderBottomColor: "#5db075",
        borderBottomWidth: 2,
    },
    cardTitle: {
        fontSize: 20,
        marginBottom: 5
    }
})

export default ProductCard;