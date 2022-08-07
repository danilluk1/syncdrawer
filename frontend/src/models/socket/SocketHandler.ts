import { Tools } from "../tools/Tool";

export default class SocketHandler {
  private socket: WebSocket = new WebSocket(`${process.env.REACT_APP_BACKEND}`);
  private name: string;
  private room: string;
  private onDraw: (drawObj: any) => void;

  constructor(
    name: string,
    room: string,
    canvas: HTMLCanvasElement,
    onDraw: (drawObj: any) => void
  ) {
    if (!this.socket) throw new Error("Problem while creating WebSocket");

    this.name = name;
    this.room = room;

    this.socket.onopen = this.onOpen.bind(this);
    this.socket.onmessage = this.onMessage.bind(this);

    this.onDraw = onDraw;
  }

  onOpen() {
    const data = {
      method: "newUser",
      room: this.room,
      username: this.name,
    };
    this.socket.send(JSON.stringify(data));
  }

  finishFigure() {
    const data = {
      method: "finish",
      room: this.room,
      username: this.name,
    };
    this.socket.send(JSON.stringify(data));
  }

  newBrushInfo(x: number, y: number) {
    const data = {
      method: "draw",
      figure: Tools.Brush,
      x,
      y,
      room: this.room,
      username: this.name,
    };
    this.socket.send(JSON.stringify(data));
  }

  drawRectangle(x: number, y: number, width: number, height: number) {
    const data = {
      method: "draw",
      figure: Tools.Rectangle,
      x,
      y,
      width,
      height,
      room: this.room,
      username: this.name,
    };

    this.socket.send(JSON.stringify(data));
  }

  drawLine(x: number, y: number) {
    const data = {
      method: "draw",
      figure: Tools.Brush,
      x,
      y,
      room: this.room,
      username: this.name,
    };

    this.socket.send(JSON.stringify(data));
  }

  onMessage(message: MessageEvent) {
    let data: any;
    try {
      data = JSON.parse(message.data.toString());
    } catch (e) {
      return;
    }
    switch (data.method) {
      default:
        this.onDraw(data);
    }
  }
}
