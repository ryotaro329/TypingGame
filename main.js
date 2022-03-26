let game =  {
    words: [
        'uma',
        'omaturi',
        'iruka',
        'ootoro',
        'iyasikei',
        'sutoraiku',
        'oosouji',
        'a-telisuto',
    ],
    //↓kana
    hurigana: [
        'ウマ',
        'お祭り',
        'イルカ',
        '大トロ',
        '癒し系',
        'ストライク',
        '大掃除',
        'アーティスト',
    ],

    currentWord: '',
    //↓currentWordのふりがなver
    currentHurigana: '',

    matchedIndex: 0,
    startTime: null,
    isPlaying: false,
    mainArea: document.getElementById('main'),
    resultArea: document.getElementById('result'),
    huriganaArea: document.getElementById('kana'),

    start: function(){
        game.isPlaying = true;
        game.startTime = Date.now();
        //
        game.setWord();
        //
        game.setHurigana();
    },

    setWord: function(){
        game.currentWord = game.words.shift() || '';
        game.matchedIndex = 0;
        game.displayWord();
    },

    displayWord: function(){
        game.mainArea.innerText = '_'.repeat(game.matchedIndex) + game.currentWord.substring(game.matchedIndex);
    },

    //↓setWordのふりがなver
    setHurigana: function(){
        game.currentHurigana = game.hurigana.shift() || '';
        game.displayHurigana();
    },
    
    displayHurigana: function(){
        game.huriganaArea.innerText = '_'.repeat(game.matchedIndex) + game.currentHurigana.substring(game.matchedIndex);
    },

    // 追加 ----------------------
    isFinished: function(){
        return game.words.length === 0;
    },

    displayResult: function(){
        const currentTime = Date.now();
        const elapsedTime = formattedSeconds(currentTime - game.startTime);
        game.resultArea.innerText = `${elapsedTime} 秒かかりました。\n もう一度プレイする場合にはブラウザをリロードしてください。`;
        game.isPlaying = false;
    },
    // ---------------------------
};

// 追加 --------------------------
document.onclick = () => {
    if (game.isPlaying === false){
        game.start();
    }
};
// -------------------------------

// 追加 ---------------------------
document.onkeydown = (event) => {
    if (event.key !== game.currentWord[game.matchedIndex]){
        return;
    }

    game.matchedIndex++;
    game.displayWord();

    if (game.matchedIndex === game.currentWord.length){
        if (game.isFinished()){
            game.displayResult();
        };
        game.setWord();
        game.setHurigana();
    }
};
// -------------------------------

// 追加 ---------------------------
//utils
function formattedSeconds(ms){
    return (ms / 1000).toFixed(2);
}
// --------------------------------