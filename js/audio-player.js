let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let currentOscillators = [];

// モールス信号の再生
function playMorse(id){
    let morse =[];
    if(id == 'NAME'){morse = morse_name.join('／');}
    else{morse = document.getElementById(id).value;}

    // 前回の音を止める
    currentOscillators.forEach(osc => {
        try { osc.stop(); } catch (e) {}
    });
    currentOscillators = [];

    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }

    const dot = SPEED * speedRatio; 
    let time = audioCtx.currentTime; // 再生開始時刻

    if (time < audioCtx.currentTime) time = audioCtx.currentTime;

    time += 0.01;

    for(let char of morse){
        if(char === "・"){
            ring(audioCtx, time, dot);
            time += dot + dot; // 「・」 + 「空白」 ((1点 + 1点
        } else if(char === "－" || char === "-"){
            ring(audioCtx, time, dot * 3);
            time += dot * 3 + dot; // 「－」 + 「空白」 ((3点 + 1点
        } else if(char === "／"){
            time += dot * 2; // 文字と文字の間 3点(上の空白分 + 2点)
        } else if(char === " "){
            time += dot * 6; // 単語間 7点
        } else if(char === "？"){ //  ?の処理どうしよう
            time += dot * 6;
        }
    }
}

 //ビープ音を鳴らす
function ring(ctx, start, duration){
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    oscillator.type = "sine"; // sin波　
    // 音量の設定
    oscillator.frequency.setValueAtTime(frequency, start);
    gainNode.gain.setValueAtTime(volume, start); //音量volumeでスタート
    gainNode.gain.setValueAtTime(0, start + duration); //duration分たったら0にする 
    // 音の設定
    oscillator.connect(gainNode).connect(ctx.destination); //音量調整->スピーカに接続
    oscillator.start(start); //start時に始める
    oscillator.stop(start + duration);//duration経過で終了

    currentOscillators.push(oscillator); //現在のものを記録
}


// モールス信号をmp3ファイルに変換
async function morseToMp3(morseString) {
    const sampleRate = 44100; //サンプリング周波数
    let unit = SPEED * speedRatio;
    let totalDuration = 0;

    for (let char of morseString) {
        if (char === "・"){totalDuration += unit + unit;}
        else if (char === "－"){totalDuration += unit * 3 + unit;}
        else if (char === "／"){totalDuration += unit * 2;}
        else if (char === " "){totalDuration += unit * 6;}
    }

    const offlineCtx = new OfflineAudioContext(channels, sampleRate * totalDuration, sampleRate);
    let time = 0;

    for (let char of morseString) {
        if (char === "・") {
            addBeep(offlineCtx, time, unit, frequency);
            time += unit + unit;
        } else if (char === "－") {
            addBeep(offlineCtx, time, unit * 3, frequency);
            time += unit * 3 + unit;
        } else if (char === "／") {
            time += unit * 2;
        } else if (char === " ") {
            time += unit * 6;
        }
    }

    const audioBuffer = await offlineCtx.startRendering();
    return audioBufferToMp3(audioBuffer);
}


// 音をビープ音で鳴らす(録音用)
function addBeep(ctx, startTime, duration, frequency) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = frequency;
    osc.type = 'sine'; // sin波
    osc.connect(gain);
    gain.connect(ctx.destination);
    gain.gain.setValueAtTime(volume, startTime);
    gain.gain.setValueAtTime(0, startTime + duration);
    osc.start(startTime);
    osc.stop(startTime + duration);
}

// AudioBuffer → MP3 に変換
function audioBufferToMp3(audioBuffer) {
    const samples = audioBuffer.getChannelData(0);
    const mp3encoder = new lamejs.Mp3Encoder(channels, audioBuffer.sampleRate, 128);
    const sampleBlockSize = 1152;
    const mp3Data = [];

    for (let i = 0; i < samples.length; i += sampleBlockSize) {
        const sampleChunk = samples.subarray(i, i + sampleBlockSize);
        const int16Samples = new Int16Array(sampleChunk.length);
        for (let j = 0; j < sampleChunk.length; j++) {
            int16Samples[j] = sampleChunk[j] * 32767;
        }
        const mp3buf = mp3encoder.encodeBuffer(int16Samples);
        if (mp3buf.length > 0) mp3Data.push(mp3buf);
    }

    const mp3buf = mp3encoder.flush();
    if (mp3buf.length > 0) mp3Data.push(mp3buf);

    return new Blob(mp3Data, { type: 'audio/mp3' });
}

// 「・」のみ鳴らす
function playDot(){
    currentOscillators.forEach(osc => {
        try { osc.stop(); } catch (e) {}
    });
    currentOscillators = [];
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    const dot = SPEED * speedRatio; 
    let time = audioCtx.currentTime;
    ring(audioCtx,time,dot);
}

// 「ー」のみ鳴らす
function playDash(){
    currentOscillators.forEach(osc => {
        try { osc.stop(); } catch (e) {}
    });
    currentOscillators = [];
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    const dot = SPEED * speedRatio; 
    let time = audioCtx.currentTime; // 再生開始時刻
    ring(audioCtx,time,dot*3);
}


//LINEかどうかの判断(LINEだとダウンロードできないため)
function isLineBrowser() {
    const ua = navigator.userAgent.toLowerCase();
    return ua.includes("line");
}

// ダウンロード処理
function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}

async function generateMorseMp3(id) {
    const morse = document.getElementById(id).value;
    if (!morse.trim()) {
        showAlert('emptyMorse');
        return;
    }

    if (isLineBrowser()) {
        showAlert('cannotLINE');
        return;
    }

    const blob = await morseToMp3(morse);
    currentMp3Blob = blob;

    const btn = document.getElementById("downloadBtn");
    btn.style.display = "inline-block";
    btn.onclick = () => {
        let originalText = (typeof iroha_name !== 'undefined' && Array.isArray(iroha_name)) ? iroha_name.join("") : '';
        originalText = originalText.replace(/[\\/:*?"<>|]/g, '_');
        if (originalText.length > 20) originalText = originalText.substring(0, 20) + "・・・";
        const filename = (typeof getDownloadFilename === 'function') ? getDownloadFilename(originalText) : (`モールス信号_${originalText}.mp3`);
        downloadBlob(currentMp3Blob, filename);
        showAlert('downloadCompleted', `\nファイル名: ${filename}`);
    }

}



