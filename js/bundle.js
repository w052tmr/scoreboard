(() => {
  // js/playerController/utility/modifyRowCount.js
  var modifyRowCount = (players, operation) => {
    if (operation === "add") {
      return players[players.length - 1].parentNode.childElementCount > 1 ? true : false;
    }
    return players[players.length - 1].parentNode.childElementCount === 1 ? true : false;
  };
  var getLastRow = () => {
    const flexContainers = document.querySelectorAll(".flex");
    return flexContainers[flexContainers.length - 1];
  };
  var createNewRow = (playerNode) => {
    const lastRow = getLastRow();
    lastRow.insertAdjacentHTML(
      "afterend",
      `<div class='flex'>${playerNode.outerHTML}</div>`
    );
  };
  var removeCurrentRow = () => {
    const currentRow = getLastRow();
    currentRow.remove();
  };

  // js/playerController/utility/updatePlayerCountDisp.js
  var playerCountDisp = document.querySelector(".num-players__number");
  var updatePlayerCountDisp = (operation) => {
    if (operation === "add")
      return playerCountDisp.textContent = `${parseInt(playerCountDisp.textContent) + 1}`;
    return playerCountDisp.textContent = `${parseInt(playerCountDisp.textContent) - 1}`;
  };

  // js/playerController/addNewPlayer/addNewPlayer.js
  var addNewPlayer = (currentPlayers) => {
    const addNewRow = modifyRowCount(currentPlayers, "add");
    const newPlayer = currentPlayers[currentPlayers.length - 1].cloneNode(true);
    newPlayer.querySelector(".player-head__label").innerText = `Player ${currentPlayers.length + 1}`;
    newPlayer.querySelector(".player-head__score").innerText = "0";
    if (addNewRow) {
      createNewRow(newPlayer);
    } else {
      currentPlayers[currentPlayers.length - 1].insertAdjacentElement(
        "afterend",
        newPlayer
      );
    }
    updatePlayerCountDisp("add");
  };

  // js/playerController/removeCurrentPlayer/removeCurrentPlayer.js
  var removeCurrentPlayer = (currentPlayers) => {
    const removeRow = modifyRowCount(currentPlayers, "remove");
    if (removeRow) {
      removeCurrentRow();
    } else {
      currentPlayers[currentPlayers.length - 1].remove();
    }
    updatePlayerCountDisp("remove");
  };

  // js/playerController/getAllPlayers.js
  var getAllPlayers = () => {
    return document.querySelectorAll(".player");
  };

  // js/playerController/modifyPlayerCount.js
  var modifyPlayerCount = (operation) => {
    const currentPlayers = getAllPlayers();
    if (operation === "add" && currentPlayers.length < 12) {
      addNewPlayer(currentPlayers);
    } else if (operation === "remove" && currentPlayers.length > 1) {
      removeCurrentPlayer(currentPlayers);
    }
  };

  // js/scoreController/playTo.js
  var playTo = document.getElementById("playTo");
  var listenForPlayTo = () => {
    playTo.addEventListener("input", () => {
      if (playTo.value < 1) playTo.value = 1;
    });
  };
  var getPlayTo = () => {
    return playTo;
  };

  // js/scoreController/addPoint.js
  var addPoint = (playerNode) => {
    const playerScore = playerNode.children[0].children[0].children[1];
    playerScore.innerText = parseInt(playerScore.innerText) + 1;
  };

  // js/scoreController/removePoint.js
  var removePoint = (playerNode) => {
    const playerScore = playerNode.children[0].children[0].children[1];
    playerScore.innerText = parseInt(playerScore.innerText) - 1;
  };

  // js/scoreController/winBy2.js
  var winBy2 = false;
  var setWinBy2 = () => {
    if (winBy2 === false) winBy2 = true;
    else if (winBy2 === true) winBy2 = false;
  };
  var getWinBy2 = () => {
    return winBy2;
  };
  var getWinBy2Element = () => {
    return document.getElementById("winBy2");
  };

  // js/scoreController/scoreboardSettings/playerStyles/setWinner.js
  var setWinnerStyles = (winner, currentPlayers) => {
    currentPlayers.forEach((player) => {
      player.style.backgroundColor = "#f2c4c4";
      player.children[0].children[0].style.color = "#f2c4c4";
    });
    winner.style.backgroundColor = "#c3f2da";
    winner.children[0].children[0].style.color = "#c3f2da";
  };

  // js/scoreController/scoreboardSettings/keyEvents/keyEvents.js
  var keysEnabled = true;
  var keyEventsEnabled = () => {
    return keysEnabled;
  };
  var disableKeyEvents = () => {
    keysEnabled = false;
  };
  var enableKeyEvents = () => {
    keysEnabled = true;
  };

  // js/scoreController/scoreboardSettings/btnSettings/getBtns.js
  var getBtns = () => {
    let btns = [getPlayTo(), getWinBy2Element()];
    document.querySelectorAll(".btn").forEach((btn) => {
      if (btn.id !== "resetScore") btns.push(btn);
    });
    return btns;
  };

  // js/scoreController/scoreboardSettings/btnSettings/disableBtns.js
  var disableBtns = (whitelist) => {
    getBtns().forEach((btn) => {
      btn.disabled = true;
      if (whitelist) {
        btn.className.split(" ").forEach((className) => {
          if (whitelist.includes(className)) btn.disabled = false;
        });
      }
    });
  };

  // js/popup/popup.js
  var popup = document.querySelector(".pop-up");
  var getPopUp = (text, winner = false) => {
    if (winner) {
      popup.children[0].children[1].innerText = "Congratulations";
      popup.children[0].children[1].style.color = "#c3f2da";
      popup.children[0].style.borderColor = "#54d994";
      popup.children[0].children[0].style.color = "#c3f2da";
    } else {
      popup.children[0].children[1].innerText = "Sorry";
      popup.children[0].children[1].style.color = "#f2c4c4";
      popup.children[0].style.borderColor = "#d33939";
      popup.children[0].children[0].style.color = "#f2c4c4";
    }
    popup.className = "pop-up pop-up--active";
    popup.style.zIndex = "1";
    popup.style.opacity = 1;
    const message = popup.children[0].children[2];
    message.innerText = text;
    const exit = popup.children[0].children[0];
    exit.addEventListener("click", () => {
      popup.className = "pop-up pop-up--inactive";
      popup.style.opacity = 0;
      popup.style.zIndex = "-1";
    });
  };

  // js/scoreController/scoreboardSettings/getWinner.js
  var getWinner = (winningPlayer, currentPlayers) => {
    setWinnerStyles(winningPlayer, currentPlayers);
    getPopUp(
      `${winningPlayer.children[0].children[0].children[0].innerText} is the winner!`,
      true
    );
    disableKeyEvents();
    disableBtns();
  };

  // js/scoreController/checkScore.js
  var checkScore = () => {
    const playTo2 = getPlayTo();
    const winBy22 = getWinBy2();
    const currentPlayers = getAllPlayers();
    let scores = [];
    currentPlayers.forEach((player) => {
      scores.push(
        parseInt(player.children[0].children[0].children[1].innerText)
      );
    });
    const winningScores = scores.filter((score) => score >= playTo2.value);
    let winner = true;
    if (winningScores.length === 1 && !winBy22) {
      const indx = scores.indexOf(winningScores[0]);
      getWinner(currentPlayers[indx], currentPlayers);
    } else if (winningScores.length === 1 && winBy22) {
      const indx = scores.indexOf(winningScores[0]);
      scores.forEach((score, i) => {
        if (i !== indx && winningScores[0] - score < 2) {
          winner = false;
        }
      });
      if (winner) getWinner(currentPlayers[indx], currentPlayers);
    } else if (winningScores.length > 1 && winBy22) {
      for (let i = 0; i < winningScores.length; i++) {
        winner = true;
        for (let j = 0; j < winningScores.length; j++) {
          if (i !== j && winningScores[i] - winningScores[j] < 2) {
            winner = false;
          }
        }
        if (winner) {
          const indx = scores.indexOf(winningScores[i]);
          return getWinner(currentPlayers[indx], currentPlayers);
        }
      }
    }
  };

  // js/namesController/validation/validate.js
  var validate = (nameInput, eventType, playerNameEl, currentPlayers) => {
    nameInput.addEventListener(eventType, () => {
      const input = nameInput.value.trim().toUpperCase();
      if (input.length < 1 && eventType === "input") {
        nameInput.className = "name";
      } else if (input.length < 2 && input.length > 0) {
        eventType === "input" ? nameInput.className = "name invalid" : getPopUp(
          "A player name may not be fewer than 2 characters in length."
        );
      } else if (input.length > 20) {
        eventType === "input" ? nameInput.className = "name invalid" : getPopUp(
          "A player name may not exceed 20 characters in length."
        );
      } else if (input.length >= 2 && input.length <= 20) {
        let duplicateName = false;
        if (playerNameEl.innerText.toUpperCase() !== input) {
          currentPlayers.forEach((player) => {
            const playerName = player.children[0].children[0].children[0].innerText.toUpperCase();
            if (playerName === input) {
              duplicateName = true;
              return;
            }
          });
        }
        if (duplicateName && eventType === "input") {
          nameInput.className = "name invalid";
        } else if (duplicateName && eventType === "focusout") {
          getPopUp(
            "This name is already being used by another player. Please enter a different one."
          );
        } else {
          eventType === "input" ? nameInput.className = "name valid" : playerNameEl.innerText = input.trim();
        }
      }
      if (eventType === "focusout") {
        nameInput.remove();
      }
    });
    if (eventType === "focusout") {
      nameInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          nameInput.blur();
        }
      });
    }
  };

  // js/namesController/validation/validateNameChange.js
  var validateNameChange = (nameInput, playerNameEl, currentPlayers) => {
    validate(nameInput, "focusout", playerNameEl, currentPlayers);
  };

  // js/namesController/validation/validateNameInput.js
  var validateNameInput = (nameInput, playerNameEl, currentPlayers) => {
    validate(nameInput, "input", playerNameEl, currentPlayers);
  };

  // js/namesController/changePlayerName.js
  var changePlayerName = (playerNameEl) => {
    playerNameEl.insertAdjacentHTML(
      "afterend",
      `<input class='name' placeholder='Player Name'>`
    );
    const currentPlayers = getAllPlayers();
    const nameInput = playerNameEl.nextElementSibling;
    nameInput.focus();
    validateNameInput(nameInput, playerNameEl, currentPlayers);
    validateNameChange(nameInput, playerNameEl, currentPlayers);
  };

  // js/scoreController/scoreboardSettings/playerStyles/reset.js
  var resetPlayerStyles = (currentPlayers) => {
    currentPlayers.forEach((player) => {
      player.style.backgroundColor = "#fefeff";
      player.children[0].children[0].style.color = "#fefeff";
    });
  };

  // js/scoreController/scoreboardSettings/btnSettings/enableBtns.js
  var enableBtns = () => {
    getBtns().forEach((btn) => btn.disabled = false);
  };

  // js/scoreController/resetScoreboard.js
  var resetScoreboard = () => {
    const currentPlayers = getAllPlayers();
    currentPlayers.forEach((player) => {
      player.children[0].children[0].children[1].innerText = "0";
    });
    resetPlayerStyles(currentPlayers);
    enableBtns();
    enableKeyEvents();
  };

  // js/index.js
  window.addEventListener("keypress", (e) => {
    if (keyEventsEnabled()) {
      if (e.key === "+") {
        modifyPlayerCount("add");
      } else if (e.key === "_") {
        modifyPlayerCount("remove");
      }
    }
  });
  document.body.addEventListener("click", (e) => {
    if (e.target.id === "addPlayerBtn" || e.target.id === "addPlayerSymbol") {
      modifyPlayerCount("add");
    }
    if (e.target.id === "removePlayerBtn" || e.target.id === "removePlayerSymbol") {
      modifyPlayerCount("remove");
    }
    if (e.target.id === "playTo") {
      listenForPlayTo();
    }
    if (e.target.className.split(" ").includes("addPoint")) {
      const player = e.target.parentNode.parentNode;
      addPoint(player);
      disableBtns(["addPoint", "removePoint"]);
      disableKeyEvents();
      checkScore();
    }
    if (e.target.className.split(" ").includes("removePoint")) {
      const player = e.target.parentNode.parentNode;
      removePoint(player);
      disableBtns(["addPoint", "removePoint"]);
      disableKeyEvents();
      checkScore();
    }
    if (e.target.className.split(" ").includes("playerName")) {
      changePlayerName(e.target);
    }
    if (e.target.id === "winBy2") {
      setWinBy2();
    }
    if (e.target.id === "resetScore") {
      resetScoreboard();
      e.target.blur();
    }
  });
})();
