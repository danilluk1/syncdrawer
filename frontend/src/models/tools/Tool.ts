import SocketHandler from "../socket/SocketHandler";

export default class Tool {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  isMouseDown: boolean;
  socket: SocketHandler | null;


  constructor(canvas: HTMLCanvasElement, socket: SocketHandler | null) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    this.canvas.onmousedown = null;
    this.canvas.onmouseup = null;
    this.canvas.onmousemove = null;

    this.canvas.onmousedown = this.mouseDown.bind(this);
    this.canvas.onmouseup = this.mouseUp.bind(this);
    this.canvas.onmousemove = this.mouseMove.bind(this);

    this.socket = socket;

    this.isMouseDown = false;
  }

  setThinkness(value: number) {
    this.ctx.lineWidth = value;
  }

  setLineColor(value: string) {
    this.ctx.fillStyle = value;
    this.ctx.strokeStyle = value;
  }

  mouseDown(event: MouseEvent) {
    throw new Error("Function not implemented");
  }
  mouseUp(event: MouseEvent) {
    throw new Error("Function not implemented");
  }
  mouseMove(event: MouseEvent) {
    throw new Error("Function not implemented");
  }

  draw(x: number, y: number) {}
}
