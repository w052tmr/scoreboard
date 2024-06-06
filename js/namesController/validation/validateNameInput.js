import { validate } from './validate';

// validates keyboard input as the player types
export const validateNameInput = (nameInput, playerNameEl, currentPlayers) => {
    validate(nameInput, 'input', playerNameEl, currentPlayers);
};
