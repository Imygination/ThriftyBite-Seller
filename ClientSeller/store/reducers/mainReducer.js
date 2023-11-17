import { FETCH_PROFILE } from "../actions/actionCreators";

const initialState = {
    profile: {
        name: "",
        address: ""
    },
    products: []
}

export default function mainReducer(state=initialState, action) {
    switch (action.type) {
        case FETCH_PROFILE:
            return {...state, profile: action.payload.profile, products: action.payload.products}
            break;
        default:
            return state
            break;
    }
}