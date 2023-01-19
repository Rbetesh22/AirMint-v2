import React from 'react';
import LoginButton from './LoginButton';
import styled from 'styled-components';

const Leaderboard = () => {

    return (
            <LeaderboardComponent>
                <LoginButton></LoginButton>
            </LeaderboardComponent>
    )
}

export default Leaderboard;

const LeaderboardComponent = styled.div`
    width: 60rem;
    height: 40rem;
    background-color: white;
    border-radius: 15px;
    border: solid 3px black;
    padding: 2rem;
    color: black;
`