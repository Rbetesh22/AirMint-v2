import styled from "styled-components";
import ModalBackground from "./ModalBackground";
import Image from "next/image";
import { FaDiscord, FaEnvelope, FaTwitter, FaCopy } from "react-icons/fa";

const HolderModal = ({onClose, holder}) => {

    return (
        <ModalBackground onClose={onClose} closeable={true}>
            <Container onClick={(e) => e.stopPropagation()}>
                <ProfileHeader>
                    <PFPContainer onClick={() => openProfile(holder)}>
                        <Image alt="logo" layout='fill' objectFit='contain' src={holder.pfpURL}></Image>
                    </PFPContainer>  
                    <ProfileInfoContainer>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between"}}>
                            <Username>
                                {holder.username}
                                <WalletAddress>
                                    0x3D2F...45G3 
                                    <FaCopy className="w-4 h-4 ml-2 cursor-pointer"/>
                                </WalletAddress>
                            </Username>
                            <Icons>
                                <Icon>
                                    <FaDiscord className="w-5 h-5"/>
                                </Icon>
                                <Icon>
                                    <FaEnvelope className="w-5 h-5"/>
                                </Icon>
                                <Icon>
                                    <FaTwitter className="w-5 h-5"/>
                                </Icon>
                            </Icons>
                        </div>
                    </ProfileInfoContainer> 
                </ProfileHeader>
            </Container>
        </ModalBackground>
    )
}

export default HolderModal;

const Container = styled.div`
  background-color: #1B1C28;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 7px;
  padding: 3rem 3rem 4rem 3rem;
  width: 35rem;
  height: 40rem;
  overflow-y: scroll;
  cursor: auto;
  &::-webkit-scrollbar {
    display: none;
}
`;

const PFPContainer = styled.div`
  position: relative;
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  overflow: hidden;
` 
const Username = styled.div`
    font-size: 1.4rem;
    font-weight: bold;
`

const ProfileHeader = styled.div`
    display: flex;
    
`

const ProfileInfoContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding-left: 2rem;
    flex: 1;
`

const WalletAddress = styled.p`
    font-size: 1rem;
    font-weight: 300;
    color: #67778F;
    display: flex;
    align-items: center;
    margin-top: 0.2rem;
`

const Icons = styled.div`
    display: flex;
`

const Icon = styled.div`
    margin-left: 1.5rem;
    cursor: pointer;
    width: 1.25rem;
    height: 1.25rem;
    transition: all 0.3s ease;
    &:hover {
        color: #3F61EC;
        transform: translateY(-0.2rem);
    } 
`