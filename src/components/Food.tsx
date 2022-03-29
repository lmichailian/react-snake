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

function Food({ position }: { position: Point }) {
    return (
        <FoodStyled position={position}>
            🍔
        </FoodStyled>
    )
}

export default React.memo(Food)