import { validate } from './validate';

// validates a name change
export const validateNameChange = (nameInput, playerNameEl, currentPlayers) => {
    validate(nameInput, 'focusout', playerNameEl, currentPlayers);
};
