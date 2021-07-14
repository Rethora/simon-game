const { sounds } = require('./vars');

// computer turn
export const computerSequence = ({ gameOptions, setGameOptions, setActive, setShowing, setTimerState, noMove, setNoMove }) => {
    // sets sequence to previous with +1 random value at the end
    addValueToSequence({ gameOptions, setGameOptions });
    // shows the sequence on the front end
    showSequence({ gameOptions, setGameOptions, setActive, setShowing, setTimerState, noMove, setNoMove });
    // sets to user's turn
    setGameOptions(prev => ({ ...prev, computerTurn: false }));
};



// user turn
export const checkUserSequence = ({ gameOptions, setGameOptions, setActive, setShowing, setTimerState, setNoMove }) => {
    // loop over user's array of button presses
    gameOptions.userSequence.forEach((itm, idx) => {
        // if wrong move and not strict mode
        if (itm !== gameOptions.sequence[idx] && !gameOptions.strictMode) {
            setGameOptions(prev => ({ ...prev, wrongMove: true }));
            showSequence({ gameOptions, setGameOptions, setActive, setShowing, setTimerState, setNoMove });
        }
        // if wrong move and strict mode
        else if (itm !== gameOptions.sequence[idx] && gameOptions.strictMode) {
            setGameOptions(prev => ({ ...prev, sequence: [], userSequence: [], computerTurn: true, wrongMove: true }));
        }
        // if correct move
        else if (itm === gameOptions.sequence[idx]) {
            if (arrayEquals(gameOptions.sequence, gameOptions.userSequence)) {
                // if user gets 20 in a row user wins
                if (gameOptions.sequence.length < 20) setGameOptions(prev => ({ ...prev, computerTurn: true }));
                // if not 20 in a row but sequence is correct computer adds one to sequence
                else setGameOptions(prev => ({ ...prev, winner: true }));
            };
        };
    });
};

// return value between 0-3
const getNewSequenceValue = () => {
    return Math.floor(Math.random() * 4);
};

// return previous sequence with new value at the end
const addValueToSequence = ({ gameOptions, setGameOptions }) => {
    let arr = gameOptions.sequence;
    arr.push(getNewSequenceValue());
    setGameOptions(prev => ({ ...prev, sequence: arr }));
};

// shows sequence and plays audio
const showSequence = ({ gameOptions, setGameOptions, setActive, setShowing, setTimerState, setNoMove }) => {
    // loop over sequence array
    gameOptions.sequence.forEach((val, idx) => {
        let timer;
        // set showing state to true so user cannot make moves
        setShowing(true);
        // set timeout for events to fire every 1.5 seconds
        timer = setTimeout(() => {
            // plays sound and lights up button
            new Audio(sounds[val]).play();
            setActive(val);
            // if last iteration in sequence array
            if (idx === gameOptions.sequence.length - 1) {
                setShowing(false);
                setGameOptions(prev => ({ ...prev, userSequence: [] }));
                setTimerState([]);
                setNoMove(noUserMove({ gameOptions, setGameOptions, setActive, setShowing, setTimerState, setNoMove }));
            };
        }, 1500 * (idx + 2));
        // store timer to cleartimeout if game is restarted or power is turned off
        setTimerState(prev => {
            let arr = [...prev];
            arr.push(timer);
            return arr;
        });
    });
};

// stops audio and showing sequence
export const stopShowing = ({ timerState, setTimerState, setShowing, noMove }) => {
    // clears timeouts on all timerState elements and resets it to empty and showing state to false
    timerState.forEach(timer => {
        clearTimeout(timer);
    });
    setTimerState([]);
    setShowing(false);
    clearTimeout(noMove);
};

// timer for if user does not make move within 5 seconds of sequence or button press
export const noUserMove = ({ gameOptions, setGameOptions, setActive, setShowing, setTimerState, setNoMove }) => {
    return setTimeout(() => {
        setGameOptions(prev => ({ ...prev, wrongMove: true }));
        if (gameOptions.strictMode) setGameOptions(prev => ({ ...prev, sequence: [], userSequence: [], computerTurn: true }));
        else if (!gameOptions.strictMode) showSequence({ gameOptions, setGameOptions, setActive, setShowing, setTimerState, setNoMove });
    }, 5000);
};

// check if 2 arrays strictly equal each other
const arrayEquals = (a, b) => {
    return Array.isArray(a) && Array.isArray(b) && a.length === b.length && a.every((val, idx) => val === b[idx]);
};