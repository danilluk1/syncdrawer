import { makeAutoObservable } from "mobx";
import Tool from "../models/tools/Tool";

class ToolStore {
  tool: Tool | null = null;
  constructor() {
    makeAutoObservable(this);
  }

  changeTool(tool: Tool) {
    this.tool = tool;
  }

  setLineWidth(lineWidth: number) {
    this.tool?.setThinkness(lineWidth);
  }

  setLineColor(color: string) {
    this.tool?.setLineColor(color);
  }
}

export default new ToolStore();
