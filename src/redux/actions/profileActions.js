const setInfo = (key, value) => {
    switch(key) {
        case "email":
            return {
                type: "SET_EMAIL",
                payload: value
            };
        case "firstName":
            return {
                type: "SET_FIRSTNAME",
                payload: value
            };
        case "lastName":
            return {
                type: "SET_LASTNAME",
                payload: value
            };
        case "password":
            return {
                type: "SET_PASSWORD",
                payload: value
            };
        
        case "ccName":
            return {
                type: "SET_CCNAME",
                payload: value
            };
        case "ccNumber":
            return {
                type: "SET_CCNUMBER",
                payload: value
            };
        case "ccExpMonth":
            return {
                type: "SET_CCEXPMONTH",
                payload: value
            };
        case "ccExpYear":
            return {
                type: "SET_CCEXPYEAR",
                payload: value
            };
        case "ccCVV":
            return {
                type: "SET_CCCVV",
                payload: value
            };
        case "ccBillName":
            return {
                type: "SET_BILLINGNAME",
                payload: value
            };
        case "ccBill1":
            return {
                type: "SET_CCBILL1",
                payload: value
            };
        case "ccBill2":
            return {
                type: "SET_CCBILL2",
                payload: value
            };
        case "ccBill3":
            return {
                type: "SET_CCBILL3",
                payload: value
            };
        case "ccBillCity":
            return {
                type: "SET_CCBILLCITY",
                payload: value
            };
        case "ccBillState":
            return {
                type: "SET_CCBILLSTATE",
                payload: value
            };
        case "ccBillCountry":
            return {
                type: "SET_CCBILLCOUNTRY",
                payload: value
            };
        case "ccBillPostal":
            return {
                type: "SET_CCBILLPOSTAL",
                payload: value
            };
        case "ccBillPhone":
            return {
                type: "SET_CCBILLPHONE",
                payload: value
            };
        case "sameBillingShipping":
            return {
                type: "SET_SAMEBILLINGSHIPPING",
                payload: value
            };
        case "shippingName":
            return {
                type: "SET_SHIPPINGNAME",
                payload: value
            };
        case "shipping1":
            return {
                type: "SET_SHIPPING1",
                payload: value
            };
        case "shipping2":
            return {
                type: "SET_SHIPPING2",
                payload: value
            };
        case "shipping3":
            return {
                type: "SET_SHIPPING3",
                payload: value
            };
        case "shippingCity":
            return {
                type: "SET_SHIPPINGCITY",
                payload: value
            };
        case "shippingState":
            return {
                type: "SET_SHIPPINGSTATE",
                payload: value
            };
        case "shippingCountry":
            return {
                type: "SET_SHIPPINGCOUNTRY",
                payload: value
            };
        case "shippingPostal":
            return {
                type: "SET_SHIPPINGPOSTAL",
                payload: value
            };
        case "shippingPhone":
            return {
                type: "SET_SHIPPINGPHONE",
                payload: value
            };
        case "oneCheckout":
            return {
                type: "SET_ONECHECKOUT",
                payload: value
            };
        case "cardType":
            return {
                type: "SET_CARDTYPE",
                payload: value
            };

        case "clear":
            return {
                type: "CLEAR",
                payload: ""
            };
        case "set":
            return {
                type: "SET",
                payload: value
            };
        
        

    }
}

export default {
    setInfo,
}