const { defaultGameOptions } = require('./vars');
const { checkUserSequence } = require('./gameLogic');

// onChange for power on/off
export const handlePower = ({ e, setGameOptions }) => {
    if (e.target.checked === false) {
        defaultGameOptions.sequence = [];
        defaultGameOptions.userSequence = [];
        setGameOptions(defaultGameOptions);
    } else setGameOptions(prev => ({ ...prev, power: true }));
};

// onClick for activating strict mode
export const handleStrictMode = ({ gameOptions, setGameOptions }) => {
    if (!gameOptions.power) return;
    if (!gameOptions.strictMode) setGameOptions(prev => ({ ...prev, strictMode: true }));
    else setGameOptions(prev => ({ ...prev, strictMode: false }));
};

// onClick for when user presses game buttons
export const gameBtnClick = (gameOptions, setGameOptions, setActive, index, sound, showing, setShowing, setTimerState, noMove, setNoMove) => {
    if (!gameOptions.power || gameOptions.computerTurn || showing) return;
    // allow user to press buttons and see them light up and play sound but if game is not active do not push values to userSequence
    if (gameOptions.state) {
        clearTimeout(noMove);
        let arr = gameOptions.userSequence;
        arr.push(index);
        setGameOptions(prev => ({ ...prev, userSequence: arr }));
        checkUserSequence({ gameOptions, setGameOptions, setActive, setShowing, setTimerState, noMove, setNoMove });
    }
    new Audio(sound).play();
    setActive(index);
};

// onClick for game start
export const startGame = ({ gameOptions, setGameOptions, noMove }) => {
    if (!gameOptions.power) return;
    if (!gameOptions.state) setGameOptions(prev => ({ ...prev, state: true, computerTurn: true }));
    else if (gameOptions.state) {
        setGameOptions(prev => ({ ...prev, sequence: [], userSequence: [], computerTurn: true }));
        clearTimeout(noMove);
    }
};