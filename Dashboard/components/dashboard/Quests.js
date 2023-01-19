import { useEffect, useState } from "react";
import styled from "styled-components";
import PageHeader from "../common/PageHeader";
import retweetIcon from "../../public/icons/retweetIcon.png";
import mentionIcon from "../../public/icons/mentionIcon.png";
import commentIcon from "../../public/icons/commentIcon.png";
import Image from "next/image";
import api from "../../components/modals/index";
import NewQuest from "../../components/modals/NewQuest";
import QuestModal from "../../components/modals/QuestModal";
import { BlueLoader } from "../../components/common/Loader";

const Quests = ({ address }) => {
  const [toggleOption, setToggleOption] = useState("Active");
  const [quests, setQuests] = useState([]);
  const [showNewModal, setShowNewModal] = useState(false);
  const [showQuestModal, setShowQuestModal] = useState(false);
  const [selectedQuest, setSelectedQuest] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchQuests = async () => {
    setLoading(true);
    try {
      const { data: fetchedQuests } = await api.get(`/quests/${address}`);
      setQuests(fetchedQuests);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuests();
  }, []);

  const openQuestModal = (quest) => {
    setShowQuestModal(true);
    setSelectedQuest(quest);
  };

  const renderQuests = () => {
    const fetchedQuests = quests.map((quest) => {
      const startDate = new Date(quest.start);
      const endDate = new Date(quest.end);
      const start = startDate.getDate() + 1 + "." + startDate.getMonth() + 1;
      const end = endDate.getDate() + 1 + "." + endDate.getMonth() + 1;
      return (
        <QuestBox key={quest.title} onClick={() => openQuestModal(quest)}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <QuestHeader>{quest.title}</QuestHeader>
              {start !== end && (
                <QuestDates>
                  {start} - {end}
                </QuestDates>
              )}
            </div>
            <QuestIconContainer>
              {(quest.type === "Tweet Retweets" ||
                quest.type === "Total Retweets") && (
                <Image
                  alt="icon"
                  layout="fill"
                  objectFit="contain"
                  src={retweetIcon}
                ></Image>
              )}
              {quest.type === "Total Mentions" && (
                <Image
                  alt="icon"
                  layout="fill"
                  objectFit="contain"
                  src={mentionIcon}
                ></Image>
              )}
              {(quest.type === "Total Comments" ||
                quest.type === "Tweet Comments") && (
                <Image
                  alt="icon"
                  layout="fill"
                  objectFit="contain"
                  src={commentIcon}
                ></Image>
              )}
            </QuestIconContainer>
          </div>
          <QuestDescription>{quest.description}</QuestDescription>
        </QuestBox>
      );
    });
    return <QuestsContainer>{fetchedQuests}</QuestsContainer>;
  };
  return (
    <ContentContainer>
      {showNewModal && (
        <NewQuest
          onClose={() => setShowNewModal(false)}
          projectAddress={address}
          fetchQuests={() => fetchQuests()}
        />
      )}
      {showQuestModal && (
        <QuestModal
          onClose={() => setShowQuestModal(false)}
          quest={selectedQuest}
        />
      )}
      <div style={{ width: "100%", height: "11rem" }}>
        <PageHeader>Quests</PageHeader>
        <NavigationBar>
          <div>
            <Toggle
              onClick={() => setToggleOption("Active")}
              className={`${
                toggleOption === "Active" ? "border-b-2 border-[#3F61EC]" : ""
              }`}
            >
              <ToggleText>Active</ToggleText>
            </Toggle>
            <Toggle
              onClick={() => setToggleOption("Ended")}
              className={`${
                toggleOption === "Ended" ? "border-b-2 border-[#3F61EC]" : ""
              }`}
            >
              <ToggleText>Ended</ToggleText>
            </Toggle>
          </div>
          <NewButton onClick={() => setShowNewModal(true)}>Add new</NewButton>
        </NavigationBar>
      </div>
      {loading ? (
        <LoaderContainer>
          <BlueLoader />
        </LoaderContainer>
      ) : (
        renderQuests()
      )}
    </ContentContainer>
  );
};

export default Quests;

const ContentContainer = styled.div`
  height: 100vh;
  padding: 3rem;
  display: flex;
  flex-direction: column;
`;

const NavigationBar = styled.div`
  width: 100%;
  display: flex;
  margin-top: 2rem;
  height: 4rem;
  border-bottom: 2px solid #24263c;
  justify-content: space-between;
`;

const Toggle = styled.button`
  padding: 1rem 3rem 1rem 3rem;
  height: 100%;
  margin: 0 1rem 0 0rem;
`;

const ToggleText = styled.p``;
const NewButton = styled.button`
  background-color: #3f61ec;
  border-radius: 5px;
  padding: 0.5rem 2rem 0.5rem 2rem;
  height: 2.5rem;
`;

const QuestsContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-start;
  cursor: auto;
  flex-wrap: wrap;
  overflow-y: scroll;
`;

const LoaderContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const QuestBox = styled.div`
  width: 22rem;
  height: 12rem;
  border-radius: 7px;
  background-color: #1b1c28;
  margin: 2rem 1rem 0rem 0;
  padding: 1.5rem;
  display: block;
  cursor: pointer;
`;

const QuestHeader = styled.h2`
  color: white;
  text-align: left;
  font-size: 1.2rem;
  font-weight: bold;
`;

const QuestDates = styled.p`
  text-align: left;
  font-size: 0.8rem;
  color: #858585;
  margin-top: 0.2rem;
`;

const QuestDescription = styled.p`
  color: white;
  text-align: left;
  font-size: 0.8rem;
  margin-top: 1rem;
  color: #67778f;
`;

const QuestIconContainer = styled.div`
  position: relative;
  width: 2.5rem;
  height: 2.5rem;
`;
