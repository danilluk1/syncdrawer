import Tool from "./Tool";

export default class Brush extends Tool {
  mouseDown(event: MouseEvent) {
    this.isMouseDown = true;
    this.ctx.beginPath();
    this.ctx.moveTo(event.offsetX, event.offsetY);
  }

  mouseUp(event: MouseEvent) {
    this.isMouseDown = false;
    this.socket?.finishFigure();
  }

  mouseMove(event: MouseEvent) {
    if (this.isMouseDown) {
      this.draw(event.offsetX, event.offsetY);
      if (!this.socket) return;
      this.socket.newBrushInfo(event.offsetX, event.offsetY);
    }
  }

  static draw(ctx: CanvasRenderingContext2D, x: number, y: number) {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}
