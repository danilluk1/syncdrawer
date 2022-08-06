import Tool from "./Tool";

export default class Line extends Tool {
  beginX: number;
  beginY: number;
  saved: string;
  constructor(canvas: HTMLCanvasElement) {
    super(canvas);

    this.beginX = 0;
    this.beginY = 0;
    this.saved = "";
  }

  mouseDown(event: MouseEvent) {
    this.isMouseDown = true;
    this.ctx.beginPath();
    this.ctx.moveTo(event.offsetX, event.offsetY);
    this.beginX = event.offsetX;
    this.beginY = event.offsetY;

    this.saved = this.canvas.toDataURL();
  }

  mouseUp(event: MouseEvent) {
    this.isMouseDown = false;
  }

  mouseMove(event: MouseEvent): void {
    if (this.isMouseDown) {
      this.drawLine(event.offsetX, event.offsetY);
    }
  }

  drawLine(x: number, y: number) {
    const image = new Image();
    image.src = this.saved;
    image.onload = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
      
      this.ctx.beginPath();
      this.ctx.moveTo(this.beginX, this.beginY);
      this.ctx.lineTo(x, y);
      this.ctx.stroke();
    };
  }
}
