import styled from "styled-components";

type Point = {
    x: number;
    y: number;
}

const Member = styled.div<{ position: Point }>`
    left: ${props => props.position.x}%;
    top: ${props => props.position.y}%;
    position: absolute;
    box-sizing: border-box;
    width: 20px;
    height: 20px;
    
    background-color: black;
`;


function Snake({ snakePosition }: { snakePosition: Point[] }) {
    return (
        <>
            {snakePosition.map((position, index) => (
                <Member position={position} />
            ))}
        </>
    );
}

export default Snake