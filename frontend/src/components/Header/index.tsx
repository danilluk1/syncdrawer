import React from "react";
import styles from "./Header.module.scss";
import canvasStore from "../../store/canvasStore";
import toolStore from "../../store/toolStore";
import Brush from "../../models/tools/Brush";
import { Tools } from "../../models/tools/Tool";
import Rectangle from "../../models/tools/Rectangle";
import Circle from "../../models/tools/Circle";
import Eraser from "../../models/tools/Eraser";
import Line from "../../models/tools/Line";
import { saveAs } from "file-saver";
import { useParams } from "react-router-dom";
import { CITEXT } from "sequelize/types";

const Header = () => {
  const [username, setUsername] = React.useState("User");
  const [thinkness, setThinkness] = React.useState(1);
  const { room } = useParams();
  const selectTool = (tool: Tools) => {
    if (!canvasStore.canvas) return;

    switch (tool) {
      case Tools.Brush:
        toolStore.changeTool(new Brush(canvasStore.canvas, canvasStore.socket));
        break;
      case Tools.Rectangle:
        toolStore.changeTool(
          new Rectangle(canvasStore.canvas, canvasStore.socket)
        );
        break;
      case Tools.Circle:
        toolStore.changeTool(
          new Circle(canvasStore.canvas, canvasStore.socket)
        );
        break;
      case Tools.Eraser:
        toolStore.changeTool(
          new Eraser(canvasStore.canvas, canvasStore.socket)
        );
        break;
      case Tools.Line:
        toolStore.changeTool(new Line(canvasStore.canvas, canvasStore.socket));
        break;
    }
  };

  const onDraw = (drawObj: any) => {
    let ctx = canvasStore.canvas?.getContext("2d");
    if (!ctx) return;

    switch (drawObj.figure) {
      case Tools.Brush:
        Brush.draw(ctx, canvasStore.saved, drawObj.x, drawObj.y);
        break;
      case Tools.Rectangle:
        Rectangle.draw(
          ctx,
          canvasStore.saved,
          drawObj.x,
          drawObj.y,
          drawObj.width,
          drawObj.height
        );
        break;
      case Tools.Circle:
        Circle.draw(
          ctx,
          canvasStore.saved,
          drawObj.x,
          drawObj.y,
          drawObj.width,
          drawObj.height
        );
        break;

      case Tools.Line:
        Line.draw(
          ctx,
          canvasStore.saved,
          drawObj.x,
          drawObj.y,
          drawObj.beginX,
          drawObj.beginY
        );
        break;

      case Tools.Eraser:
        ctx.fillStyle = "#FFFFFF";
        ctx.strokeStyle = "#FFFFFF";
        let currColor = ctx.fillStyle.toString();
        console.log(currColor);
        Eraser.draw(ctx, canvasStore.saved, drawObj.x, drawObj.y);
        ctx.fillStyle = currColor;
        ctx.strokeStyle = currColor;
        break;
    }
  };

  const onStartFigure = (x: number, y: number) => {
    let ctx = canvasStore.canvas?.getContext("2d");
    ctx?.moveTo(x, y);
    canvasStore.saveCanvasState();
  };

  const onFinishFigure = (x: number, y: number) => {
    let ctx = canvasStore.canvas?.getContext("2d");
    if (!ctx) return;
    ctx?.moveTo(x, y);
    ctx.beginPath();
  };

  const onNewUser = (drawObj: any) => {
    console.log(`New user ${drawObj.username} connected.`);
  };

  const onSaveClick = () => {
    if (!canvasStore.canvas) return;
    saveAs(canvasStore.canvas.toDataURL(), Date.now().toString());
  };

  const onUndo = () => {
    canvasStore.undoCanvas();
  };

  const onRedo = () => {
    canvasStore.redoCanvas();
  };

  const onNewColor = (color: string) => {};

  const onNewThinkness = (think: number) => {
    setThinkness(think);
    toolStore.setLineWidth(think);
  };

  const onConnectClick = () => {
    if (!room || !username) return;

    canvasStore.createSocket(
      username,
      room,
      onDraw,
      onNewUser,
      onUndo,
      onRedo,
      onStartFigure,
      onFinishFigure,
      onNewThinkness,
      onNewColor
    );
  };

  return (
    <header>
      <div className={styles.root}>
        <div className={styles.root__menu}>
          <div className={styles.root__menu__tools}>
            <div
              onClick={() => selectTool(Tools.Brush)}
              className={styles.brush}
            ></div>
            <div
              onClick={() => selectTool(Tools.Rectangle)}
              className={styles.rectangle}
            ></div>
            <div
              onClick={() => selectTool(Tools.Circle)}
              className={styles.circle}
            ></div>
            <div
              onClick={() => selectTool(Tools.Eraser)}
              className={styles.eraser}
            ></div>
            <div
              className={styles.line}
              onClick={() => selectTool(Tools.Line)}
            ></div>
            <div>
              <input
                id="stroke-color"
                onChange={(e) => toolStore.setLineColor(e.target.value)}
                type="color"
              />
            </div>
          </div>
          <div className={styles.root__menu__right}>
            <input
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
            <button onClick={onConnectClick}>Connect!</button>
            <div
              className={styles.undo}
              onClick={() => {
                canvasStore.undoCanvas();
                canvasStore.socket?.undo();
              }}
            ></div>
            <div
              className={styles.redo}
              onClick={() => {
                canvasStore.redoCanvas();
                canvasStore.socket?.redo();
              }
            }
            ></div>
            <div className={styles.save} onClick={onSaveClick}></div>
          </div>
        </div>
        <div className={styles.root__sizeMenu}>
          <span>Толщина линии</span>
          <input
            value={thinkness}
            onChange={(e) => {
              canvasStore.socket?.newThinkness(Number(e.target.value));
              setThinkness(Number(e.target.value));
              toolStore.setLineWidth(Number(e.target.value));
            }}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
