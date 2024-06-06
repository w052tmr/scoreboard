import { getAllPlayers } from '../playerController/getAllPlayers';
import { validateNameChange } from './validation/validateNameChange';
import { validateNameInput } from './validation/validateNameInput';

export const changePlayerName = (playerNameEl) => {
    // create a new input element
    playerNameEl.insertAdjacentHTML(
        'afterend',
        `<input class='name' placeholder='Player Name'>`
    );

    // get all the current players for name validation
    const currentPlayers = getAllPlayers();

    // validate the name INPUT
    const nameInput = playerNameEl.nextElementSibling;
    nameInput.focus();
    validateNameInput(nameInput, playerNameEl, currentPlayers);

    // validate the name CHANGE
    validateNameChange(nameInput, playerNameEl, currentPlayers);
};
