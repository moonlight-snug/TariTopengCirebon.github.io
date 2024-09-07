// Fungsi untuk memutar (flip) card saat diklik
function toggleCard(card) {
  card.classList.toggle("flipped");
}

// Tambahkan custom JavaScript di sini jika diperlukan di masa mendatang

// Saat ini, fitur JavaScript bawaan dari Bootstrap sudah menangani interaksi navbar
$(document).ready(function () {
  // Contoh jika ingin menambahkan JS
});

// JavaScript untuk menutup hamburger menu saat klik di luar
document.addEventListener("click", function (event) {
  const navbar = document.querySelector(".navbar-collapse");
  const hamburger = document.querySelector(".navbar-toggler");

  // Cek apakah klik dilakukan di luar navbar dan bukan pada hamburger icon
  if (!navbar.contains(event.target) && !hamburger.contains(event.target)) {
    // Jika menu terbuka, maka tutup
    if (navbar.classList.contains("show")) {
      $(".navbar-collapse").collapse("hide"); // Menutup menu
    }
  }
});
// java baju
var radius = 340;
var autoRotate = true;
var rotateSpeed = -60;
var imgWidth = 190;
var imgHeight = 230;

setTimeout(init, 1000);

var odrag = document.getElementById("drag");
var ospin = document.getElementById("spin");
var aimg = ospin.getElementsByTagName("img");
var aEle = [...aimg];
ospin.style.width = imgWidth + "px";
ospin.style.height = imgHeight + "px";

var ground = document.getElementById("ground");
ground.style.width = radius * 3 + "px";
ground.style.height = radius * 3 + "px";

function init(delayTime) {
  for (let i = 0; i < aEle.length; i++) {
    aEle[i].style.transform =
      "rotateY(" +
      i * (360 / aEle.length) +
      "deg) translateZ(" +
      radius +
      "px)";
    aEle[i].style.transition = "transform 1s";
    aEle[i].style.transitionDelay = delayTime || (aEle.length - i) / 4 + "s";
  }
}

function applyTransform(obj) {
  if (tY > 180) tY = 180;
  if (tY < 0) tY = 0;
  obj.style.transform = "rotateX(" + -tY + "deg) rotateY(" + tX + "deg)";
}

function playSpin(yes) {
  ospin.style.animationPlayState = yes ? "running" : "paused";
}

var sX, sY, nX, nY;
var desX = 0,
  desY = 0,
  tX = 0,
  tY = 10;

// Optional: Adding auto-rotation functionality
if (autoRotate) {
  var animationName = rotateSpeed > 0 ? "spin" : "spinRevert";
  ospin.style.animation = `${animationName} ${Math.abs(
    rotateSpeed
  )}s infinite linear`;
}

document.onpointerdown = function (e) {
  clearInterval(odrag.timer);
  e = e || window.event;
  var sX = e.clientX,
    sY = e.clientY;

  this.onpointermove = function (e) {
    e = e || window.event;
    var nX = e.clientX,
      nY = e.clientY;

    desX = nX - sX;
    desY = nY - sY;
    tX += desX * 0.1;
    tY += desY * 0.1;

    applyTransform(odrag);

    sX = nX;
    sY = nY;
  };

  this.onpointerup = function () {
    odrag.timer = setInterval(function () {
      desX *= 0.96;
      desY *= 0.95;
      tX += desX * 0.1;
      tY += desY * 0.1;

      applyTransform(odrag);

      playSpin(false);

      if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
        clearInterval(odrag.timer);
        playSpin(true);
      }
    }, 17);
    this.onpointermove = this.onpointerup = null;
  };

  return false;
};
