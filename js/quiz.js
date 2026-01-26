// ランダムに並び替えるユーティリティ関数
function shuffle(array) {
  return array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

// クイズ候補（選択肢となる語）を用意
let wordPool = [
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

//英語
let EnglishWordPool = [
  ["cat", "dog", "pig"],
  ["sun", "sky", "star"],
  ["car", "boat", "bike"],
  ["shelf", "door", "window"],
  ["lamp", "desk", "chair"],
  ["card", "coin", "book"],
  ["boy", "girl", "baby"],
["mom", "dad", "son"],
["hand", "foot", "face"],
["bird", "fish", "lion"],
["bear", "frog", "wolf"],
["fire", "tree", "water"],
["rain", "snow", "wind"],
["moon", "mars", "earth"],
["river", "lake", "sea"],
["road", "park", "home"],
["bath", "room", "hall"],
["fork", "cup", "dish"],
["love", "hope", "dream"],
["time", "life", "space"],
["file", "data", "mail"],
["app", "game", "link"],
["piano", "drum", "harp"],
["golf", "swim", "dive"],
["reef", "dune", "lava"],     // 地形
["fern", "vine", "herb"],     // 植物
["mist", "hail", "gale"],     // 天候
["wave", "tide", "reef"],     // 海
["rock", "coal", "ore"],      // 山・石
["fear", "rage", "hope"],     // 感情
["idea", "plan", "fact"],     // 思考
["rule", "law", "code"],      // 社会的概念
["hour", "week", "year"],     // 時間の単位
["calm", "heat", "rest"],     // 状態
["file", "data", "code"],
["mail", "post", "link"],
["app", "tool", "site"],
["pass", "key", "lock"],
["news", "ad", "film"],
["chef", "nurse", "clerk"],   // 職業
["king", "lord", "duke"],     // 社会階層
["exam", "test", "quiz"],     // 学校関連
["love", "hate", "envy"],     // 感情の関係
["team", "unit", "band"],     // グループ
["hall", "mall", "cafe"],     // 建物
["road", "park", "port"],     // 都市要素
["sofa", "desk", "lamp"],     // 家具
["gear", "tool", "rope"],     // 道具
["lamp", "bell", "horn"],     // 音・照明
["crow", "dove", "hawk"],     // 鳥
["lion", "wolf", "bear"],     // 猛獣
["seal", "crab", "eel"],      // 海の生き物
["ant", "bee", "fly"],        // 昆虫
["band", "song", "note"],     // 音楽
["art", "form", "line"],      // 美術
["play", "show", "act"],      // 舞台芸術
["poem", "book", "tale"],     // 文学
["film", "hero", "star"],     // 映画関連

];

let quizData = []; // 生成済みの問題を格納する配列
let currentQuizIndex = 0; // 現在表示中の問題インデックス
let selectedAnswer = null; // 選択された答え
let isQuizCorrect = null; // 正解判定（1=正解、0=不正解、null=未判定）
let generatedQuizCount = 0; // 生成済みの問題数
let randomState = 0; // ランダム状態

// ===== 問題生成 =====
// 指定インデックスの問題を生成してquizDataに追加
function generateAndAddQuiz(index) {
  const NumOfQuiz = getNumOfQuiz();
  const MaxOptions = getMaxOptions();
  if (index >= NumOfQuiz || quizData.length > index) return; // 既に生成済みまたは上限に達した場合はスキップ

  const currentLang = getCurrentLanguage();
  const activeWordPool = (currentLang === 'English') ? EnglishWordPool : wordPool;

  const options = activeWordPool[(index + randomState) % activeWordPool.length];
  const shuffled = shuffle(options);
  const answer = shuffled[Math.floor(Math.random() * MaxOptions)];
  const question = DirectChangeIroha(answer);

  const newQuiz = {
    question: question,
    options: shuffled,
    answer: answer,
  };

  quizData.push(newQuiz);
  generatedQuizCount++;
}

// 次の問題が必要な場合に生成
function ensureQuizLoaded(index) {
  const NumOfQuiz = getNumOfQuiz();
  while (quizData.length <= index && quizData.length < NumOfQuiz) {
    generateAndAddQuiz(quizData.length);
  }
}

// クイズ画面で言語が変更された時用：現在の問題を新言語で再生成
function updateQuizLanguage() {
  const MaxOptions = getMaxOptions();
  const currentLang = getCurrentLanguage();
  const newWordPool = (currentLang === 'English') ? EnglishWordPool : wordPool;

  // 現在表示中の問題を処理
  if (currentQuizIndex < quizData.length) {
    // 現在の問題をquizDataから一時削除
    const removedQuiz = quizData.splice(currentQuizIndex, 1);
    
    // 新しい言語でwordPoolから対応するグループを取得して再生成
    const options = newWordPool[(currentQuizIndex + randomState) % newWordPool.length];
    const shuffled = shuffle(options);
    const answer = shuffled[Math.floor(Math.random() * MaxOptions)];
    const question = DirectChangeIroha(answer);

    const regeneratedQuiz = {
      question: question,
      options: shuffled,
      answer: answer,
    };
    
    quizData.splice(currentQuizIndex, 0, regeneratedQuiz);
  }

  // 現在表示中の問題を新しい言語で出題し直す
  if (currentQuizIndex < quizData.length && typeof loadQuiz === 'function') {
    loadQuiz();
  }
}

// ===== UI表示 =====
// クイズの表示
function loadQuiz() {
  const NumOfQuiz = getNumOfQuiz();
  ensureQuizLoaded(currentQuizIndex);

  if (currentQuizIndex >= quizData.length) return; // 問題が無い場合はスキップ

  const currentQuiz = quizData[currentQuizIndex];

  if (currentQuiz.question === null) {
    currentQuiz.question = DirectChangeIroha(currentQuiz.answer);
  }

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
  const progress = ((currentQuizIndex + 1) / NumOfQuiz) * 100;
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

// ===== ボタンイベント =====
// 「クイズ開始」ボタン
function startQuiz() {
  const max = getRandomStateMax();
  randomState = Math.floor(Math.random() * max);
  resetQuiz();
  goToStep(5);
}

// 「次へ」ボタン
function nextQuiz() {
  const NumOfQuiz = getNumOfQuiz();
  const correct = quizData[currentQuizIndex].answer;
  if (selectedAnswer !== correct) {
    isQuizCorrect = 0;
    const sound = document.getElementById("incorrectSound");
    sound.currentTime = 0;
    sound.play();
    if (isQuizCorrect != null) {
      showJudgeMark(isQuizCorrect);
    }
    return;
  } else if (selectedAnswer === correct) {
    isQuizCorrect = 1;
    const sound = document.getElementById("correctSound");
    sound.currentTime = 0;
    sound.play();
    if (isQuizCorrect != null) {
      showJudgeMark(isQuizCorrect);
    }
    currentQuizIndex++;
    selectedAnswer = null;
  }

  if (currentQuizIndex < NumOfQuiz) {
    loadQuiz();
  } else {
    setTimeout(() => {
      showQuizResult();
    }, 1000); // 1000ms = 1秒
  }
}

// 「終了」ボタン
function prevQuiz() {
  goToStep(0);
}

// クイズをリセット
function resetQuiz() {
  quizData = [];
  currentQuizIndex = 0;
  selectedAnswer = null;
  isQuizCorrect = null;
  generatedQuizCount = 0;
  showJudgeMark(null);
  shuffle(wordPool);
  shuffle(EnglishWordPool);
  
  // 最初の問題を生成して表示
  loadQuiz();
}

// 初回読み込み
window.addEventListener("DOMContentLoaded", () => {
  resetQuiz();
});

