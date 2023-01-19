import { useState } from "react";
import { useRouter } from 'next/router';
import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";

const Sidebar = ({selectedTab, projectAddress}) => {

    const router = useRouter();

    return (
        <NavigationBar>
            <Link href={`/project/${projectAddress}`}>
            <ProfileImage>
                <Image alt="logo" layout='fill' objectFit='contain' src={"https://cdn-icons-png.flaticon.com/512/3237/3237472.png"}></Image>
            </ProfileImage>
            </Link>
            <Navigation>
                <NavLink 
                    onClick={() => router.push(`/overview/${projectAddress}`)} 
                    className={`${selectedTab === "overview" ? 'text-[#3F61EC]': 'text-white'}`}>
                        Overview
                </NavLink>
                <NavLink 
                onClick={() => router.push(`/leaderboard/${projectAddress}`)} 
                className={`${selectedTab === "leaderboard" ? 'text-[#3F61EC]': 'text-white'}`}>
                    Leaderboard
                </NavLink>
                <NavLink 
                onClick={() => router.push(`/quests/${projectAddress}`)} 
                className={`${selectedTab === "quests" ? 'text-[#3F61EC]': 'text-white'}`}>
                    Quests
                </NavLink>
            </Navigation>
        </NavigationBar>
    )
}

export default Sidebar;
const NavigationBar = styled.nav`
  height: 100vh;
  background-color: #1B1C28;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
  color: #fff;
  width: 15rem;
  padding-top: 2rem;
  }
`;

const ProfileImage = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: #ECECEC;
  margin-left: 2rem;
  position: relative;
  overflow: hidden;
`

const Navigation = styled.nav`
  display: flex;
  flex-wrap: wrap;
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
    background-color: #3F61EC;
    color: white;
  }
`