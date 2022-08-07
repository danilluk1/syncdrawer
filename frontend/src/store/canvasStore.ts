import { makeAutoObservable } from "mobx";
import SocketHandler from "../models/socket/SocketHandler";

class CanvasStore {
  socket: SocketHandler | null = null;
  canvas: HTMLCanvasElement | null = null;
  redos: string[] = [];
  undos: string[] = [];
  constructor() {
    makeAutoObservable(this);
  }

  createSocket(name: string, room: string) {
    if (!this.canvas) return;

    this.socket = new SocketHandler(name, room, this.canvas);
  }

  setCanvas(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }

  saveCanvasState() {
    let canv = this.canvas?.toDataURL();
    if (!canv) return;

    this.undos.push(canv);
  }

  redoCanvas() {
    if (!this.canvas) return;
    let ctx = this.canvas.getContext("2d");

    if (this.redos.length > 0) {
      this.saveCanvasState();
      let data = this.redos.pop();
      if (!data) return;

      let img = new Image();
      img.src = data;
      img.onload = () => {
        if (!this.canvas) return;

        ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
        ctx?.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      };
    }
  }

  undoCanvas() {
    if (!this.canvas) return;
    let ctx = this.canvas.getContext("2d");

    if (this.undos.length > 0) {
      let current = this.canvas.toDataURL();
      this.redos.push(current);

      let data = this.undos.pop();
      if (!data) return;

      let img = new Image();
      img.src = data;
      img.onload = () => {
        if (!this.canvas) return;

        ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
        ctx?.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      };
    }
  }
}

export default new CanvasStore();
