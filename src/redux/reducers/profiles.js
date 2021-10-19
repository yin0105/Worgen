const profiles = (state = [], action) => {
    switch(action.type){
        case "SET_PROFILES":
            console.log("profiles payload = ", action.payload)
            return action.payload
        default:
            return state
    }
}

export default profiles;