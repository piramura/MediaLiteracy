// ========================
// モールス信号のアニメーション
// ========================

const DELAY_RATIO = 0.5; // 0.5倍に詰める

function setMorseEndPosition(value) {
  document.documentElement.style.setProperty('--morse-end-position', value);
}

/*
moresStr = モールス文字列
モールス文字列が右から左へ流れる
 */
function animateMorseFlow(morseStr) {
  const flow = document.getElementById('morseFlow');
  flow.innerHTML = '';
  let baseDelay = 0;
  const dot = SPEED;

  const flowWidth = flow.offsetWidth; // flow領域のpx幅
  const endMargin = 8000;
  const totalDistance = flowWidth + endMargin;

    const flowSpeed = 125 / speedRatio; // モールスのスピード
    const animationDurationSec = totalDistance / flowSpeed;

    setMorseEndPosition(`${-totalDistance}px`);

    let delayRatio = DELAY_RATIO * speedRatio;

    for (let i = 0; i < morseStr.length; i++) {
        const ch = morseStr[i];
        if (!'・－／ '.includes(ch)) continue;

        const span = document.createElement('span');
        span.className = 'morse-flow-char';
        span.textContent = ch;

        span.style.animationDelay = `${baseDelay * delayRatio}s`;
        span.style.animationDuration = `${animationDurationSec}s`;

        flow.appendChild(span);

        if (ch === "・"){baseDelay += dot + dot;}
        else if (ch === "－" || ch === "-"){baseDelay += dot*2 + dot;}
        else if (ch === "／"){baseDelay += dot * 2;}
        else if (ch === " "){baseDelay += dot * 6;}
    }

}


/*
text = 表示文字列, iscorrect = 1(正解)/ 0(不正解), invalidChars = 未定義文字列群
モールス入力の結果を表示する
 */
function showFloatingResult(text, isCorrect = false,invalidChars = []){
    const resultDiv = document.getElementById("morseResult");
    const correctDiv = document.getElementById("correctMessage");
    const lang = getCurrentLanguage();

    // 文字列が空の場合入力を促すアラート
    if (!text || text.trim() === "") {
        showAlert('emptyMorse');
        return;
    }

     // 未定義文字があればアラート + 関数を抜ける
    if (text.includes("？")){
        const unique = [...new Set(invalidChars)].join("\n");
        showAlert('invalidMorse', `${unique}\n`);
        return;
    }

    // 変換文字表示
    resultDiv.textContent = text;
    resultDiv.classList.remove("morse-float");
    void resultDiv.offsetWidth;
    resultDiv.classList.add("morse-float");

    // 正解・不正解表示
    correctDiv.classList.remove("correct-float", "incorrect-float");
    void correctDiv.offsetWidth;
    if (isCorrect) {
        if(lang === '日本語' || lang === 'ローマ字'){
            correctDiv.textContent = "おめでとう🎉";
        }else{
            correctDiv.textContent = "Congraturation! 🎉";
        }
        correctDiv.classList.add("correct-float");
        // おめでとうメッセージが表示されたら次へボタンを表示
        const next3Btn = document.getElementById('next3');
        if (next3Btn) next3Btn.style.display = 'inline-block';
    } else {
        correctDiv.textContent = ""
    }
}


/*
iscorrect = 1(正解)/ 0(不正解)
クイズなどで〇×の表示 
*/
function showJudgeMark(isCorrect) {
    const judgeMark = document.getElementById("judgeMark");
    judgeMark.classList.remove("judge-correct", "judge-incorrect");
    void judgeMark.offsetWidth;

    // 判定マークの内容とスタイル設定
    judgeMark.textContent ="";
    if (isCorrect === 1) {
        judgeMark.textContent = "〇";
        judgeMark.className = "judge-mark judge-correct";
    } else if(isCorrect === 0) {
        judgeMark.textContent = "×";
        judgeMark.className = "judge-mark judge-incorrect";
    }

}
