// -1 point to player score
export const removePoint = (playerNode) => {
    const playerScore = playerNode.children[0].children[0].children[1];
    playerScore.innerText = parseInt(playerScore.innerText) - 1;
};
