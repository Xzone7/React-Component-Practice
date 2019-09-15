const initState = {
    data: [],
    isLoad: false,
    err: null,
    page: 0,
    pagePerRow: 5,
    superior: []
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
        case "USER_SUPERIOR_FETCH_SUCCESS":
            return {
                ...state,
                superior: action.data.map((ele, index) => {
                    return {
                        name: ele.name,
                        _id: ele._id
                    };
                }),
                isLoad: false,
                err: null
            }
        default: 
            return state;
    }
}

export default armyTableReducer;