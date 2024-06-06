let keysEnabled = true;

export const keyEventsEnabled = () => {
    return keysEnabled;
};

export const disableKeyEvents = () => {
    keysEnabled = false;
};

export const enableKeyEvents = () => {
    keysEnabled = true;
};
