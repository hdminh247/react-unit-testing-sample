import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import App from './App';

let container = null;
beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () =>
            Promise.resolve([
                {
                    "breeds": [
                        {
                            "id": "beng",
                            "name": "Bengal",
                            "description": "Bengals are a lot of fun to live with, but they're definitely not the cat for everyone, or for first-time cat owners. Extremely intelligent, curious and active, they demand a lot of interaction and woe betide the owner who doesn't provide it.",
                        }
                    ],
                    "id": "J2PmlIizw",
                    "url": "https://cdn2.thecatapi.com/images/J2PmlIizw.jpg",
                    "width": 1080,
                    "height": 1350
                },
                {
                    "breeds": [
                        {
                            "id": "drex",
                            "name": "Devon Rex",
                            "description": "The favourite perch of the Devon Rex is right at head level, on the shoulder of her favorite person. She takes a lively interest in everything that is going on and refuses to be left out of any activity. Count on her to stay as close to you as possible, occasionally communicating his opinions in a quiet voice. She loves people and welcomes the attentions of friends and family alike.",
                        }
                    ],
                    "id": "jnqO9lwG2",
                    "url": "https://cdn2.thecatapi.com/images/jnqO9lwG2.jpg",
                    "width": 845,
                    "height": 583
                },
            ]),
    })
);

describe('Cat bread information', () => {
    it('Should toggle bread information on/off', async () => {
        await act(async () => {
            render(<App  />, container);
        });

        // Before toggle on show details, cat info wont be show
        expect(container.querySelector(".cat-info")).not.toBeTruthy();

        const button = document.querySelector("[data-testid=toggle]");

        act(() => {
            button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });

        // After toggle, cat info show up
        expect(container.querySelector(".cat-info")).toBeTruthy();
    });
});
