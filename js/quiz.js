// ランダムに並び替えるユーティリティ関数
function shuffle(array) {
  return array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

// クイズ候補（選択肢となる語）を用意
const wordPool = [
  /* 食べ物 */
  ["ぶどう", "りんご", "もも"],
  ["すいか", "みかん", "めろん"],
  ["ごはん", "みそしる", "さらだ"],
  ["らーめん", "うどん", "そば"], 
  ["おさけ", "みず", "おちゃ"],  
  ["いくら", "まぐろ", "さば"],

  /* 動物 */
  ["ねこ", "いぬ", "うさぎ"],
  ["ぶた", "しか", "うし"], 
  ["かめ", "とら", "さる"], 
  ["うま", "くま", "ろば"],
  ["たぬき", "きつね", "きりん"],
  ["あざらし", "まんぼう", "くじゃく"],
  ["いか", "たこ", "さめ"],
  ["らいおん", "ぱんだ", "にわとり"],
  ["はくちょう", "すずめ", "からす"],
  ["じどう", "せいと", "せんせい"],

  /* 色 */
  ["あか", "あお", "きいろ"],
  ["もも", "しろ", "くろ"],
  ["ぴんく", "ちゃいろ", "みどり"],
  ["むらさき", "はいいろ", "しゅいろ"],
  ["きん", "ぎん", "どう"],
  ["みずいろ", "きみどり", "はだいろ"],

  /* 調味料 */
  ["さとう", "しお", "こしょう"],
  ["しょうゆ", "みりん", "おす"],

  /* 場所 */
  ["でんき", "つうしん", "だいがく"],
  ["やま", "かわ", "うみ"],
  ["やおや","はなや","にくや"],
  ["ふじさん","あそさん","きただけ"],
  ["とうきょう", "きょうと", "おおさか"],
  ["ぐんま", "とちぎ", "いばらき"],
  ["あいち", "こうち", "えひめ"],
  ["しが", "さが", "しが"],
  ["おきなわ", "くまもと", "おおいた"],
  ["ふくしま", "ふくおか", "ふくい"],
  ["みやざき", "ながさき", "かごしま"],
  ["いわて", "あおもり", "あきた"],
  ["ひろしま", "とっとり", "おかやま"],

  /* 花 */
  ["はな", "きく", "ゆり"],

  /* 音楽 */
  ["うた", "おと", "こえ"], 

  /* 地球 */
  ["ふゆ", "なつ", "あき"],
  ["あさ", "ひる", "よる"],
  ["つき", "ほし", "そら"], 
  ["かぜ", "ゆき", "あめ"],
  ["いし", "つち", "どろ"], 

  /* 体 */
  ["くび", "ひざ", "うで"], 
  ["くち", "みみ", "はな"], 
 
  /* 家具 */
  ["いす", "つくえ", "たな"], 
  ["ふとん", "まくら", "もうふ"],  
  ["てれび", "でんき", "りもこん"],

  /* 歴史 */
  ["しょうわ", "へいせい", "れいわ"],
  ["えど", "めいじ", "むろまち"],
  ["やよい", "こふん", "あすか"],
  ["なら", "へいあん", "かまくら"],
  ["とくがわ", "おだ", "とよとみ"],
  ["てんむ", "すいこ", "てんじ"],
  ["ひみこ", "そが", "たいら"],

  /* 小物 */
  ["いと", "はり", "ぬの"], 
  ["かぎ", "でんわ", "けいたい"],
  ["おかね", "さいふ", "しへい"]
  
];

// ランダムに問題を生成
function generateQuizData() {
  const data = wordPool.map(options => {
    const shuffled = shuffle(options);
    const answer = shuffled[Math.floor(Math.random() * shuffled.length)];
    const question = DirectChangeIroha(answer); // モールス信号に変換

    return {
      question,
      options: shuffled,
      answer
    };
  });

  return shuffle(data); // クイズ順自体もシャッフル
}

let NumOfQuiz = 3;//クイズの問題数
let isQuizCorrect = null;//クイズが正解か　正解なら1、不正解なら0
// まず全問作成
const allQuizData = generateQuizData();

// NumOfQuiz分だけ切り出して新しい配列を作る
const quizData = allQuizData.slice(0, NumOfQuiz);

let currentQuizIndex = 0;

let selectedAnswer = null;

// クイズの表示
function loadQuiz() {
  const currentQuiz = quizData[currentQuizIndex];
  document.getElementById("quiz-question").textContent = currentQuiz.question;

  const optionButtons = document.querySelectorAll(".option");
  currentQuiz.options.forEach((opt, index) => {
    const btn = optionButtons[index];
    btn.textContent = opt;
    btn.disabled = false;
    btn.classList.remove("selected");
  });

  // 次へボタン無効化
  document.getElementById("quiz-next-btn").disabled = true;

  // 進捗表示
  document.getElementById("quiz-steps").textContent = `Q${currentQuizIndex + 1}`;
  const progress = (currentQuizIndex / quizData.length) * 100;
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
  //console.log(isQuizCorrect);
  const correct = quizData[currentQuizIndex].answer;
  if (selectedAnswer !== correct) {
    isQuizCorrect = 0;
    const sound = document.getElementById("incorrectSound");
    sound.currentTime = 0;
    sound.play();
    console.log("不正解"+ isQuizCorrect);
    if(isQuizCorrect != null){
      showJudgeMark(isQuizCorrect);
    }
    //alert("不正解です！");
    return;
  }else if(selectedAnswer === correct){
    isQuizCorrect = 1;
    const sound = document.getElementById("correctSound");
    sound.currentTime = 0;
    sound.play();
    if(isQuizCorrect != null){
      console.log("正解"+ isQuizCorrect);
      showJudgeMark(isQuizCorrect);
    }
    currentQuizIndex++;
    selectedAnswer = null;
  }

  if (currentQuizIndex < NumOfQuiz) {
    loadQuiz();
  } else {
    //alert("全問正解！リザルトへ進みます");
    setTimeout(() => {
      showQuizResult();
    }, 1000); // 1000ms = 1秒
  }
}

// 「終了」ボタン
function prevQuiz() {
    resetQuiz();
    goToStep(4);
}

function resetQuiz() {
  // クイズデータを再生成して出題数ぶん切り出す
  const allQuizData = generateQuizData();
  quizData.length = 0; // quizData配列の中身を空にして
  quizData.push(...allQuizData.slice(0, NumOfQuiz)); // 新しい問題を代入

  // 状態を初期化
  currentQuizIndex = 0;
  selectedAnswer = null;
  isQuizCorrect = null;
  showJudgeMark(null);

  // UIを更新
  loadQuiz();

  // 結果表示などがあれば非表示に（必要に応じて）
  //hideQuizResult();
}

// 初回読み込み
window.addEventListener("DOMContentLoaded", () => {
  resetQuiz();
  loadQuiz();

});
