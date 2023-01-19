# Airmint- keep your community engaged🎯

AirMint is a B2B SAAS platform that offers tools to communities to improve their engagement with holders and drive growth. We track and synthesize on-chain and off-chain data in real time, and provide communities with customizable rewards APIs that allow them to reward their most engaged and loyal holders with rewards such as Poaps, exclusive merchandise, airdrops of rare NFTs, whitelists, money, collaboration opportunities with other users or creators, recognition on landing pages, and more. The platform also integrates AI to analyze holder engagement data and detect fraudulent activities, and provides recommendations on how to allocate rewards to engaged users. AirMint operates on a freemium subscription model ranging from $0 to $10,000 per month, and is designed for third-party integrations.
## API

Full list of all endpoints:

**/signup**

- **Receives:** **projectName**, **email**, **password**, **projectAddress**, **discord** and **twitter** variables passed in the request body.
- **Responsible for:** Saving new project profile to the database and generating an API key along with JWT token.
- **Response:** **project object** and the **token**.

**/signin**

- **Receives:** **email** and **password** variables passed in the request body.
- **Responsible for:** Checking the provided email and password against the database for a matching project profile. If a match is found, it will generate an API key along with a JWT token. If a matching project profile is not found or the password is incorrect, an error message will be returned.
- **Response:** project object and the token if the email and password are valid and match a project profile in the database. An error message if the email and password are invalid or do not match a project profile in the database.

**/addHolder**

- **Receives:** privyId, email, twitterUsername, pfpURL, username, projectAddress, twitterURL, discord, wallet, and scores variables passed in the request body.
- **Responsible for:** Creating a new "holder" object using the provided information and adding it to the "holders" array for the project with a matching "projectAddress". It will also save the new "holder" object to the database.
- **Response:** The new "holder" object if the operation is successful. An error message if the "projectAddress" does not match a project in the database, or if there is an error saving the "holder" object or updating the project.

**/holder/:id**

- **Receives:** id in the request parameters.
- **Responsible for:** Retrieving the "holder" object with a matching id from the database.
- **Response:** The "holder" object if it is found. An error message if the "holder" object is not found.

**/holders**

- **Receives:** page and size in the request query parameters (optional).
- **Responsible for:** Retrieving a paginated list of "holder" objects from the database. The number of "holder" objects per page and the page number can be specified in the request query parameters (default is 10 "holder" objects per page and page 1).
- **Response:** A paginated list of "holder" objects.

**/updateHolder**

- **Receives:** privyId, email, wallet, pfpURL, username, and scores variables passed in the request body.
- **Responsible for:** Updating the "holder" object with the matching privyId in the database with the provided information.
- **Response:** The updated "holder" object if the operation is successful. An error message if the "holder" object is not found or there is an error updating the "holder" object.

**/getScore/:privyId**

- **Receives:** privyId in the request parameters.
- **Responsible for:** Retrieving the scores of the "holder" object with a matching privyId from the database.
- **Response:** The scores of the "holder" object if it is found. An error message if the "holder" object is not found.

**/updateScore**

- **Receives:** privyId, projectAddress, and score variables passed in the request body.
- **Responsible for:** Updating the current score and score history of the "holder" object with the matching privyId for the project with the matching projectAddress in the database with the provided score.
- **Response:** The updated "holder" object if the operation is successful. An error message if the "holder" object or the project is not found, or there is an error updating the "holder" object.

**/getProjectHolders/:projectAddress**

- **Receives:** projectAddress in the request parameters.
- **Responsible for:** Retrieving the "holders" array for the project with the matching projectAddress from the database.
- **Response:** The "holders" array of the project if it is found. An error message if the project is not found.

**/holders/:twitterUsername**

- **Receives:** twitterUsername in the request parameters.
- **Responsible for:** Retrieving the "holder" object with the matching twitterUsername from the database.
- **Response:** The "holder" object if it is found. An error message if there is an error retrieving the "holder" object.

**/projects**

- **Receives:** page and size in the request query parameters (optional).
- **Responsible for:** Retrieving a paginated list of "project" objects from the database. The number of "project" objects per page and the page number can be specified in the request query parameters (default is 10 "project" objects per page and page 1).
- **Response:** A paginated list of "project" objects.

**/project/:projectAddress**

- **Receives:** projectAddress in the request parameters.
- **Responsible for:** Retrieving the "project" object with a matching projectAddress from the database.
- **Response:** The "project" object if it is found. An error message if the "project" object is not found.

**/projectStyle/:key**

- **Receives:** key in the request parameters.
- **Responsible for:** Retrieving the style of the "project" object with a matching key from the database.
- **Response:** The style of the "project" object if it is found. An error message if the "project" object is not found.

**/updateProjectStyle**

- **Receives:** key and style variables passed in the request body.
- **Responsible for:** Updating the style of the "project" object with the matching key in the database with the provided style.
- **Response:** The updated "project" object if the operation is successful. An error message if the "project" object is not found or there is an error updating the "project" object.

**/updateProject/:projectAddress**

- **Receives:** email, discord, twitter, token, metricsWeight, holders, style, and quests variables passed in the request body. The "projectAddress" parameter is passed in the request URL.
- **Responsible for:** Updating the project with a matching "projectAddress" with the provided information. It will save the updated project to the database.
- **Response:** The updated project if the operation is successful. An error message if the "projectAddress" does not match a project in the database, or if there is an error saving the updated project.

**/metricsWeight/:projectAddress**

- **Receives:** The "projectAddress" parameter is passed in the request URL.
- **Responsible for:** Retrieving the "metricsWeight"(how project want to calculate the score) field for the project with a matching "projectAddress".
- **Response:** An object containing the "metricsWeight" field for the project, if the "projectAddress" matches a project in the database. An error message if the "projectAddress" does not match a project in the database.

**/updateMetricsWeight/:projectAddress**

- **Receives:** The "projectAddress" parameter passed in the URL and the "metricsWeight" property in the request body.
- **Responsible for:** Updating the "metricsWeight"(how project want to calculate the score) property of the project with a matching "projectAddress" in the database.
- **Response:** The updated project object if the operation is successful. An error message if the "projectAddress" does not match a project in the database or if there is an error updating the project.

**/deleteProject/:id**

- **Receives:** The "id" parameter passed in the URL.
- **Responsible for:** Deleting the project with a matching "id" from the database.
- **Response:** A message indicating that the project was deleted successfully if the operation is successful. An error message if there is an error deleting the project.

**/addQuest**

- **Receives:** projectAddress, title, description, tweetId, type, start, and end variables passed in the request body.
- **Responsible for:** Creating a new "quest" object using the provided information and adding it to the "quests" array for the project with a matching "projectAddress". It will also save the new "quest" object to the database.
- **Response:** The new "quest" object if the operation is successful. An error message if there is an error creating the "quest" object or adding it to the project.

**/quest/:id**

- **Receives:** ID of the quest in the URL parameter.
- **Responsible for:** Retrieving the quest with a matching ID from the database.
- **Response:** The "quest" object if it is found, or an error message if there is an issue retrieving the quest.

**/quests/:projectAddress**

- **Receives:** project address in the URL parameter.
- **Responsible for:** Retrieving all quests with a matching "projectAddress" from the database.
- **Response:** An array of "quest" objects if they are found, or an error message if there is an issue retrieving the quests.

**/deleteQuest/:id**

- Receives: ID of the quest in the URL parameter.
- Responsible for: Deleting the quest with a matching ID from the database and removing it from the "quests" array of the project it belongs to.
- Response: A message indicating that the quest was deleted successfully if the operation is successful, or an error message if there is an issue deleting the quest.

**/retweets/:tweetId**

- **Receives:** ID of the tweet in the URL parameter.
- **Responsible for:** Retrieving a list of users who have retweeted the tweet with the provided ID from Twitter's API.
- **Response:** An array of user objects if the operation is successful, or an error message if there is an issue retrieving the data from Twitter's API.

**/count/:type/:holderUsername/:projectUsername/:startTime/:endTime**

- **Receives:** type (mentions, comments, or retweets), holderUsername, projectUsername, startTime, and endTime in the URL parameters. The start and end times are in ISO date format.
- **Responsible for:** Retrieving a count of tweets that match the specified criteria (mentions of the holderUsername by projectUsername, replies by holderUsername to tweets by projectUsername, or retweets by holderUsername of tweets by projectUsername) from Twitter's API. The tweets must have been created between the specified start and end times.
- **Response:** An object containing the count of tweets that match the criteria if the operation is successful, or an error message if there is an issue retrieving the data from Twitter's API or if the start time is after the end time or if either the start or end time is in the future.

## DASHBOARD

There is one main page inside **/pages** directory: i**ndex.js** in **/dashboard/[projectAddress]** direcory. It is setting up a page that displays a dashboard for a project. Among from other components it imports an API and the 'Client' object from a library for interacting with the Twitter API. The '**getServerSideProps**' function fetches data from an API to later on use it in Leaderboard page. The function is executed on the server before the page is rendered, and the data it returns is passed as props to the 'Dashboard' function. The dashboard page includes a navigation bar with links to different parts of the dashboard, and a main area that displays one of three different components depending on the current tab: an overview, a leaderboard, or a profile page. The page also includes a logout button that removes a token from local storage and redirects the user to the homepage.

All **pages** that are displayed in dashboard(**Leaderboard, Overview, Profile and Quests**) are located under **/components/dashboard** directory. Most of them is pretty simple and self-descripive:

- **Leaderboard:** It's receiving holders and address props. It's rendering a simple leaderboard with score for every holder.

- **Overview:** For now it's empty, but ultimately that's where project founders will be able to see some charts and summaries.

- **Profile:** For now in profile page there are just two dummy forms that need to be connected to the backend(style and metrics for the project).

- **Quests:** It displays a **list of quests** for a given project. Address passed in props refers to project address and based on that right when the page is rendered all quests are fetched by "useEffect" hook which calls **fetchQuests()** function that is **fetching all quests based on the address**. Each quest is rendered with an **icon that is based on the quest type**. It also has a button for **creating new quest**(it opens a New Quest modal). After clicking on a quest it will open a quest modal where you will be able to see everyone who has interacted with the project's Twitter in a given amount of time(for count endpoints) or all holders who interacted with a specific tweet. More on that in the modals section.

All **modals** that are used accross the app are located under **/components/modals**. Each of them has a common component called ModalBackground, which blurs the background and receives an onClose function in a prop to close the modal when user clicks outside of it.

- **HolderModal:** It's a simple modal that's made to display holder details. For now it's unfinished. Let's add there a chart with the user score history.
- **LoginModal:** Simple modal for projects to log in. It's saving project and JWT in localStorage.
- **SignupModal:** Simple signup modal for projects. It's saving project and JWT in localStorage.
- **NewQuest:** Modal for creating new quests. For quest types that require the tweet id it is displaying tweet id input and for more general types of quests it is diplaying timerfame input where you can select the dates.
- **QuestModal:** Quest modal is displaying either all participants from the quest or only these holders who are logged in to Airmint(it's checking if participant has signed up to Airmint in useEffect hook on render) If the user is logged in to airmint it is diplaying a Twitter pfp and a reward button.
- **RewardModal** There are two forms there one for sending ERC20 tokens and the other one for sending NFTs.

## NPM PACKAGE

For now there is just LoginButton that is fetching and printing the metrics you need to calculate the score. We must add many more components to this

## What we need make it a full MVP🎯

- Connecting forms in the project's profile page to backend (metrics and styles)
- Designing an Overview page (some chart?, leaders, recent quests etc.)
- Finishing holder profile modal
- Designing a landing page
- Secure everything
- Adding filters and sorting to leaderboard and quest modal
- Adding appropriate Twitter and Discord authorization buttons to sign up modal (instead of pasting links)
- Developing a simple npm package (customizable leaderboard and quest board with easy log in with privy)
- Developing blockchain side(Airdrop smart contract, sending NFTs and ERC20 tokens) and connect it with frontend
- Adding option to select the specific time(at least an hour) for quest to start
- Adding even more metrics that the score will be based on
- Adding even more quest options (unfortunately Twitter API is not helping with that too much)
- Writing a script to update all scores every 24h
- Securing the API with requireAuth
