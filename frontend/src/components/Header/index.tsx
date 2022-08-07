import React from "react";
import styles from "./Header.module.scss";
import canvasStore from "../../store/canvasStore";
import toolStore from "../../store/toolStore";
import Brush from "../../models/tools/Brush";
import { Tools } from "../../models/tools/Tools";
import Rectangle from "../../models/tools/Rectangle";
import Circle from "../../models/tools/Circle";
import Eraser from "../../models/tools/Eraser";
import Line from "../../models/tools/Line";
import { saveAs } from "file-saver";
import { useParams } from "react-router-dom";

const Header = () => {
  const [username, setUsername] = React.useState("User");
  const { room } = useParams();
  const selectTool = (tool: Tools) => {
    if (!canvasStore.canvas) return;

    switch (tool) {
      case Tools.Brush:
        toolStore.changeTool(new Brush(canvasStore.canvas, canvasStore.socket));
        break;
      case Tools.Rectangle:
        toolStore.changeTool(new Rectangle(canvasStore.canvas, canvasStore.socket));
        break;
      case Tools.Circle:
        toolStore.changeTool(new Circle(canvasStore.canvas, canvasStore.socket));
        break;
      case Tools.Eraser:
        toolStore.changeTool(new Eraser(canvasStore.canvas, canvasStore.socket));
        break;
      case Tools.Line:
        toolStore.changeTool(new Line(canvasStore.canvas, canvasStore.socket));
        break;
    }
  };

  const onSaveClick = () => {
    if (!canvasStore.canvas) return;
    saveAs(canvasStore.canvas.toDataURL(), Date.now().toString());
  };

  const onConnectClick = () => {
    if (!room || !username) return;

    canvasStore.createSocket(username, room);
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
              onClick={() => canvasStore.undoCanvas()}
            ></div>
            <div
              className={styles.redo}
              onClick={() => canvasStore.redoCanvas()}
            ></div>
            <div className={styles.save} onClick={onSaveClick}></div>
          </div>
        </div>
        <div className={styles.root__sizeMenu}>
          <span>Толщина линии</span>
          <input
            defaultValue={1}
            onChange={(e) => toolStore.setLineWidth(Number(e.target.value))}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
