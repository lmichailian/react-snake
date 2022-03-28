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
    width: 20px;
    height: 20px;
    margin: 1px;
    background-color: red;
`;

function Food({ position: { x, y } }: { position: Point }) {
    return (
        <FoodStyled position={{ x, y }} />
    )
}

export default Food