import AsyncStorage from "@react-native-async-storage/async-storage"
import { Axios } from "../../src/helpers/axios"

export const FETCH_PROFILE = "fetch/profile"

export function fetchServer(url, type) {
    return async (dispatch) => {
        try {
            const token = await AsyncStorage.getItem("access_token")
            const {data} = await Axios({
                method: "get",
                url: url,
                headers: {
                    access_token: token
                }
            })
            const products = data.Food
            const profile = {
                id: data.id,
                userId: data.UserId,
                name: data.name,
                address: data.address,
                location: data.location
            }
            dispatch({
                type: FETCH_PROFILE,
                payload: {
                    profile,
                    products
                }
            })
        } catch (error) {
            throw error
        }
    }
}