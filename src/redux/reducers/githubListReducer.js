const initState = {
    data: [],
    isLoad: false,
    err: null
};

const listReducer = (state = initState, action) => {
    switch(action.type) {
        case "USER_FETCH_SUCCESS":
            return {
                ...state,
                data: action.data,
                isLoad: false,
                err: null
            };
        case "USER_FETCH_START":
            return {
                ...state,
                isLoad: true
            };
        case "USER_FETCH_ERROR":
            return {
                ...state,
                err: action.error,
                isLoad: false
            };
        default:
            return state;
    }
}

export default listReducer;