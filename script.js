

const DEFAULT_BG_IMAGE = "background3.jpg";
const DEFAULT_BG_COLOR = "#fde2e4";

// Apply image background
function applyBgImage(img) {
  document.body.style.backgroundImage = `url(${img})`;
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center bottom";
  document.body.style.backgroundRepeat = "no-repeat";
}

// Apply color background
function applyBgColor(color) {
  document.body.style.backgroundImage = "none"; // IMPORTANT
  document.body.style.backgroundColor = color;
}


// Load background on page load
const bgType = localStorage.getItem("bgType");
const bgValue = localStorage.getItem("bgValue");

if (bgType === "image" && bgValue) {
  applyBgImage(bgValue);
} else if (bgType === "color" && bgValue) {
  applyBgColor(bgValue);
} else {
  applyBgImage(DEFAULT_BG_IMAGE);
  document.body.style.backgroundColor = DEFAULT_BG_COLOR;
}

// Change to image background
function setBgImg(img) {
  applyBgImage(img);
  localStorage.setItem("bgType", "image");
  localStorage.setItem("bgValue", img);
}

// Change to color background
function setBgColor(color) {
  applyBgColor(color);
  localStorage.setItem("bgType", "color");
  localStorage.setItem("bgValue", color);
}

// Reset to default background
function resetBg() {
  localStorage.removeItem("bgType");
  localStorage.removeItem("bgValue");
  applyBgImage(DEFAULT_BG_IMAGE);
  document.body.style.backgroundColor = DEFAULT_BG_COLOR;
}

// ===============================
// PAGE ELEMENTS
// ===============================

const proposal = document.getElementById("proposal");
const memoriesPage = document.getElementById("memoriesPage");
const addMemory = document.getElementById("addMemory");
const scrapbook = document.getElementById("scrapbook");
const gallery = document.getElementById("gallery");

// ===============================
// NAVIGATION
// ===============================

function yesClicked() {
  proposal.classList.add("hidden");
  memoriesPage.classList.remove("hidden");

  const music = document.getElementById("bgMusic");
  music.play().catch(() => {
    console.log("Autoplay blocked until user interaction");
  });
}

function moveNo() {
  const noBtn = document.getElementById("noBtn");
  noBtn.style.position = "absolute";
  noBtn.style.top = Math.random() * 300 + "px";
  noBtn.style.left = Math.random() * 300 + "px";
}

function showAdd() {
  memoriesPage.classList.add("hidden");
  addMemory.classList.remove("hidden");
}

function showBook() {
  memoriesPage.classList.add("hidden");
  scrapbook.classList.remove("hidden");
  loadMemories();
}

function goBack() {
  addMemory.classList.add("hidden");
  scrapbook.classList.add("hidden");
  memoriesPage.classList.remove("hidden");
}

function showBackground() {
  memoriesPage.classList.add("hidden");
  document.getElementById("bgChooser").classList.remove("hidden");
}

function goBackToMenu() {
  document.getElementById("bgChooser").classList.add("hidden");
  memoriesPage.classList.remove("hidden");
}

// ===============================
// SCRAPBOOK LOGIC
// ===============================

function saveMemory() {
  const file = document.getElementById("photo").files[0];
  const caption = document.getElementById("caption").value;

  if (!file) {
    alert("Please add a photo 💕");
    return;
  }

  const reader = new FileReader();
  reader.onload = function () {
    const memories = JSON.parse(localStorage.getItem("memories")) || [];
    memories.push({ img: reader.result, text: caption });
    localStorage.setItem("memories", JSON.stringify(memories));
    alert("Memory saved 💖");
  };
  reader.readAsDataURL(file);
}

function loadMemories() {
  gallery.innerHTML = "";
  const memories = JSON.parse(localStorage.getItem("memories")) || [];

  memories.forEach((m, index) => {
    const container = document.createElement("div");
    container.className = "memory-item";

    const img = document.createElement("img");
    img.src = m.img;

    const p = document.createElement("p");
    p.textContent = m.text;

    const del = document.createElement("button");
    del.textContent = "Delete ❌";
    del.onclick = function () {
      memories.splice(index, 1);
      localStorage.setItem("memories", JSON.stringify(memories));
      loadMemories();
    };

    container.appendChild(img);
    container.appendChild(p);
    container.appendChild(del);
    gallery.appendChild(container);
  });
}



