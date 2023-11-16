import { View, Image, Text, StyleSheet } from "react-native";
function ProductCard(props) {
    const {product} = props
    return (
        <View style={styles.productCard}>
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
        </View>
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