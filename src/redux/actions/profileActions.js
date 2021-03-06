const setInfo = (key, value) => {
    switch(key) {
        case "email":
            return {
                type: "SET_PROFILE_EMAIL",
                payload: value
            };
        case "firstName":
            return {
                type: "SET_PROFILE_FIRSTNAME",
                payload: value
            };
        case "lastName":
            return {
                type: "SET_PROFILE_LASTNAME",
                payload: value
            };
        case "password":
            return {
                type: "SET_PROFILE_PASSWORD",
                payload: value
            };
        
        case "ccName":
            return {
                type: "SET_PROFILE_CCNAME",
                payload: value
            };
        case "ccNumber":
            return {
                type: "SET_PROFILE_CCNUMBER",
                payload: value
            };
        case "ccExpMonth":
            return {
                type: "SET_PROFILE_CCEXPMONTH",
                payload: value
            };
        case "ccExpYear":
            return {
                type: "SET_PROFILE_CCEXPYEAR",
                payload: value
            };
        case "ccCVV":
            return {
                type: "SET_PROFILE_CCCVV",
                payload: value
            };
        case "ccBillName":
            return {
                type: "SET_PROFILE_BILLINGNAME",
                payload: value
            };
        case "ccBill1":
            return {
                type: "SET_PROFILE_CCBILL1",
                payload: value
            };
        case "ccBill2":
            return {
                type: "SET_PROFILE_CCBILL2",
                payload: value
            };
        case "ccBill3":
            return {
                type: "SET_PROFILE_CCBILL3",
                payload: value
            };
        case "ccBillCity":
            return {
                type: "SET_PROFILE_CCBILLCITY",
                payload: value
            };
        case "ccBillState":
            return {
                type: "SET_PROFILE_CCBILLSTATE",
                payload: value
            };
        case "ccBillCountry":
            return {
                type: "SET_PROFILE_CCBILLCOUNTRY",
                payload: value
            };
        case "ccBillPostal":
            return {
                type: "SET_PROFILE_CCBILLPOSTAL",
                payload: value
            };
        case "ccBillPhone":
            return {
                type: "SET_PROFILE_CCBILLPHONE",
                payload: value
            };
        case "sameBillingShipping":
            return {
                type: "SET_PROFILE_SAMEBILLINGSHIPPING",
                payload: value
            };
        case "shippingName":
            return {
                type: "SET_PROFILE_SHIPPINGNAME",
                payload: value
            };
        case "shipping1":
            return {
                type: "SET_PROFILE_SHIPPING1",
                payload: value
            };
        case "shipping2":
            return {
                type: "SET_PROFILE_SHIPPING2",
                payload: value
            };
        case "shipping3":
            return {
                type: "SET_PROFILE_SHIPPING3",
                payload: value
            };
        case "shippingCity":
            return {
                type: "SET_PROFILE_SHIPPINGCITY",
                payload: value
            };
        case "shippingState":
            return {
                type: "SET_PROFILE_SHIPPINGSTATE",
                payload: value
            };
        case "shippingCountry":
            return {
                type: "SET_PROFILE_SHIPPINGCOUNTRY",
                payload: value
            };
        case "shippingPostal":
            return {
                type: "SET_PROFILE_SHIPPINGPOSTAL",
                payload: value
            };
        case "shippingPhone":
            return {
                type: "SET_PROFILE_SHIPPINGPHONE",
                payload: value
            };
        case "oneCheckout":
            return {
                type: "SET_PROFILE_ONECHECKOUT",
                payload: value
            };
        case "cardType":
            return {
                type: "SET_PROFILE_CARDTYPE",
                payload: value
            };

        case "clear":
            return {
                type: "CLEAR_PROFILE",
                payload: ""
            };
        case "set":
            return {
                type: "SET_PROFILE",
                payload: value
            };
        
        

    }
};


export default {
    setInfo,
}