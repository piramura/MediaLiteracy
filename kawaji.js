const quizData = [
  {
    question: "モールス信号で「A」はどれ？",
    options: ["・－", "－・", "－－"],
    answer: 0
  },
  {
    question: "「SOS」をモールス信号で表すと？",
    options: ["・・・－－－・・・", "－－－・・・－－－", "・・・－・・・"],
    answer: 0
  },
  {
    question: "モールス信号で「E」は？",
    options: ["－", "・", "・・"],
    answer: 1
  }
];
window.addEventListener('DOMContentLoaded', () => {
  showQuiz();
});
let current = 0;
let score = 0;
let userAnswers = []; // ユーザーの選択肢インデックスを記録

function showQuiz() {
  const q = quizData[current];
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
  if (current < quizData.length) {
    showQuiz();
  } else {
    showResult();
  }
}

function showResult() {
  // スコア計算
  score = 0;
  let resultRows = "";
  quizData.forEach((q, i) => {
    const isCorrect = userAnswers[i] === q.answer;
    if (isCorrect) score++;
    const mark = isCorrect ? "◯" : "✕";
    const userText = typeof userAnswers[i] === "number" ? q.options[userAnswers[i]] : "未回答";
    resultRows += `
      <tr>
        <td>Q${i+1}</td>
        <td>${q.question}</td>
        <td>${userText}</td>
        <td>${q.options[q.answer]}</td>
        <td>${mark}</td>
      </tr>
    `;
  });

  let message = "";
  if (score === 3) message = "全問正解！すごい！";
  else if (score === 2) message = "あと少しで満点！";
  else message = "また挑戦してみてね！";

  document.getElementById('quiz-screen').innerHTML = `
    <h2>クイズ結果</h2>
    <p>正解数：${score} / ${quizData.length}</p>
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
    <button class="main-button" onclick="location.reload()">もう一度挑戦</button>
    <button class="main-button" onclick="goToStep(4)">リザルトに戻る</button>
  `;
  // シェア用テキスト
  const shareText = encodeURIComponent(
    `モールス信号クイズに挑戦！${score}問正解でした！ #モールス信号クイズ`
  );
  const shareUrl = encodeURIComponent(location.href);
  document.getElementById('quiz-screen').innerHTML = `
    <h2>クイズ結果</h2>
    <p>正解数：${score} / ${quizData.length}</p>
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

}