import styled from "styled-components";

const PageHeader = ({children}) => {
    return (
        <Header>{children}</Header>
    )
}

export default PageHeader;

const Header = styled.h1`
  font-size: 3rem;
  font-weight: bold;
`