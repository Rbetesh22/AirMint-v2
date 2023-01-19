import api from "./index";
import ModalBackground from "./ModalBackground";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import { BlueLoader } from "../../components/common/Loader";

const QuestModal = ({ quest, onClose }) => {
  const [participantsList, setParticipantsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestInfo = async () => {
      setLoading(true);
      try {
        let participants = [];
        if (quest.type === "Tweet Retweets") {
          const { data: retweets } = await api.get(
            `/retweets/${quest.tweetId}`
          );
          await Promise.all(
            retweets.data.map(async (participant) => {
              try {
                const { data: holder } = await api.get(
                  `/holders/${participant.username}`
                );
                if (holder.username) {
                  participants.push({ info: holder, holder: true });
                } else {
                  participants.push({ info: participant, holder: false });
                }
              } catch (e) {
                participants.push({ info: participant, holder: false });
              }
            })
          );
        } else {
          try {
            const { data: holderIds } = await api.get(
              `/getProjectHolders/${quest.projectAddress}`
            );
            const { data: project } = await api.get(
              `/project/${quest.projectAddress}`
            );
            const projectTwitterHandle = project.twitter.replace(
              "https://www.twitter.com/",
              ""
            );

            await Promise.all(
              holderIds.map(async (participant) => {
                try {
                  const { data: holder } = await api.get(
                    `/holder/${participant._id}`
                  );
                  let startTime = quest.start;
                  let endTime = quest.end;
                  if (startTime === endTime) {
                    startTime = new Date(
                      new Date().getTime() - 24 * 60 * 60 * 1000
                    ).toISOString();
                    endTime = new Date().toISOString();
                  }

                  let twitterResponse = {};

                  if (quest.type === "Total Mentions") {
                    twitterResponse = await api.get(
                      `/count/mentions/${holder.twitterUsername}/${projectTwitterHandle}/${startTime}/${endTime}`
                    );
                  }

                  if (quest.type === "Total Retweets") {
                    twitterResponse = await api.get(
                      `/count/retweets/${holder.twitterUsername}/${projectTwitterHandle}/${startTime}/${endTime}`
                    );
                  }

                  if (quest.type === "Total Comments") {
                    twitterResponse = await api.get(
                      `/count/comments/${holder.twitterUsername}/${projectTwitterHandle}/${startTime}/${endTime}`
                    );
                  }

                  participants.push({
                    info: holder,
                    holder: true,
                    score: twitterResponse.data.meta.total_tweet_count,
                  });
                } catch (e) {
                  console.log(e);
                }
              })
            );
          } catch (e) {
            console.log(e);
          }
        }

        setParticipantsList(participants);
        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    };

    fetchQuestInfo();
  }, []);

  const renderParticipants = () => {
    const fetchedParticipants = participantsList.map((participant) => {
      console.log(participant);
      return (
        <ParticipantRow>
          <div style={{ display: "flex" }}>
            <PFPContainer>
              {participant.holder ? (
                <Image
                  alt="logo"
                  layout="fill"
                  objectFit="contain"
                  src={participant.info.pfpURL}
                ></Image>
              ) : (
                <Image
                  alt="logo"
                  layout="fill"
                  objectFit="contain"
                  src="https://cdn-icons-png.flaticon.com/512/3237/3237472.png"
                ></Image>
              )}
            </PFPContainer>
            <ParticipantLink
              href={`https://www.twitter.com/${participant.info.username}`}
            >
              <Username>{participant.info.username}</Username>
            </ParticipantLink>
          </div>
          <div style={{ display: "flex" }}>
            {participant.score === undefined ? (
              ""
            ) : (
              <Score>{participant.score}</Score>
            )}
            {participant.holder && <RewardButton>Reward</RewardButton>}
          </div>
        </ParticipantRow>
      );
    });
    return <ParticipantsContainer>{fetchedParticipants}</ParticipantsContainer>;
  };

  return (
    <ModalBackground onClose={onClose} closeable={true}>
      <Container onClick={(e) => e.stopPropagation()}>
        <QuestTitle>{quest.title}</QuestTitle>
        {loading ? (
          <LoaderContainer>
            <BlueLoader />
          </LoaderContainer>
        ) : (
          renderParticipants()
        )}
      </Container>
    </ModalBackground>
  );
};

export default QuestModal;

const Container = styled.div`
  background-color: #1b1c28;
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

const QuestTitle = styled.h1`
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
`;

const ParticipantsContainer = styled.div`
  width: 100%;
  margin-top: 2rem;
`;

const ParticipantRow = styled.div`
  width: 100%;
  padding: 1rem 0.5rem 1rem 0.5rem;
  border-bottom: 2px solid #171829;
  margin: 1rem 0 1rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PFPContainer = styled.div`
  position: relative;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  overflow: hidden;
`;
const ParticipantLink = styled.a`
  &:hover {
    color: #3f61ec;
  }
`;

const Username = styled.p`
  font-size: 1.2rem;
  margin-left: 1rem;
`;

const Score = styled.p`
  font-size: 1.2rem;
  margin-right: 2rem;
`;

const RewardButton = styled.button`
  background-color: #3f61ec;
  border-radius: 5px;
  padding: 0.3rem 2rem 0.3rem 2rem;
`;

const LoaderContainer = styled.div`
  height: 30rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
