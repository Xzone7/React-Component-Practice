import axios from 'axios';

export const setUserList = data => {
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
            type: "USER_FETCH_START"
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

export const setSuperior = data => {
    return (
        {
            type: "USER_SUPERIOR_FETCH_SUCCESS",
            data
        }
    );
}

export const getData = () => {
    console.log("Start to fetch data...Loading flag dispatched");
    return (dispatch, getState) => {
        dispatch(setLoad());
        axios.get("http://localhost:1024/api/armyusers")
            .then(res => {
                dispatch(setUserList(res.data));
            })
            .catch(err => {
                dispatch(setError(err));
            });
    }
}

// HTTP CALL for post new user valid superior
export const getSuperiorData = () => {
    console.log("Start to fetch all superior data...Loading flag dispatched");
    return (dispatch, getState) => {
        dispatch(setLoad());
        axios.get("http://localhost:1024/api/armyuser-all-superior")
            .then(res => {
                dispatch(setSuperior(res.data));
            })
            .catch(err => {
                dispatch(setError(err));
            })
    }
}

export const deleteData = (data) => {
    console.log("Start to delete data...");
    return (dispatch, getState) => {
        dispatch(setLoad());
        axios.delete("http://localhost:1024/api/armyusers", { data: data })
            .then(res => {
                dispatch(getData());
            })
            .catch(err => {
                dispatch(setError());
            })
    }
}