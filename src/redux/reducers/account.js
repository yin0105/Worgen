const account = (state = {}, action) => {
    switch(action.type){
        case "SET_SITE":
            return {
                ...state,
                site: action.payload
            }
        default:
            return state
    }
}

export default account;