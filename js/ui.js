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
  'quiz-result',
  'henkan-screen'
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
  // WantToChange: テキスト入力に応じてモールスに即時変換し、表示／コピーする
  const wantToChangeInput = document.getElementById('WantToChange');
  const wantToChangeOutput = document.getElementById('WantToChangeOutput');
  const wantToChangeOutputHidden = document.getElementById('WantToChangeOutputHidden');
  const copyBtn = document.getElementById('copyWantToChangeBtn');
  const playBtn = document.getElementById('playWantToChangeBtn');
  const downloadWantBtn = document.getElementById('downloadWantToChangeBtn');
  const copyMsg = document.getElementById('copyWantToChangeMsg');
  const sepSelect = document.getElementById('WantToChangeSeparator');
  const showUnknowns = document.getElementById('WantToChangeShowUnknowns');
  if (wantToChangeInput && wantToChangeOutput) {
    // 初期値がある場合は変換
    if (wantToChangeInput.value && typeof ChangeIroha === 'function') {
      ChangeIroha('WantToChange', 'WantToChangeOutput');
    }
    wantToChangeInput.addEventListener('input', function() {
      formatAndShowWantToChange();
    });
  }
  if (copyBtn) {
    copyBtn.addEventListener('click', function() {
      const outEl = document.getElementById('WantToChangeOutput');
      if (!outEl) return;
      const text = outEl.value || '';
      if (!text.trim()) {
        alert('コピーするモールス記号がありません');
        return;
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
          if (copyMsg) {
            copyMsg.style.display = 'inline';
            setTimeout(() => { copyMsg.style.display = 'none'; }, 1500);
          }
        }).catch(() => {
          // fallback
          try { outEl.select(); document.execCommand('copy'); if (copyMsg) { copyMsg.style.display = 'inline'; setTimeout(()=>{copyMsg.style.display='none';},1500); } } catch (e) { alert('コピーできませんでした'); }
        });
      } else {
        // fallback
        try { outEl.select(); document.execCommand('copy'); if (copyMsg) { copyMsg.style.display = 'inline'; setTimeout(()=>{copyMsg.style.display='none';},1500);} } catch (e) { alert('コピーできませんでした'); }
      }
    });
  }
  if (playBtn) {
    playBtn.addEventListener('click', function() {
      // For playback, always use the normalized raw morse (with ／) to keep timing accurate
      if (!wantToChangeInput) return;
      const rawMorse = (typeof DirectChangeIroha === 'function') ? DirectChangeIroha(wantToChangeInput.value || '') : (function(){ ChangeIroha('WantToChange', 'WantToChangeOutput'); return document.getElementById('WantToChangeOutput').value; })();
      if (!rawMorse || !rawMorse.trim()) { alert('再生するモールス信号がありません'); return; }
      if (wantToChangeOutputHidden) { wantToChangeOutputHidden.value = rawMorse; }
      // Call playMorse with the id of the hidden textarea; playMorse will read its value
      if (typeof playMorse === 'function') playMorse('WantToChangeOutputHidden');
    });
  }
  if (downloadWantBtn) {
    downloadWantBtn.addEventListener('click', async function() {
      if (!wantToChangeInput) return;
      const rawMorse = (typeof DirectChangeIroha === 'function') ? DirectChangeIroha(wantToChangeInput.value || '') : (function(){ ChangeIroha('WantToChange', 'WantToChangeOutput'); return document.getElementById('WantToChangeOutput').value; })();
      if (!rawMorse || !rawMorse.trim()) { alert('ダウンロードするモールス信号がありません'); return; }
      // Check for environments like LINE where download is disabled
      if (typeof isLineBrowser === 'function' && isLineBrowser()) {
        alert('LINEのブラウザではMP3をダウンロードできません。別ブラウザでお試しください。');
        return;
      }
      try {
        // call morseToMp3 (defined in script.js)
        const blob = await morseToMp3(rawMorse);
        // determine a simple filename, use text input or a default
        let originalText = wantToChangeInput.value || 'morse';
        originalText = originalText.replace(/[\\/:*?"<>|]/g, '_');
        if (originalText.length > 20) originalText = originalText.substring(0, 20) + '・・・';
        // Determine language code from selects (prefer convert-screen language2)
        const langEl = document.getElementById('language2') || document.getElementById('language') || document.getElementById('language3');
        let langCode = 'JP';
        if (langEl && langEl.value) {
          if (langEl.value === '日本語') langCode = 'JP';
          else if (langEl.value === 'ローマ字') langCode = 'RO';
          else langCode = 'EN';
        }
        const filename = `モールス信号${langCode}_${originalText}.mp3`;
        // call global downloadBlob
        if (typeof downloadBlob === 'function') {
          downloadBlob(blob, filename);
          window.alert(`ダウンロード完了！\nファイル名: ${filename}`);
        } else {
          // fallback: create link
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a'); a.href = url; a.download = filename; a.click(); URL.revokeObjectURL(url);
          window.alert(`ダウンロード完了！\nファイル名: ${filename}`);
        }
      } catch (err) {
        console.error(err);
        alert('MP3の生成に失敗しました');
      }
    });
  }
  // 言語切替時にリアルタイム変換を更新
  ['language', 'language2', 'language3'].forEach(elmId => {
    const el = document.getElementById(elmId);
    if (el) {
      el.addEventListener('change', function() {
        if (wantToChangeInput && typeof ChangeIroha === 'function') ChangeIroha('WantToChange', 'WantToChangeOutput');
      });
    }
  });
  if (sepSelect) sepSelect.addEventListener('change', formatAndShowWantToChange);
  if (showUnknowns) showUnknowns.addEventListener('change', formatAndShowWantToChange);

  // 初期表示またはページロード時にフォーマット反映
  function formatAndShowWantToChange(){
    if (!wantToChangeInput) return;
    // get raw morse string using conversion function (DirectChangeIroha returns '／' separated morse)
    const raw = (typeof DirectChangeIroha === 'function') ? DirectChangeIroha(wantToChangeInput.value || '') : (function(){ ChangeIroha('WantToChange', 'WantToChangeOutput'); return document.getElementById('WantToChangeOutput').value; })();
    let result = raw || '';
    // Option: show/hide unknowns
    if (showUnknowns && !showUnknowns.checked) {
      result = result.replace(/？/g, '');
    }
    // Option: separator
    const sep = (sepSelect && sepSelect.value !== undefined) ? sepSelect.value : '／';
    if (sep === '') {
      // Remove separators
      result = result.replace(/／/g, '');
    } else if (sep !== '／') {
      result = result.split('／').join(sep);
    }
    if (wantToChangeOutput) wantToChangeOutput.value = result;
    if (wantToChangeOutputHidden) wantToChangeOutputHidden.value = raw || '';
  }
  // run once for initial state
  formatAndShowWantToChange();

  // Global settings panel for language sync
  const settingsBtn = document.getElementById('settingsBtn');
  const settingsPanel = document.getElementById('settingsPanel');
  const globalLanguage = document.getElementById('globalLanguage');
  const closeSettings = document.getElementById('closeSettings');
  const inlineLangIds = ['language','language2','language3'];
  // hide inline selects visually
  inlineLangIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.add('hide-inline-language');
  });

  function toggleSettings() {
    if (!settingsPanel) return;
    const shown = settingsPanel.style.display && settingsPanel.style.display !== 'none';
    settingsPanel.style.display = shown ? 'none' : 'block';
    if (settingsBtn) settingsBtn.setAttribute('aria-expanded', (!shown).toString());
    if (!shown && globalLanguage) globalLanguage.focus();
  }
  if (settingsBtn) settingsBtn.addEventListener('click', toggleSettings);
  if (closeSettings) closeSettings.addEventListener('click', () => { settingsPanel.style.display = 'none'; if (settingsBtn) settingsBtn.setAttribute('aria-expanded', 'false'); });
  // initialize globalLanguage from existing select
  if (globalLanguage) {
    // prefer stored language, otherwise prefer inline base select
    const storedLang = localStorage.getItem('ml_language');
    const base = document.getElementById('language') || document.getElementById('language2') || document.getElementById('language3');
    if (storedLang !== null) globalLanguage.value = storedLang; else if (base && base.value) globalLanguage.value = base.value;
    // mirror change to all inline selects
    globalLanguage.addEventListener('change', function() {
      const val = this.value;
      inlineLangIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) { el.value = val; el.dispatchEvent(new Event('change')); }
      });
      localStorage.setItem('ml_language', val);
    });
    // Ensure inline selects reflect current value on load
    globalLanguage.dispatchEvent(new Event('change'));
  }

  // Volume & Speed wiring
  const globalVolumeSlider = document.getElementById('globalVolumeSlider');
  const globalVolumeValue = document.getElementById('globalVolumeValue');
  const existingSlider = document.getElementById('volumeSlider');
  if (globalVolumeSlider) {
    // initialize from existing slider or local storage
    const storedVol = localStorage.getItem('ml_volume');
    if (storedVol !== null) {
      globalVolumeSlider.value = storedVol;
    } else if (existingSlider) {
      globalVolumeSlider.value = existingSlider.value;
    }
    globalVolumeValue.textContent = Math.round(Number(globalVolumeSlider.value) * 100) + '%';
    globalVolumeSlider.addEventListener('input', function() {
      const v = Number(this.value);
      if (existingSlider) { existingSlider.value = v; existingSlider.dispatchEvent(new Event('input')); }
      if (typeof setVolume === 'function') setVolume(v);
      if (globalVolumeValue) globalVolumeValue.textContent = Math.round(v * 100) + '%';
      localStorage.setItem('ml_volume', String(v));
    });
  }

  // Frequency wiring
  const globalFrequencySlider = document.getElementById('globalFrequencySlider');
  const globalFrequencyValue = document.getElementById('globalFrequencyValue');
  if (globalFrequencySlider) {
    // initialize: prefer stored value, otherwise use getFrequency if available
    const storedFreq = localStorage.getItem('ml_frequency');
    if (storedFreq !== null) {
      globalFrequencySlider.value = storedFreq;
    } else if (typeof getFrequency === 'function') {
      try { globalFrequencySlider.value = Number(getFrequency()); } catch(e) {}
    }
    if (globalFrequencyValue) globalFrequencyValue.textContent = globalFrequencySlider.value + 'Hz';
    globalFrequencySlider.addEventListener('input', function() {
      const f = Number(this.value);
      if (typeof setFrequency === 'function') setFrequency(f);
      if (globalFrequencyValue) globalFrequencyValue.textContent = f + 'Hz';
      localStorage.setItem('ml_frequency', String(f));
    });
  }

  // speed control
  const globalSpeedSelect = document.getElementById('globalSpeedSelect');
  if (globalSpeedSelect) {
    const storedSpeed = localStorage.getItem('ml_speed');
    if (storedSpeed !== null) { globalSpeedSelect.value = storedSpeed; }
    // on change, call ChangeSpeed (existing function) and persist
    globalSpeedSelect.addEventListener('change', function() {
      const val = Number(this.value);
      if (typeof ChangeSpeed === 'function') ChangeSpeed(val);
      localStorage.setItem('ml_speed', String(val));
    });
  }

  // on initial load, apply saved values
  (function applySavedSettings() {
    const v = localStorage.getItem('ml_volume');
    if (v !== null) {
      const nv = Number(v);
      if (globalVolumeSlider) { globalVolumeSlider.value = nv; if (globalVolumeValue) globalVolumeValue.textContent = Math.round(nv*100)+'%'; }
      if (existingSlider) { existingSlider.value = nv; existingSlider.dispatchEvent(new Event('input')); }
      if (typeof setVolume === 'function') setVolume(nv);
    }
    const s = localStorage.getItem('ml_speed');
    if (s !== null) {
      const ns = Number(s);
      if (globalSpeedSelect) globalSpeedSelect.value = ns;
      if (typeof ChangeSpeed === 'function') ChangeSpeed(ns);
    }
    const freq = localStorage.getItem('ml_frequency');
    if (freq !== null) {
      const nf = Number(freq);
      if (globalFrequencySlider) { globalFrequencySlider.value = nf; if (globalFrequencyValue) globalFrequencyValue.textContent = nf + 'Hz'; }
      if (typeof setFrequency === 'function') setFrequency(nf);
    }
  })();

  // Close settings when clicking outside or pressing Escape
  document.addEventListener('click', function(e) {
    if (!settingsPanel || !settingsBtn) return;
    const isInside = settingsPanel.contains(e.target) || settingsBtn.contains(e.target);
    if (!isInside && settingsPanel.style.display === 'block') {
      settingsPanel.style.display = 'none';
      settingsBtn.setAttribute('aria-expanded', 'false');
    }
  });
  document.addEventListener('keydown', function(e) {
    if ((e.key === 'Escape' || e.key === 'Esc') && settingsPanel && settingsPanel.style.display === 'block') {
      settingsPanel.style.display = 'none';
      if (settingsBtn) settingsBtn.setAttribute('aria-expanded', 'false');
      if (settingsBtn) settingsBtn.focus();
    }
  });

  // ===== Morse input behavior: allow caret, prevent typing, enable deletion & keyboard shortcuts =====
  const morseInputEl = document.getElementById('morseInput');
  if (morseInputEl) {
    // Prevent typing characters; allow navigation, delete/backspace, and Enter (play)
    morseInputEl.addEventListener('keydown', function(e) {
      const allowed = ['Backspace','Delete','ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home','End','Tab','Enter'];
      if (allowed.includes(e.key)) {
        if (e.key === 'Enter') {
          e.preventDefault();
          if (typeof playMorse === 'function') playMorse('morseInput');
          if (typeof ChangeMorse === 'function') ChangeMorse('morseInput');
        }
        return; // allow navigation and deletion
      }
      // allow some control/meta keys
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      // block normal typing
      e.preventDefault();
    });
    // prevent pasting
    morseInputEl.addEventListener('paste', function(e){ e.preventDefault(); });
    morseInputEl.addEventListener('cut', function(e){ e.preventDefault(); });
    // sanitize input in case something slips through
    morseInputEl.addEventListener('input', function() {
      const allowedChars = ['・','－','／','？'];
      const filtered = this.value.split('').filter(ch => allowedChars.includes(ch)).join('');
      if (filtered !== this.value) {
        const pos = this.selectionStart || 0;
        this.value = filtered;
        this.selectionStart = this.selectionEnd = Math.min(pos, filtered.length);
      }
    });
    // keyboard shortcuts while morseInput is focused
    morseInputEl.addEventListener('keydown', function(e){
      if (e.key === '.') { e.preventDefault(); appendText('・','morseInput'); playDot(); }
      else if (e.key === '-') { e.preventDefault(); appendText('－','morseInput'); playDash(); }
      else if (e.key === '/') { e.preventDefault(); appendText('／','morseInput'); }
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