import { resetPlayerStyles } from './scoreboardSettings/playerStyles/reset';
import { enableKeyEvents } from './scoreboardSettings/keyEvents/keyEvents';
import { enableBtns } from './scoreboardSettings/btnSettings/enableBtns';
import { getAllPlayers } from '../playerController/getAllPlayers';

export const resetScoreboard = () => {
    const currentPlayers = getAllPlayers();
    currentPlayers.forEach((player) => {
        player.children[0].children[0].children[1].innerText = '0';
    });
    resetPlayerStyles(currentPlayers);
    enableBtns();
    enableKeyEvents();
};
