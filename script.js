const timerEl = document.querySelector("#timer");
const startBtn = document.querySelector("#start");
const stopBtn = document.querySelector("#stop");
const resetBtn = document.querySelector("#reset");

//スタートした時の
let startTime = 0;
let elapsedTime = 0;
let timerId = null;

stopBtn.classList.add("inactive");
resetBtn.classList.add("inactive");

//経過時間を数える関数
const countUp = () => {
  const d = new Date(Date.now() - startTime + elapsedTime);
  const m = String(d.getMinutes()).padStart(2, "0");
  const s = String(d.getSeconds()).padStart(2, "0");
  const ms = String(d.getMilliseconds()).padStart(3, "0");
  timerEl.textContent = `${m}:${s}.${ms}`;

  timerId = setTimeout(() => {
    countUp();
  }, 10);
};

//「スタートボタン」にクリックイベントを登録する
startBtn.addEventListener("click", (e) => {
  //スタートボタンがクリック無効の場合、何もしない
  if (e.target.classList.contains("inactive")) return;

  //経過時間を取得し、タイマーをスタートさせる
  startTime = Date.now();
  countUp();

  //ボタンクリックの可・不可を設定する
  startBtn.classList.add("inactive");
  stopBtn.classList.remove("inactive");
  resetBtn.classList.add("inactive");
});

//「ストップボタン」にクリックイベントを登録する
stopBtn.addEventListener("click", (e) => {
  if (e.target.classList.contains("inactive")) return;

  //経過時間を記録して、タイマーをクリアする
  elapsedTime += Date.now() - startTime;
  clearTimeout(timerId);

  //ボタンクリックの可・不可を設定する
  startBtn.classList.remove("inactive");
  stopBtn.classList.add("inactive");
  resetBtn.classList.remove("inactive");
});

//「リセットボタン」にクリックイベントを登録する
resetBtn.addEventListener("click", (e) => {
  if (e.target.classList.contains("inactive")) return;

  //それぞれの値を初期状態に戻す
  elapsedTime = 0;
  timerEl.textContent = "00:00.000";
  clearTimeout(timerId);

  //ボタンクリックの可・不可を設定する
  startBtn.classList.remove("inactive");
  stopBtn.classList.add("inactive");
  resetBtn.classList.add("inactive");
});
