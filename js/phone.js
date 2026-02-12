// thời gian
function showTime() {
  const now = new Date();
  const time = now.toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  document.getElementById("clock").innerText = time;
  document.getElementById("clock-3").innerText = time;
}
showTime();
const now = new Date();
const delay = (60 - now.getSeconds()) * 1000;

setTimeout(() => {
  showTime();
  setInterval(showTime, 60000);
}, delay);

// pin
if ("getBattery" in navigator) {
  navigator.getBattery().then((battery) => {
    function updateBattery() {
      const percent = Math.round(battery.level * 100);
      const icon = document.getElementById("batteryIcon");
      const text = document.getElementById("batteryText");
      const icon_3 = document.getElementById("batteryIcon-3");
      const text_3 = document.getElementById("batteryText-3");
      // reset class
      icon.className = "fa-solid";

      // ICON THEO % PIN
      if (percent > 75) {
        icon.classList.add("fa-battery-full");
      } else if (percent > 50) {
        icon.classList.add("fa-battery-three-quarters");
      } else if (percent > 25) {
        icon.classList.add("fa-battery-half");
      } else {
        icon.classList.add("fa-battery-empty");
      }
      text.innerText = `${percent}%`;
      icon.style.color = battery.charging ? "#22c55e" : "#ffffff";
      text_3.innerText = `${percent}%`;
      icon_3.style.color = battery.charging ? "#22c55e" : "#ffffff";
    }

    updateBattery();
    battery.addEventListener("levelchange", updateBattery);
    battery.addEventListener("chargingchange", updateBattery);
  });
}

// wifi
function updateNetwork() {
  const wifiIcon = document.getElementById("wifiIcon");
  const wifiIcon_3 = document.getElementById("wifiIcon-3");
  if (navigator.onLine) {
    wifiIcon.className = "fa-solid fa-wifi";
    wifiIcon.style.color = "#ffffff";
    wifiIcon.title = "Đang kết nối mạng";

    wifiIcon_3.className = "fa-solid fa-wifi";
    wifiIcon_3.style.color = "#ffffff";
    wifiIcon_3.title = "Đang kết nối mạng";
  } else {
    wifiIcon.className = "fa-solid fa-wifi-slash";
    wifiIcon.style.color = "#ef4444"; // đỏ
    wifiIcon.title = "Mất kết nối";

    wifiIcon_3.className = "fa-solid fa-wifi-slash";
    wifiIcon_3.style.color = "#ef4444"; // đỏ
    wifiIcon_3.title = "Mất kết nối";
  }
}

updateNetwork();
window.addEventListener("online", updateNetwork);
window.addEventListener("offline", updateNetwork);

function showDay() {
  const now = new Date();

  const weekdays = [
    "Chủ nhật",
    "Thứ hai",
    "Thứ ba",
    "Thứ tư",
    "Thứ năm",
    "Thứ sáu",
    "Thứ bảy",
  ];

  const dayName = weekdays[now.getDay()];
  const day = now.getDate();
  const month = now.getMonth() + 1;

  const text = `${dayName}, Tháng ${month} ${day}`;
  document.getElementById("date").innerText = text;
}
showDay();
const msToMidnight =
  (24 - now.getHours()) * 3600000 -
  now.getMinutes() * 60000 -
  now.getSeconds() * 1000;

// canh đúng 0h
setTimeout(() => {
  showDay();
  setInterval(showDay, 24 * 60 * 60 * 1000);
}, msToMidnight);

function showTime2() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, "0");
  const m = String(now.getMinutes()).padStart(2, "0");
  document.getElementById("big_time").innerText = `${h}:${m}`;
}

showTime2();

setTimeout(() => {
  showTime2();
  setInterval(showTime2, 60000);
}, delay);

const phone = document.querySelector(".phone");
const screen1 = document.querySelector(".screen-1");
const screen2 = document.querySelector(".screen-2");
const screen3 = document.querySelector(".screen-3");

/* ===== MỞ PASSCODE (LOCK → PASSCODE) ===== */
phone.addEventListener("pointerdown", () => {
  if (unlocked) return;
  if (!screen1.classList.contains("active")) return;

  screen1.classList.remove("active");
  screen1.classList.add("hide-up");
  screen2.classList.add("active");
});

/* ===== PASSCODE ===== */
const dots = document.querySelectorAll(".dot");
const buttons = document.querySelectorAll(".num");

const CORRECT_PASSWORD = "0707";
let input = "";
let unlocked = false;

buttons.forEach((btn) => {
  btn.addEventListener("pointerdown", () => {
    if (input.length >= 4) return;

    const value = btn.childNodes[0].nodeValue.trim();
    input += value;
    fillDots();

    if (input.length === 4) checkPassword();
  });
});

function fillDots() {
  dots.forEach((dot, i) => {
    dot.classList.toggle("filled", i < input.length);
  });
}

function checkPassword() {
  if (input === CORRECT_PASSWORD) {
    unlocked = true;

   // TẮT TOÀN BỘ SCREEN CŨ
    document.querySelectorAll(".screen").forEach(s => {
      s.classList.remove("active");
    });

    // BẬT DUY NHẤT SCREEN 3
    screen3.classList.add("active");
  } else {
    const box = document.querySelector(".passcode-dots");
    const lock = document.querySelector(".fa-lock");

    box.classList.add("shake");
    lock && lock.classList.add("shake");

    setTimeout(() => {
      box.classList.remove("shake");
      lock && lock.classList.remove("shake");
      resetPasscode();
    }, 400);
  }
}

function resetPasscode() {
  input = "";
  dots.forEach((dot) => dot.classList.remove("filled"));
}

/* ===== OPEN APP ===== */
const app = document.querySelector(".open-photos");
let opened = false;

app.addEventListener("pointerdown", (e) => {
  e.stopPropagation();
  if (!unlocked || opened) return;

  opened = true;
  console.log("OPEN APP"); // 👈 CHẮC CHẮN THẤY
  alert("Opren");
  app.classList.add("open");

  setTimeout(() => {
    window.location.href = app.dataset.link;
  }, 200);
});
