import { getPlayTo } from './playTo';
import { getWinBy2 } from './winBy2';
import { getAllPlayers } from '../playerController/getAllPlayers';
import { getWinner } from './scoreboardSettings/getWinner';

// determines if there is a winner
export const checkScore = () => {
    const playTo = getPlayTo();
    const winBy2 = getWinBy2();
    const currentPlayers = getAllPlayers();

    //get the current score of all current players
    let scores = [];
    currentPlayers.forEach((player) => {
        scores.push(
            parseInt(player.children[0].children[0].children[1].innerText)
        );
    });

    //filter out the players with scores below the playTo value
    const winningScores = scores.filter((score) => score >= playTo.value);

    // initialize var
    let winner = true;

    if (winningScores.length === 1 && !winBy2) {
        // when winBy2 is NOT checked, the first player to the playTo value is the winner

        const indx = scores.indexOf(winningScores[0]); // get the indx of the winning player from scores

        getWinner(currentPlayers[indx], currentPlayers);
    } else if (winningScores.length === 1 && winBy2) {
        // when winBy2 IS checked, there is extra logic required to determine a winner

        const indx = scores.indexOf(winningScores[0]);

        // if the currently winning player isn't beating ALL other players by AT LEAST 2 or more points, there is still NO WINNER
        scores.forEach((score, i) => {
            if (i !== indx && winningScores[0] - score < 2) {
                winner = false;
            }
        });

        // otherwise, the currently winning player IS the winner
        if (winner) getWinner(currentPlayers[indx], currentPlayers);
    } else if (winningScores.length > 1 && winBy2) {
        // when there are multiple players who have reached the playTo value, there is even more logic required

        // loop through all the winning scores
        for (let i = 0; i < winningScores.length; i++) {
            winner = true; // reinitialize after every iteration

            // loop through all winning scores again
            for (let j = 0; j < winningScores.length; j++) {
                // if the difference between the i score and any of the j scores is LESS THAN 2, then there is still NO WINNER
                if (i !== j && winningScores[i] - winningScores[j] < 2) {
                    winner = false;
                }
            }

            // otherwise, the player with the i score on this iteration is the winner
            if (winner) {
                const indx = scores.indexOf(winningScores[i]);

                return getWinner(currentPlayers[indx], currentPlayers);
            }
        }
    }
};
