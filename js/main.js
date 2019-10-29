window.onload = () => {
  "use strict";

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("../sw.js")
      .then(() => console.log("service worker registered"));
  }

  let deferredPrompt;
  const addBtn = document.querySelector(".add-button");

  addBtn.style.display = "none";

  window.addEventListener("beforeinstallprompt", e => {
    deferredPrompt = e;

    e.preventDefault();
    addBtn.style.display = "block";

    addBtn.addEventListener("click", e => {
      addBtn.style.display = "none";
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(choiceResult => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the A2HS prompt");
        } else {
          console.log("User dismissed the A2HS prompt");
        }

        deferredPrompt = null;
      });
    });
  });
};
