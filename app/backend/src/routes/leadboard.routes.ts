import express = require ('express');

import Leaderboard from '../controller/leaderBoard.controller';

const router = express.Router();

router.get('/home', Leaderboard.generateHomeLeaderboard);
router.get('/away', Leaderboard.generateAwayLeaderboard);
router.get('/', Leaderboard.generateLeaderboardList);

export default router;
