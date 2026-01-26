
  const wantToChangeInput = document.getElementById('WantToChange');
  const wantToChangeOutput = document.getElementById('WantToChangeOutput');
  const correspondWantToChangeOutput = document.getElementById('CorrespondWantToChangeOutput');
  const wantToChangeOutputHidden = document.getElementById('WantToChangeOutputHidden');
  const copyBtn = document.getElementById('copyWantToChangeBtn');
  const playBtn = document.getElementById('playWantToChangeBtn');
  const downloadWantBtn = document.getElementById('downloadWantToChangeBtn');
  const downloadNameBtn = document.getElementById('downloadNameBtn');
  const copyMsg = document.getElementById('copyWantToChangeMsg');
  const sepSelect = document.getElementById('WantToChangeSeparator');
  const showUnknowns = document.getElementById('WantToChangeShowUnknowns');
  
/*=================================
===== ダウンロードファイル名生成 =====
===================================*/
function getDownloadFilename(originalText){
  const lang = getCurrentLanguage();
  const isEnglish = (lang === 'English');
  const base = isEnglish ? 'Morse' : 'モールス信号';
  let text = (originalText || '').toString();
  text = text.replace(/[\\/:*?"<>|]/g, '_');
  if (text.length > 20) text = text.substring(0,20) + (isEnglish ? '...' : '・・・');

  let langCode = 'JP';
  if (lang === '日本語') langCode = 'JP';
  else if (lang === 'ローマ字') langCode = 'RO';
  else if (lang === 'English') langCode = 'EN';

  const format = localStorage.getItem('ml_filename_format') || 'input';

  if (format === 'timestamp'){
    const now = new Date();
    const timestamp = now.toISOString().replace(/[:.]/g, '-');
    return `${langCode}_${base}_${timestamp}.mp3`;
  }
  const word = text || (isEnglish ? 'morse' : 'morse');
  return `${langCode}_${base}_${word}.mp3`;
}

/*========================
========画面遷移機能========
==========================*/
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


/*
step = SCREEN_IDSの順を参照
対応スクリーンに移動
*/
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
    const langSelect = document.getElementById('globalLanguage');
    if (langSelect) {
      if (step === 2 || step === 3) {
        langSelect.disabled = true;
      } else {
        langSelect.disabled = false;
      }
    }
  }, 500); // 0.5秒遅延
}

/*
未定義文字の入力体験ができないため例外関数
name-screen -> convert-screenで起動
未定義文字があると先に進めないようになる
 */
function checkAndGoToInput() {
  const output = document.getElementById('output');
  if (!output) return;

  const morseText = output.value;
  const lang = getCurrentLanguage();

  if (morseText.includes('？')) {
    document.getElementById('whetherNext').src = "assets/png/困ったマールス.png";
    document.getElementById('next2').style.display = "none";
    if(lang === "English"){
     document.getElementById('marusu5').innerHTML = "Undefined character \"?\" is included, so you cannot proceed to input... Go back to name setting and remove the undefined character...!";
    }else{
        document.getElementById('marusu5').innerHTML = "君の名前には未対応の文字「？」が含まれているよ... 名前設定に戻って、未対応の文字を削除しよう...！";
    }
  }else{
  document.getElementById('whetherNext').src = "assets/png/喜びのマールス.png";
  document.getElementById('next2').style.display = "block";
  if(lang === "English"){
        document.getElementById('marusu5').innerHTML = "Now it's your turn to tap out some Morse code!<br>Move to the next screen using the button below!";

    }else{
        document.getElementById("marusu5").innerHTML = "今度は君がモールスをうってみてよ！<br>下のボタンから移動しよう！";
    }
  }

  
  goToStep(2);
  const storedKid = localStorage.getItem('ml_kid_mode');
  const enabled = storedKid === '1' || storedKid === 'true';
  if (enabled) {
          document.body.classList.add('kid-ui');
          changeKidsMode();
        }
}



/*==============================
====== 対応モールス表示機能 =====
================================ */
const correspondOutput = document.getElementById('CorrespondOutput');
const nameInput = document.getElementById('nameInput');

// 対応表を生成する関数
function generateCorrespondenceTable(inputText, outputID) {
  if (!outputID) return;
  if (!inputText.trim()) {
    outputID.value = '';
    return;
  }
  const current_language = getMorseCodeTable(getCurrentLanguage());
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
  const last = getLastOfCorrespond();
  outputID.value = correspondenceLines.join(last);
}
  

function convertName() {
  if (!nameInput) return;

  const name = nameInput.value.trim();
  if (!name) {
    showAlert('nameEmpty');
    return;
  }

  const userNameEl = document.getElementById('userName');
  if (userNameEl) userNameEl.textContent = name;

  if (typeof ChangeIroha === "function") {
    ChangeIroha('nameInput', 'output');
  }
  generateCorrespondenceTable(nameInput.value || '', correspondOutput);

  checkAndGoToInput();
}


/*==============================
==========　初期処理  ============
================================= */
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
        showAlert('noMorseToPlay2');
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
          try { outEl.select(); document.execCommand('copy'); if (copyMsg) { copyMsg.style.display = 'inline'; setTimeout(()=>{copyMsg.style.display="none";},1500); } } catch (e) { showAlert('copyFailed'); }
        });
      } else {
        // fallback
        try { outEl.select(); document.execCommand('copy'); if (copyMsg) { copyMsg.style.display = 'inline'; setTimeout(()=>{copyMsg.style.display="none";},1500);} } catch (e) { showAlert('copyFailed'); }
      }
    });
  }
  if (playBtn) {
    playBtn.addEventListener('click', function() {
      if (!wantToChangeInput) return;
      const rawMorse = (typeof DirectChangeIroha === 'function') ? DirectChangeIroha(wantToChangeInput.value || '') : (function(){ ChangeIroha('WantToChange', 'WantToChangeOutput'); return document.getElementById('WantToChangeOutput').value; })();
      if (!rawMorse || !rawMorse.trim()) { showAlert('noMorseToPlay'); return; }
      if (wantToChangeOutputHidden) { wantToChangeOutputHidden.value = rawMorse; }
      if (typeof playMorse === 'function') playMorse('WantToChangeOutputHidden');
    });
  }

  // mp3ダウンロードボタン
  if (downloadWantBtn) {
    downloadWantBtn.addEventListener('click', async function() {
      if (!wantToChangeInput) return;
      const rawMorse = (typeof DirectChangeIroha === 'function') ? DirectChangeIroha(wantToChangeInput.value || '') : (function(){ ChangeIroha('WantToChange', 'WantToChangeOutput'); return document.getElementById('WantToChangeOutput').value; })();
      if (!rawMorse || !rawMorse.trim()) { showAlert('noMorseToDownload'); return; }
      if (typeof isLineBrowser === 'function' && isLineBrowser()) {
        showAlert('lineDownloadNotSupported');
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
            showAlert('downloadCompleted', `\nファイル名: ${filenameToUse}`);
          } else {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a'); a.href = url; a.download = filenameToUse; a.click(); URL.revokeObjectURL(url);
            showAlert('downloadCompleted', `\nファイル名: ${filenameToUse}`);
          }
      } catch (err) {
        console.error(err);
        showAlert('mp3GenerationFailed');
      }
    });
  }
  if (downloadNameBtn) {
    downloadNameBtn.addEventListener('click', async function() {
      if (!wantToChangeInput) return;
      const rawMorse = (typeof DirectChangeIroha === 'function') ? DirectChangeIroha(nameInput.value || '') : (function(){return document.getElementById('output').value; })();
      if (!rawMorse || !rawMorse.trim()) { showAlert('noMorseToDownload'); return; }
      if (typeof isLineBrowser === 'function' && isLineBrowser()) {
        showAlert('lineDownloadNotSupported');
        return;
      }
      try {
        const blob = await morseToMp3(rawMorse);
        let originalText = nameInput.value || 'morse';
        originalText = originalText.replace(/[\\/:*?"<>|]/g, '_');
        if (originalText.length > 20) originalText = originalText.substring(0, 20) + '・・・';
        const filenameToUse = getDownloadFilename(originalText);
          if (typeof downloadBlob === 'function') {
            downloadBlob(blob, filenameToUse);
            showAlert('downloadCompleted', `\nファイル名: ${filenameToUse}`);
          } else {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a'); a.href = url; a.download = filenameToUse; a.click(); URL.revokeObjectURL(url);
            showAlert('downloadCompleted', `\nファイル名: ${filenameToUse}`);
          }
      } catch (err) {
        console.error(err);
        showAlert('mp3GenerationFailed');
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
  if (globalVolumeSlider) {
    const storedVol = localStorage.getItem('ml_volume');
    if (storedVol !== null) {
      globalVolumeSlider.value = storedVol;
    }
    globalVolumeValue.textContent = Math.round(Number(globalVolumeSlider.value) * 100) + '%';
    globalVolumeSlider.addEventListener('input', function() {
      const v = Number(this.value);
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

  // kid-modeが有効な場合は最後に再度適用する
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

/*===============================
===========ヒントボタン処理=======
================================= */
function playHintAudio() {
  if (typeof playMorse === "function") playMorse('NAME');
}

/*=======================================
==============  モールス信号表処理  ============
=======================================*/
function openMorseModal() {
  const currentLang = getCurrentLanguage(); 

  if(currentLang === "日本語"){
    // 日本語用表示
    const modal = document.getElementById('morseModal');
    if (modal && modal.style.display === "block"){modal.style.display = "none"; settingsBtn.style.display = "block";}
    else{ if (modal) modal.style.display = "block"; settingsBtn.style.display = "none";}

    // 念のため英語版が開いていたら閉じる(バグ対策)
    const modal2 = document.getElementById('morseModal2');
    if (modal2) modal2.style.display = "none";

  }else{
    // 英語・ローマ字用表示
    const modal2 = document.getElementById('morseModal2');
    if (modal2 && modal2.style.display === "block"){modal2.style.display = "none"; settingsBtn.style.display = "block";}
    else{ if (modal2) modal2.style.display = "block"; settingsBtn.style.display = "none";}

    // 念のため日本語版が開いていたら閉じる(バグ対策)
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

/*====================================
=====  ドロップダウンメニュー処理  =====
====================================*/
function toggleDropdown(event) {
  event.stopPropagation();
  event.currentTarget.parentElement.classList.toggle('open');
}

document.addEventListener('click', function() {
  document.querySelectorAll('.dropdown.open').forEach(el => el.classList.remove('open'));
});

/*==========================
=====  クイズ周辺の表示  =====
===========================*/
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
  const storedKid = localStorage.getItem('ml_kid_mode');
  const isKidMode = storedKid === '1' || storedKid === 'true';

  let heading, description, morseColHeader, wordColHeader, buttonText;

  if (isEnglish) {
    heading = 'Perfect Score! Congratulations!';
    description = 'Morse code you learned:';
    morseColHeader = 'Morse Code';
    wordColHeader = 'Word';
    buttonText = 'Complete';
  } else if (isKidMode) {
    heading = 'ぜんもんせいかい！おめでとう！！';
    description = 'あなたがせいかいしたもーるすしんごう：';
    morseColHeader = 'もーるすしんごう';
    wordColHeader = 'ことば';
    buttonText = 'おわりにする';
  } else {
    heading = '全問正解！おめでとうございます！';
    description = 'あなたが正解したモールス信号：';
    morseColHeader = 'モールス信号';
    wordColHeader = (lang === 'ローマ字' ? 'ローマ字' : '日本語');
    buttonText = '完了画面へ';
  }
  
  let twitterLabel, lineLabel;
  if (isEnglish) {
    twitterLabel = 'Share on X(Twitter)';
    lineLabel = 'Share on LINE';
  } else if (isKidMode) {
    twitterLabel = 'X(Twitter)でシェア';
    lineLabel = 'LINEでシェア';
  } else {
    twitterLabel = 'X(Twitter)でシェア';
    lineLabel = 'LINEでシェア';
  }

  let shareMessage = getShareMessage();
  let hashTags = getHashTags();
  let correctMorse = `${quizData.map(q => q.question).join('\n')}\n`;
  const rawUrl = getRowUrl();
  const shareText = correctMorse + shareMessage;
  const shareUrl = encodeURIComponent(rawUrl);
  const twitterFullText = encodeURIComponent(`${shareText}\n${rawUrl}\n${hashTags}`);
  const lineShareText = encodeURIComponent(`${shareText}\n${rawUrl}`);
  
  let html = `
    <h2>${heading}</h2>
    <p>${description}</p>
    <table class="result-table" style="margin: 0 auto;">
      <thead>
        <tr><th>${morseColHeader}</th><th>${wordColHeader}</th></tr>
      </thead>
      <tbody>
        ${quizData.map(q => `<tr><td>${q.question}</td><td>${q.answer}</td></tr>`).join('')}
      </tbody>
    </table>
    <div class="sns-share">
      <a class="sns-btn twitter" href="https://twitter.com/intent/tweet?text=${twitterFullText}" target="_blank" rel="noopener">${twitterLabel}</a>
      <a class="sns-btn line" href="https://social-plugins.line.me/lineit/share?url=${shareUrl}&text=${shareText}" target="_blank" rel="noopener">${lineLabel}</a>
    </div>
    <button class="main-button" onclick="goToStep(4);resetQuiz();">${buttonText}</button>
  `;
  document.getElementById("quiz-result").innerHTML = html;
  goToStep(6);
}


/*=================================
========== MP4再生 ================
==================================*/
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