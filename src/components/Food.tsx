import React from 'react';
import styled from 'styled-components';

type Point = {
    x: number;
    y: number;
}

const FoodStyled = styled.div<{ position: Point }>`
    left: ${props => props.position.x}%;
    top: ${props => props.position.y}%;
    position: absolute;
    box-sizing: border-box;
    padding: 1px;
    font-size: 20px;
`;

function Food() {
    function randomFood() {
        return {
            x: Math.ceil(Math.floor(Math.random() * 85) / 5) * 5,
            y: Math.ceil(Math.floor(Math.random() * 85) / 5) * 5
        };
    }

    return (
        <FoodStyled position={randomFood()}>
            🍔
        </FoodStyled>
    )
}

export default React.memo(Food)