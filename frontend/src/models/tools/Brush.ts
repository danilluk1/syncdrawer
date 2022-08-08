import SocketHandler from "../socket/SocketHandler";
import Tool from "./Tool";

export default class Brush extends Tool {
  saved: string;

  constructor(canvas: HTMLCanvasElement, socket: SocketHandler | null = null) {
    super(canvas, socket);
    this.saved = "";
  }
  mouseDown(event: MouseEvent) {
    this.socket?.startFigure(event.offsetX, event.offsetY);
    this.isMouseDown = true;
    this.ctx.moveTo(event.offsetX, event.offsetY);
    this.ctx.beginPath();
    this.saved = this.canvas.toDataURL();
  }

  mouseUp(event: MouseEvent) {
    this.isMouseDown = false;
    this.socket?.finishFigure(event.offsetX, event.offsetY);
  }

  mouseMove(event: MouseEvent) {
    if (this.isMouseDown) {
      Brush.draw(this.ctx, this.saved, event.offsetX, event.offsetY);
      this.socket?.newBrushInfo(event.offsetX, event.offsetY);
    }
  }

  static draw(
    ctx: CanvasRenderingContext2D,
    saved: string,
    x: number,
    y: number
  ) {
    const image = new Image();
    image.src = saved;
    image.onload = () => {
      ctx.clearRect(0, 0, 800, 600);
      ctx.drawImage(image, 0, 0, 800, 600);

      ctx.lineTo(x, y);
      ctx.stroke();
    };
  }
}
