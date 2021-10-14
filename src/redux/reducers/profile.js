const profile = (state = {}, action) => {
    switch(action.type){
        case "SET_PROFILE_FIRSTNAME":
            return {
                ...state,
                firstName: action.payload
            }
        case "SET_PROFILE_LASTNAME":
            return {
                ...state,
                lastName: action.payload
            }
        case "SET_PROFILE_PASSWORD":
            return {
                ...state,
                password: action.payload
            }
            // case "SET_PROFILE_FIRSTNAME":
            // return {
            //     ...state,
            //     firstName: action.payload
            // }
            // case "SET_PROFILE_FIRSTNAME":
            // return {
            //     ...state,
            //     firstName: action.payload
            // }
            // case "SET_PROFILE_FIRSTNAME":
            // return {
            //     ...state,
            //     firstName: action.payload
            // }
            // case "SET_PROFILE_FIRSTNAME":
            // return {
            //     ...state,
            //     firstName: action.payload
            // }
            // case "SET_PROFILE_FIRSTNAME":
            // return {
            //     ...state,
            //     firstName: action.payload
            // }
            // case "SET_PROFILE_FIRSTNAME":
            // return {
            //     ...state,
            //     firstName: action.payload
            // }
            // case "SET_PROFILE_FIRSTNAME":
            // return {
            //     ...state,
            //     firstName: action.payload
            // }
            // case "SET_PROFILE_FIRSTNAME":
            // return {
            //     ...state,
            //     firstName: action.payload
            // }
            // case "SET_PROFILE_FIRSTNAME":
            // return {
            //     ...state,
            //     firstName: action.payload
            // }
            // case "SET_PROFILE_FIRSTNAME":
            // return {
            //     ...state,
            //     firstName: action.payload
            // }
            // case "SET_PROFILE_FIRSTNAME":
            // return {
            //     ...state,
            //     firstName: action.payload
            // }
            // case "SET_PROFILE_FIRSTNAME":
            // return {
            //     ...state,
            //     firstName: action.payload
            // }
            // case "SET_PROFILE_FIRSTNAME":
            // return {
            //     ...state,
            //     firstName: action.payload
            // }
            // case "SET_PROFILE_FIRSTNAME":
            // return {
            //     ...state,
            //     firstName: action.payload
            // }
            // case "SET_PROFILE_FIRSTNAME":
            // return {
            //     ...state,
            //     firstName: action.payload
            // }
            // case "SET_PROFILE_FIRSTNAME":
            // return {
            //     ...state,
            //     firstName: action.payload
            // }
            // case "SET_PROFILE_FIRSTNAME":
            // return {
            //     ...state,
            //     firstName: action.payload
            // }
        default:
            return state
    }
}

export default profile;