require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cron = require('node-cron');
const {
  exchangeNpssoForAccessCode,
  exchangeCodeForAccessToken,
  getUserTrophyProfileSummary,
  getRecentlyPlayedGames,
  getProfileFromUserName
} = require('psn-api');

const app = express();
app.use(cors({
  origin: ['https://davidentonu.site', 'https://www.davidentonu.site', 'http://localhost:5173', 'https://portfolio-m7go.vercel.app']
}));
app.use(express.json());

let accessToken = null;
let tokenExpiry = null;

async function refreshAccessToken() {
  try {
    console.log('Refreshing PSN access token...');
    const code = await exchangeNpssoForAccessCode(process.env.NPSSO_TOKEN);
    const token = await exchangeCodeForAccessToken(code);
    accessToken = token;
    tokenExpiry = Date.now() + 50 * 60 * 1000;
    console.log('PSN token refreshed successfully');
  } catch (err) {
    console.error('Failed to refresh PSN token:', err.message);
  }
}

async function getValidToken() {
  if (!accessToken || Date.now() > tokenExpiry) {
    await refreshAccessToken();
  }
  return accessToken;
}

cron.schedule('*/50 * * * *', refreshAccessToken);
refreshAccessToken();

app.get('/api/psn/profile', async (req, res) => {
  try {
    const token = await getValidToken();
    const profile = await getProfileFromUserName(token, 'not__d4v1d');
    res.json(profile);
  } catch (err) {
    console.error('Profile error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/psn/trophies', async (req, res) => {
  try {
    const token = await getValidToken();
    const profile = await getProfileFromUserName(token, 'not__d4v1d');
    const accountId = profile.profile.accountId;
    const trophies = await getUserTrophyProfileSummary(token, accountId);
    res.json(trophies);
  } catch (err) {
    console.error('Trophies error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/psn/games', async (req, res) => {
  try {
    const token = await getValidToken();
    const games = await getRecentlyPlayedGames(token, { limit: 6 });
    res.json(games);
  } catch (err) {
    console.error('Games error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`PSN backend running on port ${PORT}`));
