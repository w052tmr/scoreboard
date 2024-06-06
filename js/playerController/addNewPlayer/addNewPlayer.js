import { modifyRowCount, createNewRow } from '../utility/modifyRowCount';
import { updatePlayerCountDisp } from '../utility/updatePlayerCountDisp';
// import { names } from '../../../names/nameInput/validation/validateNameInput';

export const addNewPlayer = (currentPlayers) => {
    // determines if a new row will be added
    const addNewRow = modifyRowCount(currentPlayers, 'add');

    // create and initialize new player
    const newPlayer = currentPlayers[currentPlayers.length - 1].cloneNode(true);
    newPlayer.querySelector('.player-head__label').innerText = `Player ${
        currentPlayers.length + 1
    }`;
    newPlayer.querySelector('.player-head__score').innerText = '0';

    // add the newly created player to the DOM

    // names.push(
    //     playerNode.querySelector('.player-head__label').innerText.toUpperCase()
    // );

    if (addNewRow) {
        // create a new row AND add the new player to it
        createNewRow(newPlayer);
    } else {
        // otherwise, add just the newplayer as a sibling to the last player on the scoreboard and keep the row
        currentPlayers[currentPlayers.length - 1].insertAdjacentElement(
            'afterend',
            newPlayer
        );
    }

    //add 1 to the number of players display
    updatePlayerCountDisp('add');
};
