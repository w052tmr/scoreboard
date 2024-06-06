import { modifyPlayerCount } from './playerController/modifyPlayerCount';
import { listenForPlayTo } from './scoreController/playTo';
import { addPoint } from './scoreController/addPoint';
import { removePoint } from './scoreController/removePoint';
import { checkScore } from './scoreController/checkScore';
import { changePlayerName } from './namesController/changePlayerName';
import { setWinBy2 } from './scoreController/winBy2';
import { resetScoreboard } from './scoreController/resetScoreboard';
import { keyEventsEnabled } from './scoreController/scoreboardSettings/keyEvents/keyEvents';
import { disableBtns } from './scoreController/scoreboardSettings/btnSettings/disableBtns';
import { disableKeyEvents } from './scoreController/scoreboardSettings/keyEvents/keyEvents';

// listen for key events
window.addEventListener('keypress', (e) => {
    if (keyEventsEnabled()) {
        // +1 Player
        if (e.key === '+') {
            modifyPlayerCount('add');

            // -1 PLayer
        } else if (e.key === '_') {
            modifyPlayerCount('remove');
        }
    }
});

// main execution
document.body.addEventListener('click', (e) => {
    // +1 Player
    if (e.target.id === 'addPlayerBtn' || e.target.id === 'addPlayerSymbol') {
        modifyPlayerCount('add');
    }

    // -1 Player
    if (
        e.target.id === 'removePlayerBtn' ||
        e.target.id === 'removePlayerSymbol'
    ) {
        modifyPlayerCount('remove');
    }

    // change the value of the score that the players are playing to
    if (e.target.id === 'playTo') {
        listenForPlayTo();
    }

    // +1 POINT
    if (e.target.className.split(' ').includes('addPoint')) {
        const player = e.target.parentNode.parentNode;
        addPoint(player);
        disableBtns(['addPoint', 'removePoint']);
        disableKeyEvents();
        checkScore();
    }

    // -1 POINT
    if (e.target.className.split(' ').includes('removePoint')) {
        const player = e.target.parentNode.parentNode;
        removePoint(player);
        disableBtns(['addPoint', 'removePoint']);
        disableKeyEvents();
        checkScore();
    }

    // change a player's name
    if (e.target.className.split(' ').includes('playerName')) {
        changePlayerName(e.target);
    }

    // toggle win by 2
    if (e.target.id === 'winBy2') {
        setWinBy2();
    }

    // reset the scoreboard
    if (e.target.id === 'resetScore') {
        resetScoreboard();
        e.target.blur();
    }
});
