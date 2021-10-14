const setInfo = (key, value) => {
    switch(key) {
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

    }
}

export default {
    setInfo,
}