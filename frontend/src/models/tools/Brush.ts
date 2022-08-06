import e from "express";
import Tool from "./Tool";

export default class Brush extends Tool {
  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
  }


  mouseDown(event: MouseEvent) {
    this.isMouseDown = true;
    this.ctx.beginPath();
    this.ctx.moveTo(event.offsetX, event.offsetY);
  }
  mouseUp(event: MouseEvent) {
    this.isMouseDown = false;
  }
  mouseMove(event: MouseEvent) {
    if (this.isMouseDown) {
      this.draw(event.offsetX, event.offsetY);
    }
  }

  draw(x: number, y: number) {
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
  }
}
