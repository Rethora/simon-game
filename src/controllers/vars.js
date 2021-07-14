export const defaultGameOptions = {
    power: false,
    state: false,
    strictMode: false,
    sequence: [],
    userSequence: [],
    computerTurn: false,
    wrongMove: false,
    winner: false
};

export const sounds = [
    'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3',
    'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3',
    'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3',
    'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'
]

export const buttonData = [
    [
        {
            classes: 'game-btn game-btn-left btn-green',
            sound: sounds[0],
            index: 0
        },
        {
            classes: 'game-btn game-btn-right btn-red',
            sound: sounds[1],
            index: 1
        }
    ],
    // indices of these have to be flipped because div is rotated 180deg
    [
        {
            classes: 'game-btn game-btn-left btn-blue',
            sound: sounds[3],
            index: 3
        },
        {
            classes: 'game-btn game-btn-right btn-yellow',
            sound: sounds[2],
            index: 2
        }
    ]
];