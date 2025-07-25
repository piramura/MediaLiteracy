// ========================
// 画面遷移機能
// ========================
function goToStep(step) {
  const screens = document.querySelectorAll('.screen');
  if (screens.length > 0) {
    screens.forEach(s => s.classList.remove('active'));
    const ids = ['start-screen','name-screen','convert-screen','input-screen','complete-screen','quiz-screen','quiz-result'];
    if (ids[step]) {
      const target = document.getElementById(ids[step]);
      if (target) target.classList.add('active');
    }
  }
  // MP3ダウンロードボタンと長押しリンクを安全に非表示・削除
  const btn = document.getElementById("downloadBtn");
  if (btn) btn.style.display = "none";
  const link = document.getElementById("longPressLink");
  if (link) link.remove();
}

// ========================
// 名前変換機能
// ========================
function convertName() {
  const nameInput = document.getElementById('nameInput');
  if (!nameInput) return; // quiz.htmlにはnameInputが無いので何もしない

  const name = nameInput.value.trim();
  if (!name) {
    alert('お名前を入力してください');
    return;
  }

  const userNameEl = document.getElementById('userName');
  if (userNameEl) userNameEl.textContent = name;

  if (typeof ChangeIrohaNAME === "function") {
    ChangeIrohaNAME('nameInput', 'output');
  }

  goToStep(2);
}

// ========================
// 初期化処理
// ========================
document.addEventListener('DOMContentLoaded', function() {
  const nameInput = document.getElementById('nameInput');
  if (nameInput) {
    nameInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        convertName();
      }
    });
  }
});

// ========================
// HINTボタン処理
// ========================

function toggleHint() {
  if (typeof morse_name === "undefined" || !morse_name.length) {
    alert("前の画面でモールス信号を変換してください。");
    return;
  }

  const hintArea = document.getElementById("hintArea");
  const hintMorse = document.getElementById("hintMorse");

  if (hintArea.style.display === "none") {
    hintMorse.textContent = morse_name.join('／');
    hintArea.style.display = "block";
  } else {
    hintArea.style.display = "none";
  }
}

function playHintAudio() {
  if (typeof morse_name === "undefined" || !morse_name.length) {
    alert("前の画面でモールス信号を変換してください。");
    return;
  }
  if (typeof playMorse === "function") {
    playMorse('NAME'); // 'NAME'はmorse_nameを直接再生させるモード
  }
}

// ========================
// モーダル処理
// ========================
function openMorseModal() {
  const modal = document.getElementById('morseModal');
  if (modal) modal.style.display = 'block';
}

function closeMorseModal() {
  const modal = document.getElementById('morseModal');
  if (modal) modal.style.display = 'none';
}

// モーダル外クリックで閉じる
window.addEventListener('click', function(event) {
  const modal = document.getElementById('morseModal');
  if (modal && event.target === modal) {
    modal.style.display = 'none';
  }
});
// ========================
// ドロップダウンメニュー処理
// ========================
function toggleDropdown(event) {
  event.stopPropagation();
  const dropdown = event.currentTarget.parentElement;
  dropdown.classList.toggle('open');
}

// 閉じる処理
document.addEventListener('click', function() {
  document.querySelectorAll('.dropdown.open').forEach(el => el.classList.remove('open'));
});

// ========================
// クイズ機能
// ========================
function ShowQuestion(targetId) {
  // クイズの質問表示
  const questionEl = document.getElementById(targetId);
  if (questionEl) questionEl.textContent = "クイズやっていかない？";
  AskQuestion(targetId); // クイズの質問を表示
  // モールス入力セクションを表示
  const morseSection = document.getElementById("morse-section");
  if (morseSection) morseSection.style.display = "block";
}
/// ========================
// クイズの結果を表示
// ========================
function showQuizResult() {
  const shareText = encodeURIComponent(
    `モールス信号クイズに挑戦！\n覚えた単語${quizData.map(q => q.answer).join(',')}\n #モールス信号クイズ\n#UECコミュニケーションミュージアム`
  );
  const shareUrl = encodeURIComponent(location.href);
  let html = `
    <h2>全問正解！おめでとうございます！</h2>
    <p>あなたが覚えたモールス信号：</p>
    <table class="result-table">
      <thead>
        <tr><th>モールス信号</th><th>日本語</th></tr>
      </thead>
      <tbody>
        ${quizData.map(q => `<tr><td>${q.question}</td><td>${q.answer}</td></tr>`).join('')}
      </tbody>
    </table>
    <div class="sns-share">
      <a class="sns-btn twitter" href="https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}" target="_blank" rel="noopener">Twitterでシェア</a>
      <a class="sns-btn line" href="https://social-plugins.line.me/lineit/share?url=${shareUrl}&text=${shareText}" target="_blank" rel="noopener">LINEでシェア</a>
    </div>
    <button class="main-button" onclick="goToStep(4);resetQuiz();">完了画面へ</button>
  `;
  document.getElementById("quiz-result").innerHTML = html;
    // 追加: activeクラスの付け替え
    goToStep(6); // リザルト画面へ遷移

}