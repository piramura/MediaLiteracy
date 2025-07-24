// クイズデータ（モールス信号 → 正しい日本語）
const quizData = [
  {
    question: "－・・・／・・／・－・／・－・", // バナナ
    options: ["バナナ", "りんご", "もも"],
    answer: "バナナ"
  },
  {
    question: "・・－／－・－・－／－・－・・／・・", // うさぎ
    options: ["ねこ", "いぬ", "うさぎ"],
    answer: "うさぎ"
  },
  {
    question: "・・－・／・－－・－／－－－・－／・・", // チーズ
    options: ["チーズ", "ミルク", "バター"],
    answer: "チーズ"
  }
];

let currentQuizIndex = 0;
let selectedAnswer = null;

// クイズの表示
function loadQuiz() {
  const currentQuiz = quizData[currentQuizIndex];
  document.getElementById("quiz-question").textContent = currentQuiz.question;

  const optionButtons = document.querySelectorAll(".option");
  optionButtons.forEach((btn, index) => {
    btn.textContent = currentQuiz.options[index];
    btn.disabled = false;
    btn.classList.remove("selected");
  });

  // ボタン無効化
  document.getElementById("quiz-next-btn").disabled = true;

  // Q番号と進捗バー更新
  document.getElementById("quiz-steps").textContent = `Q${currentQuizIndex + 1}`;
  const progress = ((currentQuizIndex) / quizData.length) * 100;
  document.getElementById("quiz-progress").style.width = `${progress}%`;
}

// 選択肢をクリックしたとき
function selectOption(btn) {
  const optionButtons = document.querySelectorAll(".option");
  optionButtons.forEach(b => b.classList.remove("selected"));

  btn.classList.add("selected");
  selectedAnswer = btn.textContent;

  document.getElementById("quiz-next-btn").disabled = false;
}

// 「次へ」ボタン
function nextQuiz() {
  const correct = quizData[currentQuizIndex].answer;
  if (selectedAnswer !== correct) {
    alert("不正解です！");
    return;
  }

  currentQuizIndex++;
  selectedAnswer = null;

  if (currentQuizIndex < quizData.length) {
    loadQuiz();
  } else {
    alert("全問正解！リザルトへ進みます");
    goToStep(4); // リザルト画面などに切り替え（既存の機能）
  }
}

// 「戻る」ボタン
function prevQuiz() {
  if (currentQuizIndex > 0) {
    currentQuizIndex--;
    selectedAnswer = null;
    loadQuiz();
  }
}

// 初回読み込み
window.addEventListener("DOMContentLoaded", () => {
  loadQuiz();
});
