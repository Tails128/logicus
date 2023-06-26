import { LogLevel } from "./logLevel";

export interface LogicusType<T> {
  setLevels(levels: LogLevel<T>[], enableAll?: boolean): void;
  getLevels(): LogLevel<T>[];

  // log (duh!)
  log(logType: T, logContent: any): void;
  warn(logType: T, logContent: any): void;
  error(logType: T, logContent: any): void;

  // enable/disable by log type
  enableLog(logType: T): void;
  disableLog(logType: T): void;

  // enable/disable by importance level
  enableAbove(logImportance: number): void;
  enableBelow(logImportance: number): void;
  disableAbove(logImportance: number): void;
  disableBelow(logImportance: number): void;

  renderControls(): void;
}
