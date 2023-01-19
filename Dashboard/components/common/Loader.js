import styled, { keyframes } from "styled-components";

const spinAnimation = keyframes`
100% {
    transform: rotate(1turn);
 }
`

export const Loader = styled.div`
    width: 1.3rem;
    height: 1.3rem;
    border-radius: 50%;
    background: radial-gradient(farthest-side,#ffffff 94%,#0000) top/0.1rem 0.1rem no-repeat,
        conic-gradient(#0000 30%,#ffffff);
    -webkit-mask: radial-gradient(farthest-side,#0000 calc(100% - 0.2rem),#000 0);
    animation: ${spinAnimation} 1s infinite linear;
`

export const BlueLoader = styled.div`
        width: 56px;
        height: 56px;
        border-radius: 50%;
        background: radial-gradient(farthest-side,#3F61EC 94%,#0000) top/9px 9px no-repeat,
            conic-gradient(#0000 30%,#3F61EC);
        -webkit-mask: radial-gradient(farthest-side,#0000 calc(100% - 9px),#000 0);
        animation: ${spinAnimation} 1s infinite linear;
`