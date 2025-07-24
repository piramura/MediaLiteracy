const quizData = [
  // ひらがな→モールス
  { question: "「あ」のモールス符号はどれ？", options: ["・－", "－・", "・・－"], answer: 0 },
  { question: "「い」のモールス符号はどれ？", options: ["・－", "・・", "－・－"], answer: 0 },
  { question: "「う」のモールス符号はどれ？", options: ["・・－", "・－－", "－－－"], answer: 0 },
  { question: "「え」のモールス符号はどれ？", options: ["－・－－－", "－－・－", "・－・・"], answer: 0 },
  { question: "「お」のモールス符号はどれ？", options: ["・－・・・", "－・－－", "・・－－"], answer: 0 },
  { question: "「か」のモールス符号はどれ？", options: ["・－・・", "－・", "－－・"], answer: 0 },
  { question: "「き」のモールス符号はどれ？", options: ["－・－・・", "・－・", "・・－・"], answer: 0 },
  { question: "「く」のモールス符号はどれ？", options: ["・・・－", "－－－", "－・・－"], answer: 0 },
  { question: "「け」のモールス符号はどれ？", options: ["－・－－", "・－－・", "－・－・"], answer: 0 },
  { question: "「こ」のモールス符号はどれ？", options: ["－－－－", "－－－・", "－－・－"], answer: 0 },
  { question: "「さ」のモールス符号はどれ？", options: ["－・－・－", "・－・－・", "・・－・"], answer: 0 },
  { question: "「し」のモールス符号はどれ？", options: ["－－・－・", "・－・", "－・－・－"], answer: 0 },
  { question: "「す」のモールス符号はどれ？", options: ["－－－・－", "－－－－", "－－・"], answer: 0 },
  { question: "「せ」のモールス符号はどれ？", options: ["・－－－・", "・－・－", "－・－－－"], answer: 0 },
  { question: "「そ」のモールス符号はどれ？", options: ["－－－・", "－・－", "－－－－"], answer: 0 },
  { question: "「た」のモールス符号はどれ？", options: ["－・", "・－・", "－・－"], answer: 0 },
  { question: "「ち」のモールス符号はどれ？", options: ["・・－・", "・・", "－・・"], answer: 0 },
  { question: "「つ」のモールス符号はどれ？", options: ["・－－・", "・－・－", "－－・－"], answer: 0 },
  { question: "「て」のモールス符号はどれ？", options: ["・－・－－", "－・－－", "・－－"], answer: 0 },
  { question: "「と」のモールス符号はどれ？", options: ["・・－・・", "・－－－・", "・・－－・"], answer: 0 },
  { question: "「な」のモールス符号はどれ？", options: ["・－・", "・－・・", "－－"], answer: 0 },
  { question: "「に」のモールス符号はどれ？", options: ["－・－・", "・・－・", "－－・－"], answer: 0 },
  { question: "「ぬ」のモールス符号はどれ？", options: ["・・・・", "－－・－－", "－－－－"], answer: 0 },
  { question: "「ね」のモールス符号はどれ？", options: ["－－・－", "・－・－", "・－－・"], answer: 0 },
  { question: "「の」のモールス符号はどれ？", options: ["・・－－", "－－・", "・－・－・"], answer: 0 },
  { question: "「は」のモールス符号はどれ？", options: ["－・・・", "・－・－・", "・・・・・"], answer: 0 },
  { question: "「ひ」のモールス符号はどれ？", options: ["－－・・－", "－－－・", "－・－－"], answer: 0 },
  { question: "「ふ」のモールス符号はどれ？", options: ["－－・・", "－－－", "－－・－"], answer: 0 },
  { question: "「へ」のモールス符号はどれ？", options: ["・", "・－", "－－・"], answer: 0 },
  { question: "「ほ」のモールス符号はどれ？", options: ["－・・", "・・－・", "－・・－"], answer: 0 },
  // モールス→ひらがな
  { question: "「・－」はどのひらがな？", options: ["い", "あ", "う"], answer: 0 },
  { question: "「－－・－」はどのひらがな？", options: ["ね", "り", "も"], answer: 0 },
  { question: "「・・－」はどのひらがな？", options: ["え", "う", "お"], answer: 1 },
  { question: "「－－」はどのひらがな？", options: ["く", "こ", "う"], answer: 1 },
  { question: "「・－・・」はどのひらがな？", options: ["か", "さ", "な"], answer: 0 },
  { question: "「・・－・」はどのひらがな？", options: ["ち", "し", "に"], answer: 0 },
  { question: "「・－－－」はどのひらがな？", options: ["て", "そ", "わ"], answer: 2 },
  { question: "「－・－・－」はどのひらがな？", options: ["さ", "き", "せ"], answer: 0 },
  { question: "「－－・－・」はどのひらがな？", options: ["し", "ち", "み"], answer: 0 },
  { question: "「・－－」はどのひらがな？", options: ["つ", "え", "ろ"], answer: 0 },
  { question: "「－・」はどのひらがな？", options: ["た", "ま", "よ"], answer: 0 },
  { question: "「－－－」はどのひらがな？", options: ["す", "そ", "く"], answer: 1 },
  { question: "「－・－・」はどのひらがな？", options: ["し", "す", "ふ"], answer: 0 },
  { question: "「－・－－」はどのひらがな？", options: ["け", "せ", "か"], answer: 0 },
  { question: "「－－－－」はどのひらがな？", options: ["こ", "く", "つ"], answer: 0 },
  { question: "「－・－・・」はどのひらがな？", options: ["き", "け", "り"], answer: 0 },
  { question: "「－－－・」はどのひらがな？", options: ["そ", "し", "ひ"], answer: 0 },
  { question: "「・－・・・」はどのひらがな？", options: ["お", "え", "あ"], answer: 0 },
  { question: "「－－」はどのひらがな？", options: ["こ", "く", "う"], answer: 0 },
  { question: "「・－－・」はどのひらがな？", options: ["つ", "ぬ", "ふ"], answer: 0 },
  { question: "「－－・」はどのひらがな？", options: ["ほ", "ま", "ゆ"], answer: 0 },
  { question: "「－・－－－」はどのひらがな？", options: ["ゑ", "を", "ん"], answer: 1 },
  { question: "「・－・－」はどのひらがな？", options: ["る", "れ", "ろ"], answer: 0 },
  { question: "「・－・－・」はどのひらがな？", options: ["れ", "る", "ら"], answer: 0 },
  { question: "「・－・－・－」はどのひらがな？", options: ["ら", "ろ", "り"], answer: 0 },
  { question: "「・・」はどのひらがな？", options: ["い", "う", "え"], answer: 0 },
  { question: "「－－・－－」はどのひらがな？", options: ["み", "ぬ", "め"], answer: 0 },
  { question: "「・－・・－」はどのひらがな？", options: ["が", "ぎ", "げ"], answer: 0 },
  { question: "「－・－」はどのひらがな？", options: ["し", "き", "ち"], answer: 1 },
  { question: "「－・－・－・」はどのひらがな？", options: ["ゆ", "や", "よ"], answer: 0 }
];
window.addEventListener('DOMContentLoaded', () => {
  showQuiz();
});
// quizDataからランダムに3問選ぶ
function pickRandomQuestions(data, num) {
  const arr = [...data];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, num);
}

// 最初に3問だけ選ぶ
const pickedQuiz = pickRandomQuestions(quizData, 3);
let current = 0;
let score = 0;
let userAnswers = []; // ユーザーの選択肢インデックスを記録

function showQuiz() {
  const q = pickedQuiz[current];
  document.getElementById('quiz-question').textContent = q.question;
  const btns = document.querySelectorAll('.option');
  btns.forEach((btn, i) => {
    btn.textContent = q.options[i];
    btn.disabled = false;
    btn.classList.remove('selected');
    btn.onclick = () => selectOption(i, btn);
  });
  document.getElementById('quiz-next-btn').disabled = true;
}

function selectOption(index, btn) {
  const btns = document.querySelectorAll('.option');
  // 選択状態だけ切り替え（disabledにしない）
  btns.forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  // 選択肢を記録
  userAnswers[current] = index;
  document.getElementById('quiz-next-btn').disabled = false;
}

function nextQuiz() {
  current++;
  if (current < pickedQuiz.length) {
    showQuiz();
  } else {
    showResult();
  }
}

function showResult() {
  // スコア計算
  score = 0;
  let resultRows = "";
  pickedQuiz.forEach((q, i) => {
    const isCorrect = userAnswers[i] === q.answer;
    if (isCorrect) score++;
    // SVGに変更
    const mark = isCorrect
      ? `<span class="mark mark-correct"></span>`
      : `<span class="mark mark-wrong"></span>`;
    const userText = typeof userAnswers[i] === "number" ? q.options[userAnswers[i]] : "未回答";
    resultRows += `
      <tr>
        <td>Q${i+1}</td>
        <td>${q.question}</td>
        <td>${userText}</td>
        <td>${q.options[q.answer]}</td>
        <td id="mark-${i}"></td>
      </tr>
    `;
  });

  let message = "";
  if (score === 3) message = "全問正解！すごい！";
  else if (score === 2) message = "あと少しで満点！";
  else message = "また挑戦してみてね！";

  // シェア用テキスト
  const shareText = encodeURIComponent(
    `モールス信号クイズに挑戦！${score}問正解でした！ #モールス信号クイズ`
  );
  const shareUrl = encodeURIComponent(location.href);
  // クイズ画面を非表示、リザルト画面を表示
  document.getElementById('quiz-screen').style.display = 'none';
  const resultDiv = document.getElementById('quiz-result');
  resultDiv.style.display = 'block';
  resultDiv.innerHTML = `
    <h2>クイズ結果</h2>
    <p>正解数：${score} / ${pickedQuiz.length}</p>
    <p>${message}</p>
    <table class="result-table" style="width:100%;margin:16px 0;text-align:center;">
      <thead>
        <tr>
          <th>問題</th>
          <th>内容</th>
          <th>あなたの答え</th>
          <th>正解</th>
          <th>結果</th>
        </tr>
      </thead>
      <tbody>
        ${resultRows}
      </tbody>
    </table>
    <div class="sns-share">
      <a class="sns-btn twitter" href="https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}" target="_blank" rel="noopener">Twitterでシェア</a>
      <a class="sns-btn line" href="https://social-plugins.line.me/lineit/share?url=${shareUrl}&text=${shareText}" target="_blank" rel="noopener">LINEでシェア</a>
    </div>
    <button class="main-button" onclick="location.reload()">もう一度挑戦</button>
    <button class="main-button" onclick="goToStep(4)">リザルトに戻る</button>
  `;
    // 時間差でマークを表示
    requestAnimationFrame(() => {
      pickedQuiz.forEach((q, i) => {
        setTimeout(() => {
          const cell = document.getElementById(`mark-${i}`);
          if (cell) {
            if (typeof userAnswers[i] === "number") {
              cell.innerHTML = userAnswers[i] === q.answer
                ? '<span class="mark" style="color:#4caf50;font-size:2em;">○</span>'
                : '<span class="mark" style="color:#f44336;font-size:2em;">×</span>';
            } else {
              cell.innerHTML = ""; // 未回答の場合は空
            }
          }
        }, 1000 * i);
      });
    });

}