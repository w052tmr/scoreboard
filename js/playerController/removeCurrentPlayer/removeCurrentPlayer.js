import { modifyRowCount, removeCurrentRow } from '../utility/modifyRowCount';
import { updatePlayerCountDisp } from '../utility/updatePlayerCountDisp';
// import { names } from '../../../names/nameInput/validation/validateNameInput';

export const removeCurrentPlayer = (currentPlayers) => {
    // determines if the last row needs to be removed
    const removeRow = modifyRowCount(currentPlayers, 'remove');

    // // remove the to be deleted player's name from the names array
    // names.pop();

    if (removeRow) {
        // remove the last row AND the player on that row
        removeCurrentRow();
    } else {
        // otherwise, remove just the last player and keep the row
        currentPlayers[currentPlayers.length - 1].remove();
    }

    //subtract 1 from the number of players on the UI display
    updatePlayerCountDisp('remove');
};
