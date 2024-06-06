import { addNewPlayer } from './addNewPlayer/addNewPlayer';
import { removeCurrentPlayer } from './removeCurrentPlayer/removeCurrentPlayer';
import { getAllPlayers } from './getAllPlayers';

// determines whether a player can be added or removed from the scoreboard
export const modifyPlayerCount = (operation) => {
    const currentPlayers = getAllPlayers();

    if (operation === 'add' && currentPlayers.length < 12) {
        // add new player
        addNewPlayer(currentPlayers);
    } else if (operation === 'remove' && currentPlayers.length > 1) {
        // remove a player
        removeCurrentPlayer(currentPlayers);
    }
};
