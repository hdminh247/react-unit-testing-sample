import React from "react";
import { render } from "react-dom";
import { act } from "react-dom/test-utils";
import {  fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import App from './App';

let container = null;
beforeEach(async () => {
    container = document.createElement("div");
    document.body.appendChild(container);

    await act(async () => {
        render(<App  />, container);
    });
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
            {
                "breeds": [
                    {
                        "id": "drex1",
                        "name": "Devon Rex",
                        "description": "The favourite perch of the Devon Rex is right at head level, on the shoulder of her favorite person. She takes a lively interest in everything that is going on and refuses to be left out of any activity. Count on her to stay as close to you as possible, occasionally communicating his opinions in a quiet voice. She loves people and welcomes the attentions of friends and family alike.",
                    }
                ],
                "id": "jnqO9lwG21",
                "url": "https://cdn2.thecatapi.com/images/jnqO9lwG2.jpg",
                "width": 845,
                "height": 583
            },
            {
                "breeds": [
                    {
                        "id": "drex2",
                        "name": "Devon Rex",
                        "description": "The favourite perch of the Devon Rex is right at head level, on the shoulder of her favorite person. She takes a lively interest in everything that is going on and refuses to be left out of any activity. Count on her to stay as close to you as possible, occasionally communicating his opinions in a quiet voice. She loves people and welcomes the attentions of friends and family alike.",
                    }
                ],
                "id": "jnqO9lwG22",
                "url": "https://cdn2.thecatapi.com/images/jnqO9lwG2.jpg",
                "width": 845,
                "height": 583
            },
            {
                "breeds": [
                    {
                        "id": "drex3",
                        "name": "Devon Rex",
                        "description": "The favourite perch of the Devon Rex is right at head level, on the shoulder of her favorite person. She takes a lively interest in everything that is going on and refuses to be left out of any activity. Count on her to stay as close to you as possible, occasionally communicating his opinions in a quiet voice. She loves people and welcomes the attentions of friends and family alike.",
                    }
                ],
                "id": "jnqO9lwG24",
                "url": "https://cdn2.thecatapi.com/images/jnqO9lwG2.jpg",
                "width": 845,
                "height": 583
            },
        ]),
  })
);

describe('Cat list Pagination', () => {

    it('Should have extra 5 items each time scrolling to bottom', async () => {

        // Before toggle on show details, cat info wont be show
        expect(container.querySelector("#cat-list").children).toHaveLength(5)

        const catList = document.querySelector("#cat-list");

        // Scroll to bottom
        await act(async () => {
            fireEvent.scroll(catList, { target: { scrollY: 9000 } });
        })

        setTimeout(async()=>{
            expect(container.querySelector("#cat-list").children).toHaveLength(10)

            // Scroll to bottom
            await act(async () => {
                fireEvent.scroll(catList, { target: { scrollY: 9000 } });
            })


            setTimeout(async()=>{
                expect(container.querySelector("#cat-list").children).toHaveLength(15)

                // Scroll to bottom
                await act(async () => {
                    fireEvent.scroll(catList, { target: { scrollY: 9000 } });
                })

                setTimeout(async()=>{
                    expect(container.querySelector("#cat-list").children).toHaveLength(20)

                    await act(async () => {
                        fireEvent.scroll(catList, { target: { scrollY: 9000 } });
                    })
                },500)
            },500)

        },500)



    });
});
