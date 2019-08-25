import { loadState, saveState } from "../initState/configureState.js";

const loginReducer = (state = loadState(), action) => {
    switch (action.type) {
        case 'ACCEPTED':
            // serilize local storage
            saveState({ authentication: true });
            return {
                ...state,
                authentication: true
            };
        case 'REJECTED':
            // serilize local storage
            saveState({ authentication: false });
            return {
                ...state,
                authentication: false
            };
        default:
            return state;
    }
};

export default loginReducer;