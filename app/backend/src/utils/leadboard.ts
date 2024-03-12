import { IMatch } from '../Interfaces/match/IMatch';

const calculateTotalPoints = (wins: number, draws: number): number => {
  const pointsForWins = wins * 3;
  const pointsForDraws = draws * 1;
  return pointsForWins + pointsForDraws;
};

const countAllGames = (matches: IMatch[]): number => matches.length;

const countTotalWins = (totalGames: IMatch[], teamId: number): number => totalGames
  .filter((match) => {
    if (match.homeTeamId === teamId) {
      return match.homeTeamGoals > match.awayTeamGoals;
    }
    return match.awayTeamGoals > match.homeTeamGoals;
  }).length;

const countTotalTies = (totalGames: IMatch[]): number => totalGames
  .filter((match) => match.homeTeamGoals === match.awayTeamGoals).length;

const calculateTotalLosses = (
  totalGames: number,
  totalWins: number,
  totalDraws: number,
): number => totalGames - (totalWins + totalDraws);

const calculateGoalsMade = (matches: IMatch[], teamId: number): number => matches
  .reduce((totalGoals, match) => {
    if (match.homeTeamId === teamId) {
      return totalGoals + match.homeTeamGoals;
    }
    return totalGoals + match.awayTeamGoals;
  }, 0);

const calculateGoalsTaken = (matches: IMatch[], teamId: number): number => matches
  .reduce((totalGoals, match) => {
    if (match.homeTeamId === teamId) {
      return totalGoals + match.awayTeamGoals;
    }
    return totalGoals + match.homeTeamGoals;
  }, 0);

const getAllInfo = (matches: IMatch[], teamId: number) => {
  const totalGames = countAllGames(matches);
  const wins = countTotalWins(matches, teamId);
  const ties = countTotalTies(matches);

  return { totalGames, wins, ties };
};

const calculateEfficiency = (totalPoints: number, totalGames: number): string => {
  const percentage = (totalPoints / (totalGames * 3)) * 100;
  return percentage.toFixed(2);
};

const getAllTeamStats = (matches: IMatch[], teamId: number) => {
  const totalGames = countAllGames(matches);
  const wins = countTotalWins(matches, teamId);
  const ties = countTotalTies(matches);
  const totalPoints = calculateTotalPoints(wins, ties);
  const efficiency = calculateEfficiency(totalPoints, totalGames);

  return {
    totalPoints,
    totalGames,
    totalVictories: wins,
    totalDraws: ties,
    totalLosses: totalGames - (wins + ties),
    goalsFavor: calculateGoalsMade(matches, teamId),
    goalsOwn: calculateGoalsTaken(matches, teamId),
    goalsBalance: calculateGoalsMade(matches, teamId) - calculateGoalsTaken(matches, teamId),
    efficiency,
  };
};

export {
  getAllInfo,
  getAllTeamStats,
  calculateTotalPoints,
  countAllGames,
  countTotalWins,
  countTotalTies,
  calculateTotalLosses,
  calculateGoalsMade,
  calculateGoalsTaken,
  calculateEfficiency,
};
