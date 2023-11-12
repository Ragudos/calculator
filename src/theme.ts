
function theme() {
    let currentTheme = localStorage.getItem("theme");

    if (
        currentTheme != "dark" &&
        currentTheme != "light" &&
        currentTheme != "high-contrast"
    ) {
        currentTheme = "dark";
    }

    document.documentElement.style.colorScheme = currentTheme == "light" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", currentTheme);

    return `
        <div
            style="display: flex; align-items: end; gap: 1rem; font-size: 0.5em"
        >
            <div style="font-weight: 700; margin-bottom: 0.175rem; font-size: 0.875em; letter-spacing: 0.1em">THEME</div>

            <div
                id="theme-main-container"
                aria-label="Toggle website theme by three levels: Dark, Light, or High Contrast"
                aria-valuenow="${currentTheme}"
                aria-valuetext="The current theme of the site is ${currentTheme}."
            >
                <div style="margin-bottom: 0.375em; width: 100%; display: flex; justify-content: space-around;">
                    <div aria-label="First Theme: Dark" id="dark-theme-label">
                        1
                    </div>
                    <div aria-label="Second Theme: Light" id="light-theme-label">
                        2
                    </div>
                    <div aria-label="Third Theme: High Contrast" id="high-contrast-theme-label">
                        3
                    </div>
                </div>

                <form
                    action=""
                    id="theme-form"
                    class="switch"
                >
                    <div
                        aria-hidden="true"
                        class="active-theme-indicator"
                        data-current="${currentTheme}"
                    ></div>
                    <input
                        ${currentTheme == "dark" ? "checked" : ""}
                        type="radio"
                        value="dark"
                        aria-labelledby="dark-theme-label"
                        name="theme"
                        aria-current="${currentTheme == "dark"}"
                        style="cursor: pointer;"
                        tabindex="-1"
                    />
                    <input
                        ${currentTheme == "light" ? "checked" : ""}
                        type="radio"
                        value="light"
                        aria-labelledby="light-theme-label"
                        name="theme"
                        aria-current="${currentTheme == "light"}"
                        style="cursor: pointer;"
                        tabindex="-1"
                    />
                    <input
                        ${currentTheme == "high-contrast" ? "checked" : ""}
                        type="radio"
                        value="high-contrast"
                        aria-labelledby="high-contrast-theme-label"
                        name="theme"
                        aria-current="${currentTheme == "high-contrast"}"
                        style="cursor: pointer;"
                        tabindex="-1"
                    />
                </form>
            </div>
        </div>
    `;
};

function setupTheme(form: HTMLFormElement) {
    form.addEventListener("submit", (e) => { e.preventDefault() });
    form.querySelectorAll("input[name='theme']").forEach((input) => {
        input.addEventListener("change", () => {
            if (input instanceof HTMLInputElement) {
                const previouslyActiveEl = document.querySelector(`#${form.id} input[aria-current="true"]`)!;
                const mainContainer = document.querySelector("#theme-main-container")!;

                localStorage.setItem("theme", input.value);

                previouslyActiveEl.setAttribute("aria-current", "false");
                previouslyActiveEl.removeAttribute("checked");

                input.setAttribute("aria-current", "true");
                input.setAttribute("checked", "true");

                document.querySelector(".active-theme-indicator")!.setAttribute("data-current", input.value);

                mainContainer.setAttribute("aria-valuenow", input.value);
                mainContainer.setAttribute("aria-valuetext", "The current theme of the site is " + input.value);


                document.documentElement.style.colorScheme = input.value == "light" ? "light" : "dark";
                document.documentElement.setAttribute("data-theme", input.value);
            }
        });
    });
}

export { theme, setupTheme };
