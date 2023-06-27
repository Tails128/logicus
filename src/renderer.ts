import { Logicus } from "./index";
import { contrastingColor } from "./rgbHelper.js";
import { LogLevel } from "./types/logLevel";

const id = "logicus-command-panel";
let htmlElement: any = undefined;
let visible = false;
let temp = false;

export function renderHTML<T>(logicusInstance: Logicus<T>) {
  if (!temp) {
    document.addEventListener("keydown", (event: KeyboardEvent) => {
      const { key, alt, ctrl, shift } = logicusInstance.keyCombination;
      const trigger =
        event.key.toLowerCase() === key.toLowerCase() &&
        (!alt || event.altKey) &&
        (!ctrl || event.ctrlKey) &&
        (!shift || event.shiftKey);

      if (trigger) toggle(logicusInstance);
    });
    temp = true;
  }

  if (!visible && htmlElement != undefined) {
    htmlElement.remove();
    htmlElement = undefined;
    return;
  }

  if (visible && htmlElement == undefined) {
    renderBody();
    renderButtons(logicusInstance);
  }
}

function renderBody() {
  htmlElement = document.createElement("div");
  htmlElement.setAttribute("id", id);
  htmlElement.classList.add("logicus");
  htmlElement.classList.add("logicus-container");
  document.body.appendChild(htmlElement);
}

function renderButtons<T>(logicusInstance: Logicus<T>) {
  htmlElement.innerHTML = "";

  if (!visible) {
    return;
  }

  const buttonClicker = buttonClick(logicusInstance);
  const levels: LogLevel<T>[] = logicusInstance.getLevels();

  levels.forEach((level) => {
    const button = document.createElement("button");
    button.classList.add("logicus-button");
    button.style.background = `rgb(${level.color[0]},${level.color[1]},${level.color[2]})`;
    button.style.borderRadius = "12px";
    button.style.border = `2px solid ${contrastingColor(level.color)}`;
    button.style.color = contrastingColor(level.color);
    button.innerHTML = `${level.associatedEmoji} | ${level.logImportance} | ${level.name}`;
    button.addEventListener("click", () => {
      if (button.classList.contains("not-selected")) {
        button.classList.remove("not-selected");
      } else {
        button.classList.add("not-selected");
      }

      buttonClicker(level.id);
    });

    htmlElement.appendChild(button);
  });
}

function toggle<T>(logicusInstance: Logicus<T>) {
  visible = !visible;
  renderHTML(logicusInstance);
}

function buttonClick<T>(logicusInstance: Logicus<T>) {
  return (id: T) => logicusInstance.toggleLog(id);
}
