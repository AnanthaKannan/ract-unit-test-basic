import React from "react"
import Counter from "../Counter"
import { render, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import renderer from 'react-test-renderer';

let getByTestId, headerEl, counterEl, inputEl, subBtnEl, addBtnEl;
beforeEach(() => {
    const component = render(<Counter />);
    getByTestId = component.getByTestId;
    headerEl = getByTestId('header');
    counterEl = getByTestId('counter');
    inputEl = getByTestId('input');
    subBtnEl = getByTestId('sub-btn');
    addBtnEl = getByTestId('add-btn');
});

test("header renders with correct text", () => {
    expect(headerEl.textContent).toBe("My Counter");
});

test("counter initially start with text of 0", () => {
    expect(counterEl.textContent).toBe("0");
});

test("input contains initial value of 1", () => {
    expect(inputEl.value).toBe("1");
});

test("add button render with +", () => {
    expect(addBtnEl.textContent).toBe("+");
});

test("subtract button render with -", () => {
    expect(subBtnEl.textContent).toBe("-");
});

test("change value of input works correctly", () => {
    expect(inputEl.value).toBe("1")
    fireEvent.change(inputEl, {
        target: {
            value: "5"
        }
    });
    expect(inputEl.value).toBe("5")
});

test("click on plus btn adds 1 to counter", () => {
    expect(counterEl.textContent).toBe("0");
    fireEvent.click(addBtnEl);
    expect(counterEl.textContent).toBe("1");
});

test("click on subtract btn sub 1 to counter", () => {
    expect(counterEl.textContent).toBe("0");
    
    fireEvent.click(subBtnEl);
    
    expect(counterEl.textContent).toBe("-1");
});

test("changing input value then clicking on add btn works correctly", () => {
    const addBtnEl = getByTestId('add-btn');
    const counterEl = getByTestId('counter');
    const inputEl = getByTestId('input');

    fireEvent.change(inputEl, {
        target: {
            value: "5"
        }
    });

    expect(counterEl.textContent).toBe("0");
    fireEvent.click(addBtnEl);
    expect(counterEl.textContent).toBe("5");
});

test("changing input value then clicking on sub btn works correctly", () => {

    fireEvent.change(inputEl, {
        target: {
            value: "5"
        }
    });
    expect(counterEl.textContent).toBe("0");
    fireEvent.click(subBtnEl);
    expect(counterEl.textContent).toBe("-5");
});

test("adding and then subtracting leads to the correct counter number", () => {

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

test('take the snap snap shot', () => {
  const tree = renderer
    .create(<Counter />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});