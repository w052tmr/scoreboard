// +1 point to player score
export const addPoint = (playerNode) => {
    const playerScore = playerNode.children[0].children[0].children[1];
    playerScore.innerText = parseInt(playerScore.innerText) + 1;
};
