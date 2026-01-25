let morse_name = [];
let invalidChars = [];

/*
入力元id(=inputID)と出力先id(=outputID)
「文字列」を「モールスコード」に変換 + 表示
*/
function ChangeIroha(inputID,outputID){
    const currentCodeTable = getMorseCodeTable(getCurrentLanguage());
    let morse = [];
    let getname = document.getElementById(inputID).value; 
    if(getCurrentLanguage() != "日本語") getname = hiraganaToRomaji(getname);
    let iroha = getname.split("");
    const separator = getSeparator();  
    const unknown = getUnknown();
    for(let char of iroha){
        const found = currentCodeTable.find(data => data[0] === char); //探索
        if(found){
            morse.push(found[1]);
        }else{ //未定義の文字があった場合
            morse.push(unknown)
        }
    }
    morse = morse.join(separator);
    document.getElementById(outputID).value = morse;
    if(inputID === "nameInput"){
        document.getElementById("downloadBtn").style.display = "none";
        morse_name = morse;
    }
    return morse;
}

/*
InputIroha = 文字列
「モールスに変換したい文字」を入力。直接変換して「モールスコード」を返す
 */
function DirectChangeIroha(InputIroha){
    const currentCodeTable = getMorseCodeTable(getCurrentLanguage());
    let morse = []; //初期化
    if(getCurrentLanguage() != "日本語") InputIroha = hiraganaToRomaji(InputIroha);
    InputIroha = InputIroha.split("");
    const separator = getSeparator();  
    const unknown = getUnknown();
    
    for(let char of InputIroha){
        const found = currentCodeTable.find(data => data[0] === char); //探索
        if(found){
            morse.push(found[1]);
        }else{ //未定義の文字があった場合
            morse.push(unknown);
        }
    }
    morse = morse.join(separator);
    return morse;
}


/*
inputID = 入力元のid 
checkAnswer = 答えを確認するかどうか(1:する, 0:しない)
入力元のモールス信号を文字に変換して返す
checkAnswer == 1 の場合文字が表示される
return 和文コード/欧文コード
*/ 
function ChangeMorse(inputID, checkAnswer){
    const currentCodeTable = getMorseCodeTable(getCurrentLanguage());
    const morseInput = document.getElementById(inputID).value;
    const separator = getSeparator();  
    const unknown = getUnknown();
    function escapeRegExp(string) {
    return   string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // 特殊文字を無効化
    }
    const regex = new RegExp(escapeRegExp(separator) + "{2,}", "g");
    let getMorse = morseInput.replace(regex, separator);
    getMorse = getMorse.split(separator);
    getMorse = getMorse.filter(Boolean);
    let result = "";
    invalidChars = [];
    for(let code of getMorse){
        const found = currentCodeTable.find(data => data[1] === code);
        if(found){
            result += found[0];
        }else{
            result += unknown;
            invalidChars.push(code);
        }
    }
    result = Conversion(result);

    // checkAnswerが1ならおめでとうが浮かびあがる可能性あり
    //　正解判定　空白部分（／）の連続は無視
    if((morseInput.replace(/／+/g, '／') === morse_name.split('／').join('／').replace(/／+/g, '／')) && checkAnswer === 1){
        showFloatingResult(result,1,invalidChars);
    }
    else{
        showFloatingResult(result,0,invalidChars);
    }
    return result;
}


/*
morse = モールス信号(例: ・－)
モールス信号入力すると対応する文字列をかえす
 */
function DirectChangeMorse(morse){
    const currentCodeTable = getMorseCodeTable(getCurrentLanguage());
    const getMorse = morse.split("／");
    let result = "";
    for(let code of getMorse){
        const found = currentCodeTable.find(data => data[1] === code);
        if(found){
            result += found[0];
        }else{
            result += "？";
        }
    }
    return result;
}

/*
array = ひらがな文字列
濁点で離れているひらがなを一つに統合
 */
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
           
function appendText(char,id) {
    const textbox = document.getElementById(id);
    if(!textbox) return;
    const start = textbox.selectionStart || 0;
    const end = textbox.selectionEnd || 0;
    const before = textbox.value.slice(0, start);
    const after = textbox.value.slice(end);
    textbox.value = before + char + after;
    const newPos = before.length + char.length;
    textbox.selectionStart = textbox.selectionEnd = newPos;
    textbox.focus();
    textbox.dispatchEvent(new Event('input'));
}

function deleteLast(id) {
    const textbox = document.getElementById(id);
    if(!textbox) return;
    const start = textbox.selectionStart || 0;
    const end = textbox.selectionEnd || 0;
    if(start !== end){
        const before = textbox.value.slice(0, start);
        const after = textbox.value.slice(end);
        textbox.value = before + after;
        textbox.selectionStart = textbox.selectionEnd = start;
    } else {
        const deleteStart = Math.max(0, start - 1);
        const before = textbox.value.slice(0, deleteStart);
        const after = textbox.value.slice(end);
        textbox.value = before + after;
        const newPos = deleteStart;
        textbox.selectionStart = textbox.selectionEnd = newPos;
    }
    textbox.focus();
    textbox.dispatchEvent(new Event('input'));
}

function clearText(id) {
    const textbox = document.getElementById(id);
    textbox.value = '';
    textbox.dispatchEvent(new Event('input'));
}

function resetInformation(){
    const resultDiv = document.getElementById("morseResult");
    const correctDiv = document.getElementById("correctMessage");
    resultDiv.textContent = "";
    correctDiv.textContent = "";
    const next3Btn = document.getElementById('next3');
    if (next3Btn) next3Btn.style.display = 'none';
}
/*
====================================
===== MP3 アップロード・解析機能 =====
====================================
*/
async function analyzeUploadedFile(){
    const input = document.getElementById('audioFile');
    const file = input.files && input.files[0];
    if(!file){
        return;
    }
    const reader = new FileReader();
    reader.onload = async function(e){
        const arrayBuffer = e.target.result;
        try{
            const morse = await analyzeAudioBuffer(arrayBuffer);
            document.getElementById('decodeInput').value = morse;
            document.getElementById('analyzedMorse').value = morse;
            document.getElementById('analyzedMorseToIroha').value = Conversion(showDecodedFromAnalyzed());
            convertRomajiAnalyzedToHiragana();
        }catch(err){
            showAlert('analysisFailed', err.message);
        }
    };
    reader.readAsArrayBuffer(file);
}


// テキストのモールスを元に文字に変換して表示
function showDecodedFromAnalyzed(){
    const morseStr = document.getElementById('analyzedMorse').value;
    if(!morseStr || morseStr.trim() === ''){
        showAlert('noAnalysisResult');
        return;
    }
    const decoded = DirectChangeMorse(morseStr);
    if(decoded){
        return decoded;
    }
}

// ローマ字文字列をひらがなに変換する
function romajiToHiragana(input){
    if(!input) return '';
    let s = input.toLowerCase();
    // 区切り文字をなくす
    s = s.replace(/[^a-z0-9\-\/\s]/g, '');
    const map = getmap("RtH");
    const keys = Object.keys(map).sort((a,b)=>b.length-a.length);
    let out = '';
    const isVowel = ch => /[aeiou]/.test(ch);
    const isConsonant = ch => /[bcdfghjklmnpqrstvwxyz]/.test(ch);

    for(let i=0;i<s.length;){
        // 特別処理: 'nn' => ん
        if(s.startsWith('nn', i)){
            out += 'ん';
            i += 2;
            continue;
        }
        // ちっちゃい「っ」の処理
        if(i+1 < s.length && s[i] === s[i+1] && isConsonant(s[i]) && s[i] !== 'n'){
            out += 'っ';
            i++;
            continue;
        }

        // 「n」の処理
        if(s[i] === 'n'){
            const next = s[i+1];
            if(!next || !isVowel(next)){
                // 次の文字が母音でない -> ん
                out += 'ん';
                i++;
                continue;
            }
            // 次の文字が母音ならなにもしない（次のループで処理）
        }

        let matched = false;
        for(const k of keys){
            if(s.startsWith(k, i)){
                out += map[k];
                i += k.length;
                matched = true;
                break;
            }
        }
        if(!matched){
            if(s[i] === ' ' || s[i] === '-' || s[i] === '/'){
                out += s[i];
                i++;
            } else {
                // 不明な文字は生データを使用
                out += s[i];
                i++;
            }
        }
    }
    return out;
}

// 解析結果のローマ字をひらがなに変換して表示
function convertRomajiAnalyzedToHiragana(){
    const morseVal = document.getElementById('analyzedMorse').value;
    if(!morseVal || !morseVal.trim()){
        showAlert('noMorseAnalyzed');
        return;
    }
    const decoded = showDecodedFromAnalyzed();
    const hira = romajiToHiragana(decoded);
    const outEl = document.getElementById('romajiToHiraResult');
    const currentLang = getCurrentLanguage();
    if(outEl) { 
        outEl.value = hira; 
        // 言語が「ローマ字」の時だけ表示し、それ以外は非表示にする
        if (currentLang === 'ローマ字') {
            outEl.style.display = "block";
        } else {
            outEl.style.display = "none";
        }
    }
}

function hiraganaToRomaji(input) {
    if (!input) return '';
    const map = getmap("HtR");
    // キーを文字数の長い順にソート（"きゃ" を "き" より先に判定するため）
    const keys = Object.keys(map).sort((a, b) => b.length - a.length);

    let output = '';
    let i = 0;

    while (i < input.length) {
        if (input[i] === 'っ' && i + 1 < input.length) {
            let nextRomaji = null;
            let nextHiraganaLen = 0;

            for (const key of keys) {
                if (input.substring(i + 1).startsWith(key)) {
                    nextRomaji = map[key];
                    nextHiraganaLen = key.length;
                    break;
                }
            }

            if (nextRomaji && !/^[aiueo]/.test(nextRomaji)) {
                output += nextRomaji[0]; // 最初の一文字を追加
                output += nextRomaji;    // 変換後のローマ字を追加
                i += 1 + nextHiraganaLen; // 「っ」 + 「次の文字分」進める
                continue;
            }
        }

        let matched = false;
        for (const key of keys) {
            if (input.substring(i).startsWith(key)) {
                output += map[key];
                i += key.length;
                matched = true;
                break;
            }
        }

        if (!matched) {
            output += input[i];
            i++;
        }
    }

    return output;
}

window.addEventListener('DOMContentLoaded', () => {
    const lang = document.getElementById("language"); 
    let mode = "JP";

    if(lang){
        lang.addEventListener("change", function (e) {
            changeLanguage(lang.value);
            if(lang.value === "日本語"){mode = "JP";}
            else if(lang.value === "ローマ字"){mode = "RO";}
            else{mode = "EN";}
        });
    }

    const audioInput = document.getElementById('audioFile');
    if(audioInput){
        audioInput.addEventListener('change', () => {
            // 新しいファイルが選択されたら解析結果をクリア
            const analyzedEl = document.getElementById('analyzedMorse');
            const analyzedToIrohaEl = document.getElementById('analyzedMorseToIroha');
            const romajiResultEl = document.getElementById('romajiToHiraResult');
            if(analyzedEl) analyzedEl.value = '';
            if(analyzedToIrohaEl) analyzedToIrohaEl.value = '';
            if(romajiResultEl) { romajiResultEl.value = ''; romajiResultEl.style.display = "none"; }
            analyzeUploadedFile();
        });
    }

    const correctSound = document.getElementById('correctSound');
    if(correctSound){
        correctSound.volume = 0.15; 
    }

    try {
        const storedLang = localStorage.getItem('ml_language');
        const preferred = storedLang || (lang && lang.value) || '日本語';
        if (lang) { lang.value = preferred; }
        const globalLang = document.getElementById('globalLanguage');
        if (globalLang) globalLang.value = preferred;
        if (typeof changeLanguage === 'function') changeLanguage(preferred);
    } catch (e) {
        console.warn('Failed to apply stored language', e);
    }
});

function decodeMorseFromText(){
    const input = document.getElementById('decodeInput').value;
    if(!input || input.trim() === "") return;
    let decoded = input.trim().replace(/[ 　\/]+/g, '／');
    decoded = decoded.trim().replace(/[-]+/g, '－');
    document.getElementById('analyzedMorse').value = decoded;
    decoded = DirectChangeMorse(decoded);
    decoded = Conversion(decoded);
    document.getElementById('analyzedMorseToIroha').value = decoded;
    convertRomajiAnalyzedToHiragana();
}





