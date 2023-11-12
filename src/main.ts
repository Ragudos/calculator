import { ButtonProps, button, setupButtons } from "./button";
import "./style.css";
import { setupTheme, theme } from "./theme";

const buttons: ButtonProps[] = [
  {
    textContent: "7",
    className: "calc-button",
    ariaLabel: "Append 7 at the end of the current number.",
    value: "7"
  },
  {
    textContent: "8",
    className: "calc-button",
    ariaLabel: "Append 8 at the end of the current number.",
    value: "8"
  },
  {
    textContent: "9",
    className: "calc-button",
    ariaLabel: "Append 9 at the end of the current number.",
    value: "9"
  },
  {
    textContent: "DEL",
    className: "calc-button reset",
    ariaLabel: "Remove a character at the end of the current number.",
    value: "delete"
  },
  {
    textContent: "4",
    className: "calc-button",
    ariaLabel: "Append 4 at the end of the current number.",
    value: "4"
  },
  {
    textContent: "5",
    className: "calc-button",
    ariaLabel: "Append 5 at the end of the current number.",
    value: "5"
  },
  {
    textContent: "6",
    className: "calc-button",
    ariaLabel: "Append 6 at the end of the current number.",
    value: "6"
  },
  {
    textContent: "+",
    className: "calc-button",
    ariaLabel: "Start performing addition",
    value: "addition"
  },
  {
    textContent: "1",
    className: "calc-button",
    ariaLabel: "Append 1 at the end of the current number.",
    value: "1"
  },
  {
    textContent: "2",
    className: "calc-button",
    ariaLabel: "Append 2 at the end of the current number.",
    value: "2"
  },
  {
    textContent: "3",
    className: "calc-button",
    ariaLabel: "Append 3 at the end of the current number.",
    value: "3"
  },
  {
    textContent: "-",
    className: "calc-button",
    ariaLabel: "Start performing substraction",
    value: "subtraction"
  },
  {
    textContent: ".",
    className: "calc-button",
    ariaLabel: "Append a dot at the end of the current number and turn it into a decimal.",
    value: "decimal"
  },
  {
    textContent: "0",
    className: "calc-button",
    ariaLabel: "Append 0 at the end of the current number.",
    value: "0"
  },
  {
    textContent: "/",
    className: "calc-button",
    ariaLabel: "Start performing division",
    value: "division"
  },
  {
    textContent: "x",
    className: "calc-button",
    ariaLabel: "Start performing multiplication",
    value: "multiplication"
  },
  {
    textContent: "RESET",
    className: "calc-button reset",
    ariaLabel: "Clear the entire entry and reset.",
    value: "reset"
  },
  {
    textContent: "=",
    className: "calc-button equals",
    ariaLabel: "Get the result of the previously entered number and the current number based on the recently clicked operation.",
    value: "equals"
  },
]; 

function init() {
  const entryPoint = document.querySelector<HTMLDivElement>("#app")!;

  entryPoint.innerHTML = `
    <div class="contained" style="width: 100%;">
      <header>
        <div>calc</div>

        ${theme()}
      </header>

      <main>
        <div id="result" class="result">399,981</div>

        <div class="button-grid">
          ${buttons.map((btn) => {
            return button(btn);
          }).join(" ")}
        </div>
      </main>
    </div>
  `.trim();

  setupTheme(document.querySelector("#theme-form")!);
  setupButtons(document.querySelectorAll(".calc-button"));
}

window.addEventListener("DOMContentLoaded", init);
