import { getPopUp } from '../../popup/popup';

/* 'eventType' determines the type of validation we are checking for

if eventType = 'input', the validation is for checking the input element that the user is currently typing their new player name into. This type of validation simply adds the appropriate border color to the input element as the user types their input (valid = green border, invalid = red border).

if eventType = 'focusout', the validation is for responding appropriately when the user tries entering their new player name. If the name input is invalid, a popup is displayed with the proper error message and the name input element is removed. Otherwise, if the name input is valid, the player's current name is overrided with the input they just entered and the name input element is removed.  
*/

export const validate = (
    nameInput,
    eventType,
    playerNameEl,
    currentPlayers
) => {
    nameInput.addEventListener(eventType, () => {
        const input = nameInput.value.trim().toUpperCase();

        if (input.length < 1 && eventType === 'input') {
            // if the user has not typed anything, do not do any validation
            nameInput.className = 'name';
        } else if (input.length < 2 && input.length > 0) {
            // if user types/enters only 1 character, this is not a valid input
            eventType === 'input'
                ? (nameInput.className = 'name invalid')
                : getPopUp(
                      'A player name may not be fewer than 2 characters in length.'
                  );
        } else if (input.length > 20) {
            // if user types/enters more than 20 characters, this is not a valid input
            eventType === 'input'
                ? (nameInput.className = 'name invalid')
                : getPopUp(
                      'A player name may not exceed 20 characters in length.'
                  );
        } else if (input.length >= 2 && input.length <= 20) {
            // if user types/enters between 2 to 20 characters, this may be valid input, but further validation is needed

            //var for checking duplicate names
            let duplicateName = false;

            // loop through all the current players looking for duplicate names
            if (playerNameEl.innerText.toUpperCase() !== input) {
                currentPlayers.forEach((player) => {
                    const playerName =
                        player.children[0].children[0].children[0].innerText.toUpperCase();

                    // if one of the players has a name that matches the current input, this is a duplicate name
                    if (playerName === input) {
                        duplicateName = true;
                        return;
                    }
                });
            }

            if (duplicateName && eventType === 'input') {
                // if there is a duplicate name, add a red border under the input element

                nameInput.className = 'name invalid';
            } else if (duplicateName && eventType === 'focusout') {
                // if user tries entering a duplicate name, get a popup and display the proper message

                getPopUp(
                    'This name is already being used by another player. Please enter a different one.'
                );
            } else {
                // otherwise the input is valid. If eventType = 'input', add a green border under the input element. If eventType = 'focusout', override the the current player name with the input
                eventType === 'input'
                    ? (nameInput.className = 'name valid')
                    : (playerNameEl.innerText = input.trim());
            }
        }

        // remove the input element when the user enters their new name, regardless of whether the new name is valid or not
        if (eventType === 'focusout') {
            nameInput.remove();
        }
    });

    // interpret an 'Enter' keypress and a focusout event as the same thing
    if (eventType === 'focusout') {
        nameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                nameInput.blur();
            }
        });
    }
};
