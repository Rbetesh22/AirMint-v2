import styled from "styled-components";
import ModalBackground from "./ModalBackground";
import { useState } from "react";

const RewardModal = ({onClose, holder}) => {

    const [toggleOption, setToggleOption] = useState("ERC20");
    const [projectAddress, setProjectAddress] = useState("");
    const [amount, setAmount] = useState(0);
    const [tokenId, setTokenId] = useState(1);

    const handleSubmit = async event => {
        event.preventDefault();
        try {
            //send an NFT or tokens to holder address
        } catch (error) {
          console.error(error);
        }
    };

    return (
        <ModalBackground onClose={onClose} closeable={true}>
            <Container onClick={(e) => e.stopPropagation()}>
                <Title>Reward {holder.username}</Title>
                <NavigationBar>
                <div>
                    <Toggle onClick={() => setToggleOption("ERC20")} className={`${toggleOption === "ERC20" ? 'border-b-2 border-[#3F61EC]': ''}`}>
                        <ToggleText>ERC20</ToggleText>
                    </Toggle>
                    <Toggle onClick={() => setToggleOption("NFT")} className={`${toggleOption === "NFT" ? 'border-b-2 border-[#3F61EC]': ''}`}> 
                        <ToggleText>NFT</ToggleText>
                    </Toggle>
                    </div>
                </NavigationBar>
                <Form onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
                    <div>
                        {toggleOption === "ERC20" ? 
                            <Label>
                                Token address
                            </Label>     
                            :
                            <Label>
                                NFT address
                            </Label>                   
                        }

                        <Input
                            type="text"
                            placeholder="0x0..."
                            value={projectAddress}
                            onChange={(e) => setProjectAddress(e.target.value)}
                            required
                        />
                    </div>

                    {toggleOption === "ERC20" ? 
                        <div className="mb-6">
                            <Label>
                                Amount
                            </Label>
                            <Input
                                type="number"
                                placeholder="100"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                required
                            />
                        </div>                   
                        :
                        <div className="mb-6">
                            <Label>
                                NFT ID
                            </Label>
                            <Input
                                type="number"
                                placeholder="1234"
                                value={tokenId}
                                onChange={(e) => setTokenId(e.target.value)}
                                required
                            />
                        </div>
                    }

                    <div style={{display: "flex", width: "100%", justifyContent: "center"}}>
                        <Button
                        type="submit"
                        >
                        Reward
                        </Button>
                    </div>
                </Form>
            </Container>
        </ModalBackground>
    )
}

export default RewardModal;

const Container = styled.div`
  background-color: #1B1C28;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 7px;
  padding: 3rem 3rem 4rem 3rem;
  width: 35rem;
  height: 37rem;
  overflow-y: scroll;
  cursor: auto;
  &::-webkit-scrollbar {
    display: none;
}
`;

const Title = styled.h2`
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
`

const NavigationBar = styled.div`
    width: 100%;
    display: flex;
    margin-top: 1rem;
    height: 4rem;
    justify-content: center;
`


const Toggle = styled.button`
    padding: 1rem 5rem 0rem 5rem;
    height: 100%;
    margin: 0 1rem 0 0rem;
`

const ToggleText = styled.p`
    font-size: 1rem;
`

const Form = styled.form`
  background-color: #1B1C28;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 7px;
  padding: 3rem 3rem 4rem 3rem;
  width: 30rem;
  cursor: auto;
`;

const Label = styled.label`
  display: block;
  color: #67778F;
  font-size: 14px;
  margin-bottom: 8px;
`;

const Input = styled.input`
  display: block;
  box-sizing: border-box;
  width: 100%;
  padding: 12px;
  border: 1px solid #A1A4BD;
  border-radius: 7px;
  font-size: 16px;
  margin-bottom: 16px;
  background-color: #181924;
`;

const Button = styled.button`
  display: block;
  width: 80%;
  padding: 0.7rem;
  margin-top: 3rem;
  background-color: #3F61EC;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
`;