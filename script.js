   const iroha = [
                ["あ","－－・－－"], //あ－0
                ["い","・－"], //い－1
                ["う","・・－"], //う－2
                ["え","－・－－－"], //え－3
                ["お","・－・・・"], //お－4
                ["か","・－・・"], //か－5
                ["き","－・－・・"], //き－6
                ["く","・・・－"], //く－7
                ["け","－・－－"], //け－8
                ["こ","－－－－"], //こ－9
                ["さ","－・－・－"], //さ－10
                ["し","－－・－・"], //し－11
                ["す","－－－・－"], //す－12
                ["せ","・－－－・"], //せ－13
                ["そ","－－－・"], //そ－14
                ["た","－・"], //た－15
                ["ち","・・－・"], //ち－16
                ["つ","・－－・"], //つ－17
                ["て","・－・－－"], //て－18
                ["と","・・－・・"], //と－19
                ["な","・－・"], //な－20
                ["に","－・－・"], //に－21
                ["ぬ","・・・・"], //ぬ－22
                ["ね","－－・－"], //ね－23
                ["の","・・－－"], //の－24
                ["は","－・・・"], //は－25
                ["ひ","－－・・－"], //ひ－26
                ["ふ","－－・・"], //ふ－27
                ["へ","・"], //へ－28
                ["ほ","－・・"], //ほ－29
                ["ま","－・・－"], //ま－30
                ["み","・・－・－"], //み－31
                ["む","－"], //む－32
                ["め","－・・・－"], //め－33
                ["も","－・・－・"], //も－34
                ["や","・－－"], //や－35
                ["ゐ","・－・・－"], //ゐ－36
                ["ゆ","－・・－－"], //ゆ－37
                ["ゑ","・－－・・"], //ゑ－38
                ["よ","－－"], //よ－39
                ["ら","・・・"], //ら－40
                ["り","－－・"], //り－41
                ["る","－・－－・"], //る－42
                ["れ","－－－"], //れ－43
                ["ろ","・－・－"], //ろ－44
                ["わ","－・－"], //わ－45
                ["を","・－－－"], //を－46
                ["ん","・－・－・"], //ん－47
                ["が","・－・・／・・"], //が－48
                ["ぎ","－・－・・／・・"], //ぎ－49
                ["ぐ","・・・－／・・"], //ぐ－50
                ["げ","－・－－／・・"], //げ－51
                ["ご","－－－－／・・"], //ご－52
                ["ざ","－・－・－／・・"], //ざ－53
                ["じ","－－・－・／・・"], //じ－54
                ["ず","－－－・－／・・"], //ず－55
                ["ぜ","・－－－・／・・"], //ぜ－56
                ["ぞ","－－－・／・・"], //ぞ－57
                ["だ","－・／・・"], //だ－58
                ["ぢ","・・－・／・・"], //ぢ－59
                ["づ","・－－・／・・"], //づ－60
                ["で","・－・－－／・・"], //で－61
                ["ど","・・－・・／・・"], //ど－62
                ["ば","－・・・／・・"], //ば－63
                ["び","－－・・－／・・"], //び－64
                ["ぶ","－－・・／・・"], //ぶ－65
                ["べ","・／・・"], //べ－66
                ["ぼ","－・・／・・"], //ぼ－67
                ["ぱ","－・・・／・・－－・"], //ぱ－68
                ["ぴ","－－・・－／・・－－・"], //ぴ－69
                ["ぷ","－－・・／・・－－・"], //ぷ－70
                ["ぺ","・／・・－－・"], //ぺ－71
                ["ぽ","－・・／・・－－・"], //ぽ－72
                ["ー","・－－・－"], //ー －73
                ["、","・－・－・－"], //、 －74
                ["(","－・－－・－"], //( －75
                [")","・－・・－・"], //) －76  
                ["0","－－－－－"], //0 －77
                ["1","・－－－－"], //1 －78
                ["2","・・－－－"], //2 －79
                ["3","・・・－－"], //3 －80
                ["4","・・・・－"], //4 －81
                ["5","・・・・・"], //5 －82
                ["6","－・・・・"], //6 －83
                ["7","－－・・・"], //7 －84
                ["8","－－－・・"], //8 －85
                ["9","－－－－・"], //9 －86
                //小文字は対応していないので大文字と同じ
                ["ぁ","－－・－－"], //ぁ－87
                ["ぃ","・－"], //ぃ－88
                ["ぅ","・・－"], //ぅ－89
                ["ぇ","－・－－－"], //ぇ－90
                ["ぉ","・－・・・"], //ぉ－91
                ["ゃ","・－－"], //ゃ－92
                ["ゅ","－・・－－"], //ゅ－93
                ["ょ","－－"], //ょ－94
                ["ゎ","－・－"], //ゎ－95
                ["゛","・・"],// 濁点 －96
                ["゜","・・－－・"], //半濁点 －97
                ["\n","・－・－・・"], //改行 －98
                ["っ","・－－・"], //っ－99
                ["",""] // 区切り連続でもok　-100
        ];

         const rome = [
            ["A","・－"],
            ["B","－・・・"],
            ["C","－・－・"],
            ["D","－・・"],
            ["E","・"],
            ["F","・・－・"],
            ["G","－－・"],
            ["H","・・・・"],
            ["I","・・"],
            ["J","・－－－"],
            ["K","－・－"],
            ["L","・－・・"],
            ["M","－－"],
            ["N","－・"],
            ["O","－－－"],
            ["P","・－－・"],
            ["Q","－－・－"],
            ["R","・－・"],
            ["S","・・・"],
            ["T","－"],
            ["U","・・－"],
            ["V","・・・－"],
            ["W","・－－"],
            ["X","－・・－"],
            ["Y","－・－－"],
            ["Z","－－・・"],
            ["0","－－－－－"], 
            ["1","・－－－－"], 
            ["2","・・－－－"], 
            ["3","・・・－－"],
            ["4","・・・・－"], 
            ["5","・・・・・"], 
            ["6","－・・・・"],
            ["7","－－・・・"], 
            ["8","－－－・・"], 
            ["9","－－－－・"], 
            [".","・－・－・－"],
            [",","－－・・－－"],
            [":","－－－・・・"],
            ["?","・・－－・・"],
            ["'","・－－－－・"],
            ["－","－・・・・－"],
            ["(","－・－－・"],
            [")","－・－－・－"],
            ["/","－・・－・"],
            ["=","－・・・－"],
            ["+","・－・－・"],
            ['"',"・－・・－・"],
            ["×","－・・－"],
            ["@","・－－・－・"]
        ];

        const ques = [
            ["電気通信大学ミュージアムのマスコットキャラクターと言えば？", "まーるす"],
            ["ありがとう","ありがとう"]
        ];

         const selection = [
            ["いまマールスは何を持っている？", "ばなな","りんご","いちご"]
        ];

        let getname;
        let iroha_name = [];
        let morse_name = [];
        let invalidChars = [];
        let speedRatio = 1;
        let SPEED = 0.15; // モールス信号の速さ(前の3倍遅い)
        let DIFFICULTY = 'normal'; //文字と文字の間隔 normalがスタンダート
        let frequency = 880; //モールスの音の高さ
        let currentMp3Blob = null; // 一番新しいmp3(Binary Large Object)
        const channels = 1; //チャンネル数
        let loudness = 1; //音の大きさ

        let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        let currentOscillators = [];
        let question;
        let correctanswer;
        let questionNumber = 0;

        //入力元と出力先を引数に渡すといろはをモールスに変えて出力する
        function ChangeIroha(inputID,outputID){
            morse_name = []; //初期化
            getname = document.getElementById(inputID).value;        
            iroha_name = getname.split("");
            for(let char of iroha_name){
                const found = iroha.find(data => data[0] === char); //探索
                if(found){
                    morse_name.push(found[1]);
                }else{ //未定義の文字があった場合
                    morse_name.push("？")
                }
            }
            let morse = morse_name.join('／');
            document.getElementById(outputID).value = morse;
            const btn = document.getElementById("downloadBtn");
            btn.style.display = "none";
            return morse;
        }

        //いろはを直接入れると対応するモールスを返す
        function DirectChangeIroha(IROHA){
             morse_name = []; //初期化
             IROHA = IROHA.split("");
              for(let char of IROHA){
                const found = iroha.find(data => data[0] === char); //探索
                if(found){
                    morse_name.push(found[1]);
                }else{ //未定義の文字があった場合
                    morse_name.push("？");
                }
            }
            let morse = morse_name.join('／');
            return morse;
        }

        // 2文字判定の濁点や半濁点のついた文字を1文字に
        function Conversion(array){
            array = array.split("か゛").join('が');
            array = array.split("き゛").join('ぎ');
            array = array.split("く゛").join('ぐ');
            array = array.split("け゛").join('げ');
            array = array.split("こ゛").join('ご');
            array = array.split("さ゛").join('ざ');
            array = array.split("し゛").join('じ');
            array = array.split("す゛").join('ず');
            array = array.split("せ゛").join('ぜ');
            array = array.split("そ゛").join('ぞ');
            array = array.split("た゛").join('だ');
            array = array.split("ち゛").join('ぢ');
            array = array.split("つ゛").join('づ');
            array = array.split("て゛").join('で');
            array = array.split("と゛").join('ど');
            array = array.split("は゛").join('ば');
            array = array.split("ひ゛").join('び');
            array = array.split("ふ゛").join('ぶ');
            array = array.split("へ゛").join('べ');
            array = array.split("ほ゛").join('ぼ');
            array = array.split("は゜").join('ぱ');
            array = array.split("ひ゜").join('ぴ');
            array = array.split("ふ゜").join('ぷ');
            array = array.split("へ゜").join('ぺ');
            array = array.split("ほ゜").join('ぽ');
            return array;
        }

        // モールス信号の再生
        function playMorse(id){
            // const morse = document.getElementById(id).value;
            let morse =[];
            if(id == 'NAME'){morse = morse_name.join('／');}
            else{morse = document.getElementById(id).value;}

            // 前回の音を止める
            currentOscillators.forEach(osc => {
                try { osc.stop(); } catch (e) {}
            });
            currentOscillators = [];

            // コンテキストをリセット（音が途中で残らないように）
            audioCtx.close();

            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const dot = SPEED * speedRatio; 
            let time = audioCtx.currentTime; // 再生開始時刻

            animateMorseFlow(morse);

            for(let char of morse){
                if(char === "・"){
                    ring(audioCtx, time, dot);
                    time += dot + dot; // 「・」 + 「空白」 ((1点 + 1点
                } else if(char === "－" || char === "-"){
                    ring(audioCtx, time, dot * 3);
                    time += dot * 3 + dot; // 「－」 + 「空白」 ((3点 + 1点
                } else if(char === "／" && DIFFICULTY === 'normal'){
                    time += dot * 2; // 文字と文字の間 3点(上の空白分 + 2点)
                } else if(char === "／" && DIFFICULTY === 'easy'){
                    time += dot * 5; // 文字と文字の間 6点(上の空白分 + 5点)
                } else if(char === "？"){ //  ?の処理どうしよう
                    time += dot ;
                }
            }
        }

        //ビープ音を鳴らす(聞くとき用)
        function ring(ctx, start, duration){
            const oscillator = ctx.createOscillator();
            const gainNode = ctx.createGain();
            oscillator.type = "sine";
            // 音量の設定
            oscillator.frequency.setValueAtTime(frequency, start);
            gainNode.gain.setValueAtTime(loudness, start); //音量loudnessでスタート
            gainNode.gain.setValueAtTime(0, start + duration); //duration分たったら0にする 
            // 音の設定
            oscillator.connect(gainNode).connect(ctx.destination); //音量調整->スピーカに接続
            oscillator.start(start); //start時に始める
            oscillator.stop(start + duration);//duration経過で終了

            currentOscillators.push(oscillator); //現在のものを記録
        }

        //モールス信号の書かれている場所を指定するといろはに変更
        function ChangeMorse(inputID){
            const morseInput = document.getElementById(inputID).value;
            const getMorse = morseInput.split("／");
            let result = "";
            invalidChars = [];
            for(let code of getMorse){
                const found = iroha.find(data => data[1] === code);
                if(found){
                    result += found[0];
                }else{
                    result += "？";
                    invalidChars.push(code);
                }
            }
            // showMorseResult(DirectChangeMorse(morseInput));
            result = Conversion(result);
            if(morseInput === morse_name.join('／')){
                showFloatingResult(result,1,invalidChars);
            }
            else{
                showFloatingResult(result,0,invalidChars);
            }
            return result;
        }

        //モールス信号を直接入れると対応するいろはをかえす
        function DirectChangeMorse(morse){
            const getMorse = morse.split("／");
            let result = "";
            for(let code of getMorse){
                const found = iroha.find(data => data[1] === code);
                if(found){
                    result += found[0];
                }else{
                    result += "？";
                }
            }
            return result;
        }



        //速さ変更
        function ChangeSpeed(ratio){
            speedRatio = 1.0 / ratio;
            const btn = document.getElementById("downloadBtn");
            btn.style.display = "none";
        }

        //空白の時間変更
        function ChangeDiff(diff){
            if(diff === 'easy'){DIFFICULTY = 'easy';}
            else if(diff === 'hard'){DIFFICULTY = 'hard';}
            else{DIFFICULTY = 'normal';}
        }

        //クイズの出題
        function AskQuestion(id){
            question = ques[questionNumber][0];
            correctanswer = ques[questionNumber][1];
            correctanswer = DirectChangeIroha(correctanswer);
            document.getElementById(id).textContent = question;
        }

        //クイズの答え合わせ
        function CheckAnswer(id){
            answer = document.getElementById(id).value;
            if(answer === correctanswer){
                window.alert("正解！！\n答え: " + DirectChangeMorse(correctanswer) +"\n" + "モールス: " + correctanswer);
            }else{window.alert("不正解...\n答え: " + DirectChangeMorse(correctanswer) +"\n"
                + "\nあなたの入力: " +  DirectChangeMorse(answer) + "\n正解のモールス信号: " + correctanswer
                 + "\nあなたの入力したモールス信号: " + answer);}
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
            osc.type = 'sine';
            osc.connect(gain);
            gain.connect(ctx.destination);
            gain.gain.setValueAtTime(loudness, startTime);
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

        // ダウンロード処理
        function downloadBlob(blob, filename) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = filename;
            a.click();
            URL.revokeObjectURL(url);
        }


        function isLineBrowser() {
            const ua = navigator.userAgent.toLowerCase();
            return ua.includes("line");
        }

        async function generateMorseMp3(id) {
        const morse = document.getElementById(id).value;
            if (!morse.trim()) {
                alert("何も入力されていません");
                return;
            }

            if (isLineBrowser()) {
                alert("LINEのブラウザではMP3をダウンロードできません。\n右下の「…」から「ブラウザで開く」またはSafari/Chromeで開いてください。");
                return;
            }

            const blob = await morseToMp3(morse);
            currentMp3Blob = blob;

            const btn = document.getElementById("downloadBtn");
            btn.style.display = "inline-block";
            btn.onclick = () => downloadBlob(currentMp3Blob, "morse.mp3");

        }

        //音の流れる速さを返す　〇倍速
        function getSpeedRatio(){ 
            return speedRatio;
        }

        //音の高さを返す　基本880Hz
        function getFrequency(){
            return frequency;
        }

        //音の大きさを返す 0~1
        function getVelocity(){ 
            return loudness;
        }
                
    function appendText(char,id) {
      const textbox = document.getElementById(id);
      textbox.value += char;
    }

    function deleteLast(id) {
      const textbox = document.getElementById(id);
      // 最後の1文字を削除（UTF-16コード単位に対応）
      textbox.value = textbox.value.slice(0, -1);
    }

    function clearText(id) {
      const textbox = document.getElementById(id);
      textbox.value = '';
    }


// ========================
// モールス信号のアニメーション
// ========================
// ===== モールスアニメーション調整用 =====
// 調整用定数
// const MORSE_ANIMATION_BASE_DURATION = 3; // 1点(dot)の長さ（秒）と合わせる

// const MORSE_ANIMATION_FLOW_DURATION = 10.0; // 画面を流れる時間（秒）お好みで調整

const DELAY_RATIO = 0.5; // 0.5倍に詰める（お好みで調整）

function setMorseEndPosition(value) {
  document.documentElement.style.setProperty('--morse-end-position', value);
}

function animateMorseFlow(morseStr) {
  const flow = document.getElementById('morseFlow');
  flow.innerHTML = '';
  let baseDelay = 0;
  const dot = SPEED;

  const flowWidth = flow.offsetWidth; // flow領域のpx幅
  const endMargin = 8000; // 追加距離(px) ぴ×20に対応
  const totalDistance = flowWidth + endMargin;

    const flowSpeed = 118 / speedRatio; 
    const animationDurationSec = totalDistance / flowSpeed;

    setMorseEndPosition(`${-totalDistance}px`);

    let delayRatio = DELAY_RATIO * speedRatio;

    for (let i = 0; i < morseStr.length; i++) {
        const ch = morseStr[i];
        if (!'・－／'.includes(ch)) continue;

        const span = document.createElement('span');
        span.className = 'morse-flow-char';
        span.textContent = ch;

        span.style.animationDelay = `${baseDelay * delayRatio}s`;
        span.style.animationDuration = `${animationDurationSec}s`;

        flow.appendChild(span);

        if (ch === "・"){baseDelay += dot + dot;}
        else if (ch === "－" || ch === "-"){baseDelay += dot*2 + dot;}
        else if (ch === "／"){baseDelay += dot * 2;}

    // const RATIO = 1.0/ speedRatio;

    // if( RATIO < 0.75){
    //     if (ch === "・"){baseDelay += dot * 0.35 + dot;}
    //     else if (ch === "－" || ch === "-"){baseDelay += dot*2.4 + dot;}
    //     else if (ch === "／"){baseDelay += dot * 0.9;}
    // }else if(0.75 <= RATIO && RATIO < 1){
    //     if (ch === "・"){baseDelay += dot * 0.55 + dot;}
    //     else if (ch === "－" || ch === "-"){baseDelay += dot * 3 + dot;}
    //     else if (ch === "／"){baseDelay += dot * 3.5;}
    // }else if(RATIO == 1){
    //     if (ch === "・"){baseDelay += dot * 1 + dot;}
    //     else if (ch === "－" || ch === "-"){baseDelay += dot * 5 + dot;}
    //     else if (ch === "／"){baseDelay += dot * 5;}
    //  }else if(1 < RATIO && RATIO <= 2){
    //     if (ch === "・"){baseDelay += dot * 2+ dot;}
    //     else if (ch === "－" || ch === "-"){baseDelay += dot * 10.5 + dot;}
    //     else if (ch === "／"){baseDelay += dot * 12;}
    //  }else if(2 < RATIO && RATIO <= 3){
    //     if (ch === "・"){baseDelay += dot * 0.5 + dot;}
    //     else if (ch === "－" || ch === "-"){baseDelay += dot * 13 + dot;}
    //     else if (ch === "／"){baseDelay += dot * 34;}
    //  }
    }

}

function showMorseResult(text){
    const resultDiv = document.getElementById("morseResult");
    resultDiv.textContent = text;
    
    // 再アニメーションのためのクラスリセット
    resultDiv.classList.remove("morse-float");
    void resultDiv.offsetWidth; // DOM再描画を強制
    resultDiv.classList.add("morse-float");
}

function showFloatingResult(text, isCorrect = false,invalidChars = []){
    const resultDiv = document.getElementById("morseResult");
    const correctDiv = document.getElementById("correctMessage");


    if (!text || text.trim() === "") {
        window.alert("モールス信号が空です。\nモールス信号を入力してください。");
        return;
    }

    if (text.includes("？")){
        const unique = [...new Set(invalidChars)].join("\n");
        window.alert(`存在しないモールス信号が含まれています:\n${unique}\n`);
        return;
    }

    // 変換文字表示
    resultDiv.textContent = text;
    resultDiv.classList.remove("morse-float");
    void resultDiv.offsetWidth;
    resultDiv.classList.add("morse-float");

    // 正解・不正解表示
    correctDiv.classList.remove("correct-float", "incorrect-float");
    void correctDiv.offsetWidth;

    if (isCorrect) {
        correctDiv.textContent = "正解！！";
        correctDiv.classList.add("correct-float");
    } else {
        correctDiv.textContent = ""
    }
}

function showJudgeMark(isCorrect) {
    const judgeMark = document.getElementById("judgeMark");

    // 判定マークの内容とスタイル設定
    if (isCorrect) {
        judgeMark.textContent = "〇";
        judgeMark.className = "judge-mark judge-correct";
    } else {
        judgeMark.textContent = "×";
        judgeMark.className = "judge-mark judge-incorrect";
    }

    // アニメーション再発火のため強制再描画
    void judgeMark.offsetWidth;
}
