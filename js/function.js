function showTime() {
  const now = new Date();
  const time = now.toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const clock = document.getElementById("clock");

  if (clock) clock.innerText = time;
}

// gọi sau khi screen load
showTime();

const delay = (60 - new Date().getSeconds()) * 1000;

setTimeout(() => {
  showTime();
  setInterval(showTime, 60000);
}, delay);

