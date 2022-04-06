import { LOGIN, EMPTY } from '../action/authaction';
const initState = {
    UserData: {}
}
export default function loginReducer(state = initState, action) {
    switch (action.type) {
        case LOGIN:
            return {
                // ...state,      
                UserData: action.payload, state
            }
        case EMPTY:
            return {
                UserData: {}
            }
        default:
            return state
    }
}