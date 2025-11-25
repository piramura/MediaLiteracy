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
                ["。","・－・－・・"], //。 －98　改行を読点に
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
                ["",""], // 区切り連続でもok　-100
                /*以下全角 */
                ["（","－・－－・－"], //( －101
                ["）","・－・・－・"], //) －102 
                ["０","－－－－－"], //0 －103
                ["１","・－－－－"], //1 －104
                ["２","・・－－－"], //2 －105
                ["３","・・・－－"], //3 －106
                ["４","・・・・－"], //4 －107
                ["５","・・・・・"], //5 －108
                ["６","－・・・・"], //6 －109
                ["７","－－・・・"], //7 －110
                ["８","－－－・・"], //8 －111
                ["９","－－－－・"], //9 －112
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
            ["@","・－－・－・"],
            ["a","・－"], //小文字
            ["b","－・・・"],
            ["c","－・－・"],
            ["d","－・・"],
            ["e","・"],
            ["f","・・－・"],
            ["g","－－・"],
            ["h","・・・・"],
            ["i","・・"],
            ["j","・－－－"],
            ["k","－・－"],
            ["l","・－・・"],
            ["m","－－"],
            ["n","－・"],
            ["o","－－－"],
            ["p","・－－・"],
            ["q","－－・－"],
            ["r","・－・"],
            ["s","・・・"],
            ["t","－"],
            ["u","・・－"],
            ["v","・・・－"],
            ["w","・－－"],
            ["x","－・・－"],
            ["y","－・－－"],
            ["z","－－・・"],
            ["Ａ","・－"], //全角
            ["Ｂ","－・・・"],
            ["Ｃ","－・－・"],
            ["Ｄ","－・・"],
            ["Ｅ","・"],
            ["Ｆ","・・－・"],
            ["Ｇ","－－・"],
            ["Ｈ","・・・・"],
            ["Ｉ","・・"],
            ["Ｊ","・－－－"],
            ["Ｋ","－・－"],
            ["Ｌ","・－・・"],
            ["Ｍ","－－"],
            ["Ｎ","－・"],
            ["Ｏ","－－－"],
            ["Ｐ","・－－・"],
            ["Ｑ","－－・－"],
            ["Ｒ","・－・"],
            ["Ｓ","・・・"],
            ["Ｔ","－"],
            ["Ｕ","・・－"],
            ["Ｖ","・・・－"],
            ["Ｗ","・－－"],
            ["Ｘ","－・・－"],
            ["Ｙ","－・－－"],
            ["Ｚ","－－・・"],
            ["ａ","・－"], //全角小文字
            ["ｂ","－・・・"],
            ["ｃ","－・－・"],
            ["ｄ","－・・"],
            ["ｅ","・"],
            ["ｆ","・・－・"],
            ["ｇ","－－・"],
            ["ｈ","・・・・"],
            ["ｉ","・・"],
            ["ｊ","・－－－"],
            ["ｋ","－・－"],
            ["ｌ","・－・・"],
            ["ｍ","－－"],
            ["ｎ","－・"],
            ["ｏ","－－－"],
            ["ｐ","・－－・"],
            ["ｑ","－－・－"],
            ["ｒ","・－・"],
            ["ｓ","・・・"],
            ["ｔ","－"],
            ["ｕ","・・－"],
            ["ｖ","・・・－"],
            ["ｗ","・－－"],
            ["ｘ","－・・－"],
            ["ｙ","－・－－"],
            ["ｚ","－－・・"],
            ["（","－・－－・－"], //( －101
            [")","・－・・－・"], //) －102 
            ["０","－－－－－"], //0 －103
            ["１","・－－－－"], //1 －104
            ["２","・・－－－"], //2 －105
            ["３","・・・－－"], //3 －106
            ["４","・・・・－"], //4 －107
            ["５","・・・・・"], //5 －108
            ["６","－・・・・"], //6 －109
            ["７","－－・・・"], //7 －110
            ["８","－－－・・"], //8 －111
            ["９","－－－－・"], //9 －112
        ];

        let iroha_name = [];
        let morse_name = [];
        let quiz_iroha= [];
        let quiz_morse = [];
        let invalidChars = [];
        let speedRatio = 1;
        let SPEED = 0.15; // モールス信号の速さ(前の3倍遅い)
        let DIFFICULTY = 'normal'; //文字と文字の間隔 normalがスタンダート
        let frequency = 880; //モールスの音の高さ
        let currentMp3Blob = null; // 一番新しいmp3(Binary Large Object)
        const channels = 1; //チャンネル数
        let volume = 1; //音の大きさ

        let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        let currentOscillators = [];


        let current_language = iroha;
        let lang = document.getElementById("language");

        //入力元と出力先を引数に渡すといろはをモールスに変えて出力する
        function ChangeIroha(inputID,outputID){
            quiz_morse = [];
            const getname = document.getElementById(inputID).value;        
            quiz_iroha = getname.split("");
            for(let char of quiz_iroha){
                const found = current_language.find(data => data[0] === char); //探索
                if(found){
                    quiz_morse.push(found[1]);
                }else{ //未定義の文字があった場合
                    quiz_morse.push("？")
                }
            }
            let morse = quiz_morse.join('／');
            document.getElementById(outputID).value = morse;
            return morse;
        }


        // ダウンロードボタンの消去が上と違う
        function ChangeIrohaNAME(inputID,outputID){
            morse_name = []; //初期化
            const getname = document.getElementById(inputID).value;        
            iroha_name = getname.split("");
            for(let char of iroha_name){
                const found = current_language.find(data => data[0] === char); //探索
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
             quiz_morse = []; //初期化
             IROHA = IROHA.split("");
              for(let char of IROHA){
                const found = current_language.find(data => data[0] === char); //探索
                if(found){
                    quiz_morse.push(found[1]);
                }else{ //未定義の文字があった場合
                    quiz_morse.push("？");
                }
            }
            let morse = quiz_morse.join('／');
            return morse;
        }

        //いろはを直接入れると対応するモールスを返す
        function DirectChangeIrohaNAME(IROHA){
             morse_name = []; //初期化
             IROHA = IROHA.split("");
              for(let char of IROHA){
                const found = current_language.find(data => data[0] === char); //探索
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
            gainNode.gain.setValueAtTime(volume, start); //音量volumeでスタート
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
                const found = current_language.find(data => data[1] === code);
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
                const found = current_language.find(data => data[1] === code);
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

        // ダウンロード処理
        function downloadBlob(blob, filename) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = filename;
            a.click();
            URL.revokeObjectURL(url);
        }


        //LINEかどうかの判断
        function isLineBrowser() {
            const ua = navigator.userAgent.toLowerCase();
            return ua.includes("line");
        }

        // ダウンロード処理
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
            btn.onclick = () => {
                //ファイル名に現在時刻を採用
                // const now = new Date();
                // const timestamp = now.toISOString().replace(/[:.]/g, '-');
                //  const filename = `morse_${timestamp}.mp3`;

                //ファイル名に変換した文字を採用
                let originalText = iroha_name.join("");
                if (originalText.length > 20) {
                    originalText = originalText.substring(0, 20) + "・・・";
                }
                const filename = `モールス信号_${originalText}.mp3`;
                downloadBlob(currentMp3Blob, filename);
                window.alert(`ダウンロード完了！\nファイル名: ${filename}`);
            }

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
        function getVolume(){ 
            return volume;
        }

        //音の大きさを設定 0~1
        function setVolume(newVolume){ 
            volume = Math.pow(newVolume, 2); //音量を2乗して小さい音も聞こえるように
        }

        //音の高さを設定
        function setFrequency(newFrequency){ 
            frequency = newFrequency;
        }

        function setSpeed(){ 
            return speedRatio;
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

    const flowSpeed = 125 / speedRatio; // モールスのスピード
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
        correctDiv.textContent = "おめでとう🎉";
        correctDiv.classList.add("correct-float");
    } else {
        correctDiv.textContent = ""
    }
}

function showJudgeMark(isCorrect) {
    const judgeMark = document.getElementById("judgeMark");

    // 一旦 class を削除して強制的に初期化
    judgeMark.classList.remove("judge-correct", "judge-incorrect");

    // 強制再描画
    void judgeMark.offsetWidth;

    // 判定マークの内容とスタイル設定
    judgeMark.textContent ="";
    if (isCorrect === 1) {
        judgeMark.textContent = "〇";
        judgeMark.className = "judge-mark judge-correct";
    } else if(isCorrect === 0) {
        judgeMark.textContent = "×";
        judgeMark.className = "judge-mark judge-incorrect";
    }

}

function playDot(){
    currentOscillators.forEach(osc => {
        try { osc.stop(); } catch (e) {}
    });
    currentOscillators = [];
    audioCtx.close();
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const dot = SPEED * speedRatio; 
    let time = audioCtx.currentTime; // 再生開始時刻
    ring(audioCtx,time,dot);
}

function playDash(){
    currentOscillators.forEach(osc => {
        try { osc.stop(); } catch (e) {}
    });
    currentOscillators = [];
    audioCtx.close();
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const dot = SPEED * speedRatio; 
    let time = audioCtx.currentTime; // 再生開始時刻
    ring(audioCtx,time,dot*3);
}

// ===== MP3 アップロード・解析機能 =====
// ファイル入力から解析を行う
async function analyzeUploadedFile(){
    const input = document.getElementById('audioFile');
    const file = input.files && input.files[0];
    if(!file){
        alert('ファイルを選択してください');
        return;
    }
    const reader = new FileReader();
    reader.onload = async function(e){
        document.getElementById('analyzeInfo').textContent = '解析中...';
        const arrayBuffer = e.target.result;
        try{
            const morse = await analyzeAudioBuffer(arrayBuffer);
            document.getElementById('analyzedMorse').value = morse;
            document.getElementById('analyzedMorseToIroha').value = showDecodedFromAnalyzed();
            document.getElementById('analyzeInfo').textContent = '解析完了';
        }catch(err){
            console.error(err);
            alert('解析に失敗しました: ' + err.message);
            document.getElementById('analyzeInfo').textContent = '解析エラー';
        }
    };
    reader.readAsArrayBuffer(file);
}

// ArrayBuffer を AudioBuffer にして解析する
async function analyzeAudioBuffer(arrayBuffer){
    // decode
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

    // segment 化して時間を測る
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

    // dotUnit の推定: 短いトーンの中央値
    const sortedTones = toneDurations.slice().sort((a,b)=>a-b);
    const cutoff = Math.max(1, Math.floor(sortedTones.length * 0.3));
    const shortestSlice = sortedTones.slice(0, cutoff);
    const dotUnit = median(shortestSlice);

    // 構築：モールス表記(・,－,／)
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
                morseStr += '／'; // word gap (use same separator for simplicity)
            }else if(dur > dotUnit * 2.5){ // letter間
                morseStr += '／';
            }else{
                // intra element gap, do nothing
            }
        }
    }

    // 描画
    drawAudioCanvas('audioCanvas', channelData, sampleRate, envelope, threshold, windowSize);

    // クリーンアップ（連続の区切りを1つに）
    morseStr = morseStr.replace(/／+/g,'／');
    // 先頭末尾の不要区切りを除去
    morseStr = morseStr.replace(/(^／+|／+$)/g,'');
    return morseStr;
}

// median helper
function median(arr){
    if(arr.length === 0) return 0;
    const s = arr.slice().sort((a,b)=>a-b);
    const mid = Math.floor(s.length/2);
    if(s.length % 2 === 0) return (s[mid-1] + s[mid]) / 2;
    return s[mid];
}

// draw waveform + envelope + threshold marker
function drawAudioCanvas(canvasId, samples, sampleRate, envelope, threshold, windowSize){
    const canvas = document.getElementById(canvasId);
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width = canvas.clientWidth * (window.devicePixelRatio || 1);
    const h = canvas.height = canvas.clientHeight * (window.devicePixelRatio || 1);
    ctx.clearRect(0,0,w,h);
    ctx.save();
    // draw waveform in light gray
    ctx.fillStyle = '#f8f8f8';
    ctx.fillRect(0,0,w,h);
    ctx.strokeStyle = '#999';
    ctx.lineWidth = 1;
    ctx.beginPath();
    const step = Math.ceil(samples.length / w);
    for(let i = 0; i < w; i++){
        const idx = i * step;
        const v = samples[idx] || 0;
        const y = (1 - (v + 1) / 2) * h; // normalize between -1..1
        if(i === 0) ctx.moveTo(i, y);
        else ctx.lineTo(i, y);
    }
    ctx.stroke();

    // draw threshold and envelope as bars
    const envStep = envelope.length / w;
    for(let x = 0; x < w; x++){
        const idx = Math.floor(x * envStep);
        const val = envelope[idx] || 0;
        const barH = Math.min(1, val / (threshold*3)) * h;
        ctx.fillStyle = val >= threshold ? 'rgba(0,150,0,0.25)' : 'rgba(200,200,200,0.12)';
        ctx.fillRect(x, h - barH, 1, barH);
    }
    // threshold line
    ctx.strokeStyle = 'rgba(255,0,0,0.9)';
    ctx.beginPath();
    const thrY = h - Math.min(1, threshold / (threshold*3)) * h;
    ctx.moveTo(0, thrY);
    ctx.lineTo(w, thrY);
    ctx.stroke();
    ctx.restore();
}

// テキストのモールスを元に文字に変換して表示
function showDecodedFromAnalyzed(){
    const morseStr = document.getElementById('analyzedMorse').value;
    if(!morseStr || morseStr.trim() === ''){
        alert('解析結果がありません。まず音声を解析してください');
        return;
    }
    const decoded = DirectChangeMorse(morseStr);
    if(decoded){
        // show in morseResult area
        return decoded;
    }
}


lang.addEventListener("change", function (e) {
    changeLanguage(lang.value);
       document.getElementById("span4").textContent = lang.value;
    });

    // DOMContentLoaded でイベントバインド
    window.addEventListener('DOMContentLoaded', () => {
        const audioInput = document.getElementById('audioFile');
        if(audioInput){
            audioInput.addEventListener('change', () => {
                // optional: you can auto-analyze
                // analyzeUploadedFile();
                document.getElementById('analyzeInfo').textContent = 'ファイルが選択されました。解析ボタンを押してください';
            });
        }
    });

function changeLanguage(languageName){
    if(languageName === "日本語"){
        current_language = iroha;
    
        console.log("日本語選択\n");
        document.getElementById("h1").innerHTML = "🎵 モールス信号体験アプリ 📡";
        document.getElementById("inline-character-balloon").innerHTML = "僕と一緒にモールス信号を学ぼう！";
        document.getElementById("welcome-text").innerHTML = "モールス信号の世界へようこそ！<br>\
        あなたの名前をモールス信号に変換したり、実際にモールス入力を体験してみましょう。";
        document.getElementById("h2").innerHTML = "あなたのお名前を教えてください";
        document.getElementById("volume").innerHTML = "音量";
        document.getElementById("TestPlayback").innerHTML = "テスト再生";
        document.getElementById("start").innerHTML = "はじめる";
        document.getElementById("inputName").innerHTML = "名前入力";
        document.getElementById("change_playback").innerHTML = "変換・再生";
        document.getElementById("inputMores").innerHTML = "モールス入力";
        document.getElementById("finish").innerHTML = "完了";
        document.getElementById("input").innerHTML = "ひらがなで入力してね！";
        document.getElementById("nameInput").placeholder = "お名前をひらがなで入力(最大20文字)";
        document.getElementById("back").innerHTML = "戻る";
        document.getElementById("change").innerHTML = "変換する";
        
    }else{
        current_language = rome;
        console.log("English\n");
        document.getElementById("h1").innerHTML = "🎵 Morse Code Experience App 📡";
        document.getElementById("inline-character-balloon").innerHTML = "Let's learn Morse code together!";
        document.getElementById("welcome-text").innerHTML = "Welcome to the world of Morse code!<br>\
        Convert your name into Morse code, and try experiencing Morse code input for yourself.";
        document.getElementById("h2").innerHTML = "Please tell me your name.";
        document.getElementById("volume").innerHTML = "Volume";
        document.getElementById("TestPlayback").innerHTML = "Test Playback";
        document.getElementById("start").innerHTML = "START";
        document.getElementById("inputName").innerHTML = "Input your name";
        document.getElementById("change_playback").innerHTML = "Conversion and Playback";
        document.getElementById("inputMores").innerHTML = "モールス入力";
        document.getElementById("finish").innerHTML = "完了";
        document.getElementById("input").innerHTML = "ひらがなで入力してね！";
        document.getElementById("nameInput").placeholder = "お名前をひらがなで入力(最大20文字)";
        document.getElementById("back").innerHTML = "戻る";
        document.getElementById("change").innerHTML = "変換する";
    }
}


