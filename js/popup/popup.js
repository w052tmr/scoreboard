const popup = document.querySelector('.pop-up');

export const getPopUp = (text, winner = false) => {
    //display popup with correct styles
    if (winner) {
        popup.children[0].children[1].innerText = 'Congratulations';
        popup.children[0].children[1].style.color = '#c3f2da';
        // popup.children[0].children[1].style.color = '#dff8eb';
        popup.children[0].style.borderColor = '#54d994';
        popup.children[0].children[0].style.color = '#c3f2da';
    } else {
        popup.children[0].children[1].innerText = 'Sorry';
        popup.children[0].children[1].style.color = '#f2c4c4';
        // popup.children[0].children[1].style.color = '#f8e0e0';
        popup.children[0].style.borderColor = '#d33939';
        popup.children[0].children[0].style.color = '#f2c4c4';
    }

    popup.className = 'pop-up pop-up--active';
    popup.style.zIndex = '1';
    popup.style.opacity = 1;

    // set the popup message
    const message = popup.children[0].children[2];
    message.innerText = text;

    // close the popup when the user clicks the "X"
    const exit = popup.children[0].children[0];
    exit.addEventListener('click', () => {
        popup.className = 'pop-up pop-up--inactive';
        popup.style.opacity = 0;
        popup.style.zIndex = '-1';
    });
};
