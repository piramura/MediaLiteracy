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
                ["\n","・－・－・・"] //改行 －98
        ];

        const ques = [
            ["電気通信大学ミュージアムのマスコットキャラクターと言えば？", "まーるす"],
            ["ありがとう","ありがとう"]
        ];

         const selection = [
            ["いまマールスは何を持っている？", "ばなな",]
        ];

        let getname;
        let iroha_name = [];
        let morse_name = [];
        let speedRatio = 1;
        let SPEED = 0.05; // 
        let DIFFICULTY = 'hard';

        let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        let currentOscillators = [];
        let question;
        let correctanswer;
        let questionNumber = 0;

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
            return morse;
        }

        function DirectChangeIroha(IROHA){
             morse_name = []; //初期化
             IROHA = IROHA.split("");
              for(let char of IROHA){
                const found = iroha.find(data => data[0] === char); //探索
                if(found){
                    morse_name.push(found[1]);
                }else{ //未定義の文字があった場合
                    morse_name.push("？")
                }
            }
            let morse = morse_name.join('／');
            return morse;
        }

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

        function playMorse(id){
            // const morse = document.getElementById(id).value;
            let morse =[];
            if(id == 'NAME'){morse = morse_name.join('／');}
            else{morse = document.getElementById(id).value;}

            morse = morse.split('／').join('／');
        
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
            for(let char of morse){
                if(char === "・"){
                    ring(audioCtx, time, dot);
                    time += dot + dot; // 「・」 + 「空白」 ((1点 + 1点
                } else if(char === "－" || char === "-"){
                    ring(audioCtx, time, dot * 3);
                    time += dot * 3 + dot; // 「－」 + 「空白」 ((3点 + 1点
                } else if(char === "／" && DIFFICULTY === 'hard'){
                    time += dot * 2; // 文字と文字の間 3点(上の空白分 + 2点)
                } else if(char === "／" && DIFFICULTY === 'easy'){
                    time += dot * 5; // 文字と文字の間 6点(上の空白分 + 5点)
                } else if(char === "？"){ //  ?の処理どうしよう
                    time += dot * 7;
                }
            }
        }

        function ring(ctx, start, duration){
            const oscillator = ctx.createOscillator();
            const gainNode = ctx.createGain();
            oscillator.type = "sine";
            // 音量の設定
            oscillator.frequency.setValueAtTime(880, start);
            gainNode.gain.setValueAtTime(1, start); //音量1でスタート
            gainNode.gain.setValueAtTime(0, start + duration); //duration分たったら0にする 
            // 音の設定
            oscillator.connect(gainNode).connect(ctx.destination); //音量調整->スピーカに接続
            oscillator.start(start); //start時に始める
            oscillator.stop(start + duration);//duration経過で終了

            currentOscillators.push(oscillator); //現在のものを記録
        }

        function ChangeMorse(inputID){
            const morseInput = document.getElementById(inputID).value;
            const getMorse = morseInput.split("／");
            let result = "";
            for(let code of getMorse){
                const found = iroha.find(data => data[1] === code);
                if(found){
                    result += found[0];
                }else{
                    result += "？";
                }
            }
            result = Conversion(result);
            window.alert(result);
            if(morseInput === morse_name.join('／')){window.alert("正解！！");}
            else{window.alert("不正解...");}
            return result;
        }

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



        function ChangeSpeed(ratio){
            speedRatio = 1.0 / ratio;
        }

        function ChangeDiff(diff){
            if(diff === 'easy'){DIFFICULTY = 'easy';}
            else if(diff === 'hard'){DIFFICULTY = 'hard';}
        }

        function AskQuestion(id){
            question = ques[questionNumber][0];
            correctanswer = ques[questionNumber][1];
            correctanswer = DirectChangeIroha(correctanswer);
            document.getElementById(id).textContent = question;
        }

        function CheckAnswer(id){
            answer = document.getElementById(id).value;
            answer = answer.split('／').join('／');
            if(answer === correctanswer){
                window.alert("正解！！\n答え: " + DirectChangeMorse(correctanswer) +"\n" + "モールス: " + correctanswer);
            }else{window.alert("不正解...\n答え: " + DirectChangeMorse(correctanswer) +"\n"
                + "\nあなたの入力: " +  DirectChangeMorse(answer) + "\n正解のモールス信号: " + correctanswer
                 + "\nあなたの入力したモールス信号: " + answer);}
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
