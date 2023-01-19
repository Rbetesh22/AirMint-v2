import styled from "styled-components";
import React from 'react';
import { Network, Alchemy } from "alchemy-sdk";

const settings = {
    apiKey: "UqL-g9DI5zMqq-ijYZleberB2DY81VK6",
    network: Network.ETH_MAINNET,
  };

const LoginButton = () => {


    const alchemy = new Alchemy(settings);

    const login = async () => {
        const contractAddress = "0x59468516a8259058baD1cA5F8f4BFF190d30E066";
        let ownedNfts = [];
        let NftsRarity = [];

        alchemy.nft.getNftsForOwner("0x42599f1fAEb18BCC0C6A88066b439ce90373B0E4").then((response) => { //fetch list of all project's NFTs that holder owns
            response.ownedNfts.forEach((NFT) => { 
                if (NFT.contract.address === contractAddress.toLowerCase()) {
                    ownedNfts.push(NFT);
                    alchemy.nft.computeRarity(contractAddress, NFT.tokenId).then((response) => { //fetching trait rarity for every NFT
                        NftsRarity.push(response);
                    })
                }
            })
        });

        alchemy.core.getAssetTransfers({ //get all NFT transfers that holder has made
            fromAddress: "0x0c36922266e6ce0f92a357e20399f295c2b9ff10",
            excludeZeroValue: true,
            category: ["erc721"],
            contractAddresses: [contractAddress]
          }).then((response) => {
            console.log("NFTTransfers: ", response.transfers.length);
        });

        console.log("NFTs: ", ownedNfts);
        console.log("Rarities: ", NftsRarity)


        const ERC20Balance = await alchemy.core.getTokenBalances(
            "0x922F01dbc9eb1B653AdC254CaC27D6541C4843d2", 
            ["0x4d224452801ACEd8B2F0aebE155379bb5D594381"]
        ); //get balance of project's ERC20

        const ERC20Transfers = await alchemy.core.getAssetTransfers({
            fromAddress: "0x922F01dbc9eb1B653AdC254CaC27D6541C4843d2",
            excludeZeroValue: true,
            category: ["erc20"],
            contractAddresses: ["0x4d224452801ACEd8B2F0aebE155379bb5D594381"]
          }); //get transfers that holder has made with of project's ERC20

        //fetching total number of retweets during specified timeframe
        fetch('http://localhost:3002/count/retweets/degendeeds/degendeeds/2023-01-04T18:45:20.050Z/2023-01-07T18:45:20.050Z')
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error))

        //fetching total number of mentions during specified timeframe
        fetch('http://localhost:3002/count/mentions/degendeeds/degendeeds/2023-01-04T18:45:20.050Z/2023-01-07T18:45:20.050Z')
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error))   

        //fetching total number of comments during specified timeframe
        fetch('http://localhost:3002/count/comments/degendeeds/degendeeds/2023-01-04T18:45:20.050Z/2023-01-07T18:45:20.050Z')
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error))

        console.log("ERC20Balance (hashed): ", ERC20Balance.tokenBalances[0].tokenBalance, "ERC20Transfers: ", ERC20Transfers.transfers.length);
    }


    return (
        <Button onClick={login}>Login</Button> //on click fetch all data that is needed to later on calculate the score.
    )
}

export default LoginButton;

const Button = styled.button`
    width: 20rem;
    height: 4rem;
    background-color: black;
    border-radius: 15px;
    color: white;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    
`