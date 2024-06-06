/* Reset player styles to their original background and font colors (light grey) */
export const resetPlayerStyles = (currentPlayers) => {
    currentPlayers.forEach((player) => {
        player.style.backgroundColor = '#fefeff';
        player.children[0].children[0].style.color = '#fefeff';
    });
};
