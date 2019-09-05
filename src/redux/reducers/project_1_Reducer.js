const initState = {
    data: [],
    isLoad: false,
    err: null,
};

const userTableReducer = (state = initState, action) => {
    switch (action.type) {
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
        case "USER_FETCH_FAIL":
            return {
                ...state,
                isLoad: false,
                err: action.error
            };
        case "USER_CANCLE_ERROR": 
            return {
                ...state,
                err: null
            }
        default:
            return state;
    }
}

export default userTableReducer;