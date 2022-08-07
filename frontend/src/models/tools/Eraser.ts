import SocketHandler from "../socket/SocketHandler";
import Tool from "./Tool";

export default class Eraser extends Tool {
  currentColor: string;
  constructor(canvas: HTMLCanvasElement, socket: SocketHandler | null = null) {
    super(canvas, socket);
    this.currentColor = this.ctx.fillStyle.toString();
  }

  mouseDown(event: MouseEvent) {
    this.setLineColor("#FFFFFF");
    this.isMouseDown = true;
    this.ctx.beginPath();
    this.ctx.moveTo(event.offsetX, event.offsetY);
  }
  mouseUp(event: MouseEvent) {
    this.isMouseDown = false;
    this.setLineColor(this.currentColor);
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
