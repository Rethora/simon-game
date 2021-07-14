export const PowerDisplay = ({ gameOptions }) => {
    if (!gameOptions.power) return null;
    else if (gameOptions.power && gameOptions.wrongMove) return 'NOPE!';
    else if (gameOptions.power && !gameOptions.winner) {
        if (gameOptions.sequence.length === 0) return '--';
        else return gameOptions.sequence.length;
    }
    else if (gameOptions.power && gameOptions.winner) return 'WIN!';
};