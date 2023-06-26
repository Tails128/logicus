import { renderHTML } from "./renderer.js";
import { contrastingColor } from "./rgbHelper.js";
import { keyCombination } from "./types/keyCombination";
import { LogLevel } from "./types/logLevel";
import { LogicusType } from "./types/logicus";

export class Logicus<T> implements LogicusType<T> {
  private levelStatus: Map<T, boolean> = new Map<T, boolean>();
  private levels: LogLevel<T>[] = [];
  private readonly id = "logicus-" + Date.now();

  keyCombination: keyCombination;

  constructor(
    levels: LogLevel<T>[],
    enableAll: boolean = true,
    keyCombination: keyCombination = {
      key: "F8",
    }
  ) {
    this.keyCombination = keyCombination;
    this.setLevels(levels, enableAll);
    renderHTML(this);
  }

  /**
   * The function used to set the various configs
   * @param levels the levels you want to use
   * @param enableAll optional, allows you to pre-set the loggers to enable or disable
   */
  setLevels(levels: LogLevel<T>[], enableAll: boolean = true) {
    this.levels = levels.sort((level) => level.logImportance);

    this.levelStatus = new Map<T, boolean>();
    this.levels.forEach((level) => this.levelStatus.set(level.id, enableAll));
  }

  getLevels(): LogLevel<T>[] {
    return [...this.levels];
  }

  log(logtype: T, logContent: any) {
    /* @ts-ignore */
    this._log(logtype, logContent, console.log);
  }

  warn(logtype: T, logContent: any) {
    /* @ts-ignore */
    this._log(logtype, logContent, console.warn);
  }

  error(logtype: T, logContent: any) {
    /* @ts-ignore */
    this._log(logtype, logContent, console.error);
  }

  _log(logType: T, logContent: any, logFunction: any) {
    const logSettings = this.levels.find((level) => level.id === logType);
    if (!logSettings) {
      const types = this.levels.map((level) => `${level.id}\n`);
      /* @ts-ignore */
      console.warn(
        `🪵🧠 Logicus warning! You tried to enable logtype ${logType} , but no such logType was set in your logicus instance! \n\nAvailable types:\n${types}`
      );
      /* @ts-ignore */
      logFunction(logContent);
    }
    const logo = logSettings!.associatedEmoji
      ? ` ${logSettings!.associatedEmoji}`
      : "";
    const rgbColor = logSettings!.color.join(",");
    const message = `%c${logo} ${logSettings!.name} %c ${logContent}`;
    const customSettings = `background: rgba(${rgbColor}, .3); padding: 4px; border-radius: 100px; font-weight: bold; color: ${contrastingColor(
      logSettings!.color
    )}; border: 1px solid ${contrastingColor(logSettings!.color)}`;
    const defaultSettings = `background: transparent`;

    /* @ts-ignore */
    logFunction(message, customSettings, defaultSettings);
  }

  enableLog(logType: T) {
    if (this.levelStatus.has(logType)) {
      this.levelStatus.set(logType, true);
    } else {
      const types = this.levels.map((level) => `${level.id}\n`);
      /* @ts-ignore */
      console.warn(
        `🪵🧠 Logicus warning! You tried to enable logtype ${logType} , but no such logType was set in your logicus instance! \n\nAvailable types:\n${types}`
      );
    }
  }

  disableLog(logType: T) {
    if (this.levelStatus.has(logType)) {
      this.levelStatus.set(logType, false);
    } else {
      const types = this.levels.map((level) => `${level.id}\n`);
      /* @ts-ignore */
      console.warn(
        `🪵🧠 Logicus warning! You tried to disable logtype ${logType} , but no such logType was set in your logicus instance! \n\nAvailable types:\n${types}`
      );
    }
  }

  toggleLog(logType: T) {
    if (this.levelStatus.has(logType)) {
      this.levelStatus.set(logType, !this.levelStatus.get(logType));
    } else {
      const types = this.levels.map((level) => `${level.id}\n`);
      /* @ts-ignore */
      console.warn(
        `🪵🧠 Logicus warning! You tried to disable logtype ${logType} , but no such logType was set in your logicus instance! \n\nAvailable types:\n${types}`
      );
    }
  }

  /**
   * Enable all the log levels above and including the passed one
   * @param logImportance
   */
  enableAbove(logImportance: number) {
    this.levels
      .filter((level) => level.logImportance >= logImportance)
      .forEach((level) => this.levelStatus.set(level.id, true));
  }

  /**
   * Enable all the log levels below and including the passed one
   * @param logImportance
   */
  enableBelow(logImportance: number) {
    this.levels
      .filter((level) => level.logImportance <= logImportance)
      .forEach((level) => this.levelStatus.set(level.id, true));
  }

  /**
   * Disable all the log levels above and including the passed one
   * @param logImportance
   */
  disableAbove(logImportance: number) {
    this.levels
      .filter((level) => level.logImportance >= logImportance)
      .forEach((level) => this.levelStatus.set(level.id, false));
  }

  /**
   * Disable all the log levels below and including the passed one
   * @param logImportance
   */
  disableBelow(logImportance: number) {
    this.levels
      .filter((level) => level.logImportance <= logImportance)
      .forEach((level) => this.levelStatus.set(level.id, false));
  }

  renderControls(): void {
    /* @ts-ignore */
    if (typeof window === undefined) {
      return;
    }

    /* @ts-ignore */
    let element = document.getElementById(this.id);

    if (!element) {
      /* @ts-ignore */
      element = document.creteElement();
      element!.setAttribute("id", this.id);
      /* @ts-ignore */
      document.body.appendChild(element);
    }

    element!.innerHTML = "";
  }

  private _getRenderButtons() {
    return this.levels.map((level) => {
      const icon = level.associatedEmoji ? ` ${level.associatedEmoji}` : "";

      return `<button style="padding: 8px; background: ${level.color};">${level.name}${icon}</button>`;
    });
  }
}
