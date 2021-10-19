const setInfo = (key, value) => {
    switch(key) {
        case "site":
            return {
                type: "SET_SITE",
                payload: value
            };
    }
}

export default {
    setInfo,
}