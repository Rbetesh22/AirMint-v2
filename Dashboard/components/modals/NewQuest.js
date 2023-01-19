import styled from "styled-components";
import ModalBackground from "./ModalBackground";
import api from "../../components/modals/index";
import { useState } from "react";
import { DateRange } from "react-date-range";
import Dropdown from "../common/Dropdown";
import { Loader } from "../common/Loader";

const types = [
  "Tweet Retweets",
  "Total Retweets",
  "Total Mentions",
  "Total Comments",
];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const NewQuestModal = ({ onClose, projectAddress, fetchQuests }) => {
  const [title, setTitle] = useState("");
  const [tweetLink, setTweetLink] = useState("");
  const [type, setType] = useState("Tweet Retweets");
  const [description, setDescription] = useState("");
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const [showCallendar, setShowCallendar] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const tweetId = tweetLink.slice(-19);
      console.log(tweetId);
      await api.post("/addQuest", {
        projectAddress,
        title,
        description,
        tweetId: tweetId,
        type,
        start: dateRange.startDate,
        end: dateRange.endDate,
      });
      onClose();
      fetchQuests();
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleDateSelect = (ranges) => {
    setDateRange({
      startDate: ranges.selection.startDate,
      endDate: ranges.selection.endDate,
      key: "selection",
    });
  };

  const displayCallendar = (e) => {
    e.stopPropagation();
    setShowCallendar(true);
  };

  const onFormClick = (e) => {
    e.stopPropagation();
    setShowCallendar(false);
  };

  return (
    <ModalBackground onClose={onClose} closeable={true}>
      <Form onSubmit={handleSubmit} onClick={(e) => onFormClick(e)}>
        <div style={{ width: "47%" }}>
          <Label>Quest Title</Label>
          <Input
            type="text"
            placeholder="My new quest"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div style={{ width: "47%" }}>
          <Label>Type</Label>
          <Dropdown
            values={types}
            value={type}
            onChange={setType}
            error={undefined}
          />
        </div>
        {(type === "Tweet Retweets" || type === "Tweet Comments") && (
          <div style={{ width: "47%" }}>
            <Label>Link to your tweet</Label>
            <Input
              type="text"
              placeholder="https://www.twitter.com/username/status/12345"
              value={tweetLink}
              onChange={(e) => setTweetLink(e.target.value)}
              required
            />
          </div>
        )}
        {type !== "Tweet Retweets" && type !== "Tweet Comments" && (
          <div style={{ width: "47%" }}>
            <Label>Duration (optional)</Label>
            <div className="mt-1" onClick={(e) => displayCallendar(e)}>
              <div
                style={{ padding: "0.7rem" }}
                className={
                  dateError
                    ? "appearance-none cursor-pointer block border border-red-300 rounded-md shadow-sm placeholder-red-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                    : "appearance-none cursor-pointer block border border-[#A1A4BD] bg-[#181924] mb-6 rounded-md shadow-sm placeholder-gray-400 text-base"
                }
              >
                {dateRange.startDate.getDate() !==
                dateRange.endDate.getDate() ? (
                  <div>
                    {dateRange.startDate.getDate()}/
                    {dateRange.startDate.getMonth() + 1}-
                    {dateRange.endDate.getDate()}/
                    {dateRange.endDate.getMonth() + 1}
                  </div>
                ) : (
                  <div className="text-gray-400">Default: Last 24h</div>
                )}
              </div>
              <div className="absolute z-50">
                {showCallendar && (
                  <DateRange
                    rangeColors={["#3F61EC"]}
                    minDate={new Date()}
                    ranges={[dateRange]}
                    onChange={handleDateSelect}
                    showMonthAndYearPickers={false}
                    showDateDisplay={false}
                  />
                )}
              </div>
            </div>
          </div>
        )}
        <Label style={{ width: "100%" }}>Description</Label>
        <DescriptionInput
          placeholder="Retweet our latest tweet and get an airdrop of our token."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <div
          style={{ display: "flex", width: "100%", justifyContent: "center" }}
        >
          <Button type="submit">
            {loading ? (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Loader />
              </div>
            ) : (
              <p>Create quest</p>
            )}
          </Button>
        </div>
      </Form>
    </ModalBackground>
  );
};

export default NewQuestModal;

const Form = styled.form`
  background-color: #1b1c28;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
  border-radius: 7px;
  padding: 3rem 3rem 4rem 3rem;
  width: 35rem;
  cursor: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Label = styled.label`
  display: block;
  color: #67778f;
  font-size: 14px;
  margin-bottom: 8px;
`;

const Input = styled.input`
  display: block;
  box-sizing: border-box;
  width: 100%;
  padding: 0.7rem;
  border: 1px solid #a1a4bd;
  border-radius: 7px;
  font-size: 1rem;
  margin-bottom: 1.5rem;
  background-color: #181924;
`;

const DescriptionInput = styled.textarea`
  display: block;
  box-sizing: border-box;
  width: 100%;
  padding: 0.7rem;
  height: 7rem;
  border: 1px solid #a1a4bd;
  border-radius: 7px;
  font-size: 16px;
  margin-bottom: 1.5rem;
  background-color: #181924;
`;

const Button = styled.button`
  display: block;
  width: 80%;
  height: 3rem;
  margin-top: 3rem;
  background-color: #3f61ec;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
`;
