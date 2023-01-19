import styled from "styled-components";
import Leaderboard from "../../../components/dashboard/Leaderboard";
import Quests from "../../../components/dashboard/Quests";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import api from "../../../components/modals/index";
import { Client } from "twitter-api-sdk";
import Profile from "../../../components/dashboard/Profile";
import Overview from "../../../components/dashboard/Overview";

export const getServerSideProps = async (context) => {
  const client = new Client(process.env.NEXT_PUBLIC_TWITTER_BEARER);
  const projectAddress = context.params.projectAddress;
  let fetchedHolders = [];
  let projectTwitter = {};
  try {
    const { data: project } = await api.get(`/project/${projectAddress}`);
    const projectTwitterHandle = project.twitter.replace(
      "https://www.twitter.com/",
      ""
    );
    const twitterResponse = await client.users.findUserByUsername(
      projectTwitterHandle,
      {
        "user.fields": ["profile_image_url"],
      }
    );
    projectTwitter = twitterResponse.data;
    const { data: holderIds } = await api.get(
      `/getProjectHolders/${projectAddress}`
    );
    const promises = holderIds.map((id) => api.get(`/holder/${id._id}`)); //fetching project holders
    const holders = await Promise.all(promises);
    fetchedHolders = holders.map((holder) => holder.data);
  } catch (e) {
    console.log(e);
  }

  return {
    props: {
      fetchedHolders,
      projectTwitter,
    },
  };
};

function Dashboard({ fetchedHolders, projectTwitter }) {
  const router = useRouter();
  const { projectAddress } = router.query;
  const [tab, setTab] = useState("Leaderboard");
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const validateJWT = async () => {
      const token = localStorage.getItem("token");
      try {
        const { data: valid } = await api.get("/checkJWT", {
          headers: {
            authorization: token,
          },
        });
        setLoggedIn(valid);
      } catch (e) {
        setLoggedIn(false);
      }
    };
    validateJWT();
  }, []);

  const logout = () => {
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token");
      router.push("/");
    }
  };

  if (!loggedIn) {
    return (
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          height: "100vh",
          alignItems: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <p style={{ width: "100%", fontSize: "2rem", marginBottom: "2rem" }}>
            Please log in.{" "}
          </p>
          <a href="/" style={{ color: "#3F61EC" }}>
            Back to homepage
          </a>
        </div>
      </div>
    );
  } else {
    return (
      <div style={{ display: "flex", flexDirection: "row" }}>
        <NavigationBar>
          <ProfileImage onClick={() => setTab("Profile")}>
            <Image
              alt="logo"
              layout="fill"
              objectFit="contain"
              src={projectTwitter.profile_image_url}
            ></Image>
          </ProfileImage>
          <Navigation>
            <NavLink
              onClick={() => setTab("Overview")}
              className={`${
                tab === "Overview" ? "text-[#3F61EC]" : "text-white"
              }`}
            >
              Overview
            </NavLink>
            <NavLink
              onClick={() => setTab("Leaderboard")}
              className={`${
                tab === "Leaderboard" ? "text-[#3F61EC]" : "text-white"
              }`}
            >
              Leaderboard
            </NavLink>
            <NavLink
              onClick={() => setTab("Quests")}
              className={`${
                tab === "Quests" ? "text-[#3F61EC]" : "text-white"
              }`}
            >
              Quests
            </NavLink>
          </Navigation>
          <LogoutButton onClick={logout}>Log out</LogoutButton>
        </NavigationBar>
        <div style={{ flex: "1", marginLeft: "15rem" }}>
          {tab === "Leaderboard" && (
            <Leaderboard holders={fetchedHolders} address={projectAddress} />
          )}
          {tab === "Quests" && <Quests address={projectAddress} />}
          {tab === "Overview" && <Overview address={projectAddress} />}
          {tab === "Profile" && <Profile address={projectAddress} />}
        </div>
      </div>
    );
  }
}

export default Dashboard;

const NavigationBar = styled.nav`
  height: 100vh;
  background-color: #1B1C28;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
  color: #fff;
  width: 15rem;
  padding-top: 2rem;
  position: fixed;
  }
`;

const ProfileImage = styled.button`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-color: #ececec;
  margin-left: 2rem;
  position: relative;
  overflow: hidden;
`;

const Navigation = styled.nav`
  display: flex;
  flex-wrap: wrap;
  background-color: #1B1C28;
  color: #fff;
  width: 100%;
  margin-top: 3rem;
  }
`;

const NavLink = styled.button`
  font-size: 1.2rem;
  width: 100%;
  text-align: left;
  margin-top: 2rem;
  padding: 0.7rem 2rem 0.7rem 2rem;
  &:hover {
    background-color: #3f61ec;
    color: white;
  }
`;

const LogoutButton = styled.button`
  position: absolute;
  bottom: 3rem;
  left: 2rem;
  &:hover {
    color: #3f61ec;
  }
`;
