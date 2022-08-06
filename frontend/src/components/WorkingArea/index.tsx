import React, { MouseEvent } from "react";
import { observer } from "mobx-react-lite";
import toolStore from "../../store/toolStore";
import canvasStore from "../../store/canvasStore";
import styles from "./WorkingArea.module.scss";
import Tool from "../../models/tools/Tool";
import Brush from "../../models/tools/Brush";
import Rectangle from "../../models/tools/Rectangle";

const WorkingArea = observer(() => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    if (!canvasRef.current) return;

    canvasStore.setCanvas(canvasRef.current);
    toolStore.changeTool(new Brush(canvasRef.current));
  }, []);

  return (
    <main>
      <div className={styles.root}>
        <canvas ref={canvasRef} width="800" height="600"></canvas>
      </div>
    </main>
  );
});

export default WorkingArea;
