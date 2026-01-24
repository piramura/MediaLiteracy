/*
languageName = getCurrentLanguage();
"日本語","ローマ字","English"のいずれか。
すべてを対応する言語に変換する
 */
function changeLanguage(languageName){
    const romajiResult = document.getElementById('romajiToHiraResult');

    document.getElementById('analyzedMorse').value = '';
    document.getElementById('analyzedMorseToIroha').value = '';
    romajiResult.value = '';
    romajiResult.style.display = "none";

    document.getElementById('audioFile').value = '';

    if(languageName === "日本語" || languageName === "ローマ字"){

        // タイトル
        document.getElementById("inline-character-balloon").innerHTML = "僕と一緒にモールス信号を学ぼう！";
        document.getElementById("welcome-text").innerHTML = "モールス信号の世界へようこそ！<br>\
        あなたの名前をモールス信号に変換したり、実際にモールス入力を体験してみましょう。";
        document.getElementById("welcome-text2").innerHTML = "Welcome to the world of Morse code!<br>\
        Convert your name into Morse code, and try experiencing Morse code input for yourself.";
        document.getElementById("kid-Marse").innerHTML = "";
        document.getElementById("setteing-help").innerHTML = "右上の⚙️を押すと設定画面が開けます。使用言語などが変更可能です。小さいお子さん用にひらがなのみの設定も可能です。<br>";
        document.getElementById("setteing-help2").style.display = "block";
        document.getElementById("start").innerHTML = "はじめる";
        
        document.getElementById("GoToHenkan").innerHTML = "変換だけする";


        // ステップごとのラベル
        for(let i=0; i<=3; i++){
            const suffix = i;
             if(document.getElementById("inputName" + suffix)) document.getElementById("inputName" + suffix).innerHTML = "名前入力";
             if(document.getElementById("change_playback" + suffix)) document.getElementById("change_playback" + suffix).innerHTML = "変換・再生";
             if(document.getElementById("inputMores" + suffix)) document.getElementById("inputMores" + suffix).innerHTML = "モールス入力";
             if(document.getElementById("finish" + suffix)) document.getElementById("finish" + suffix).innerHTML = "完了";
        }

        // 名前入力画面
        document.getElementById("h2").innerHTML = "自分の名前を入力してみよう！<br>(例：まーるす)";
        document.getElementById("input").innerHTML = "僕の名前は「まーるす」！<br>特技はモールス信号を打つこと！<br>君の名前もモールス信号にしてあげるよ！";
        document.getElementById("nameInput").placeholder = "ひらがなで入力してね";
        document.getElementById("tellToMarse").innerHTML = "マールスに自分の名前を教えてみよう！";
        document.getElementById("back").innerHTML = "戻る";
        document.getElementById("change").innerHTML = "名前を確定！";

        // 変換・再生画面
        document.getElementById("henkan-h2").innerHTML = "モールス信号に変換しました！";
        document.getElementById("marusu2").innerHTML = "君の名前がモールスになった！<br>「・」と「ー」だけを使って文字を表現しているんだ！すごいでしょ！";
        document.getElementById("yourName").innerHTML = "<strong id='userName'></strong> さんのお名前は：";
        document.getElementById("listen-first").innerHTML = "🔊 音で聞いてみる";
        document.getElementById("MP3").innerHTML = "MP3変換";
        document.getElementById("downloadBtn").innerHTML = "MP3をダウンロード";
        document.getElementById("back2").innerHTML = "戻る";
        document.getElementById("next2").innerHTML = "モールスを入力してみる！";

        // モールス入力画面
        document.getElementById("h2InputExp").innerHTML = "自分の名前を入力してみよう！";
        document.getElementById("morseInput").placeholder = "ボタンで入力してください";
        document.getElementById("Tips").innerHTML = " ・挿入位置を指定して削除可能<br>・「／」で文字を区切るのを忘れずに";
        document.getElementById("hintBtn").innerHTML = "💡 ヒント";
        document.getElementById("checkMyAnswer").innerHTML = "✅答え合わせ";
        document.getElementById("back3").innerHTML = "戻る";
        document.getElementById("next3").innerHTML = "終わりにする";

        // 完了画面
        document.getElementById("otsukare").innerHTML = "🎉 おつかれさまでした！";
        document.getElementById("suggest").innerHTML = "クイズに挑戦してみませんか？";
        document.getElementById("back4").innerHTML = "タイトルに戻る";
        document.getElementById("next4").innerHTML = "クイズに挑戦してみる！";
        document.getElementById("quiz-question").innerHTML = "質問がここに表示されます";
        document.getElementById("allFinish").innerHTML = "終了";
        document.getElementById("quiz-next-btn").innerHTML = "次へ";

        // 設定画面
        document.getElementById("settings").innerHTML = "設定";
        document.getElementById("label_language").innerHTML = "使用言語(Language):";
        document.getElementById("globalLanguage").options[0].innerHTML = "日本語(和文)";
        document.getElementById("globalLanguage").options[1].innerHTML = "日本語(欧文)";
        document.getElementById("volume").innerHTML = "音量";
        document.getElementById("frequency").innerHTML = "音の高さ（周波数）";
        document.getElementById("speed").innerHTML = "再生速度";
        document.getElementById("filenameFormatLabel").innerHTML = "保存ファイル名:";
        document.getElementById("globalFilenameFormat").options[0].innerHTML = "入力単語を利用";
        document.getElementById("globalFilenameFormat").options[1].innerHTML = "現在時刻を利用";
        document.getElementById("kidModeLabel").innerHTML = "子ども表示:";
        document.getElementById("ExplainkidMode").textContent = "ひらがな中心のやさしい表記に切替";
        document.getElementById("resetSettings").innerHTML = "初期設定に戻す";
        document.getElementById("closeSettings").innerHTML = "閉じる";

        // モールス変換所
        document.getElementById("mo-rusuhenkanjo").innerHTML = "モールス変換所";
        document.getElementById("input_henkan").innerHTML = "モールスの解析や変換が出来るよ！";
        document.getElementById("kaiseki").innerHTML = "解析 (Upload & Analyze)";
        if(languageName === "日本語" ){
            document.getElementById("kaiseki_help").innerHTML = "ファイルを選択して「解析する」を押すと、検出されたモールス記号が表示されます。<br>\
            <b>現在の使用言語は日本語(かな)です。</b><br>(The current language in use is not English.)";
        }else if(languageName === "ローマ字" ){
            document.getElementById("kaiseki_help").innerHTML = "ファイルを選択して「解析する」を押すと、検出されたモールス記号が表示されます。<br>\
            <b>現在の使用言語は日本語(ローマ字)です。</b><br>(The current language in use is not English.)";
        }
        document.getElementById("audiofile").innerHTML = "モールス音声(mp3)をアップロードして解析:";
        document.getElementById("h3_henkan").innerHTML = "変換 (Convert Text)";
        if(languageName === "日本語" ){
            document.getElementById("henkan_help").innerHTML = "ここに変換したい文字を入力してください。使用言語には注意してください。<br>\
            <b>現在の使用言語は日本語(かな)です。</b><br>(The current language in use is not English.)";
        }else if(languageName === "ローマ字" ){
            document.getElementById("henkan_help").innerHTML = "ここに変換したい文字を入力してください。使用言語には注意してください。<br>\
            <b>現在の使用言語は日本語(ローマ字)です。</b><br>(The current language in use is not English.)";
        }
        document.getElementById("help-analyzeText").innerHTML = "入力したファイル、テキストは自動で解析されます。";
        document.getElementById("decodeInput").placeholder = "変換したいモールス信号をボタン入力、または貼り付け。";
        document.getElementById("WantToChange").placeholder = "変換したい文字を入力";
        document.getElementById("decodeInputLabel").innerHTML = "または、モールス信号を直接入力:";
        document.getElementById("henkan_help2").innerHTML = "入力したテキストは自動でモールスに変換されます。コピーや再生、MP3ダウンロードが可能です。";
        document.getElementById("copyWantToChangeBtn").innerHTML = "コピー";
        document.getElementById("playWantToChangeBtn").innerHTML = "🔊 再生";
        document.getElementById("downloadWantToChangeBtn").innerHTML = "MP3ダウンロード";
        document.getElementById("copyWantToChangeMsg").innerHTML = "コピーしました";
        document.getElementById("Separator").innerHTML = "区切り記号:";
        document.getElementById("／").innerHTML = "全角スラッシュ（／）";
        document.getElementById("/").innerHTML = "半角スラッシュ（/）";
        document.getElementById("space").innerHTML = "スペース";
        document.getElementById("chkLabelText").innerHTML = "未定義文字(？)を表示";
        document.getElementById("backToFst").innerHTML = "最初の画面へ";

        // モールス信号表
        document.getElementById("morseTbl").innerHTML = "モールス信号表";
        document.getElementById("moji").textContent = "文字";
        document.getElementById("hugou").textContent = "モールス符号";
        document.getElementById("morseTblBtn").textContent = "📖 モールス信号表";
        document.getElementById("play").textContent = "再生";

        // マールスの言葉
        document.getElementById("marusu3").innerHTML = "それぞれの文字はこんな感じで対応しているよ！";
        document.getElementById("marusu4").innerHTML = "実際にモールスを聞いてみよう！音をダウンロードすることもできるよ！";
        if(document.getElementById("next2").style.display === "none"){
            document.getElementById('marusu5').innerHTML = "君の名前には未対応の文字「？」が含まれているよ... 名前設定に戻って、未対応の文字を削除しよう...！";
        }else{
            document.getElementById("marusu5").innerHTML = "今度は君がモールスをうってみてよ！<br>下のボタンから移動しよう！";
        }
        document.getElementById("marusu6").innerHTML = "「・」（短音）と「－」（長音）と「／」(区切り) を組み合わせて文字を作るんだ！";
        document.getElementById("marusu7").innerHTML = "本当はボタンを押している長さで区別するけど、今回は簡単にボタンで入力しちゃおう！";
        document.getElementById("marusu8").innerHTML = "見慣れないボタンの説明をするね！<br>\
      DEL: 一文字消す<br>\
      C: 全て消す<br>\
      🔊: 現在の入力を再生・確認<br>";
        document.getElementById("marusu9").innerHTML = "困ったときは、「💡 ヒント」でさっきの音を聞けるよ！下のモールス信号表をクリックして対応を確認してみるのもいいね！";
        document.getElementById("marusu10").innerHTML = "自分の名前が完成したら「✅答え合わせ」を押してね！難しいけど、がんばって！";
        document.getElementById("marusu11").innerHTML = "モールス信号の体験はどうだった？おもしろかったかな？\
        昔の人たちはこの方法で遠くの人と連絡を取っていたりしたんだよ！詳しく知りたかったらぜひミュージアムで調べてみてね！";
        document.getElementById("marusu12").innerHTML = "3択クイズもあるんだけど、挑戦してみない？\
        きっとモールス信号の理解が深まるよ！";

    }else{
        current_language = rome;

        // タイトル
        document.getElementById("inline-character-balloon").innerHTML = "Let's learn Morse code together!";
        document.getElementById("welcome-text").innerHTML = "Welcome to the world of Morse code!<br>\
        Convert your name into Morse code, and try experiencing Morse code input for yourself.";
        document.getElementById("welcome-text2").innerHTML = "モールス信号の世界へようこそ！<br>\
        あなたの名前をモールス信号に変換したり、実際にモールス入力を体験してみましょう。";
        document.getElementById("setteing-help").innerHTML = "右上の⚙️を押すと設定画面が開けます。使用言語などが変更可能です。小さいお子さん用にひらがなのみの設定も可能です。<br>";
        document.getElementById("setteing-help2").style.display = "block";
        document.getElementById("h2").innerHTML = "Please tell me your name.<br>(ex: Marse)";
        document.getElementById("kid-Marse").innerHTML = "";
        document.getElementById("start").innerHTML = "Start";
        document.getElementById("GoToHenkan").innerHTML = "Conversion only";

        // ステップごとのラベル
        for(let i=0; i<=3; i++){
            const suffix = i;
             if(document.getElementById("inputName" + suffix)) document.getElementById("inputName" + suffix).innerHTML = "Input your name.";
             if(document.getElementById("change_playback" + suffix)) document.getElementById("change_playback" + suffix).innerHTML = "Conversion and Playback";
             if(document.getElementById("inputMores" + suffix)) document.getElementById("inputMores" + suffix).innerHTML = "Morse code input";
             if(document.getElementById("finish" + suffix)) document.getElementById("finish" + suffix).innerHTML = "Completed";
        }

        // 名前入力画面
        document.getElementById("input").innerHTML = "Please type in alphabet letters!";
        document.getElementById("nameInput").placeholder = "Please enter your name.";
        document.getElementById("tellToMarse").innerHTML = "Let's tell Marus your name!";
        document.getElementById("back").innerHTML = "Back";
        document.getElementById("change").innerHTML = "Convert";


        // 変換・再生画面
        document.getElementById("henkan-h2").innerHTML = "Converted to Morse code!";
        document.getElementById("marusu2").innerHTML = "Your name has become Morse code!";
        document.getElementById("yourName").innerHTML = "<strong id='userName'></strong>'s name is:";
        document.getElementById("listen-first").innerHTML = "🔊 Listen to it";
        document.getElementById("MP3").innerHTML = "MP3 Conversion";
        document.getElementById("downloadBtn").innerHTML = "Download MP3";
        document.getElementById("back2").innerHTML = "Back";
        document.getElementById("next2").innerHTML = "Next";

        // モールス入力画面
        document.getElementById("h2InputExp").innerHTML = "Try out Morse code input!";
        document.getElementById("morseInput").placeholder = "Please enter using the button.";
        document.getElementById("Tips").innerHTML = "・Deletion possible by specifying insertion position<br>";
        document.getElementById("hintBtn").innerHTML = "💡 Hint";
        document.getElementById("checkMyAnswer").innerHTML = "✅Check The Answer";
        document.getElementById("back3").innerHTML = "Back";
        document.getElementById("next3").innerHTML = "End it";

        // 完了画面
        document.getElementById("otsukare").innerHTML = "🎉 Great job!";
        document.getElementById("suggest").innerHTML = "Why not give the quiz a try?";
        document.getElementById("back4").innerHTML = "Return to the first page";
        document.getElementById("next4").innerHTML = "Simple Quiz";

        // クイズ画面
        document.getElementById("quiz-question").innerHTML = "Questions will appear here.";
        document.getElementById("allFinish").innerHTML = "End";
        document.getElementById("quiz-next-btn").innerHTML = "Next";


        // 設定画面
        document.getElementById("settings").innerHTML = "Settings";
        document.getElementById("label_language").innerHTML = "Language used(使用言語):";
        document.getElementById("globalLanguage").options[0].innerHTML = "日本語(和文)";
        document.getElementById("globalLanguage").options[1].innerHTML = "日本語(欧文)";
        document.getElementById("volume").innerHTML = "Volume";
        document.getElementById("frequency").innerHTML = "Frequency";
        document.getElementById("speed").innerHTML = "Playback speed";
        document.getElementById("filenameFormatLabel").innerHTML = "Saved file name:";
        document.getElementById("globalFilenameFormat").options[0].innerHTML = "Use the input word";
        document.getElementById("globalFilenameFormat").options[1].innerHTML = "Use the current time";
        document.getElementById("kidModeLabel").innerHTML = "Kids Mode:";
        document.getElementById("ExplainkidMode").textContent = "Switch to simple text for kids";
        document.getElementById("resetSettings").innerHTML = "Reset to factory settings";
        document.getElementById("closeSettings").innerHTML = "Close";

        // モールス変換所
        document.getElementById("mo-rusuhenkanjo").innerHTML = "Morse Code Station";
        document.getElementById("input_henkan").innerHTML = "You can analyze and convert Morse code!";
        document.getElementById("kaiseki").innerHTML = "解析 (Upload & Analyze)";
        document.getElementById("kaiseki_help").innerHTML = "Select a file and press “Analyze” to display the detected Morse code.<br>\
        <b>The current language in use is English.</b><br>(現在の使用言語は英語です。)";
        document.getElementById("audiofile").innerHTML = "Upload Morse code audio (mp3) for analysis:";
        document.getElementById("decodeInputLabel").innerHTML = "Or, enter Morse code directly:";
        document.getElementById("h3_henkan").innerHTML = "変換 (Convert Text)";
        document.getElementById("henkan_help").innerHTML = "Enter the text you want to convert here. Please be mindful of the language used.<br>\
        <b>The current language in use is English.</b><br>(現在の使用言語は英語です。)";
        document.getElementById("help-analyzeText").innerHTML = "Input files and text are automatically analyzed.";
        document.getElementById("decodeInput").placeholder = "Please input or paste the Morse code you want to convert.";
        document.getElementById("WantToChange").placeholder = "Enter the text you want to convert";
        document.getElementById("henkan_help2").innerHTML = "The text you enter is automatically converted to Morse code. You can copy, play back, or download it as an MP3 file.";
        document.getElementById("copyWantToChangeBtn").innerHTML = "Copy";
        document.getElementById("playWantToChangeBtn").innerHTML = "🔊 Play";
        document.getElementById("downloadWantToChangeBtn").innerHTML = "MP3 Download";
        document.getElementById("copyWantToChangeMsg").innerHTML = "Copied";
        document.getElementById("Separator").innerHTML = "Delimiter:";
        document.getElementById("／").innerHTML = "Full-width slash (／)";
        document.getElementById("/").innerHTML = "Half-width slash (/)";
        document.getElementById("space").innerHTML = "Space";
        document.getElementById("chkLabelText").innerHTML = "Display undefined character (?)";
        document.getElementById("backToFst").innerHTML = "Back to the first screen";

        // モールス信号表
        document.getElementById("morseTbl").innerHTML = "Morse Code Chart";
        document.getElementById("moji").textContent = "Characters";
        document.getElementById("hugou").textContent = "Morse code";
        document.getElementById("morseTblBtn").textContent = "📖 Morse Code Chart";
        document.getElementById("play").textContent = "play";
        

        // マールスの言葉
        document.getElementById("marusu3").innerHTML = "This is how each character corresponds to the code!";
        document.getElementById("marusu4").innerHTML = "Let's listen to actual Morse code! You can also download the audio!";
        if(document.getElementById("next2").style.display === "none"){
                  document.getElementById('marusu5').innerHTML = "Undefined character \"?\" is included, so you cannot proceed to input... Go back to name setting and remove the undefined character...!";
        }else{
                  document.getElementById('marusu5').innerHTML = "Now it's your turn to tap out some Morse code!<br>Move to the next screen using the button below!";
        }
        document.getElementById("marusu6").innerHTML = "You create characters by combining '.' (dots), '-' (dashes), and '/' (separators)!";
        document.getElementById("marusu7").innerHTML = "Normally, you distinguish them by how long you hold the button, but this time let's make it easy and use simple buttons!";
        document.getElementById("marusu8").innerHTML = "Let me explain the buttons!<br>\
            DEL: Delete one character<br>\
            C: Clear all<br>\
            🔊: Play and check your current input<br>";
        document.getElementById("marusu9").innerHTML = "If you get stuck, use '💡 Hint' to hear the sound again! You can also click '📖 Morse Code Chart' to check the characters.";
        document.getElementById("marusu10").innerHTML = "When you've finished your name, press '✅ Check The Answer'! It's tricky, but good luck!";
        document.getElementById("marusu11").innerHTML = "How did you like the Morse code experience? Was it fun?\
            A long time ago, people used this method to communicate over long distances! If you want to learn more, be sure to look it up at the museum!";
        document.getElementById("marusu12").innerHTML = "We also have a 3-choice quiz! Why not give it a try?\
            I'm sure it will help you understand Morse code even better!";
    }
    
    const currentName = document.getElementById('nameInput').value;
    const userNameEl = document.getElementById('userName');
    if (userNameEl) {
        userNameEl.textContent = currentName;
    }
}



/*
キッズモードを適用する場合次の言葉が適応される
*/
function changeKidsMode(){
    const lang = getCurrentLanguage();
     if(lang === "日本語" || lang === "ローマ字" ){

        // タイトル
        document.getElementById("h1").innerHTML = "🎵 もーるすしんごうであそぼう！📡";
        document.getElementById("inline-character-balloon").innerHTML = "ぼくといっしょにやってみない？";
        document.getElementById("welcome-text").innerHTML = "もーるすしんごうのせかいへようこそ！<br>\
        もーるすっていったいなんだろう。";
        document.getElementById("welcome-text2").innerHTML = "じつは「・」と「ー」だけで、ひらがなを\
        あらわせるんだ！きみのなまえももーるすにかえてみよう！";
        document.getElementById("setteing-help").innerHTML = "みぎうえの⚙️をおすとせっていをひらけるよ！おとのおおきさや、おとのはやさなどをかえることができるよ！";
        document.getElementById("setteing-help2").style.display = "none";
        document.getElementById("kid-Marse").innerHTML = '<br><br><img src="assets/png/やってみようマールス.png" alt="マールス" class="inline-character-img">';
        document.getElementById("start").innerHTML = "はじめてみる！";
        document.getElementById("GoToHenkan").innerHTML = "へんかんだけする！";

        // ステップごとのラベル
        for(let i=0; i<=3; i++){
        const suffix = i;
            if(document.getElementById("inputName" + suffix)) document.getElementById("inputName" + suffix).innerHTML = "なまえをにゅうりょく";
            if(document.getElementById("change_playback" + suffix)) document.getElementById("change_playback" + suffix).innerHTML = "へんかん・さいせい";
            if(document.getElementById("inputMores" + suffix)) document.getElementById("inputMores" + suffix).innerHTML = "もーるすにゅうりょく";
            if(document.getElementById("finish" + suffix)) document.getElementById("finish" + suffix).innerHTML = "おわり";
        }

        // 名前入力画面
        document.getElementById("h2").innerHTML = "あなたのなまえをおしえてね！<br>（れい：まーるす）";
        document.getElementById("input").innerHTML = "ぼくのなまえは「まーるす」！<br>きみのなまえはなあに？";
        document.getElementById("nameInput").placeholder = "なまえをひらがなでにゅうりょく";
        document.getElementById("tellToMarse").innerHTML = "まーるすにじぶんのなまえをおしえてみよう！";
        document.getElementById("back").innerHTML = "もどる";
        document.getElementById("change").innerHTML = "なまえをけってい！";

        // 変換・再生画面
        document.getElementById("henkan-h2").innerHTML = "もーるすしんごうになったよ！";
        document.getElementById("marusu2").innerHTML = "きみのなまえがもーるすになってるよ！すごい！";
        document.getElementById("yourName").innerHTML = "<strong id='userName'></strong> さんのおなまえは：";
        document.getElementById("listen-first").innerHTML = "🔊 おとできく";
        document.getElementById("MP3").innerHTML = "MP3（おと）にへんかん";
        document.getElementById("downloadBtn").innerHTML = "MP3（おと）をダウンロード";
        document.getElementById("back2").innerHTML = "なまえをいれなおす";
        document.getElementById("next2").innerHTML = "もーるすをうってみる！";
        document.getElementById("h2InputExp").innerHTML = "こんどはもーるすにゅうりょくをたいけんしてみよう！";

        // モールス入力画面
        document.getElementById("morseInput").placeholder = "ぼたんでもーるすしんごうをつくってね";
        document.getElementById("Tips").innerHTML = " ・ちょくせつもじはにゅうりょくできないよ<br>\
        ・じぶんでもじをけすいちはえらべるよ<br>・「／」くぎりのもじをわすれずにね";
        document.getElementById("hintBtn").innerHTML = "💡 ひんと";
        document.getElementById("checkMyAnswer").innerHTML = "✅こたえあわせ！";
        document.getElementById("back3").innerHTML = "もどる";
        document.getElementById("next3").innerHTML = "おわりにする";

        // 完了画面
        document.getElementById("otsukare").innerHTML = "🎉 おつかれさま！";
        document.getElementById("suggest").innerHTML = "くいずもやっていかない？";
        document.getElementById("back4").innerHTML = "はじめにもどる";
        document.getElementById("next4").innerHTML = "くいずをする！";
        document.getElementById("quiz-question").innerHTML = 'しつもんがここにひょうじされるよ';
        document.getElementById("allFinish").innerHTML = "やめる";
        document.getElementById("quiz-next-btn").innerHTML = "つぎへ";

        // 設定画面
        document.getElementById("settings").innerHTML = "せってい";
        document.getElementById("label_language").innerHTML = "つかうことば";
        document.getElementById("globalLanguage").options[0].innerHTML = "にほんご(ひらがな)";
        document.getElementById("globalLanguage").options[1].innerHTML = "にほんご(ろーまじ)";
        document.getElementById("volume").innerHTML = "おとのおおきさ";
        document.getElementById("frequency").innerHTML = "おとのたかさ";
        document.getElementById("speed").innerHTML = "おとのはやさ";
        document.getElementById("filenameFormatLabel").innerHTML = "ほぞんするふぁいるのなまえ:";
        document.getElementById("globalFilenameFormat").options[0].innerHTML = "いれたことばをつかう";
        document.getElementById("globalFilenameFormat").options[1].innerHTML = "いまのじかんをつかう";
        document.getElementById("resetSettings").innerHTML = "せっていをもとにもどす";
        document.getElementById("closeSettings").innerHTML = "とじる";

        // モールス変換所
        document.getElementById("mo-rusuhenkanjo").innerHTML = "もーるすへんかんじょ";
        document.getElementById("input_henkan").innerHTML = "もーるすの「かいせき(しらべる)」や「へんかん(つくる)」ができるよ！";
        document.getElementById("kaiseki").innerHTML = "かいせき";
        if(lang === "日本語" ){
            document.getElementById("kaiseki_help").innerHTML = "「かいせき」したい（しらべたい）おとのふぁいるをえらんでね！<br>\
            <b>いまつかっていることばは、にほんご（ひらがな）だよ。</b>";
        }else if(lang === "ローマ字" ){
            document.getElementById("kaiseki_help").innerHTML = "「かいせき」したいおとのふぁいるをえらんでね！<br>\
            <b>いまつかっていることばは、にほんご（ろーまじ）だよ。</b>";
        }
        document.getElementById("audiofile").innerHTML = "おとのふぁいるをえらんで「かいせき」:";
        document.getElementById("decodeInputLabel").innerHTML ="ここにじぶんでもーるすしんごうをいれてもいいよ！";
        document.getElementById("decodeInputLabel").innerHTML ="かんたんにもーるすしんごうをしらべられるよ！";
        document.getElementById("h3_henkan").innerHTML = "へんかん";
        if(lang === "日本語" ){
            document.getElementById("henkan_help").innerHTML = "「へんかん」したいもじをにゅうりょくしてね！<br>\
            <b>いまつかっていることばは、にほんご（ひらがな）だよ。</b>";
        }else if(lang === "ローマ字" ){
            document.getElementById("henkan_help").innerHTML = "「へんかん」したいもじをにゅうりょくしてね！<br>\
            <b>いまつかっていることばは、にほんご（ろーまじ）だよ。</b>";
        }
        document.getElementById("help-analyzeText").innerHTML = "せんたくしたふぁいるや、にゅうりょくしたもじはじどうでかいせきされるよ。";
        document.getElementById("decodeInput").placeholder = "もーるすしんごうをぼたんでつくったり、はりつけたりしてね。";
        document.getElementById("WantToChange").placeholder = "「へんかん」したいもじをいれてね！";
        document.getElementById("henkan_help2").innerHTML = "にゅうりょくしたもじは、もーるすしんごうにへんかんされて、したのばしょでみれるよ！<br>\
        へんかんされたもーるすしんごうは「こぴー」したり「さいせい（おとをきく）」したり「MP3（おとの）だうんろーど」ができるよ！";
        document.getElementById("copyWantToChangeBtn").innerHTML = "こぴーする";
        document.getElementById("playWantToChangeBtn").innerHTML = "🔊 さいせいする";
        document.getElementById("downloadWantToChangeBtn").innerHTML = "MP3（おとの）だうんろーど";
        document.getElementById("copyWantToChangeMsg").innerHTML = "こぴーしたよ！";
        document.getElementById("Separator").innerHTML = "くぎりきごう:";
        document.getElementById("／").innerHTML = "ぜんかくすらっしゅ（／）";
        document.getElementById("/").innerHTML = "はんかくすらっしゅ（/）";
        document.getElementById("space").innerHTML = "すぺーす";
        document.getElementById("chkLabelText").innerHTML = "へんかんできないもじを「？」でひょうじする";
        document.getElementById("backToFst").innerHTML = "さいしょのがめんにもどる";

        // モールス信号表
        document.getElementById("morseTbl").innerHTML = "もーるすしんごうひょう";
        document.getElementById("moji").textContent = "もじ";
        document.getElementById("hugou").textContent = "もーるすふごう";
        document.getElementById("morseTblBtn").textContent = "📖 もーるすしんごうひょう";
        document.getElementById("play").textContent = "おとをきく";
        


        // マールスの言葉
        document.getElementById("marusu3").innerHTML = "それぞれのおとはこんなかんじだよ！<br>\
        たとえば「あ」は「・－」ってかくんだ！いちばんみぎにある「／」はもじをくぎってるよ！";
        document.getElementById("marusu4").innerHTML = "この「・」とか「ー」がどんなおとをしているのか、きになるね！したのぼたんをおしてきいてみよう！おとをだうんろーどすることもできるよ。";
        if(document.getElementById("next2").style.display === "none"){
            document.getElementById("marusu5").innerHTML = "いま、きみのなまえに「？」があるね。「？」のぶぶんは、もーるすをたいけんできないから、なまえをいれなおそう！よくわからなかったらおとなのひとにきいてみてね！";
            console.log("undefined character in kids mode");
        }else{
            document.getElementById("marusu5").innerHTML = "こんどはきみがもーるすをうってみるばんだ！<br>まずしたのぼたんをおしてね！";
            console.log("undefined character in kids mode");
        }
        document.getElementById("marusu6").innerHTML = "「・」（みじかいおと）と「－」（ながいおと）と「／」(くぎり) をくみあわせてもじをつくるんだ！";
        document.getElementById("marusu7").innerHTML = "ほんとうはぼたんをおしているながさで、みじかいおとと、ながいおとをききわけるんだ。けど、こんかいはかんたんにぼたんをおしてつくってみよう！";
        document.getElementById("marusu8").innerHTML = "へんなぼたんのせつめいをするよ！<br>\
      DEL: ひともじけせるよ<br>\
      C: ぜんぶのもじをけせるよ<br>\
      🔊: いまつくったもーるすをかくにんできるよ<br>";
        document.getElementById("marusu9").innerHTML = "こまったときは、「💡 ひんと」でなまえのおとをきけるよ！したの「もーるすしんごうひょう」をたっちしてみるのもいいね！";
        document.getElementById("marusu10").innerHTML = "じぶんのなまえがかんせいしたら「✅こたえあわせ」をおしてね！むずかしいけど、がんばって！";
        document.getElementById("marusu11").innerHTML = "もーるすしんごうのたいけんはどうだった？おもしろかったかな？\
        むかしのひとたちはこのほうほうでとおくのひととれんらくをとっていたりしたんだよ！くわしくしりたかったらぜひみゅーじあむでしらべてみてね！";
        document.getElementById("marusu12").innerHTML = "3たくくいずもあるんだけど、やってみない？\
        きっともーるすしんごうのりかいがふかまるよ！";
     }else if(lang == "English"){
        document.getElementById("h1").innerHTML = "🎵 Let's Play with Morse Code! 📡";
        document.getElementById("inline-character-balloon").innerHTML = "Let's play together!";
        
        // タイトル周り
        document.getElementById("welcome-text").innerHTML = "Welcome! <br>Do you know Morse Code?";
        document.getElementById("welcome-text2").innerHTML = "We can write names using only dots (・) and lines (－)!<br>Let's turn your name into a cool secret code!";
        
        // 設定まわりの説明
        document.getElementById("setteing-help").innerHTML = "Ask an adult to help with Settings (⚙️) if you want to change sounds!";
        document.getElementById("setteing-help2").style.display = "none";
        
        // キャラクター画像（キッズのみ）
        document.getElementById("kid-Marse").innerHTML = '<br><br><img src="assets/png/やってみようマールス.png" alt="Marse" class="inline-character-img">';
        
        // 入力フォーム周り
        document.getElementById("h2").innerHTML = "What is your name?<br>(e.g. Marse)";
        document.getElementById("volume").innerHTML = "Loudness"; // または Sound Volume
        document.getElementById("start").innerHTML = "Let's Start!";
        
        // 各ステップのラベル
        document.getElementById("inputName").innerHTML = "Type Name";
        document.getElementById("change_playback").innerHTML = "Make & Listen"; // Conversion -> Make
        document.getElementById("inputMores").innerHTML = "Type Morse";
        document.getElementById("finish").innerHTML = "Done!"; // Completed -> Done
        
        // ステップごとのラベル
        for(let i=0; i<=3; i++){
            const suffix = i; // IDの数字処理
             if(document.getElementById("inputName" + suffix)) document.getElementById("inputName" + suffix).innerHTML = "Type Name";
             if(document.getElementById("change_playback" + suffix)) document.getElementById("change_playback" + suffix).innerHTML = "Make & Listen";
             if(document.getElementById("inputMores" + suffix)) document.getElementById("inputMores" + suffix).innerHTML = "Type Morse";
             if(document.getElementById("finish" + suffix)) document.getElementById("finish" + suffix).innerHTML = "Done!";
        }

        // マールスのセリフ
        document.getElementById("input").innerHTML = "Hi! I'm Marse.<br>What's your name?";
        document.getElementById("nameInput").placeholder = "Type your name in English";
        document.getElementById("tellToMarse").innerHTML = "Tell Marse your name!";
        
        // ボタン類
        document.getElementById("back").innerHTML = "Back";
        document.getElementById("change").innerHTML = "OK! (Make Morse)";
        document.getElementById("GoToHenkan").innerHTML = "Skip to Converter";
        
        // 結果画面
        document.getElementById("henkan-h2").innerHTML = "Look! It's Morse Code!";
        document.getElementById("marusu2").innerHTML = "Wow! Your name turned into dots and lines!<br>This is your secret code name!";
        document.getElementById("yourName").innerHTML = "<strong id='userName'></strong>'s Morse Code is:";
        
        // 再生・ダウンロード
        document.getElementById("listen-first").innerHTML = "🔊 Listen";
        document.getElementById("MP3").innerHTML = "Save Sound";
        document.getElementById("downloadBtn").innerHTML = "Save MP3 Sound";
        document.getElementById("back2").innerHTML = "Try Again";
        document.getElementById("next2").innerHTML = "Let's Tap Buttons!";
        
        // 入力体験画面
        document.getElementById("h2InputExp").innerHTML = "Let's try tapping Morse Code!";
        document.getElementById("morseInput").placeholder = "Tap the buttons below!";
        
        // ヒントなど
        document.getElementById("Tips").innerHTML = "Use the buttons to type!<br>Don't forget the slash (／) between letters!";
        document.getElementById("hintBtn").innerHTML = "💡 Hint";
        document.getElementById("checkMyAnswer").innerHTML = "✅ Check Answer";
        document.getElementById("back3").innerHTML = "Back";
        document.getElementById("next3").innerHTML = "Finish";
        
        // 終了・クイズ誘導
        document.getElementById("otsukare").innerHTML = "🎉 Good Job!";
        document.getElementById("suggest").innerHTML = "Do you want to try a Quiz?";
        document.getElementById("back4").innerHTML = "Go to Title";
        document.getElementById("next4").innerHTML = "Try Quiz!";
        document.getElementById("quiz-question").innerHTML = "Question comes here.";
        document.getElementById("allFinish").innerHTML = "Quit";
        document.getElementById("quiz-next-btn").innerHTML = "Next";

        // 設定画面
        document.getElementById("settings").innerHTML = "Settings";
        document.getElementById("label_language").innerHTML = "Language";
        
        document.getElementById("frequency").innerHTML = "Pitch";
        document.getElementById("speed").innerHTML = "Speed";
        document.getElementById("filenameFormatLabel").innerHTML = "File Name:";
        document.getElementById("resetSettings").innerHTML = "Reset";
        document.getElementById("closeSettings").innerHTML = "Close";

        // 変換所・解析
        document.getElementById("mo-rusuhenkanjo").innerHTML = "Morse Lab";
        document.getElementById("input_henkan").innerHTML = "Let's check or make Morse Code!";
        document.getElementById("kaiseki").innerHTML = "Check Sound";
        document.getElementById("kaiseki_help").innerHTML = "Choose a sound file and click 'Check Sound'.<br>We are using English now.";
        document.getElementById("audiofile").innerHTML = "Choose MP3 file:";
        document.getElementById("decodeInputLabel").innerHTML ="Or, type Morse code here:";
        document.getElementById("help-analyzeText").innerHTML = "Input files and text are automatically analyzed.";
        document.getElementById("decodeInput").placeholder = "Please input or paste the Morse code you want to convert.";


        
        document.getElementById("h3_henkan").innerHTML = "Make Morse";
        document.getElementById("henkan_help").innerHTML = "Type words here to make Morse code!";
        document.getElementById("WantToChange").placeholder = "Type here...";
        document.getElementById("henkan_help2").innerHTML = "You can copy, listen, or save the sound!";
        
        document.getElementById("copyWantToChangeBtn").innerHTML = "Copy";
        document.getElementById("playWantToChangeBtn").innerHTML = "🔊 Listen";
        document.getElementById("downloadWantToChangeBtn").innerHTML = "Save Sound";
        document.getElementById("copyWantToChangeMsg").innerHTML = "Copied!";
        
        document.getElementById("Separator").innerHTML = "Separator:";
        document.getElementById("space").innerHTML = "Space";
        document.getElementById("chkLabelText").innerHTML = "Show '?' for unknown letters";
        document.getElementById("backToFst").innerHTML = "Back to Title";
        
        document.getElementById("morseTbl").innerHTML = "Morse Chart";
        document.getElementById("moji").textContent = "Letter";
        document.getElementById("hugou").textContent = "Morse";
        document.getElementById("morseTblBtn").textContent = "📖 Morse Chart";
        document.getElementById("play").textContent = "Play";

        document.getElementById("kid-Marse").innerHTML = '<br><br><img src="assets/png/LetsGoMarse.png" alt="Marse" class="inline-character-img">';

        // マールスの説明セリフ (短くわかりやすく)
        document.getElementById("marusu3").innerHTML = "Look at the chart!<br>'A' becomes '・－'. Short sound and Long sound!";
        document.getElementById("marusu4").innerHTML = "Let's listen to the sound! You can save it too.";
        if(document.getElementById("next2").style.display === "none"){
            document.getElementById("marusu5").innerHTML = "There is a '?' in your name. I can't read it!<br>Let's fix your name. Please ask an adult for help.";
        }else{
        document.getElementById("marusu5").innerHTML = "Now it's your turn!<br>Tap the button below to start.";
        }
        document.getElementById("marusu6").innerHTML = "Combine '・'(Dot) and '－'(Dash) to make letters!";
        document.getElementById("marusu7").innerHTML = "Real Morse code uses timing, but here we just use buttons. It's easy!";
        document.getElementById("marusu8").innerHTML = "Buttons:<br>DEL: Erase one<br>C: Erase all<br>🔊: Listen";
        document.getElementById("marusu9").innerHTML = "Need help? Click '💡 Hint' to listen again!<br>Or check the Chart.";
        document.getElementById("marusu10").innerHTML = "When you are done, click '✅ Check Answer'!";
        document.getElementById("marusu11").innerHTML = "Was it fun? People used this code long ago to talk to faraway friends!";
        document.getElementById("marusu12").innerHTML = "Do you want to try a Quiz? It's fun!";
     }
    const currentName = document.getElementById('nameInput').value;
    const userNameEl = document.getElementById('userName');
    if (userNameEl) {
        userNameEl.textContent = currentName;
    }
}