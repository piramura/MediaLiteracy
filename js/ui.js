// ========================
// 画面遷移機能
// ========================
const SCREEN_IDS = [
  'start-screen',
  'name-screen',
  'convert-screen',
  'input-screen',
  'complete-screen',
  'quiz-screen',
  'quiz-result'
];

function goToStep(step) {
  setTimeout(() => {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const targetId = SCREEN_IDS[step];
    if (targetId) {
      const target = document.getElementById(targetId);
      if (target) target.classList.add('active');
    }
    hideDownloadAndLongPress();
  }, 500); // 0.5秒遅延
}
function hideDownloadAndLongPress() {
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
  if (!nameInput) return;

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
      if (e.key === 'Enter') convertName();
    });
  }

  const slider = document.getElementById('volumeSlider');
  if (slider) {
    setVolume(Number(slider.value));
    slider.addEventListener('input', function() {
      setVolume(Number(this.value));
      const valueSpan = document.getElementById('volumeValue');
      if (valueSpan) valueSpan.textContent = Math.round(Number(this.value) * 100) + '%';
    });
  }
});

// ========================
// HINTボタン処理
// ========================
function toggleHint() {
  if (!Array.isArray(morse_name) || !morse_name.length) {
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
  if (!Array.isArray(morse_name) || !morse_name.length) {
    alert("前の画面でモールス信号を変換してください。");
    return;
  }
  if (typeof playMorse === "function") playMorse('NAME');
}

// ========================
// モーダル処理
// ========================
function openMorseModal(lang) {
  if(lang === "日本語"){
    const modal = document.getElementById('morseModal');
    if (modal) modal.style.display = (modal.style.display === 'block') ? 'none' : 'block';
  }else{
      const modal = document.getElementById('morseModal2');
     if (modal) modal.style.display = (modal.style.display === 'block') ? 'none' : 'block';
  }
}

function closeMorseModal(lang) {
  if(lang === "日本語"){
    const modal = document.getElementById('morseModal');
    if (modal) modal.style.display = 'none';
  }else{
    const modal = document.getElementById('morseModal2');
    if (modal) modal.style.display = 'none';
  }
}

window.addEventListener('click', function(event) {
  const modal = document.getElementById('morseModal');
  if (modal && event.target === modal) modal.style.display = 'none';
});

// ========================
// ドロップダウンメニュー処理
// ========================
function toggleDropdown(event) {
  event.stopPropagation();
  event.currentTarget.parentElement.classList.toggle('open');
}

document.addEventListener('click', function() {
  document.querySelectorAll('.dropdown.open').forEach(el => el.classList.remove('open'));
});

// ========================
// クイズ機能
// ========================
function ShowQuestion(targetId) {
  const questionEl = document.getElementById(targetId);
  if (questionEl) questionEl.textContent = "クイズやっていかない？";
  AskQuestion(targetId);
  const morseSection = document.getElementById("morse-section");
  if (morseSection) morseSection.style.display = "block";
}

function showQuizResult() {
  const shareText = encodeURIComponent(
    `モールス信号クイズに挑戦！\n覚えた単語 [${quizData.map(q => q.answer).join(',')}] \n #モールス信号クイズ\n#UECコミュニケーションミュージアム`
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
  goToStep(6);
}