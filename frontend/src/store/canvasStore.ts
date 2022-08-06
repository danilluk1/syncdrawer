import { makeAutoObservable } from "mobx";

class CanvasStore {
  canvas: HTMLCanvasElement | null = null;
  redos: string[] = [];
  undos: string[] = [];
  constructor() {
    makeAutoObservable(this);
  }

  setCanvas(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }
}

export default new CanvasStore();
