export default class SocketHandler {
  socket: WebSocket = new WebSocket(`${process.env.REACT_APP_BACKEND}`);
  name: string;
  room: string;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  saved: string = "";

  constructor(name: string, room: string, canvas: HTMLCanvasElement) {
    if (!this.socket) throw new Error("Problem while creating WebSocket");

    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.name = name;
    this.room = room;

    this.socket.onopen = this.onOpen.bind(this);
    this.socket.onmessage = this.onMessage.bind(this);
  }

  onOpen() {
    const data = {
      method: "newUser",
      room: this.room,
      username: this.name,
    };
    this.socket.send(JSON.stringify(data));
  }

  drawRectangle(x: number, y: number, width: number, height: number) {
    const data = {
      method: "drawRectangle",
      x,
      y,
      width,
      height,
      room: this.room,
      username: this.name,
    };

    this.socket.send(JSON.stringify(data));
  }

  onMessage(message: MessageEvent) {
    let info: any;
    try {
      console.log(message.data);
      info = JSON.parse(message.data.toString());
    } catch (e) {}
    if (!info) return;
    switch (info.method) {
      case "drawRectangle":
        console.log("123");
        this.ctx?.beginPath();
        this.ctx?.strokeRect(info.x, info.y, 300, 300);
        break;
    }
  }
}
