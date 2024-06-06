// check if we will need to create or remove a flex container that nests player nodes within it
export const modifyRowCount = (players, operation) => {
    if (operation === 'add') {
        return players[players.length - 1].parentNode.childElementCount > 1
            ? true
            : false;
    }

    return players[players.length - 1].parentNode.childElementCount === 1
        ? true
        : false;
};

// return the last flex container row on the document
const getLastRow = () => {
    const flexContainers = document.querySelectorAll('.flex');

    return flexContainers[flexContainers.length - 1];
};

// if a row is filled, create a new flex container containing the new player node on a new row
export const createNewRow = (playerNode) => {
    const lastRow = getLastRow();

    lastRow.insertAdjacentHTML(
        'afterend',
        `<div class='flex'>${playerNode.outerHTML}</div>`
    );
};

// if a row would be empty after deleting the player node, just delete the entire row instead (including the player node)
export const removeCurrentRow = () => {
    const currentRow = getLastRow();
    currentRow.remove();
};
