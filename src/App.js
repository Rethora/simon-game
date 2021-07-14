import { useEffect, useState } from 'react';

import './App.scss';

// components
const { Game } = require('./components/Game');
// variables
const { defaultGameOptions } = require('./controllers/vars');
// functions
const { computerSequence, stopShowing } = require('./controllers/gameLogic');

const App = () => {

  const [gameOptions, setGameOptions] = useState(defaultGameOptions);
  const [active, setActive] = useState(false);
  const [showing, setShowing] = useState(false);
  const [timerState, setTimerState] = useState([]);
  const [noMove, setNoMove] = useState(false);

  // clear timeout on power off and stops showing
  useEffect(() => {
    if (!gameOptions.power && timerState.length > 0)
      stopShowing({ timerState, setTimerState, setShowing, noMove });
    else if (gameOptions.power && timerState.length > 0 && gameOptions.computerTurn)
      stopShowing({ timerState, setTimerState, setShowing, noMove });
  }, [timerState, gameOptions.power, gameOptions.computerTurn, noMove]);

  // computer's turn
  useEffect(() => {
    if (gameOptions.power && gameOptions.computerTurn)
      computerSequence({
        gameOptions,
        setGameOptions,
        active,
        setActive,
        setShowing,
        setTimerState,
        noMove,
        setNoMove
      });
  }, [gameOptions, active, showing, noMove]);

  // light up button when active remove with timeout
  useEffect(() => {
    let timer;
    if (active !== false) {
      timer = setTimeout(() => {
        setActive(false);
      }, 500);
    };
    return () => clearTimeout(timer);
  }, [active]);

  // timeout wrong move indicator
  useEffect(() => {
    if (gameOptions.wrongMove) {
      setTimeout(() => {
        setGameOptions(prev => ({ ...prev, wrongMove: false }));
      }, 1500);
    };
  }, [gameOptions.wrongMove]);

  return (
    <Game
      gameOptions={gameOptions}
      setGameOptions={setGameOptions}
      active={active}
      setActive={setActive}
      showing={showing}
      setShowing={setShowing}
      setTimerState={setTimerState}
      noMove={noMove}
      setNoMove={setNoMove}
    />
  );
}

export default App;
