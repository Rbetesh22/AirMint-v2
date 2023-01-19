import styled from "styled-components";

const ContentContainer = ({children}) => {
    return (
        <Container>
            {children}
        </Container>
    )
}

export default ContentContainer;

const Container = styled.div`
  height: 100vh;
  padding: 3rem;
`