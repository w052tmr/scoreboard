let winBy2 = false;

// toggle the val of winBy2 everytime it is clicked (i.e., checked = true, unchecked = false)
export const setWinBy2 = () => {
    if (winBy2 === false) winBy2 = true;
    else if (winBy2 === true) winBy2 = false;
};

// determines if winBy2 is checked or not
export const getWinBy2 = () => {
    return winBy2;
};

// returns the input element of winBy2 so it can be properly controlled (i.e., enabled or disabled)
export const getWinBy2Element = () => {
    return document.getElementById('winBy2');
};
