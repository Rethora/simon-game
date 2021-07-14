const { PowerDisplay } = require('./PowerDisplay');

const { handlePower, handleStrictMode, gameBtnClick, startGame } = require('../controllers/functions');

const { buttonData } = require('../controllers/vars');

export const Game = ({
    gameOptions,
    setGameOptions,
    active,
    setActive,
    showing,
    setShowing,
    setTimerState,
    noMove,
    setNoMove
}) => (
    <div className='game-pad center'>
        <div className='game-btns' id='top'>
            {
                buttonData[0].map((itm, idx) => (
                    <button
                        className={gameOptions.power && active === itm.index ? itm.classes + ' active' : itm.classes}
                        key={idx}
                        onClick={
                            () => gameBtnClick(
                                gameOptions,
                                setGameOptions,
                                setActive,
                                itm.index,
                                itm.sound,
                                showing,
                                setShowing,
                                setTimerState,
                                noMove,
                                setNoMove
                            )
                        }
                    />
                ))
            }
        </div>
        <div className='game-btns' id='bottom'>
            {
                buttonData[1].map((itm, idx) => (
                    <button
                        className={gameOptions.power && active === itm.index ? itm.classes + ' active' : itm.classes}
                        key={idx}
                        onClick={
                            () => gameBtnClick(
                                gameOptions,
                                setGameOptions,
                                setActive,
                                itm.index,
                                itm.sound,
                                showing,
                                setShowing,
                                setTimerState,
                                noMove,
                                setNoMove
                            )
                        }
                    />
                ))
            }
        </div>

        <div id='simon-center'>
            <h1 className='simon-brand'>SIMON<span className='brand-span'>&trade;</span></h1>
            <div className="options-container">
                <div className="count-display">
                    <h3 className='count center'>
                        <PowerDisplay gameOptions={gameOptions} />
                    </h3>
                </div>
                <div className='btn-div'>
                    <button
                        className="start btn-group"
                        onClick={() => startGame({ gameOptions, setGameOptions, noMove })}
                    />
                    <br />
                    <span className='span-text'>START</span>
                </div>
                <div className='btn-div'>
                    <button
                        className='strict btn-group'
                        onClick={() => handleStrictMode({ gameOptions, setGameOptions })}
                    />
                    <br />
                    <span className='span-text'>STRICT</span>
                </div>
                <div
                    className={
                        gameOptions.power && gameOptions.strictMode
                            ? 'strict-indicator active' : 'strict-indicator'
                    }
                />
            </div>
            <br />
            <div className='power-container'>
                <span className='power-label span-text'>OFF</span>
                <label className='switch'>
                    <input
                        type='checkbox'
                        checked={gameOptions.power}
                        onChange={(e) => handlePower({ e, setGameOptions })}
                    />
                    <span className='slider' />
                </label>
                <span className='power-label span-text'>ON</span>
            </div>
        </div>
    </div>
);