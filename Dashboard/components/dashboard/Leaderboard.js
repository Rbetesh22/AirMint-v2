import Image from "next/image";
import styled from "styled-components";
import PageHeader from "../common/PageHeader";
import ContentContainer from "../common/ContentContainer";
import { useState } from "react";
import HolderModal from "../modals/HolderModal";
import RewardModal from "../modals/RewardModal";

const Leaderboard = ({holders, address}) => {

  const [ openHolderProfile, setOpenHolderProfile ] = useState(false);
  const [ openRewardModal, setOpenRewardModal ] = useState(false);
  const [ selectedHolder, setSelectedHolder ] = useState({});

  const openProfile = (holder) => {
    setOpenHolderProfile(true);
    setSelectedHolder(holder)
  }

  const openReward = (holder) => {
    setOpenRewardModal(true);
    setSelectedHolder(holder)
  }

    const renderLeaderboard = () => {
        const fetchedHolders = holders.map((holder, holderIdx) => {
          try{
            const scoreIndex = holder.scores.findIndex(holder => holder.projectAddress === address);
            return (
              <HolderRow key={holder._id}>
                <div style={{display: "flex"}}>
                  <Position>{holderIdx + 1}.</Position>
                  <PFPContainer onClick={() => openProfile(holder)}>
                    <Image alt="logo" layout='fill' objectFit='contain' src={holder.pfpURL}></Image>
                  </PFPContainer>
                  <Username onClick={() => openProfile(holder)}>{holder.username}</Username>
                </div>
                <div style={{display: "flex", alignItems: "center"}}>
                  <Score>{holder.scores[scoreIndex].currentScore}<Token>$TCK</Token></Score>
                  <RewardButton onClick={() => openReward(holder)}>Reward</RewardButton>
                </div>
              </HolderRow>
            )
          } catch (e) {
            console.log(e)
          }
        })
        return (
            <div>
                {fetchedHolders}
            </div>
        )
    }

    return (
      <ContentContainer>
        {openHolderProfile && <HolderModal holder={selectedHolder} onClose={() => setOpenHolderProfile(false)} /> }
        {openRewardModal && <RewardModal holder={selectedHolder} onClose={() => setOpenRewardModal(false)} /> }
        <PageHeader>Leaderboard</PageHeader>
        <LeaderboardContainer>
          {renderLeaderboard()}
        </LeaderboardContainer>
      </ContentContainer>
    );
  }

export default Leaderboard;

const HolderRow = styled.div`
  padding: 1.2rem 2rem 1.2rem 2rem;
  background-color: white;
  border-radius: 5px;
  background-color: #1B1C28;
  display: flex; 
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`
const PFPContainer = styled.div`
  position: relative;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  overflow: hidden;
  margin-left: 2rem;
  cursor: pointer;
` 
const Position = styled.p`
  font-size: 1.5rem;
`
const Username = styled.p`
  font-size: 1.5rem;
  margin-left: 1rem;
  cursor: pointer;
  &:hover {
    color: #3F61EC;
} 
`
const Score = styled.div`
  font-size: 1.5rem;
  margin-right: 3rem;
  display: flex;
  align-items: flex-end;
`
const LeaderboardContainer = styled.div`
  margin-top: 3rem;
`

const RewardButton = styled.button`
  background-color: #3F61EC;
  border-radius: 5px;
  padding: 0.5rem 2rem 0.5rem 2rem;
`
const Token = styled.p`
  font-size: 1rem;
  margin-left: 0.5rem;
  color: #67778F;
`