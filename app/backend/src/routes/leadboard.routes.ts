import express = require ('express');

import {
  generateAwayLeaderboard,
  generateHomeLeaderboard,
  generateLeaderboardList,
} from '../controller/leaderBoard.controller';

const router = express.Router();

router.get('/home', generateHomeLeaderboard);
router.get('/away', generateAwayLeaderboard);
router.get('/', generateLeaderboardList);

export default router;
