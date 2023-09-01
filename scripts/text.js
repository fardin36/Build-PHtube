// ✅ You can use a Quick one-liner hack
const ms = 54000000;
console.log(new Date(ms).toISOString().slice(11, 19)); // 👉️ 15:00:00

// ------------------------------------------------

// ✅ Or create a reusable function
function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

function convertMsToTime(milliseconds) {
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);

  seconds = seconds % 60;
  minutes = minutes % 60;
//   hours = hours % 24;

  return `${padTo2Digits(hours)}hrs ${padTo2Digits(minutes)}mins ${padTo2Digits(seconds)}secs`;
}

console.log(convertMsToTime(16278)); // 👉️ 15:00:00 (15 hours)
