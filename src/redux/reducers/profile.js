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
        case "SET_PROFILE_CCNAME":
            return {
                ...state,
                ccName: action.payload
            }
        case "SET_PROFILE_CCNUMBER":
            return {
                ...state,
                ccNumber: action.payload
            }
        case "SET_PROFILE_CCEXPMONTH":
            return {
                ...state,
                ccExpMonth: action.payload
            }
        case "SET_PROFILE_CCEXPYEAR":
            return {
                ...state,
                ccExpYear: action.payload
            }
        case "SET_PROFILE_CCCVV":
            return {
                ...state,
                ccCVV: action.payload
            }
        case "SET_PROFILE_CCBILL1":
            return {
                ...state,
                ccBill1: action.payload
            }
        case "SET_PROFILE_CCBILL2":
            return {
                ...state,
                ccBill2: action.payload
            }
        case "SET_PROFILE_CCBILLCITY":
            return {
                ...state,
                ccBillCity: action.payload
            }
        case "SET_PROFILE_CCBILLSTATE":
            return {
                ...state,
                ccBillState: action.payload
            }
        case "SET_PROFILE_CCBILLCOUNTRY":
            return {
                ...state,
                ccBillCountry: action.payload
            }
        case "SET_PROFILE_CCBILLPOSTAL":
            return {
                ...state,
                ccBillPostal: action.payload
            }
        case "SET_PROFILE_CCBILLPHONE":
            return {
                ...state,
                ccBillPhone: action.payload
            }
        case "SET_PROFILE_SHIPPINGNAME":
            return {
                ...state,
                shippingName: action.payload
            }
        case "SET_PROFILE_SHIPPING1":
            return {
                ...state,
                shipping1: action.payload
            }
        case "SET_PROFILE_SHIPPING2":
            return {
                ...state,
                shipping2: action.payload
            }
        case "SET_PROFILE_SHIPPINGCITY":
            return {
                ...state,
                shippingCity: action.payload
            }
        case "SET_PROFILE_SHIPPINGSTATE":
            return {
                ...state,
                shippingState: action.payload
            }
        case "SET_PROFILE_SHIPPINGCOUNTRY":
            return {
                ...state,
                shippingCountry: action.payload
            }
        case "SET_PROFILE_SHIPPINGPOSTAL":
            return {
                ...state,
                shippingPostal: action.payload
            }
        case "SET_PROFILE_SHIPPINGPHONE":
            return {
                ...state,
                shippingPhone: action.payload
            }
        case "CLEAR_PROFILE":
            return {}
        default:
            return state
    }
}

export default profile;