const INITIAL_STATE = {
    isSignedIn: null
};

const initial_state = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SIGN_IN':
            return { ...state, isSignedIn: true };
        case 'SIGN_OUT':
            return { ...state, isSignedIn: false };
        default:
            return state;
    }
};

export default initial_state;