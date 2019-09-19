const initState = {
    data: [],
    isLoad: false,
    err: null,
    page: 0,
    rowPerPage: 6,
    superior: [],
    allowSuperior: [],
    paginationLoad: false,
    searchData: []
};

const armyTableReducer = (state = initState, action) => {
    switch (action.type) {
        case "USER_SET_FIRST_PAGE_DATA":
            return {
                ...state,
                data: action.data,
                isLoad: false,
                err: null,
                paginationLoad: false
            }

        case "USER_FETCH_SUCCESS":
            return {
                ...state,
                data: [...state.data, ...action.data],
                isLoad: false,
                err: null,
                paginationLoad: false
            }

        case "USER_FETCH_START":
            return {
                ...state,
                isLoad: true
            }

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

        case "USER_ALLOW_SUPERIOR_FETCH_SUCCESS":
            return {
                ...state,
                allowSuperior: action.data.map((ele, index) => {
                    return {
                        name: ele.name,
                        _id: ele._id
                    };
                }),
                isLoad: false,
                err: null
            }

        case "USER_ADD_PAGE":
            return {
                ...state,
                page: state.page + 1
            }

        case "USER_REMOVE_PAGE":
            return {
                ...state,
                page: state.page - 1
            }

        case "USER_PAGINATION_START":
            return {
                ...state,
                paginationLoad: true
            }

        case "USER_PAGE_RESET":
            return {
                ...state,
                page: 0
            }

        case "USER_UNSET_ERROR": 
            return {
                ...state,
                err: null
            }

        case "USER_FETCH_SEARCH_DATA": 
            return {
                ...state,
                searchData: action.data,
                isLoad: false,
                err: null,
            }

        case "USER_FETCH_SORTED_DATA":
            return {
                ...state,
                data: action.data,
                isLoad: false,
                err: null
            }

        case "USER_FETCH_SUPERIOR_VIEW":
            return {
                ...state,
                data: [action.data],
                isLoad: false,
                err: null
            }

        case "USER_FETCH_SUBORDINATE_VIEW":
            return {
                ...state,
                data: action.data, // ?
                isLoad: false,
                err: null
            }

        default:
            return state;
    }
}

export default armyTableReducer;