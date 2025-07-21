const correctAnswer = 1;

    function checkAnswer(selected) {
      const result = document.getElementById("result");
      if (selected === correctAnswer) {
        result.textContent = "正解！";
        result.style.color = "green";
      } else {
        result.textContent = "不正解…もう一度試してみて！";
        result.style.color = "red";
      }
    }