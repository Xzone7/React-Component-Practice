const initState = {
    data: [],
    isLoad: false,
    err: null,
    page: 0,
    pagePerRow: 5 
};

const armyTableReducer = (state = initState, action) => {
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
            }
        default: 
            return state;
    }
}

export default armyTableReducer;