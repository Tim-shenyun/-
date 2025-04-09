let questions = [];
let currentIndex = 0;
let userAnswers = [];
let showAnswer = false;
let totalQuestions = 10;

async function startQuiz() {
  const countSelect = document.getElementById("question-count");
  totalQuestions = parseInt(countSelect.value);
  showAnswer = document.getElementById("show-answer-toggle").checked;
  const res = await fetch("questions.json");
  const data = await res.json();
  questions = shuffle(data).slice(0, totalQuestions);
  currentIndex = 0;
  userAnswers = [];
  renderQuestion();
}

function renderQuestion() {
  const container = document.getElementById("quiz-container");
  container.innerHTML = "";
  if (currentIndex >= questions.length) {
    container.innerHTML = "<h2>測驗完成！</h2>";
    return;
  }
  const q = questions[currentIndex];
  const div = document.createElement("div");
  div.className = "question";
  div.innerHTML = `<p><strong>第 ${currentIndex + 1} 題：</strong> ${q.question}</p>`;
  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => {
      const correct = q.answer === i;
      if (showAnswer) {
        btn.className = correct ? "correct" : "incorrect";
        setTimeout(() => {
          currentIndex++;
          renderQuestion();
        }, 800);
      } else {
        userAnswers.push({ qid: currentIndex, correct });
        currentIndex++;
        renderQuestion();
      }
    };
    div.appendChild(btn);
  });
  container.appendChild(div);
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}