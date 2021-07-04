import React from "react"
import Counter from "../Counter"
import { render, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"

let getByTestId;
beforeEach(() => {
    const component = render(<Counter />);
    getByTestId = component.getByTestId;
});

test("header renders with correct text", () => {
    const headerEl = getByTestId('header');

    expect(headerEl.textContent).toBe("My Counter");
});

test("counter initially start with text of 0", () => {
    const counterEl = getByTestId('counter');

    expect(counterEl.textContent).toBe("0");
});

test("input contains initial value of 1", () => {
    const inputEl = getByTestId('input');

    expect(inputEl.value).toBe("1");
});

test("add button render with +", () => {
    const btnEl = getByTestId('add-btn');

    expect(btnEl.textContent).toBe("+");
});

test("subtract button render with -", () => {
    const btnEl = getByTestId('sub-btn');

    expect(btnEl.textContent).toBe("-");
});

test("change value of input works correctly", () => {
    const inputEl = getByTestId('input');
    expect(inputEl.value).toBe("1")
    fireEvent.change(inputEl, {
        target: {
            value: "5"
        }
    });
    expect(inputEl.value).toBe("5")
});

test("click on plus btn adds 1 to counter", () => {
    const btnEl = getByTestId('add-btn');
    const counterEl = getByTestId('counter');

    expect(counterEl.textContent).toBe("0");
    
    fireEvent.click(btnEl);

    expect(counterEl.textContent).toBe("1");
});

test("click on subtract btn sub 1 to counter", () => {
    const btnEl = getByTestId('sub-btn');
    const counterEl = getByTestId('counter');

    expect(counterEl.textContent).toBe("0");
    
    fireEvent.click(btnEl);
    
    expect(counterEl.textContent).toBe("-1");
});

test("changing input value then clicking on add btn works correctly", () => {
    const btnEl = getByTestId('add-btn');
    const counterEl = getByTestId('counter');
    const inputEl = getByTestId('input');

    fireEvent.change(inputEl, {
        target: {
            value: "5"
        }
    });
    expect(counterEl.textContent).toBe("0");
    fireEvent.click(btnEl);
    expect(counterEl.textContent).toBe("5");
});

test("changing input value then clicking on sub btn works correctly", () => {
    const btnEl = getByTestId('sub-btn');
    const counterEl = getByTestId('counter');
    const inputEl = getByTestId('input');

    fireEvent.change(inputEl, {
        target: {
            value: "5"
        }
    });
    expect(counterEl.textContent).toBe("0");
    fireEvent.click(btnEl);
    expect(counterEl.textContent).toBe("-5");
});

test("adding and then subtracting leads to the correct counter number", () => {
    const subBtnEl = getByTestId('sub-btn');
    const addBtnEl = getByTestId('add-btn');
    const counterEl = getByTestId('counter');
    const inputEl = getByTestId('input');

    fireEvent.change(inputEl, {
        target: {
            value: "10"
        }
    });

    expect(counterEl.textContent).toBe("0");
    fireEvent.click(addBtnEl);
    fireEvent.click(addBtnEl);
    fireEvent.click(addBtnEl);
    fireEvent.click(addBtnEl);
    fireEvent.click(subBtnEl);
    fireEvent.click(subBtnEl);
    expect(counterEl.textContent).toBe("20");

    fireEvent.change(inputEl, {
        target: {
            value: "5"
        }
    });
    fireEvent.click(addBtnEl);
    fireEvent.click(subBtnEl);
    fireEvent.click(subBtnEl);
    expect(counterEl.textContent).toBe("15");
});

test("counter contains correct className", () => {
    const addBtnEl = getByTestId('add-btn');
    const subBtnEl = getByTestId('sub-btn');
    const counterEl = getByTestId('counter');
    const inputEl = getByTestId('input');

    expect(counterEl.className).toBe("");
    
    fireEvent.change(inputEl, {
        target: {
            value: "50"
        }
    });
    fireEvent.click(addBtnEl);
    expect(counterEl.className).toBe("");
    fireEvent.click(addBtnEl);
    expect(counterEl.className).toBe("bg-success");
    fireEvent.click(addBtnEl);
    expect(counterEl.className).toBe("bg-success");

    fireEvent.click(subBtnEl);
    fireEvent.click(subBtnEl);
    expect(counterEl.className).toBe("");
    fireEvent.click(subBtnEl);
    fireEvent.click(subBtnEl);
    fireEvent.click(subBtnEl);
    expect(counterEl.className).toBe("bg-danger");

});