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

export const unSetError = () => {
    return (
        {
            type: "USER_CANCLE_ERROR"
        }
    );
}

export const getData = () => {
    console.log("Start to fetch data...Loading flag dispatched");
    return (dispatch, getState) => {
        dispatch(setLoad());
        axios.get("http://localhost:1024/api/users")
            .then(res => {
                dispatch(setUserList(res.data));
            })
            .catch(err => {
                dispatch(setError(err));
                // send request after 5s to retry
                setTimeout(() => dispatch(getData()), 5000);
            })
    };
}

/* Asyn problem notice:
        This function call http to server to delete data in db,
        then carry the new data back.
*/
export const deleteData = id => {
    console.log("Start to delete data...");
    return (dispatch, getState) => {
        dispatch(setLoad());
        axios.delete(`http://localhost:1024/api/users/${id}`)
            .then(res => {
                dispatch(getData());
            })
            .catch(err => {
                dispatch(setError(err));
            })
    }
}

export const postData = data => {
    console.log("Start to post data...");
    return (dispatch, getState) => {
        dispatch(setLoad());
        axios.post('http://localhost:1024/api/users', data)
            .then(res => {
                dispatch(getData());
            })
            .catch(err => {
                dispatch(setError(err));
            })
    }
}

export const updateData = (id, redirectToEdit) => {
    console.log("Start to update data...");
    return (dispatch, getState) => {
        dispatch(setLoad());
        axios.get("http://localhost:1024/api/users")
            .then(res => {
                dispatch(setUserList(res.data));
                console.log("Data updated...start to redirect to edit page...");
                /* if previous id is NOT exsiting in new updated data set, throw error */
                let errorFlag = true;
                getState().userTable.data.forEach((ele, index) => {
                    for (let key in ele) {
                        if (key === "_id" && ele[key] === id) {
                            errorFlag = false;
                        }
                    }
                });
                if (errorFlag) {
                    throw new Error(`USER: ${id} has been deleted`);
                } else {
                    redirectToEdit(`/project-1/edit/${id}`);
                }
            })
            .catch(err => {
                dispatch(setError(err));
            })
    }
}

export const putData = (id, data) => {
    console.log(`Start to udate data for user: ${id}...`);
    return (dispatch, getState) => {
        axios.put(`http://localhost:1024/api/users/${id}`, data)
            .then(res => {
                dispatch(getData());
            })
            .catch(err => {
                dispatch(setError());
            })
    }
}