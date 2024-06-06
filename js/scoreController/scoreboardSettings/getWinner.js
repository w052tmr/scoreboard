import { setWinnerStyles } from './playerStyles/setWinner';
import { disableKeyEvents } from './keyEvents/keyEvents';
import { disableBtns } from './btnSettings/disableBtns';
import { getPopUp } from '../../popup/popup';

// called only when there is a winning player
export const getWinner = (winningPlayer, currentPlayers) => {
    setWinnerStyles(winningPlayer, currentPlayers);
    getPopUp(
        `${winningPlayer.children[0].children[0].children[0].innerText} is the winner!`,
        true
    );
    disableKeyEvents();
    disableBtns();
};
