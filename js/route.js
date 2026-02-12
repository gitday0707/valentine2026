const screensDiv = document.getElementById("screens");

async function navigate(screenName) {
  const screensDiv = document.getElementById("screens");
  const current = screensDiv.querySelector(".screen");

  // animate OUT
  if (current) {
    current.classList.remove("active");
    await wait(200);
  }

  // load screen mới
  const res = await fetch(`screens/${screenName}.html`);
  const html = await res.text();
  screensDiv.innerHTML = html;

  const next = screensDiv.querySelector(".screen");

  // animate IN
  requestAnimationFrame(() => {
    next.classList.add("active");
  });

  afterScreenLoaded(screenName);
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function afterScreenLoaded(screenName) {
  const blur = document.getElementById("global-blur");

  if (screenName === "screen-1") {
    initScreen1();
    enableUnlockLink();
  }
  if (screenName === "screen-2") {
    blur.classList.add("active");
    initPasscodeScreen();
    enableBackLink();
  } else {
    blur.classList.remove("active");
  }
  if (screenName === "screen-3") {
    initHomeScreen();
  }
  if (screenName === "messenger") {
    initMessengerScreen(); // ⭐ BẮT BUỘC
    enableBackToHome();
  }
  if (screenName === "photos") {
    initPhotosScreen(); // ⭐ BẮT BUỘC
    enableBackToHome();
  }

  if (screenName === "inlove") {
    initInloveScreen();
    enableBackToHome();
  }
}
let timeInterval = null;

function initScreen1() {
  const bigTime = document.getElementById("big_time");
  const date = document.getElementById("date");

  if (!bigTime || !date) return;

  function updateTime() {
    const now = new Date();

    bigTime.textContent =
      now.getHours().toString().padStart(2, "0") +
      ":" +
      now.getMinutes().toString().padStart(2, "0");

    date.textContent = now.toLocaleDateString("vi-VN", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  }

  updateTime();

  // ❗ clear interval cũ
  if (timeInterval) clearInterval(timeInterval);
  timeInterval = setInterval(updateTime, 1000);
}

document.addEventListener("DOMContentLoaded", () => {
  navigate("screen-1");
});

function enableUnlockLink() {
  const link = document.querySelector(".unlock");
  if (!link) return;
  link.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    navigate("screen-2");
  });
}

function initPasscodeScreen() {
  const dots = document.querySelectorAll(".dot");
  const buttons = document.querySelectorAll(".num");

  if (!dots.length || !buttons.length) return;

  const CORRECT_PASSWORD = "0707";
  let input = "";
  let locked = false;

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (locked || input.length >= 4) return;

      input += btn.dataset.value;

      updateDots();

      if (input.length === 4) checkPassword();
    });
  });

  function updateDots() {
    dots.forEach((dot, i) => {
      dot.classList.toggle("filled", i < input.length);
    });
  }

  function checkPassword() {
    if (input === CORRECT_PASSWORD) {
      navigate("screen-3");
    } else {
      const box = document.querySelector(".passcode-dots");
      const lock = document.querySelector(".fa-lock");

      locked = true;
      reset();

      box?.classList.add("shake");
      lock?.classList.add("shake");

      setTimeout(() => {
        locked = false;
        box?.classList.remove("shake");
        lock?.classList.remove("shake");
      }, 400);
    }
  }

  function reset() {
    input = "";
    dots.forEach((dot) => dot.classList.remove("filled"));
  }
}
function enableBackLink() {
  const back = document.querySelector(".back");
  if (!back) return;

  back.addEventListener("click", (e) => {
    e.preventDefault();
    navigate("screen-1");
  });
}
function initHomeScreen() {
  document.querySelectorAll(".apps[data-app]").forEach((app) => {
    app.addEventListener("click", () => {
      const name = app.dataset.app;
      navigate(name);
    });
  });
}

function initMessengerScreen() {
  const chat = document.getElementById("chat");
  const input = document.getElementById("chatInput");

  if (!chat || !input) return;

  const messages = [
    { text: "Cún ơi 🐶", side: "left" },
    { text: "Dạ 😄", side: "right" },
    { text: "Đây là năm valentine đầu tiên của chúng mình💑", side: "left" },
    { text: "A chúc tình yêu này sẽ kéo dài mãi mãi💞💞", side: "left" },
    { text: "Còn quá nhiều dịp trong tương lai để chúc💗💗", side: "left" },
    {
      text: "nên a sẽ để dành những lời chúc đấy cho các dịp sau nha 😇😇",
      side: "left",
    },
    {
      text: "Đây là món quà nho nhỏ a có thể làm dành tặng cho em ❤️😘",
      side: "left",
    },
    {
      text: "Anh chỉ muốn cảm ơn em đã bên anh thời gian qua 💋",
      side: "left",
    },
    { text: "Cảm ơn em, cô gái của anh 👧", side: "left" },
    {
      text: "Đây là món quà nho nhỏ a có thể làm dành tặng cho em 😘 ",
      side: "left",
    },
    { text: "Mong là em sẽ thích nó ", side: "left" },
    { text: "Anh yêu em rất nhiều 😍, ", side: "left" },
    { text: "Tình yêu của anh 🥰🥰", side: "left" },
    { text: "Nhớ đón giao thừa cùng nhau nha, iu em 🥰 💗", side: "left" },
    {
      text: "🥳🥳🥳",
      side: "left",
    },
    {
      text: "💋💋💋💋",
      side: "left",
    },
    {
      text: "💓💓💓",
      side: "left",
    },
    {
      text: "💟💟🌹🌹",
      side: "left",
    },
    {
      text: "Có lời nào nhắn gửi hãy nhập ở dưới rồi Enter, ILU 💗",
      side: "left",
    },
  ];

  let index = 0;

  function renderMessage(msg) {
    const div = document.createElement("div");
    div.className = `message ${msg.side}`;
    div.textContent = msg.text;

    if (msg.text === "💞") {
      div.classList.add("emoji-only");
    }

    div.textContent = msg.text;

    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
  }

  function showMessage() {
    if (index >= messages.length) return;
    renderMessage(messages[index]);
    index++;
  }

  // 👉 clear interval cũ nếu có
  if (window.messengerTimer) {
    clearInterval(window.messengerTimer);
  }

  window.messengerTimer = setInterval(showMessage, 2000);
  // ===== INPUT HANDLER =====
  const heart = document.querySelector(".icon_heart");

  if (heart) {
    heart.addEventListener("click", () => {
      renderMessage({
        text: "💞",
        side: "right",
      });
    });
  }

  input.addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;

    const value = input.value.trim();
    if (!value) return;

    renderMessage({
      text: value,
      side: "right",
    });

    input.value = "";
  });
}
function enableBackToHome() {
  const back = document.querySelector(".back-home");
  if (!back) return;

  back.addEventListener("click", (e) => {
    e.preventDefault();
    navigate("screen-3");
  });
}

function initPhotosScreen() {
  const grid = document.getElementById("photosGrid");
  const viewer = document.getElementById("photoViewer");
  const viewerImg = document.getElementById("viewerImg");
  const viewerVideo = document.getElementById("viewerVideo");
  const closeBtn = viewer.querySelector(".close");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  if (!grid) return;

  let filesData = [];
  let currentIndex = 0;
  let zoomed = false;

  /* ===== LOAD GALLERY ===== */
  fetch("data/gallery.json")
    .then((res) => res.json())
    .then((files) => {
      filesData = files;
      grid.innerHTML = "";

      files.forEach((file, index) => {
        if (file.type === "image") {
          const img = document.createElement("img");
          img.src = file.src;
          img.onclick = () => openViewer(index);
          img.onerror = () => img.remove();
          grid.appendChild(img);
        }

        if (file.type === "video") {
          const video = document.createElement("video");
          video.src = file.src;
          video.muted = true;
          video.playsInline = true;
          video.onclick = () => openViewer(index);
          video.onerror = () => video.remove();
          grid.appendChild(video);
        }
      });
    });

  /* ===== OPEN VIEWER ===== */
  function openViewer(index) {
    currentIndex = index;
    viewer.style.display = "flex";
    zoomed = false;
    renderViewer();
  }

  /* ===== RENDER ===== */
  function renderViewer() {
    const file = filesData[currentIndex];

    viewerImg.style.display = "none";
    viewerVideo.style.display = "none";
    viewerVideo.pause();

    viewerImg.style.transform = "scale(1)";
    viewerVideo.style.transform = "scale(1)";

    if (file.type === "image") {
      viewerImg.src = file.src;
      viewerImg.style.display = "block";
    }

    if (file.type === "video") {
      viewerVideo.src = file.src;
      viewerVideo.style.display = "block";
      viewerVideo.play();
    }
  }

  /* ===== CLOSE ===== */
  closeBtn.onclick = () => {
    viewer.style.display = "none";
    viewerVideo.pause();
  };

  /* ===== NEXT / PREV (PC BUTTON) ===== */
  prevBtn?.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      renderViewer();
    }
  });

  nextBtn?.addEventListener("click", () => {
    if (currentIndex < filesData.length - 1) {
      currentIndex++;
      renderViewer();
    }
  });

  /* ===== KEYBOARD ===== */
  document.addEventListener("keydown", (e) => {
    if (viewer.style.display !== "flex") return;

    if (e.key === "ArrowLeft" && currentIndex > 0) {
      currentIndex--;
      renderViewer();
    }

    if (e.key === "ArrowRight" && currentIndex < filesData.length - 1) {
      currentIndex++;
      renderViewer();
    }

    if (e.key === "Escape") {
      viewer.style.display = "none";
    }
  });

  /* ===== SWIPE (MOBILE) ===== */
  let startX = 0;

  viewer.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  viewer.addEventListener("touchend", (e) => {
    const endX = e.changedTouches[0].clientX;
    const diff = endX - startX;

    if (Math.abs(diff) < 50) return;

    if (diff > 0 && currentIndex > 0) {
      currentIndex--;
      renderViewer();
    }

    if (diff < 0 && currentIndex < filesData.length - 1) {
      currentIndex++;
      renderViewer();
    }
  });

  /* ===== DOUBLE TAP / DOUBLE CLICK ZOOM ===== */
  function toggleZoom(target) {
    zoomed = !zoomed;
    target.style.transform = zoomed ? "scale(2)" : "scale(1)";
    target.style.cursor = zoomed ? "zoom-out" : "zoom-in";
  }

  viewerImg.addEventListener("dblclick", () => toggleZoom(viewerImg));
  viewerVideo.addEventListener("dblclick", () => toggleZoom(viewerVideo));
}

function initInloveScreen() {
  const canvas = document.getElementById("pinkboard");
  if (!canvas) return;

  /*
   * Mobile optimized Heart Canvas
   */
  var settings = {
    particles: {
      length: 1200,
      duration: 2,
      velocity: 90,
      effect: -1.3,
      size: 12,
    },
  };

  /* ===== RAF POLYFILL ===== */
  (function () {
    let lastTime = 0;
    const vendors = ["ms", "moz", "webkit", "o"];
    for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      window.requestAnimationFrame =
        window[vendors[x] + "RequestAnimationFrame"];
      window.cancelAnimationFrame =
        window[vendors[x] + "CancelAnimationFrame"] ||
        window[vendors[x] + "CancelRequestAnimationFrame"];
    }

    if (!window.requestAnimationFrame) {
      window.requestAnimationFrame = function (callback) {
        const currTime = Date.now();
        const timeToCall = Math.max(0, 16 - (currTime - lastTime));
        const id = setTimeout(
          () => callback(currTime + timeToCall),
          timeToCall,
        );
        lastTime = currTime + timeToCall;
        return id;
      };
    }
  })();

  /* ===== POINT ===== */
  function Point(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  }

  Point.prototype.clone = function () {
    return new Point(this.x, this.y);
  };

  Point.prototype.length = function (len) {
    if (len === undefined) return Math.sqrt(this.x * this.x + this.y * this.y);
    this.normalize();
    this.x *= len;
    this.y *= len;
    return this;
  };

  Point.prototype.normalize = function () {
    const len = this.length();
    this.x /= len;
    this.y /= len;
    return this;
  };

  /* ===== PARTICLE ===== */
  function Particle() {
    this.position = new Point();
    this.velocity = new Point();
    this.acceleration = new Point();
    this.age = 0;
  }

  Particle.prototype.initialize = function (x, y, dx, dy) {
    this.position.x = x;
    this.position.y = y;
    this.velocity.x = dx;
    this.velocity.y = dy;
    this.acceleration.x = dx * settings.particles.effect;
    this.acceleration.y = dy * settings.particles.effect;
    this.age = 0;
  };

  Particle.prototype.update = function (dt) {
    this.position.x += this.velocity.x * dt;
    this.position.y += this.velocity.y * dt;
    this.velocity.x += this.acceleration.x * dt;
    this.velocity.y += this.acceleration.y * dt;
    this.age += dt;
  };

  Particle.prototype.draw = function (ctx, img) {
    function ease(t) {
      return --t * t * t + 1;
    }
    const size = img.width * ease(this.age / settings.particles.duration);
    ctx.globalAlpha = 1 - this.age / settings.particles.duration;
    ctx.drawImage(
      img,
      this.position.x - size / 2,
      this.position.y - size / 2,
      size,
      size,
    );
  };

  /* ===== PARTICLE POOL ===== */
  function ParticlePool(length) {
    this.particles = Array.from({ length }, () => new Particle());
    this.firstActive = 0;
    this.firstFree = 0;
    this.duration = settings.particles.duration;
  }

  ParticlePool.prototype.add = function (x, y, dx, dy) {
    this.particles[this.firstFree].initialize(x, y, dx, dy);
    this.firstFree = (this.firstFree + 1) % this.particles.length;
    if (this.firstActive === this.firstFree) {
      this.firstActive = (this.firstActive + 1) % this.particles.length;
    }
  };

  ParticlePool.prototype.update = function (dt) {
    let i = this.firstActive;
    while (i !== this.firstFree) {
      this.particles[i].update(dt);
      i = (i + 1) % this.particles.length;
    }
    while (
      this.particles[this.firstActive].age >= this.duration &&
      this.firstActive !== this.firstFree
    ) {
      this.firstActive = (this.firstActive + 1) % this.particles.length;
    }
  };

  ParticlePool.prototype.draw = function (ctx, img) {
    let i = this.firstActive;
    while (i !== this.firstFree) {
      this.particles[i].draw(ctx, img);
      i = (i + 1) % this.particles.length;
    }
  };

  /* ===== HEART CURVE (mobile scale) ===== */
  function pointOnHeart(t) {
    const scale = 0.75; // 👉 chỉnh nhỏ / to tim
    return new Point(
      scale * 160 * Math.pow(Math.sin(t), 3),
      scale *
        (130 * Math.cos(t) -
          50 * Math.cos(2 * t) -
          20 * Math.cos(3 * t) -
          10 * Math.cos(4 * t) +
          25),
    );
  }

  /* ===== PARTICLE IMAGE ===== */
  const image = (() => {
    const c = document.createElement("canvas");
    const cctx = c.getContext("2d");
    c.width = settings.particles.size;
    c.height = settings.particles.size;

    function to(t) {
      const p = pointOnHeart(t);
      p.x = c.width / 2 + (p.x * c.width) / 350;
      p.y = c.height / 2 - (p.y * c.height) / 350;
      return p;
    }

    cctx.beginPath();
    let t = -Math.PI;
    let p = to(t);
    cctx.moveTo(p.x, p.y);
    while (t < Math.PI) {
      t += 0.01;
      p = to(t);
      cctx.lineTo(p.x, p.y);
    }
    cctx.closePath();
    cctx.fillStyle = "#FF5CA4";
    cctx.fill();

    const img = new Image();
    img.src = c.toDataURL();
    return img;
  })();

  /* ===== MAIN RENDER ===== */
  const ctx = canvas.getContext("2d");
  const particles = new ParticlePool(settings.particles.length);
  const rate = settings.particles.length / settings.particles.duration;
  let time;

  function resize() {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
  }

  function render() {
    requestAnimationFrame(render);

    const now = Date.now() / 1000;
    const dt = now - (time || now);
    time = now;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < rate * dt; i++) {
      const pos = pointOnHeart(Math.PI - 2 * Math.PI * Math.random());
      const dir = pos.clone().length(settings.particles.velocity);
      particles.add(
        canvas.width / 2 + pos.x,
        canvas.height / 2 - pos.y,
        dir.x,
        -dir.y,
      );
    }

    particles.update(dt);
    particles.draw(ctx, image);
  }

  function countLoveDays() {
    const start = new Date(2025, 6, 7); // 07/07/2025
    const today = new Date();

    start.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const diff = today - start;
    return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
  }

  function updateLoveCounter() {
    const el = document.getElementById("loveDays");
    if (!el) return;

    el.textContent = countLoveDays();
  }

  // chạy khi load screen
  updateLoveCounter();

  // tự cập nhật mỗi phút (qua ngày là đổi)
  setInterval(updateLoveCounter, 60 * 1000);

  resize();
  window.addEventListener("resize", resize);
  render();
}
