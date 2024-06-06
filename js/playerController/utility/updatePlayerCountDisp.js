// select and update the display that shows the current number of actively playing players
const playerCountDisp = document.querySelector('.num-players__number');

export const updatePlayerCountDisp = (operation) => {
    if (operation === 'add')
        return (playerCountDisp.textContent = `${
            parseInt(playerCountDisp.textContent) + 1
        }`);

    return (playerCountDisp.textContent = `${
        parseInt(playerCountDisp.textContent) - 1
    }`);
};
