import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import * as TalkRn from "@talkjs/expo"

function ContactScreen() {
    const profile = useSelector((state) => state.profile)
    const navigation = useNavigation()
    const me = {
        id: profile.id,
        name: profile.name,
        role: "default",
    }


    return (
        <View style={styles.chatContainer}>
            <TouchableOpacity
            onPress={() => {
                navigation.goBack()
            }}
            >
                <Text style={styles.backButton}>
                    Back
                </Text>
            </TouchableOpacity>
            <TalkRn.Session appId="tjsSPkAZ" me={{
                id: profile.id,
                name: profile.name,
                role: "default"
            }}>
                <TalkRn.ConversationList 
                onSelectConversation={(event) => {
                    navigation.navigate("ChatScreen", {
                        conversationId: event.conversation.id,
                        recipientId: event.others[0].id
                    })
                }}
                />
            </TalkRn.Session>
        </View>
    );
}

const styles = StyleSheet.create({
    chatContainer: {
        flex: 1,
        marginTop: 40
    },
    backButton: {
        fontSize: 20,
        marginStart: 20,
        marginVertical: 10,
        backgroundColor: "#5db075",
        width: 80,
        textAlign: "center",
        padding: 5,
        borderRadius: 10,
        fontWeight: "bold",
        color: "white"
    }
})

export default ContactScreen