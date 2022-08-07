import React, { useCallback} from "react";
import { observer } from "mobx-react-lite";
import toolStore from "../../store/toolStore";
import canvasStore from "../../store/canvasStore";
import styles from "./WorkingArea.module.scss";
import Brush from "../../models/tools/Brush";

const WorkingArea = observer(() => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    if (!canvasRef.current) return;
    canvasStore.setCanvas(canvasRef.current);

    if (!canvasStore.socket) return;
    toolStore.changeTool(new Brush(canvasRef.current, canvasStore.socket));
  }, []);

  const onCanvasMouseDown = () => {
    canvasStore.saveCanvasState();
  };

  const fetchData = useCallback(() => {}, []);

  return (
    <main>
      <div className={styles.root}>
        <canvas
          onMouseDown={onCanvasMouseDown}
          ref={canvasRef}
          width="800"
          height="600"
        ></canvas>
      </div>
    </main>
  );
});

export default WorkingArea;
