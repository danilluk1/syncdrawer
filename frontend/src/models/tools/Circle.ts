import SocketHandler from "../socket/SocketHandler";
import Tool from "./Tool";

export default class Circle extends Tool {
  beginX: number;
  beginY: number;
  saved: string;

  constructor(canvas: HTMLCanvasElement, socket: SocketHandler | null = null) {
    super(canvas, socket);

    this.beginX = 0;
    this.beginY = 0;
    this.saved = "";
  }

  mouseDown(event: MouseEvent) {
    this.socket?.startFigure(event.offsetX, event.offsetY);
    this.isMouseDown = true;
    this.ctx.beginPath();
    this.ctx.moveTo(event.offsetX, event.offsetY);
    this.beginX = event.offsetX;
    this.beginY = event.offsetY;

    this.saved = this.canvas.toDataURL();
  }

  mouseUp(event: MouseEvent) {
    this.isMouseDown = false;
    this.socket?.finishFigure(event.offsetX, event.offsetY);
  }

  mouseMove(event: MouseEvent): void {
    if (this.isMouseDown) {
      Circle.draw(
        this.ctx,
        this.saved,
        event.offsetX,
        event.offsetY,
        this.beginX - event.offsetX,
        this.beginY - event.offsetY
      );
      this.socket?.drawCircle(
        event.offsetX,
        event.offsetY,
        this.beginX - event.offsetX,
        this.beginY - event.offsetY
      );
    }
  }

  static draw(
    ctx: CanvasRenderingContext2D,
    saved: string,
    x: number,
    y: number,
    width: number,
    height: number
  ) {
    const image = new Image();
    image.src = saved;
    image.onload = () => {
      ctx.clearRect(0, 0, 800, 600);
      ctx.drawImage(image, 0, 0, 800, 600);
      ctx.beginPath();
      ctx.arc(x, y, Math.abs(width), 0, 2 * Math.PI, false);
      ctx.stroke();
    };
  }
}
