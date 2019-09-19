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

export const setAllowEditSuperior = data => {
    return (
        {
            type: "USER_ALLOW_SUPERIOR_FETCH_SUCCESS",
            data
        }
    );
}

export const incrementPage = () => {
    return (
        {
            type: "USER_ADD_PAGE"
        }
    );
}

export const decrementPage = () => {
    return (
        {
            type: "USER_REMOVE_PAGE"
        }
    );
}

export const setPaginationLoad = () => {
    return (
        {
            type: "USER_PAGINATION_START"
        }
    );
}

export const resetPage = () => {
    return (
        {
            type: "USER_PAGE_RESET"
        }
    );
}

export const setFirstPageData = data => {
    return (
        {
            type: "USER_SET_FIRST_PAGE_DATA",
            data
        }
    );
}

export const unsetError = () => {
    return (
        {
            type: "USER_UNSET_ERROR"
        }
    );
}

export const setSearchData = data => {
    return (
        {
            type: "USER_FETCH_SEARCH_DATA",
            data
        }
    );
}

export const getSearchData = (key) => {
    console.log("Start to fetch search data...Loading flag dispatched");
    return (dispatch, getState) => {
        dispatch(setLoad())
        axios.get(`http://localhost:1024/api/armyusers?search=true&&key=${key}`)
            .then(res => {
                dispatch(setSearchData(res.data));
            })
            .catch(err => {
                dispatch(setError(err));
            })
    }
}

export const getFirstPageData = () => {
    console.log("Start to fetch data...Loading flag dispatched");
    return (dispatch, getState) => {
        dispatch(setLoad())
        const currentRowPerPage = getState().armyTable.rowPerPage;
        axios.get(`http://localhost:1024/api/armyusers?page=0&&rpp=${currentRowPerPage}`)
            .then(res => {
                dispatch(setFirstPageData(res.data));
            })
            .catch(err => {
                dispatch(setError(err));
            });
    }
}

export const getData = (setScroll, setPaginationLoad, loadMore, loadEnd) => {
    console.log("Start to fetch data...Loading flag dispatched");
    return (dispatch, getState) => {
        setPaginationLoad ? dispatch(setPaginationLoad()) : dispatch(setLoad());
        const currentPage = getState().armyTable.page;
        const currentRowPerPage = getState().armyTable.rowPerPage;
        axios.get(`http://localhost:1024/api/armyusers?page=${currentPage}&&rpp=${currentRowPerPage}`)
            .then(res => {
                /* check res.data */
                // if data is [] ---> no more new data 
                //               ---> 1. set flag on  2. page - 1

                // 1
                res.data.length === 0 ? loadEnd() : loadMore();
                // 2
                res.data.length === 0 && dispatch(decrementPage());

                dispatch(setUserList(res.data));
                setScroll ? setScroll() : console.log("no set scroll function");
            })
            .catch(err => {
                dispatch(setError(err));
            });
    }
}

export const addPage = (setScroll, loadMore, loadEnd) => {
    console.log("Adding current page to page + 1...");
    return (dispatch, getState) => {
        dispatch(incrementPage());
        dispatch(getData(setScroll, setPaginationLoad, loadMore, loadEnd));
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
            });
    }
}

// HTTP CALL for edit user valid superior (avoid circle)
export const getNoCircleSuperiorData = id => {
    console.log("Start to fetch valid no circle superior data....Loading flag dispatched");
    return (dispatch, getState) => {
        dispatch(setLoad());
        axios.get(`http://localhost:1024/api/allow-edit-superior/${id}`)
            .then(res => {
                dispatch(setAllowEditSuperior(res.data));
            })
            .catch(err => {
                dispatch(setError(err));
            });
    }
}

// PUT update soldier
export const putData = (id, data, event) => {
    console.log("Start to put data...Loading flag dispatched");
    return (dispatch, getState) => {
        dispatch(setLoad());
        axios.put(`http://localhost:1024/api/armyusers/${id}`, data)
            .then(res => {
                dispatch(resetPage());
                event.push('/project-2');
            })
            .catch(err => {
                dispatch(setError());
                event.push('/project-2');
            })
    }
}

// POST new soldier
export const postData = (data, event) => {
    console.log("Start to post data...Loading flag dispatched");
    return (dispatch, getState) => {
        dispatch(setLoad());
        axios.post("http://localhost:1024/api/armyusers", data)
            .then(res => {
                dispatch(resetPage());
                event.push('/project-2');
            })
            .catch(err => {
                dispatch(setError());
                event.push('/project-2');
            })
    }
}

export const deleteData = (data) => {
    console.log("Start to delete data...");
    return (dispatch, getState) => {
        dispatch(setLoad());
        axios.delete("http://localhost:1024/api/armyusers", { data: data })
            .then(res => {
                dispatch(resetPage());
                dispatch(getFirstPageData());
            })
            .catch(err => {
                dispatch(setError());
            })
    }
}