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
      if (!confirm(getAlertMessage('confirmReset'))) return;
      const defaults = { volume: 0.8, speed: 1, frequency: 880, filenameFormat: 'input' };
      if (globalVolumeSlider) { globalVolumeSlider.value = defaults.volume; globalVolumeSlider.dispatchEvent(new Event('input')); }
      if (globalSpeedSelect) { globalSpeedSelect.value = defaults.speed; globalSpeedSelect.dispatchEvent(new Event('change')); }
      if (globalFrequencySlider) { globalFrequencySlider.value = defaults.frequency; globalFrequencySlider.dispatchEvent(new Event('input')); }
      if (globalFilenameFormat) { globalFilenameFormat.value = defaults.filenameFormat; globalFilenameFormat.dispatchEvent(new Event('change')); }
      
      localStorage.setItem('ml_volume', String(defaults.volume));
      localStorage.setItem('ml_speed', String(defaults.speed));
      localStorage.setItem('ml_frequency', String(defaults.frequency));
      localStorage.setItem('ml_filenameFormat', defaults.filenameFormat);

      showAlert('resetSettingsCompleted');
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
      // 入力欄をクリア
      document.getElementById('nameInput').value = "";
      document.getElementById('decodeInput').value = "";
      document.getElementById('WantToChange').value = "";
      
      if (typeof changeLanguage === 'function') {
        changeLanguage(val);
      }
      const convertBtn = document.getElementById('convertRomajiToHiraBtn');
      const romajiResult = document.getElementById('romajiToHiraResult');
      if (convertBtn) convertBtn.style.display = (val === 'ローマ字') ? 'inline-block' : "none";
      if (romajiResult) romajiResult.style.display = (val === 'ローマ字') ? "block" : "none";
      // 子ども表示が有効な場合は、言語切替後に子ども表示を再適用
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

/*音の高さを設定 */
function setFrequency(newFrequency){ 
    frequency = newFrequency;
}

/*現在の音の高さを返す */
function getFrequency(){return frequency;}

/*
newVolume = 0 ~ 1
音の大きさを設定
 */
function setVolume(newVolume){volume = Math.pow(newVolume, 2);}

/*
ratio = 倍率
モールスの流れる音の速さの変更
 */
function ChangeSpeed(ratio){
    speedRatio = 1.0 / ratio;
    const btn = document.getElementById("downloadBtn");
    btn.style.display = "none";
}

