import html2canvas from "html2canvas";
import { makeDialog } from "./lib";

let homeWorkCanvas;
let homeWorkCanvasCtx;
export function openHomework() {
  return function () {
    const win = makeDialog(
      "Gesture Protected",
      "Move me in the correct way and I might show you the secret folder!"
    );
    let winImg;

    html2canvas(win.element, {
      backgroundColor: null,
      allowTaint: true,
      logging: false,
      scale: 1
    }).then((canvas) => {
      winImg = canvas;

      if (!homeWorkCanvas) {
        homeWorkCanvas = document.createElement("canvas");
        homeWorkCanvasCtx = homeWorkCanvas.getContext("2d");
        homeWorkCanvas.id = "homework-canvas";

        function sizeCanvas() {
          homeWorkCanvas.width = window.innerWidth;
          homeWorkCanvas.height = window.innerHeight;
        }
        window.addEventListener("resize", sizeCanvas);
        sizeCanvas();

        win.container.appendChild(homeWorkCanvas);
        homeWorkCanvas.style.zIndex = win.element.style.zIndex;
        win.onClose = function () {
          if (homeWorkCanvasCtx) {
            homeWorkCanvasCtx.clearRect(
              0,
              0,
              homeWorkCanvas.width,
              homeWorkCanvas.height
            );
          }
        };
      }
    });

    win.onDrag = function () {
      if (winImg && homeWorkCanvas) {
        homeWorkCanvasCtx.drawImage(winImg, win.state.x, win.state.y);
      }
    };
  };
}
