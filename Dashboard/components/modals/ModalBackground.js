import styled from "styled-components";

const ModalTemplate = ({onClose, children, closeable}) => {
    const handleBgClick = () => {
        if(closeable){
            onClose();
        }
    }
    return (
        <>
            <BlurBackground onClick={() => handleBgClick()}>
                {children}
            </BlurBackground>
        </>
    )
}

export default ModalTemplate;

const BlurBackground = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    backdrop-filter: blur(5px);
    background-color: rgba(0, 0, 0, 0.15);
    z-index: 101;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    overflow: hidden;
    @media (max-width: 768px) {
        border-top-right-radius: 20px;
        border-top-left-radius: 20px;
      }
`