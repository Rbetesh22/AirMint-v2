const express = require('express');
const  { Client } =  require('twitter-api-sdk');
require('dotenv').config();
const client = new Client(process.env.BEARER_TOKEN);
const needle = require("needle");
const router = express.Router();

//get all retweets for a tweet
router.get('/retweets/:tweetId', async (req, res) => {
  const { tweetId } = req.params;

    try {
        const twitterResponse = await client.users.tweetsIdRetweetingUsers(tweetId);
        res.send(twitterResponse)
      } catch (e) {
        console.log(e)
      }
});

//counting retweets, mentions or comments for holder
router.get('/count/:type/:holderUsername/:projectUsername/:startTime/:endTime', async (req, res) => {
  const { type, holderUsername, projectUsername, startTime, endTime } = req.params; // start and end time in ISO date format

  const midnight = new Date();
  midnight.setHours(0,0,0,0);
  
  if(new Date(startTime) > new Date(endTime)){
    return res.status(500).send({ error: "Start time cannot be after end time." });
  }

  let query = ''

  if ( type === "mentions" ) {
    query = `from:${holderUsername} @${projectUsername}`
  } else if ( type === "comments" ) {
    query = `from:${holderUsername} is:reply to:${projectUsername}`
  } else if ( type === "retweets" ) {
    query = `from:${holderUsername} retweets_of:${projectUsername}`
  }

  try {

    if ( new Date(startTime) > new Date() || new Date(endTime) > new Date() ){
      return res.status(500).send({ error: "Cannot fetch data from the future" });

  } else if (new Date(endTime) < midnight){
      const twitterResponse = await client.tweets.tweetCountsRecentSearch({
        "query": query,
        "start_time": `${startTime}`,
        "end_time": `${endTime}`
      });
        res.send(twitterResponse);

    } else if (new Date(startTime) < new Date()){
      const twitterResponse = await client.tweets.tweetCountsRecentSearch({
        "query": query,
        "start_time": `${startTime}`,
      });
      res.send(twitterResponse)

    } else {
      return res.status(500).send({ error: "Fetching data from Twitter failed" });
    }

  } catch (e) {
    console.log(e)
  }
});

// router.get('/likes/:tweetId', async (req, res) => {
//   const { tweetId } = req.params;
//   const endpointURL = `https://api.twitter.com/2/tweets/${tweetId}/liking_users`;

//     try {
//       const params = {
//         "tweet.fields": "lang,author_id", 
//         "user.fields": "created_at", 
//       };

//       const twitterResponse = await needle("get", endpointURL, params, {
//         headers: {
//           "User-Agent": "v2LikingUsersJS",
//           authorization: `Bearer AAAAAAAAAAAAAAAAAAAAACbXkwEAAAAAaMVQmpXbt38C4jPW6SCvavJrpnQ%3DsPerVXztW1UZnXBtyw6a3At0uF7GpY0P5wlYJDjnsCSZeQJRMg`
//         },
//       });

//       if (twitterResponse.body) {
//         return twitterResponse.body;
//       } else {
//         throw new Error("Unsuccessful request");
//       }

//     } catch (e) {
//       console.log(e)
//     }
// });


module.exports = router;