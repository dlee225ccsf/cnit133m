"use strict";

const backgroundSelect = document.getElementById("backgroundSelect");
const nameInput = document.getElementById("nameInput");
const nameMessage = document.getElementById("nameMessage");

const backgroundImages = {
  lightblue: "url('images/lightblue.jpg')",
  lightgold: "url('images/lightgold.jpg')"
};

function applyBackground(value) {
  document.body.style.backgroundImage =
    backgroundImages[value] || "none";
  document.body.style.backgroundColor =
    value ? "transparent" : "#ffffff";
}

backgroundSelect.addEventListener("change", function () {
  applyBackground(this.value);
});

function showSavedName(initialLoad = true) {
  const storedName = localStorage.getItem("name");
  const welcomeMessage = initialLoad ? "Welcome back" : "Welcome";
  if (storedName) {
    nameInput.value = storedName;
    nameMessage.textContent = `${welcomeMessage}, ${storedName}!`;
  } else {
    nameMessage.textContent = "";
  }
}

nameInput.addEventListener("change", function () {
  const name = this.value.trim();
  localStorage.setItem("name", name);
  showSavedName(false);
});

showSavedName();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("./service-worker.js").catch(function (error) {
      console.error("Service worker registration failed:", error);
    });
  });
}
