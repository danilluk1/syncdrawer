import { Tools } from "../tools/Tool";

export default class SocketHandler {
  private socket: WebSocket = new WebSocket(`${process.env.REACT_APP_BACKEND}`);
  private name: string;
  private room: string;
  private onDraw: (drawObj: any) => void;
  private onNewUser: (drawObj: any) => void;
  private onUndo: () => void;
  private onRedo: () => void;
  private onStartFigure: (x: number, y: number) => void;
  private onFinishFigure: (x: number, y: number) => void;
  private onNewThinkness: (_: number) => void;
  private onNewColor: (_: string) => void;

  constructor(
    name: string,
    room: string,
    canvas: HTMLCanvasElement,
    onDraw: (drawObj: any) => void,
    onNewUser: (drawObj: any) => void,
    onUndo: () => void,
    onRedo: () => void,
    onStartFigure: (x: number, y: number) => void,
    onFinishFigure: (x: number, y: number) => void,
    onNewThinkness: (_: number) => void,
    onNewColor: (_: string) => void
  ) {
    if (!this.socket) throw new Error("Problem while creating WebSocket");

    this.name = name;
    this.room = room;

    this.socket.onopen = this.onOpen.bind(this);
    this.socket.onmessage = this.onMessage.bind(this);

    this.onDraw = onDraw;
    this.onNewUser = onNewUser;
    this.onUndo = onUndo;
    this.onRedo = onRedo;
    this.onStartFigure = onStartFigure;
    this.onFinishFigure = onFinishFigure;
    this.onNewThinkness = onNewThinkness;
    this.onNewColor = onNewColor;
  }

  onOpen() {
    const data = {
      method: "newUser",
      room: this.room,
      username: this.name,
    };
    this.socket.send(JSON.stringify(data));
  }

  startFigure(x: number, y: number) {
    const data = {
      method: "start",
      room: this.room,
      username: this.name,
      x,
      y,
    };
    this.socket.send(JSON.stringify(data));
  }

  finishFigure(x: number, y: number) {
    const data = {
      method: "finish",
      room: this.room,
      username: this.name,
      x,
      y,
    };
    this.socket.send(JSON.stringify(data));
  }

  newThinkness(thinkness: number) {
    const data = {
      method: "newThinkness",
      thinkness: thinkness,
      room: this.room,
      username: this.name,
    };
    this.socket.send(JSON.stringify(data));
  }

  newColor(color: string) {
    const data = {
      method: "newColor",
      color: color,
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

  drawEraser(x: number, y: number){
    const data = {
      method: "draw",
      figure: Tools.Eraser,
      x,
      y,
      room: this.room,
      username: this.name,
    };
    this.socket.send(JSON.stringify(data));
  }

  drawCircle(x: number, y: number, width: number, height: number) {
    const data = {
      method: "draw",
      figure: Tools.Circle,
      x,
      y,
      width,
      height,
      room: this.room,
      username: this.name,
    };

    this.socket.send(JSON.stringify(data));
  }

  drawLine(x: number, y: number, beginX: number, beginY: number) {
    const data = {
      method: "draw",
      figure: Tools.Line,
      beginX,
      beginY,
      x,
      y,
      room: this.room,
      username: this.name,
    };

    this.socket.send(JSON.stringify(data));
  }

  undo() {
    const data = {
      method: "undo",
      room: this.room,
      username: this.name,
    };
    this.socket.send(JSON.stringify(data));
  }

  redo() {
    const data = {
      method: "redo",
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
      case "newThinkness":
        this.onNewThinkness(data.thinkness);
        break;
      case "newColor":
        this.onNewColor(data);
        break;
      case "newUser":
        this.onNewUser(data);
        break;
      case "undo":
        this.onUndo();
        break;
      case "redo":
        this.onRedo();
        break;
      case "start":
        this.onStartFigure(data.x, data.y);
        break;
      case "finish":
        this.onFinishFigure(data.x, data.y);
        break;
      default:
        this.onDraw(data);
    }
  }
}
