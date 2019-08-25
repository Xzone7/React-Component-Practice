import axios from 'axios';

export const addList = data => {
    return (
        {
            type: "USER_FETCH_SUCCESS",
            data
        }
    );
};

export const setLoad = () => {
    return (
        {
            type: "USER_FETCH_START",
        }
    );
};

export const setError = error => {
    return (
        {
            type: "USER_FETCH_FAIL",
            error
        }
    );
};

export const getData = () => {
    console.log("Start to fetch data...Loading flag dispatched");
    return (dispatch, getState) => {
        dispatch(setLoad());
        axios
            .get("https://api.github.com/users?per_page=100")
            .then(res => {
                dispatch(addList(res.data));
            })
            .catch(err => {
                dispatch(setError(err));
            })
    }
}