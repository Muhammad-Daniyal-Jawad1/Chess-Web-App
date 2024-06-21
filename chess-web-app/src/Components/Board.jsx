
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Chessboard from 'chessboardjsx';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

const socket = io('http://localhost:4000');

function Board() {
    const [timeFormat, setTimeFormat] = useState('');
    const [playersReady, setPlayersReady] = useState(false);
    const [fen, setFen] = useState('');
    const [gameOver, setGameOver] = useState(false);
    const [playerColor, setPlayerColor] = useState('');
    const [myTurn, setMyTurn] = useState(false);

    useEffect(() => {
        socket.on('playersReady', ({ playerColors, initialFEN }) => {
            setPlayersReady(false);
            setPlayerColor(playerColors[socket.id]);
            setMyTurn(playerColors[socket.id] === 'white');
            setFen(initialFEN); // Set initial FEN position
        });

        socket.on('startGame', ({ timeFormat, playerColors }) => {
            setTimeFormat(timeFormat);
            setPlayersReady(false);
            setPlayerColor(playerColors[socket.id]);
            setMyTurn(playerColors[socket.id] === 'white');
        });

        socket.on('move', (move) => {
            setFen(move.fen);
            setMyTurn(true);
        });

        socket.on('gameOver', () => {
            setGameOver(true);
        });

        return () => {
            socket.off('playersReady');
            socket.off('startGame');
            socket.off('move');
            socket.off('gameOver');
        };
    }, []);

    const handleTimeFormatSelection = (format) => {
        setTimeFormat(format);
        socket.emit('timeFormatSelected', format);
    };

    const handleMove = (move) => {
        if (myTurn && !gameOver) {
            socket.emit('move', move);
            setMyTurn(false);
        }
    };

    const renderTimer = ({ remainingTime }) => {
        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;

        return (
            <div className="timer">
                <div className="text">{`${minutes}:${seconds}`}</div>
            </div>
        );
    };

    return (
        <div className="app">
            {playersReady ? (
                <div>
                    <h1>Time Format Selection</h1>
                    <button onClick={() => handleTimeFormatSelection('standard')}>
                        Standard
                    </button>
                    <button onClick={() => handleTimeFormatSelection('blitz')}>Blitz</button>
                    <button onClick={() => handleTimeFormatSelection('bullet')}>Bullet</button>
                </div>
            ) : (
                <>
                    {timeFormat && (
                        <>
                            <h2>Time Format: {timeFormat}</h2>
                            <div className="board-container">
                                <Chessboard
                                    position={fen}
                                    onDrop={(move) => handleMove(move)}
                                    orientation={playerColor}
                                />
                            </div>
                            <div className="timer-container">
                                <CountdownCircleTimer
                                    isPlaying
                                    duration={timeFormat === 'standard' ? 300 : 60}
                                    colors={[['#004777', 0.33], ['#F7B801', 0.33], ['#A30000']]}
                                    onComplete={() => {
                                        if (!gameOver) {
                                            setGameOver(true);
                                            socket.emit('gameOver');
                                        }
                                        return [false, 0];
                                    }}
                                >
                                    {renderTimer}
                                </CountdownCircleTimer>
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    );
}

export default Board;