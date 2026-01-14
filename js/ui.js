// ========================
// 言語対応アラートメッセージ
// ========================
const alertMessages = {
  nameEmpty: {
    '日本語': 'お名前を入力してください',
    'ローマ字': 'お名前を入力してください',
    'English': 'Please enter your name.'
  },
  noMorseToPlay: {
    '日本語': '再生するモールス信号がありません',
    'ローマ字': '再生するモールス信号がありません',
    'English': 'No Morse code to play.'
  },
  noMorseToDownload: {
    '日本語': 'ダウンロードするモールス信号がありません',
    'ローマ字': 'ダウンロードするモールス信号がありません',
    'English': 'No Morse code to download.'
  },
  lineDownloadNotSupported: {
    '日本語': 'LINEのブラウザではMP3をダウンロードできません。別ブラウザでお試しください。',
    'ローマ字': 'LINEのブラウザではMP3をダウンロードできません。別ブラウザでお試しください。',
    'English': 'MP3 download is not supported in LINE browser. Please try with another browser.'
  },
  mp3GenerationFailed: {
    '日本語': 'MP3の生成に失敗しました',
    'ローマ字': 'MP3の生成に失敗しました',
    'English': 'Failed to generate MP3.'
  },
  downloadCompleted: {
    '日本語': 'ダウンロード完了！',
    'ローマ字': 'ダウンロード完了！',
    'English': 'Download completed!'
  },
  copyFailed: {
    '日本語': 'コピーできませんでした',
    'ローマ字': 'コピーできませんでした',
    'English': 'Failed to copy.'
  },
  noMorseToPlay2: {
    '日本語': 'コピーするモールス記号がありません',
    'ローマ字': 'コピーするモールス記号がありません',
    'English': 'No Morse code to copy.'
  },
  resetSettingsCompleted: {
    '日本語': '設定を初期値に戻しました。',
    'ローマ字': '設定を初期値に戻しました。',
    'English': 'Settings have been reset to default values.'
  },
  prevScreenMorseConvert: {
    '日本語': '前の画面でモールス信号を変換してください。',
    'ローマ字': '前の画面でモールス信号を変換してください。',
    'English': 'Please convert to Morse code on the previous screen.'
  }
};
  const wantToChangeInput = document.getElementById('WantToChange');
  const wantToChangeOutput = document.getElementById('WantToChangeOutput');
  const correspondWantToChangeOutput = document.getElementById('CorrespondWantToChangeOutput');
  const wantToChangeOutputHidden = document.getElementById('WantToChangeOutputHidden');
  const copyBtn = document.getElementById('copyWantToChangeBtn');
  const playBtn = document.getElementById('playWantToChangeBtn');
  const downloadWantBtn = document.getElementById('downloadWantToChangeBtn');
  const copyMsg = document.getElementById('copyWantToChangeMsg');
  const sepSelect = document.getElementById('WantToChangeSeparator');
  const showUnknowns = document.getElementById('WantToChangeShowUnknowns');
  
// Get current language for alerts
function getCurrentLanguage() {
  const globalLang = document.getElementById('globalLanguage');
  if (globalLang) return globalLang.value;
  const lang = document.getElementById('language');
  if (lang) return lang.value;
  return localStorage.getItem('ml_language') || '日本語';
}

// Get alert message in current language
function getAlertMessage(key, defaultMsg = '') {
  const lang = getCurrentLanguage();
  const msgObj = alertMessages[key];
  if (!msgObj) return defaultMsg;
  return msgObj[lang] || msgObj['日本語'] || defaultMsg;
}

// ========================
// ファイル名生成ユーティリティ
// ========================
function getDownloadFilename(originalText){
  // determine base name by language
  const lang = getCurrentLanguage();
  const isEnglish = (lang === 'English');
  const base = isEnglish ? 'Morse' : 'モールス信号';

  // sanitize originalText
  let text = (originalText || '').toString();
  text = text.replace(/[\\/:*?"<>|]/g, '_');
  if (text.length > 20) text = text.substring(0,20) + (isEnglish ? '...' : '・・・');

  // language code
  let langCode = 'JP';
  if (lang === '日本語') langCode = 'JP';
  else if (lang === 'ローマ字') langCode = 'RO';
  else if (lang === 'English') langCode = 'EN';

  // format choice: 'input' or 'timestamp'
  const format = localStorage.getItem('ml_filename_format') || 'input';

  if (format === 'timestamp'){
    const now = new Date();
    const timestamp = now.toISOString().replace(/[:.]/g, '-');
    return `${langCode}_${base}_${timestamp}.mp3`;
  }

  // default: input-based
  const word = text || (isEnglish ? 'morse' : 'morse');
  return `${langCode}_${base}_${word}.mp3`;
}

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
  window.scrollTo({
  top: 0,
  behavior: 'smooth'
});
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
const correspondOutput = document.getElementById('CorrespondOutput');
const nameInput = document.getElementById('nameInput');

  // 対応表を生成する関数
  function generateCorrespondenceTable(inputText, outputID) {
    if (!outputID) return;
    if (!inputText.trim()) {
      outputID.value = '';
      return;
    }
    
    // 入力テキストを文字単位に分割
    let textChars = (getCurrentLanguage() === 'ローマ字' || getCurrentLanguage() === 'English')
      ? (typeof hiraganaToRomaji === 'function') ? hiraganaToRomaji(inputText).split('') : inputText.split('')
      : inputText.split('');
    
    const correspondenceLines = [];
    for (let char of textChars) {
      // current_languageから該当する文字を探す
      const found = (typeof current_language !== 'undefined' && Array.isArray(current_language))
        ? current_language.find(data => data[0] === char)
        : null;
      
      if (found) {
        correspondenceLines.push(`${char} ${found[1]}`);
      } else if (showUnknowns && showUnknowns.checked) {
        correspondenceLines.push(`${char} ？`);
      }
    }
    
     outputID.value = correspondenceLines.join('／\n');
  }
  

function convertName() {
  if (!nameInput) return;

  const name = nameInput.value.trim();
  if (!name) {
    alert(getAlertMessage('nameEmpty', 'Please enter your name.'));
    return;
  }

  const userNameEl = document.getElementById('userName');
  if (userNameEl) userNameEl.textContent = name;

  if (typeof ChangeIrohaNAME === "function") {
    ChangeIrohaNAME('nameInput', 'output');
  }
  generateCorrespondenceTable(nameInput.value || '', correspondOutput);

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
        alert(getAlertMessage('noMorseToPlay2', 'No Morse code to copy.'));
        return;
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
          if (copyMsg) {
            copyMsg.style.display = 'inline';
            setTimeout(() => { copyMsg.style.display = "none"; }, 1500);
          }
        }).catch(() => {
          // fallback
          try { outEl.select(); document.execCommand('copy'); if (copyMsg) { copyMsg.style.display = 'inline'; setTimeout(()=>{copyMsg.style.display="none";},1500); } } catch (e) { alert(getAlertMessage('copyFailed', 'Failed to copy.')); }
        });
      } else {
        // fallback
        try { outEl.select(); document.execCommand('copy'); if (copyMsg) { copyMsg.style.display = 'inline'; setTimeout(()=>{copyMsg.style.display="none";},1500);} } catch (e) { alert(getAlertMessage('copyFailed', 'Failed to copy.')); }
      }
    });
  }
  if (playBtn) {
    playBtn.addEventListener('click', function() {
      if (!wantToChangeInput) return;
      const rawMorse = (typeof DirectChangeIroha === 'function') ? DirectChangeIroha(wantToChangeInput.value || '') : (function(){ ChangeIroha('WantToChange', 'WantToChangeOutput'); return document.getElementById('WantToChangeOutput').value; })();
      if (!rawMorse || !rawMorse.trim()) { alert(getAlertMessage('noMorseToPlay', 'No Morse code to play.')); return; }
      if (wantToChangeOutputHidden) { wantToChangeOutputHidden.value = rawMorse; }
      if (typeof playMorse === 'function') playMorse('WantToChangeOutputHidden');
    });
  }
  if (downloadWantBtn) {
    downloadWantBtn.addEventListener('click', async function() {
      if (!wantToChangeInput) return;
      const rawMorse = (typeof DirectChangeIroha === 'function') ? DirectChangeIroha(wantToChangeInput.value || '') : (function(){ ChangeIroha('WantToChange', 'WantToChangeOutput'); return document.getElementById('WantToChangeOutput').value; })();
      if (!rawMorse || !rawMorse.trim()) { alert(getAlertMessage('noMorseToDownload', 'No Morse code to download.')); return; }
      if (typeof isLineBrowser === 'function' && isLineBrowser()) {
        alert(getAlertMessage('lineDownloadNotSupported', 'MP3 download is not supported in LINE browser.'));
        return;
      }
      try {
        const blob = await morseToMp3(rawMorse);
        let originalText = wantToChangeInput.value || 'morse';
        originalText = originalText.replace(/[\\/:*?"<>|]/g, '_');
        if (originalText.length > 20) originalText = originalText.substring(0, 20) + '・・・';
        const filenameToUse = getDownloadFilename(originalText);
          if (typeof downloadBlob === 'function') {
            downloadBlob(blob, filenameToUse);
            window.alert(`${getAlertMessage('downloadCompleted','Download completed!')}\nファイル名: ${filenameToUse}`);
          } else {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a'); a.href = url; a.download = filenameToUse; a.click(); URL.revokeObjectURL(url);
            window.alert(`${getAlertMessage('downloadCompleted','Download completed!')}\nファイル名: ${filenameToUse}`);
          }
      } catch (err) {
        console.error(err);
        alert(getAlertMessage('mp3GenerationFailed', 'Failed to generate MP3.'));
      }
    });
  }
  // 言語切替時にリアルタイム変換を更新
  if (sepSelect) sepSelect.addEventListener('change', formatAndShowWantToChange);
  if (showUnknowns) showUnknowns.addEventListener('change', formatAndShowWantToChange);

  // 初期表示またはページロード時にフォーマット反映
  function formatAndShowWantToChange(){
    if (!wantToChangeInput) return;
    const raw = (typeof DirectChangeIroha === 'function') ? DirectChangeIroha(wantToChangeInput.value || '') : (function(){ ChangeIroha('WantToChange', 'WantToChangeOutput'); return document.getElementById('WantToChangeOutput').value; })();
    let result = raw || '';
    if (showUnknowns && !showUnknowns.checked) {
      result = result.replace(/？/g, '');
    }
    const sep = (sepSelect && sepSelect.value !== undefined) ? sepSelect.value : '／';
    if (sep === '') {
      result = result.replace(/／/g, '');
    } else if (sep !== '／') {
      result = result.split('／').join(sep);
    }
    if (wantToChangeOutput) wantToChangeOutput.value = result;
    if (wantToChangeOutputHidden) wantToChangeOutputHidden.value = raw || '';
    
    // 対応表を生成して表示
    if (correspondWantToChangeOutput) {
      generateCorrespondenceTable(wantToChangeInput.value || '', correspondWantToChangeOutput);
    }
  }
  


  const settingsBtn = document.getElementById('settingsBtn');
  const settingsPanel = document.getElementById('settingsPanel');
  const globalLanguage = document.getElementById('globalLanguage');
  const closeSettings = document.getElementById('closeSettings');

  function toggleSettings() {
    if (!settingsPanel) return;
    // モールス信号表モーダルが開いている場合は設定パネルを開かない
    const modal1 = document.getElementById('morseModal');
    const modal2 = document.getElementById('morseModal2');
    const modalOpen = (modal1 && modal1.style.display && modal1.style.display !== "none") || (modal2 && modal2.style.display && modal2.style.display !== "none");
    if (modalOpen) {
      return;
    }
    const shown = settingsPanel.style.display && settingsPanel.style.display !== "none";
    settingsPanel.style.display = shown ? "none" : "block";
    if (settingsBtn) settingsBtn.setAttribute('aria-expanded', (!shown).toString());
    if (!shown && globalLanguage) globalLanguage.focus();
  }
  if (settingsBtn) settingsBtn.addEventListener('click', toggleSettings);
  if (closeSettings) closeSettings.addEventListener('click', () => { settingsPanel.style.display = "none"; if (settingsBtn) settingsBtn.setAttribute('aria-expanded', 'false'); });
  const resetSettingsBtn = document.getElementById('resetSettings');
  if (resetSettingsBtn) {
    resetSettingsBtn.addEventListener('click', function() {
      if (!confirm('設定を初期値に戻します。よろしいですか？')) return;
      const defaults = { volume: 0.8, speed: 1, frequency: 880, language: '日本語' };
      if (existingSlider) { existingSlider.value = defaults.volume; existingSlider.dispatchEvent(new Event('input')); }
      if (globalVolumeSlider) { globalVolumeSlider.value = defaults.volume; globalVolumeSlider.dispatchEvent(new Event('input')); }
      // Reset speed
      if (globalSpeedSelect) { globalSpeedSelect.value = defaults.speed; globalSpeedSelect.dispatchEvent(new Event('change')); }
      // Reset frequency
      if (globalFrequencySlider) { globalFrequencySlider.value = defaults.frequency; globalFrequencySlider.dispatchEvent(new Event('input')); }
      // Reset language
      if (globalLanguage) { globalLanguage.value = defaults.language; globalLanguage.dispatchEvent(new Event('change')); }
      // Persist defaults
      localStorage.setItem('ml_volume', String(defaults.volume));
      localStorage.setItem('ml_speed', String(defaults.speed));
      localStorage.setItem('ml_frequency', String(defaults.frequency));
      localStorage.setItem('ml_language', defaults.language);
      // Notify user
      alert(getAlertMessage('resetSettingsCompleted', 'Settings have been reset.'));
    });
  }
  // 初期化
  if (globalLanguage) {
    const storedLang = localStorage.getItem('ml_language');
    const base = document.getElementById('language');
    let initialLang = storedLang !== null ? storedLang : (base && base.value ? base.value : '日本語');
    globalLanguage.value = initialLang;
    globalLanguage.addEventListener('change', function() {
      const val = this.value;
      localStorage.setItem('ml_language', val);
      if (typeof changeLanguage === 'function') {
        changeLanguage(val);
      }
      const convertBtn = document.getElementById('convertRomajiToHiraBtn');
      const romajiResult = document.getElementById('romajiToHiraResult');
      if (convertBtn) convertBtn.style.display = (val === 'ローマ字') ? 'inline-block' : "none";
      if (romajiResult) romajiResult.style.display = (val === 'ローマ字') ? "block" : "none";
      // 子ども表示が有効な場合は、言語切替後に子ども表示を再適用（優先度を上げる）
      const kidToggle = document.getElementById('kidModeToggle');
      if (kidToggle && kidToggle.checked) {
        setTimeout(() => window.applyKidModeGlobal(true), 50);
      }
    });
    globalLanguage.dispatchEvent(new Event('change'));
    // --- キッズモードの初期化 ---
    const kidToggle = document.getElementById('kidModeToggle');
    window.applyKidModeGlobal = function applyKidMode(enabled){
      try{
        if (enabled) {
          document.body.classList.add('kid-ui');
          changeKidsMode();
        } else {
          document.body.classList.remove('kid-ui');
          // オフにしたら現在の言語で再描画
          if (typeof changeLanguage === 'function') changeLanguage(getCurrentLanguage());
        }
      }catch(e){ console.error('applyKidMode error', e); }
    }; // applyKidModeGlobal の終了
    // 初期値をローカルストレージから読み込む
    if (kidToggle) {
      const storedKid = localStorage.getItem('ml_kid_mode');
      const enabled = storedKid === '1' || storedKid === 'true';
      kidToggle.checked = enabled;
      window.applyKidModeGlobal(enabled);
      kidToggle.addEventListener('change', function(){
        const on = this.checked;
        localStorage.setItem('ml_kid_mode', on ? '1' : '0');
        window.applyKidModeGlobal(on);
      });
    }
  }

  const globalFilenameFormat = document.getElementById('globalFilenameFormat');
  if (globalFilenameFormat) {
    const stored = localStorage.getItem('ml_filename_format');
    if (stored) globalFilenameFormat.value = stored;
    globalFilenameFormat.addEventListener('change', function(){
      localStorage.setItem('ml_filename_format', this.value);
    });
  }

  const globalVolumeSlider = document.getElementById('globalVolumeSlider');
  const globalVolumeValue = document.getElementById('globalVolumeValue');
  const existingSlider = document.getElementById('volumeSlider');
  if (globalVolumeSlider) {
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

  const globalFrequencySlider = document.getElementById('globalFrequencySlider');
  const globalFrequencyValue = document.getElementById('globalFrequencyValue');
  if (globalFrequencySlider) {
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
    globalSpeedSelect.addEventListener('change', function() {
      const val = Number(this.value);
      if (typeof ChangeSpeed === 'function') ChangeSpeed(val);
      localStorage.setItem('ml_speed', String(val));
    });
  }

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

  // 外側をクリックするかEscキーを押すと設定を閉じる
  document.addEventListener('click', function(e) {
    if (!settingsPanel || !settingsBtn) return;
    const isInside = settingsPanel.contains(e.target) || settingsBtn.contains(e.target);
    if (!isInside && settingsPanel.style.display === "block") {
      settingsPanel.style.display = "none";
      settingsBtn.setAttribute('aria-expanded', 'false');
    }
  });
  document.addEventListener('keydown', function(e) {
    if ((e.key === 'Escape' || e.key === 'Esc') && settingsPanel && settingsPanel.style.display === "block") {
      settingsPanel.style.display = "none";
      if (settingsBtn) settingsBtn.setAttribute('aria-expanded', 'false');
      if (settingsBtn) settingsBtn.focus();
    }
  });

  const morseInputEl = document.getElementById('morseInput');
  if (morseInputEl) {
    // 文字入力禁止, ナビゲーションと削除は許可
    morseInputEl.addEventListener('keydown', function(e) {
      const allowed = ['Backspace','Delete','ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home','End','Tab','Enter'];
      if (allowed.includes(e.key)) {
        if (e.key === 'Enter') {
          e.preventDefault();
          if (typeof playMorse === 'function') playMorse('morseInput');
          if (typeof ChangeMorse === 'function') ChangeMorse('morseInput', 0);
        }
        return;
      }

      if (e.metaKey || e.ctrlKey || e.altKey) return;
      // 通常入力のブロック
      e.preventDefault();
    });
    // 貼り付け防止
    morseInputEl.addEventListener('paste', function(e){ e.preventDefault(); });
    morseInputEl.addEventListener('cut', function(e){ e.preventDefault(); });
    // 入力をサニタイズ
    morseInputEl.addEventListener('input', function() {
      const allowedChars = ['・','－','／','？'];
      const filtered = this.value.split('').filter(ch => allowedChars.includes(ch)).join('');
      if (filtered !== this.value) {
        const pos = this.selectionStart || 0;
        this.value = filtered;
        this.selectionStart = this.selectionEnd = Math.min(pos, filtered.length);
      }
    });
    morseInputEl.addEventListener('keydown', function(e){
      if (e.key === '.') { e.preventDefault(); appendText('・','morseInput'); playDot(); }
      else if (e.key === '-') { e.preventDefault(); appendText('－','morseInput'); playDash(); }
      else if (e.key === '/') { e.preventDefault(); appendText('／','morseInput'); }
    });
  }

  // kid modeが有効な場合は最後に再度適用する
  setTimeout(() => {
    const kidToggle = document.getElementById('kidModeToggle');
    if (kidToggle && kidToggle.checked) {
      const storedKid = localStorage.getItem('ml_kid_mode');
      if (storedKid === '1' || storedKid === 'true') {
        // applyKidModeが定義されているスコープを使う
        if (typeof window.applyKidModeGlobal === 'function') {
          window.applyKidModeGlobal(true);
        }
      }
    }
  }, 100);
});

// ========================
// HINTボタン処理
// ========================
function toggleHint() {
  if (!Array.isArray(morse_name) || !morse_name.length) {
    alert(getAlertMessage('prevScreenMorseConvert', 'Please convert to Morse code on the previous screen.'));
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
    alert(getAlertMessage('prevScreenMorseConvert', 'Please convert to Morse code on the previous screen.'));
    return;
  }
  if (typeof playMorse === "function") playMorse('NAME');
}

// ========================
// モーダル処理
// ========================
function openMorseModal() {
  const currentLang = getCurrentLanguage(); 

  if(currentLang === "日本語"){
    // 日本語用のモーダルを表示
    const modal = document.getElementById('morseModal');
    if (modal && modal.style.display === "block"){modal.style.display = "none"; settingsBtn.style.display = "block";}
    else{ if (modal) modal.style.display = "block"; settingsBtn.style.display = "none";}

    // 念のため英語版が開いていたら閉じる
    const modal2 = document.getElementById('morseModal2');
    if (modal2) modal2.style.display = "none";

  }else{
    // 英語・ローマ字用のモーダルを表示
    const modal2 = document.getElementById('morseModal2');
    if (modal2 && modal2.style.display === "block"){modal2.style.display = "none"; settingsBtn.style.display = "block";}
    else{ if (modal2) modal2.style.display = "block"; settingsBtn.style.display = "none";}

    // 念のため日本語版が開いていたら閉じる
    const modal = document.getElementById('morseModal');
    if (modal) modal.style.display = "none";
  }

  

  
}

function closeMorseModal(lang) {
  if(lang === "日本語"){
    const modal = document.getElementById('morseModal');
    if (modal) modal.style.display = "none";
  }else{
    const modal = document.getElementById('morseModal2');
    if (modal) modal.style.display = "none";
  }
  settingsBtn.style.display="block"
}

window.addEventListener('click', function(event) {
  const modal = document.getElementById('morseModal');
  if (modal && event.target === modal){modal.style.display = "none";settingsBtn.style.display="block";}
  const modal2 = document.getElementById('morseModal2');
  if (modal2 && event.target === modal2){modal2.style.display = "none";settingsBtn.style.display="block";}
  
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
  const lang = getCurrentLanguage();
  const isEnglish = lang === 'English';

  const heading = isEnglish ? 'Perfect Score! Congratulations!' : '全問正解！おめでとうございます！';
  const description = isEnglish ? 'Morse code you learned:' : 'あなたが覚えたモールス信号：';
  const morseColHeader = isEnglish ? 'Morse Code' : 'モールス信号';
  const wordColHeader = isEnglish ? 'Word' : (lang === 'ローマ字' ? 'ローマ字' : '日本語');
  const buttonText = isEnglish ? 'Complete' : '完了画面へ';
  
  const twitterLabel = isEnglish ? 'Share on X(Twitter)' : 'X(Twitter)でシェア';
  const lineLabel = isEnglish ? 'Share on LINE' : 'LINEでシェア';

  const shareMessage = isEnglish 
    ? `Challenge the Morse Code Quiz!\nLearned words [${quizData.map(q => q.answer).join(',')}] \n #MorseCodeQuiz\n#UECCommunicationMuseum`
    : `モールス信号クイズに挑戦したよ！\n正解した単語は [${quizData.map(q => q.answer).join(',')}] \nみんなはこのモールス信号分かる？\n #モールス信号クイズ\n#UECコミュニケーションミュージアム`;
  
  const shareText = encodeURIComponent(shareMessage);
  const shareUrl = encodeURIComponent(location.href);
  
  let html = `
    <h2>${heading}</h2>
    <p>${description}</p>
    <table class="result-table">
      <thead>
        <tr><th>${morseColHeader}</th><th>${wordColHeader}</th></tr>
      </thead>
      <tbody>
        ${quizData.map(q => `<tr><td>${q.question}</td><td>${q.answer}</td></tr>`).join('')}
      </tbody>
    </table>
    <div class="sns-share">
      <a class="sns-btn twitter" href="https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}" target="_blank" rel="noopener">${twitterLabel}</a>
      <a class="sns-btn line" href="https://social-plugins.line.me/lineit/share?url=${shareUrl}&text=${shareText}" target="_blank" rel="noopener">${lineLabel}</a>
    </div>
    <button class="main-button" onclick="goToStep(4);resetQuiz();">${buttonText}</button>
  `;
  document.getElementById("quiz-result").innerHTML = html;
  goToStep(6);
}

// ======== MP4 再生ボタン
(function setupMorsePlayButtons(){
  function createVideoModal(){
    if (document.getElementById('morseVideoModal')) return;
    const modal = document.createElement('div');
    modal.id = 'morseVideoModal';
    modal.className = 'modal';
    modal.style.display = "none";
    modal.innerHTML = '<div class="modal-content" style="max-width:640px;"><span class="close" id="morseVideoClose">&times;</span><video id="morseVideo" controls style="width:100%; height:auto;"></video></div>';
    document.body.appendChild(modal);
    modal.querySelector('#morseVideoClose').addEventListener('click', ()=>{ modal.style.display="none"; const v = document.getElementById('morseVideo'); if(v){ v.pause(); v.src=''; } });
    modal.addEventListener('click', (e)=>{ if (e.target===modal) { modal.style.display="none"; const v=document.getElementById('morseVideo'); if(v){ v.pause(); v.src=''; } }});
  }

  function playMp4ForChar(ch, btn){
    createVideoModal();
    const modal = document.getElementById('morseVideoModal');
    const video = document.getElementById('morseVideo');
    if (!video || !modal) return;
    const filename = encodeURIComponent(ch) + '.mp4';
    const path = 'assets/mp4/各アルファベット/' + filename;
    // 再生準備
    let played = false;
    function onError(){
      btn.disabled = true;
      btn.title = '動画が見つかりません';
      if (modal) modal.style.display = "none";
      video.removeEventListener('error', onError);
      video.removeEventListener('loadedmetadata', onLoaded);
      video.pause(); video.src = '';
    }
    function onLoaded(){
      video.play().catch(()=>{});
      modal.style.display = "block";
      video.removeEventListener('error', onError);
      video.removeEventListener('loadedmetadata', onLoaded);
    }
    video.addEventListener('error', onError);
    video.addEventListener('loadedmetadata', onLoaded);
    // set src (これがトリガーとなりロードが始まる)
    video.src = path;
  }

  function isAlphaNum(ch){
    return /^[A-Z]$/.test(ch); // 音声追加時は[]内に追加。現在はA-Zのみ対応。
  }

  function init(){
    const modal2 = document.getElementById('morseModal2');
    if (!modal2) return;
    const tbody = modal2.querySelector('table.morse-table tbody');
    if (!tbody) return;
    Array.from(tbody.querySelectorAll('tr')).forEach(tr=>{
      const tds = tr.querySelectorAll('td');
      if (tds.length < 2) return;
      const ch = (tds[0].textContent || '').trim();
      // 既に3カラムなら何もしない
      if (tds.length >= 3) return;
      const td = document.createElement('td');
      td.style.textAlign = 'center';
      if (isAlphaNum(ch)){
        const btn = document.createElement('button');
        btn.className = 'morse-play-btn';
        btn.type = 'button';
        btn.textContent = '▶';
        btn.title = '再生';
        btn.addEventListener('click', function(e){
          playMp4ForChar(ch.toUpperCase(), btn);
        });
        td.appendChild(btn);
      } else {
        td.innerHTML = ''; // 空セルで整列を維持
      }
      tr.appendChild(td);
    });
  }

  // DOMContentLoaded 後に初期化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();