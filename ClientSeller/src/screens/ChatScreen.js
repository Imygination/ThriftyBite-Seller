import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { useSelector } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as TalkRn from "@talkjs/expo"

function ChatScreen() {
    const profile = useSelector((state) => state.profile)
    const navigation = useNavigation()
    const {conversationId, recipientId} = useRoute().params
    // console.log(conversationId)
    const me = {
        id: profile.id, //storeid
        name: profile.name,
        role: "default",
    }

    const other = {
        id: recipientId, //userid
        name: "Pembeli",
        role: "default",
    }

    /**
     * ada id user pembeli
     * ada id store
     * `user1-store1`
     */

    const conversationBuilder = TalkRn.getConversationBuilder(conversationId)
    
    conversationBuilder.setParticipant(me)
    conversationBuilder.setParticipant(other)

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
            <TalkRn.Session appId="tjsSPkAZ" me={me}>
                <TalkRn.Chatbox conversationBuilder={conversationBuilder} />
            </TalkRn.Session>
        </View>
    )
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

export default ChatScreen
