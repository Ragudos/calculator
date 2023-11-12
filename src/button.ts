
interface ButtonProps {
    id?: string;
    textContent: string;
    className: string;
    ariaLabel: string;
    value: string;
}

function button({
    id,
    textContent,
    className,
    ariaLabel,
    value,
}: ButtonProps) {

    return `
        <button
            type="button"
            ${id ? `id=${id}` : undefined}
            class="${className}"
            aria-label="${ariaLabel}"    
            value="${value}"    
        >
            ${textContent}
        </button>
    `;
};

function removeCommas(val: string) {
    return val.split(",").join("").trim();
}

function setupButtons(buttons: NodeListOf<HTMLButtonElement>) {
    let currentOperation: "addition" | "subtraction" | "multiplication" | "division" | undefined;
    let previousValue = 0;
    let isOperating = false;
    let isGettingAnswer = false;

    function appendNumber(val: string) {
        const textContent = removeCommas(document.querySelector(".result")!.textContent!);
        const split = textContent.split(".");

        if (split[1] == "0") {
            document.querySelector(".result")!.textContent = `${split[0]}.${val}`;

            return;
        }

        document.querySelector(".result")!.textContent = `${parseFloat(textContent + val).toLocaleString("en-US", { maximumFractionDigits: 20 })}`;
    }

    buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const value = btn.value;

            if (
                value == "addition" ||
                value == "subtraction" ||
                value == "multiplication" ||
                value == "division" ||
                value == "reset" ||
                value == "delete" ||
                value == "equals" ||
                value == "decimal"
            ) {
                if (value == "reset" || value == "delete") {
                    const resultContainer = document.querySelector(".result")!;
                    
                    switch (value) {
                        case "delete": {
                            const textContent = removeCommas(resultContainer.textContent!);

                            if (+textContent != 0 || parseFloat(textContent) == 0) {
                                if (textContent.length == 1 || parseFloat(textContent) == 0) {
                                    resultContainer.textContent = "0";
                                } else {
                                    resultContainer.textContent = parseFloat(textContent.slice(0, textContent.length - 1)).toLocaleString("en-US", { maximumFractionDigits: 20 });
                                }
                            }
                        };
                        break;

                        case "reset": {
                            resultContainer.textContent = "0";

                            previousValue = 0;
                            isOperating = false;
                            isGettingAnswer = false;
                            currentOperation = undefined;
                        }
                    }
                } else {
                    if (!isOperating && !isGettingAnswer) {
                        if (
                            value == "addition" ||
                            value == "subtraction" ||
                            value == "multiplication" ||
                            value == "division"
                        ) {
                            isOperating = true;
                            currentOperation = value;
                        }
                    }
    
                    // when an operation button was pressed consecutively with another.
                    if (isOperating && !isGettingAnswer) {
                        if (
                            value == "addition" ||
                            value == "subtraction" ||
                            value == "multiplication" ||
                            value == "division"
                        ) {
                            currentOperation = value;
                        }
                    }
    
                    // either by pressing the "=" button or the operation buttons.
                    if (isOperating && isGettingAnswer && value != "decimal") {
                        if (currentOperation) {
                            const resultContainer = document.querySelector(".result")!;
                            const textContent = removeCommas(resultContainer.textContent!);
    
                            let ans: number;
    
                            switch (currentOperation) {
                                case "addition": {
                                    ans = (previousValue + parseFloat(textContent));
                                    resultContainer.textContent = ans.toLocaleString("en-US", { maximumFractionDigits: 20 });
                                };
                                    break;
    
                                case "subtraction": {
                                    ans = (previousValue - parseFloat(textContent));
                                    resultContainer.textContent = ans.toLocaleString("en-US", { maximumFractionDigits: 20 });
                                };
                                    break;
    
                                case "division": {
                                    ans = (previousValue / parseFloat(textContent));
                                    resultContainer.textContent = ans == 0 ? "0" : ans.toLocaleString("en-US", { maximumFractionDigits: 20 });
                                };
                                    break;
    
                                case "multiplication": {
                                    ans = (previousValue * parseFloat(textContent));
                                    resultContainer.textContent = ans == 0 ? "0" : ans.toLocaleString("en-US", { maximumFractionDigits: 20 });
                                }
                                    break;
                            }

                            previousValue = ans;
    
                            if (
                                value == "addition" ||
                                value == "subtraction" ||
                                value == "multiplication" ||
                                value == "division"
                            ) {
                                currentOperation = value;
                            } else if (value == "equals") {
                                currentOperation = undefined;
                                isOperating = false;
                            }
    
                            isGettingAnswer = false;
                        }
                    } else if (value == "decimal") {
                        const resultContainer = document.querySelector(".result")!;
                        const textContent = removeCommas(resultContainer.textContent!);

                        console.log(resultContainer.textContent!.indexOf("."));
                        
                        if (isOperating && !isGettingAnswer) {
                            previousValue = parseFloat(textContent);

                            resultContainer.textContent = "0.0";

                            isGettingAnswer = true;
                        } else {
                            if (resultContainer.textContent!.indexOf(".") == -1) {
                                resultContainer.textContent = textContent + ".0";
                            }
                        }
                    }
                }
            } else {
                if (isOperating && !isGettingAnswer) {
                    previousValue = parseFloat(removeCommas(document.querySelector(".result")!.textContent!));
                    isGettingAnswer = true;

                    document.querySelector(".result")!.textContent = "0";
                }

                appendNumber(removeCommas(btn.textContent!));
            }

            console.log({ currentOperation, isOperating, previousValue, isGettingAnswer });
        });
    });
}

export {
    type ButtonProps,
    button,
    setupButtons
}
