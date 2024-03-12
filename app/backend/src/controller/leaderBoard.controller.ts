import { Request, Response } from 'express';
import leaderboardService from '../services/leaderBoard.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export async function generateHomeLeaderboard(_req: Request, res: Response) {
  const result = await leaderboardService.generateHomeLeaderboard();
  const statusCode = mapStatusHTTP(result.status);
  return res.status(statusCode).json(result.data);
}

export async function generateAwayLeaderboard(req: Request, res: Response) {
  try {
    const result = await leaderboardService.generateAwayLeaderboard();
    const statusCode = mapStatusHTTP(result.status);
    return res.status(statusCode).json(result.data);
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

export async function generateLeaderboardList(req: Request, res: Response) {
  try {
    const result = await leaderboardService.generateLeaderboardList();
    const statusCode = mapStatusHTTP(result.status);
    return res.status(statusCode).json(result.data);
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
