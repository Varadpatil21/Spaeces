import React from 'react';
import { Givestick } from './Givestick';
import './Setup.css';
import { GiveCardBack } from './GiveCardBack';

export const Setup = () => {
    let stick = new Map();
    const numbers = [1, 7, 17, 30];

    for (let j = 0; j < numbers.length - 1; j++) {
        let c = numbers[j];
        stick.set(c++, <GiveCardBack key={`cardback-${j}`} />);

        for (let i = 0; i < (numbers[j + 1] - numbers[j]); i++) {
            stick.set(c++, <Givestick key={`stick-${j}-${i}`} />);
        }
    }
    stick.set(numbers[numbers.length - 1], <GiveCardBack key={`cardback-last`} />);

    const handleClick = (index) => {
        console.log(`Clicked item index: ${index}`);
    };

    return (
        <div className='player-setup'>
            <div className="sticks">
                {
                    [...stick.entries()].map(([key, value]) => (
                        <div key={key} onClick={() => handleClick(key)}>
                            {value}
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
