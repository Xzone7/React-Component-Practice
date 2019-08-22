export const loadState = () => {
    try {
        console.log("load state from localStorage...");
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            console.log("init state from pre-defind config");
            return initState;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        console.error(err)
        return initState;
    }
};

export const saveState = state => {
    try {
        console.log("save state to localStorage...");
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch (err) {
        console.error(err);
    }
}

const initState = {
    authentication: false
};
