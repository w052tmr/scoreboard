// playTo determines the winning score that the players will play to
const playTo = document.getElementById('playTo');

// makes sure that playTo is never less than 1
export const listenForPlayTo = () => {
    playTo.addEventListener('input', () => {
        if (playTo.value < 1) playTo.value = 1;
    });
};

// returns the playTo input, so it can be properly controlled (i.e., enable or disable)
export const getPlayTo = () => {
    return playTo;
};
