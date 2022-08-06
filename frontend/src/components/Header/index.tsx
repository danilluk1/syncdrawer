import React from "react";
import styles from "./Header.module.scss";
import canvasStore from "../../store/canvasStore";
import toolStore from "../../store/toolStore";
import Brush from "../../models/tools/Brush";
import { Tools } from "../../models/tools/Tools";
import Rectangle from "../../models/tools/Rectangle";
import Circle from "../../models/tools/Circle";

const Header = () => {
  const selectTool = (tool: Tools) => {
    if (canvasStore.canvas === null) return;

    switch (tool) {
      case Tools.Brush:
        toolStore.changeTool(new Brush(canvasStore.canvas));
        break;
      case Tools.Rectangle:
        toolStore.changeTool(new Rectangle(canvasStore.canvas));
        break;
      case Tools.Circle:
        toolStore.changeTool(new Circle(canvasStore.canvas));
        break;
    }
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
            <div className={styles.eraser}></div>
            <div className={styles.line}></div>
            <div>
              <label htmlFor="stroke-color">Цвет </label>
              <input
                id="stroke-color"
                onChange={(e) => toolStore.setLineColor(e.target.value)}
                type="color"
              />
            </div>
          </div>
          <div className={styles.root__menu__right}>
            <div className={styles.undo}></div>
            <div className={styles.redo}></div>
            <div className={styles.save}></div>
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
