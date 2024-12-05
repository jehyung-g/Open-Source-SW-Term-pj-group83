const { invoke } = window.__TAURI__.core;

let wordInputEl;
let scoreEl;
let questionEl;
let answerInputEl;
let addWordBtn;
let startBtn;
let submitAnswerBtn;

let wordDictionary = []; // Array to hold word pairs
let currentQuestion = null; // Current question word
let score = { correct: 0 };

// 단어 추가 기능
function addWord() {
  const inputValue = wordInputEl.value.trim();
  try {
    const parsedWords = JSON.parse(inputValue);
    if (parsedWords.words) {
      parsedWords.words.forEach((wordPair) => {
        if (wordPair.a && wordPair.b) {
          wordDictionary.push(wordPair);
        }
      });
      alert("단어가 추가되었습니다!");
    } else {
      alert("입력 형식이 올바르지 않습니다.");
    }
  } catch (e) {
    alert("JSON 형식이 올바르지 않습니다.");
  }
  wordInputEl.value = "";
  updateScore(); // 단어 추가 후 스코어 업데이트
}

// 퀴즈 시작 기능
function startQuiz() {
  if (wordDictionary.length === 0) {
    alert("단어장이 비어 있습니다! 단어를 추가해 주세요.");
    return;
  }
  score.correct = 0; // 점수 초기화
  updateScore();
  nextQuestion();
}

// 다음 문제 출력
function nextQuestion() {
  if (wordDictionary.length === 0) return;
  const randomIndex = Math.floor(Math.random() * wordDictionary.length);
  currentQuestion = wordDictionary[randomIndex];
  questionEl.textContent = `뜻: ${currentQuestion.b}`;
}

// 정답 제출 기능
function submitAnswer() {
  const userAnswer = answerInputEl.value.trim();
  if (!currentQuestion) {
    alert("퀴즈를 시작해 주세요!");
    return;
  }
  if (userAnswer === currentQuestion.a) {
    score.correct++;
    alert("정답입니다!");
  } else {
    alert(`오답입니다. 정답은 '${currentQuestion.a}'입니다.`);
  }
  answerInputEl.value = "";
  updateScore();
  nextQuestion();
}

// 스코어 업데이트
function updateScore() {
  const totalWords = wordDictionary.length;
  scoreEl.textContent = `score: ${score.correct}/${totalWords}`;
}

// DOMContentLoaded 이벤트 리스너
window.addEventListener("DOMContentLoaded", () => {
  wordInputEl = document.querySelector("#word-input");
  scoreEl = document.querySelector("#score");
  questionEl = document.querySelector("#question");
  answerInputEl = document.querySelector("#answer-input");
  addWordBtn = document.querySelector("#add-word-btn");
  startBtn = document.querySelector("#start-btn");
  submitAnswerBtn = document.querySelector("#submit-answer-btn");

  // 버튼 이벤트 리스너 추가
  addWordBtn.addEventListener("click", addWord);
  startBtn.addEventListener("click", startQuiz);
  submitAnswerBtn.addEventListener("click", submitAnswer);
});
