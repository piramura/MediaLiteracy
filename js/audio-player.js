let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let currentOscillators = [];

// モールス信号の再生
function playMorse(id){
    let morse =[];
    if(id == 'NAME'){morse = morse_name;}
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

/*=================================
===== アップロードされた音声解析 =====
===================================
ArrayBuffer を AudioBuffer にして解析する
*/
async function analyzeAudioBuffer(arrayBuffer){
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const audioBuffer = await ctx.decodeAudioData(arrayBuffer);
    const sampleRate = audioBuffer.sampleRate;
    const channelData = audioBuffer.getChannelData(0);

    // envelope を作成 (5ms window)
    const windowMs = 5; // ms
    const windowSize = Math.max(1, Math.floor(sampleRate * (windowMs/1000)));
    const envelope = [];
    let maxEnv = 0;
    for(let i = 0; i < channelData.length; i += windowSize){
        let sum = 0;
        let end = Math.min(i + windowSize, channelData.length);
        for(let j = i; j < end; j++){
            sum += Math.abs(channelData[j]);
        }
        let rms = sum / (end - i);
        envelope.push(rms);
        if(rms > maxEnv) maxEnv = rms;
    }

    // threshold を自動決定（ノイズの割合を考慮）
    const sorted = Array.from(envelope).sort((a,b)=>a-b);
    const noiseLevel = sorted[Math.floor(sorted.length * 0.25)] || 0; // 25%点
    const signalLevel = sorted[Math.floor(sorted.length * 0.98)] || maxEnv; // 98%点
    // threshold を noise と signal の中間的な値に設定
    let threshold = Math.max(noiseLevel + (signalLevel - noiseLevel) * 0.25, maxEnv * 0.06);

    // binary オン/オフ配列
    const onOff = envelope.map(v => v >= threshold ? 1 : 0);

    const segments = []; // {isOn: boolean, frames: n}
    let current = onOff[0];
    let count = 1;
    for(let i = 1; i < onOff.length; i++){
        if(onOff[i] === current){ count++; }
        else{ segments.push({isOn: !!current, frames: count}); current = onOff[i]; count = 1; }
    }
    segments.push({isOn: !!current, frames: count});

    // フレーム -> sec
    const unitSec = windowSize / sampleRate; // sec per envelope frame
    const toneDurations = segments.filter(s => s.isOn).map(s => s.frames * unitSec);
    const silenceDurations = segments.filter(s => !s.isOn).map(s => s.frames * unitSec);

    if(toneDurations.length === 0){
        throw new Error('音が検出できませんでした');
    }

    // 「・」の推定: 短いトーンの中央値
    const sortedTones = toneDurations.slice().sort((a,b)=>a-b);
    const cutoff = Math.max(1, Math.floor(sortedTones.length * 0.3));
    const shortestSlice = sortedTones.slice(0, cutoff);
    const dotUnit = median(shortestSlice);

    let morseStr = '';
    for(let i = 0; i < segments.length; i++){
        const seg = segments[i];
        if(seg.isOn){
            const dur = seg.frames * unitSec;
            if(dur <= dotUnit * 1.8){ morseStr += '・'; }
            else{ morseStr += '－'; }
        }else{
            const dur = seg.frames * unitSec;
            // silence 判定
            if(dur > dotUnit * 5){ // word間
                morseStr += ' '; // 区切り文字
            }else if(dur > dotUnit * 2.5){ // letter間
                morseStr += '／';
            }else{
                // なにもしない
            }
        }
    }
    morseStr = morseStr.replace(/／+/g,'／');
    morseStr = morseStr.replace(/(^／+|／+$)/g,'');
    return morseStr;
}

/*
音の長さの中央値を計算
解析時の「・」「ー」の区別のために使用
 */
function median(arr){
    if(arr.length === 0) return 0;
    const s = arr.slice().sort((a,b)=>a-b);
    const mid = Math.floor(s.length/2);
    if(s.length % 2 === 0) return (s[mid-1] + s[mid]) / 2;
    return s[mid];
}

