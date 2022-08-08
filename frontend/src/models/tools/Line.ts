import SocketHandler from "../socket/SocketHandler";
import Tool from "./Tool";

export default class Line extends Tool {
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
    this.saved = this.canvas.toDataURL();
    this.socket?.startFigure(event.offsetX, event.offsetY);
    this.isMouseDown = true;
    this.ctx.beginPath();
    this.ctx.moveTo(event.offsetX, event.offsetY);
    this.beginX = event.offsetX;
    this.beginY = event.offsetY;
  }

  mouseUp(event: MouseEvent) {
    this.isMouseDown = false;
    this.socket?.finishFigure(event.offsetX, event.offsetY);
  }

  mouseMove(event: MouseEvent): void {
    if (this.isMouseDown) {
      Line.draw(
        this.ctx,
        this.saved,
        this.beginX,
        this.beginY,
        event.offsetX,
        event.offsetY
      );

      this.socket?.drawLine(
        event.offsetX,
        event.offsetY,
        this.beginX,
        this.beginY
      );
    }
  }

  static draw(
    ctx: CanvasRenderingContext2D,
    saved: string,
    beginX: number,
    beginY: number,
    x: number,
    y: number
  ) {
    const image = new Image();
    image.src = saved;
    image.onload = () => {
      ctx.clearRect(0, 0, 800, 600);
      ctx.drawImage(image, 0, 0, 800, 600);
      ctx.beginPath();
      ctx.moveTo(beginX, beginY);
      ctx.lineTo(x, y);
      ctx.stroke();
    };
  }
}
