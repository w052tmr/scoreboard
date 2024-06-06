/* change background and font colors of each player: winnner = green, losers = red */

export const setWinnerStyles = (winner, currentPlayers) => {
    currentPlayers.forEach((player) => {
        player.style.backgroundColor = '#f2c4c4';
        player.children[0].children[0].style.color = '#f2c4c4';
    });

    winner.style.backgroundColor = '#c3f2da';
    winner.children[0].children[0].style.color = '#c3f2da';
};
