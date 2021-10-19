const setInfo = (key, value) => {
    switch(key) {
        case "set":
            console.log("profiles Action set :: ", value)
            return {
                type: "SET_PROFILES",
                payload: value
            };
    }
};

export default {
    setInfo,
}