import teamsModel from '../database/models/SequelizeTeam';
import matchesModel from '../database/models/SequelizeMatches';
import { ILeaderBoard } from '../Interfaces/leaderBoad/ILeaderBoard';

const getPoints = (teamAGoals: number, teamBGoals: number) => {
  if (teamAGoals > teamBGoals) {
    return 3;
  }

  if (teamAGoals === teamBGoals) {
    return 1;
  }

  return 0;
};

const initialValues: ILeaderBoard = {
  totalPoints: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 0,
  goalsOwn: 0,
  goalsBalance: 0,
  efficiency: '0',
};

const sortLeaderboard = (leaderboardList: ILeaderBoard[]) => leaderboardList
  .sort((teamA, teamB) => {
    let comparation = teamB.totalPoints - teamA.totalPoints;

    if (comparation === 0) {
      comparation = teamB.totalVictories - teamA.totalVictories;

      if (comparation === 0) {
        comparation = teamB.goalsBalance - teamA.goalsBalance;

        if (comparation === 0) {
          comparation = teamB.goalsFavor - teamA.goalsFavor;
        }
      }
    }

    return comparation;
  });

const calculaHome = (homeMatches: matchesModel[]) => homeMatches
  .reduce((accumulator, currentMatch) => {
    const points = getPoints(currentMatch.homeTeamGoals, currentMatch.awayTeamGoals);
    const isVictory = currentMatch.homeTeamGoals > currentMatch.awayTeamGoals;
    const isDraw = currentMatch.homeTeamGoals === currentMatch.awayTeamGoals;

    return {
      totalPoints: accumulator.totalPoints + points,
      totalVictories: accumulator.totalVictories + (isVictory ? 1 : 0),
      totalDraws: accumulator.totalDraws + (isDraw ? 1 : 0),
      totalLosses: accumulator.totalLosses + ((isVictory || isDraw) ? 0 : 1),
      goalsFavor: accumulator.goalsFavor + currentMatch.homeTeamGoals,
      goalsOwn: accumulator.goalsOwn + currentMatch.awayTeamGoals,
      goalsBalance: accumulator.goalsFavor + currentMatch.homeTeamGoals - accumulator
        .goalsOwn - currentMatch.awayTeamGoals,
      efficiency: (((accumulator.totalPoints + points)
      / (homeMatches.length * 3)) * 100).toFixed(2),
    };
  }, initialValues);

const calculaAway = (awayMatches: matchesModel[]) =>
  awayMatches.reduce((accumulator, currentMatch) => ({
    totalPoints: accumulator.totalPoints + getPoints(currentMatch
      .awayTeamGoals, currentMatch.homeTeamGoals),
    totalVictories: accumulator.totalVictories + (currentMatch
      .awayTeamGoals > currentMatch.homeTeamGoals ? 1 : 0),
    totalDraws: accumulator.totalDraws + (currentMatch.awayTeamGoals === currentMatch
      .homeTeamGoals ? 1 : 0),
    totalLosses: accumulator.totalLosses + (currentMatch.awayTeamGoals < currentMatch
      .homeTeamGoals ? 1 : 0),
    goalsFavor: accumulator.goalsFavor + currentMatch.awayTeamGoals,
    goalsOwn: accumulator.goalsOwn + currentMatch.homeTeamGoals,
    goalsBalance: (accumulator.goalsFavor + currentMatch.awayTeamGoals)
      - (accumulator.goalsOwn + currentMatch.homeTeamGoals),
    efficiency: (((accumulator.totalPoints
      + getPoints(currentMatch.awayTeamGoals, currentMatch.homeTeamGoals))
      / (awayMatches.length * 3)) * 100).toFixed(2),
  }), initialValues);

const generateHomeLeaderboard = async () => {
  const teams = await teamsModel.findAll();
  const matches = await matchesModel.findAll();

  const teamList = teams.map((team) => {
    const homeMatches = matches.filter(
      (match) => match.homeTeamId === team.id && !match.inProgress,
    );

    const statistics = calculaHome(homeMatches);

    return {
      name: team.teamName,
      totalGames: homeMatches.length,
      ...statistics,
    };
  });

  const sortedLeaderboard = sortLeaderboard(teamList);

  return { status: 'SUCCESSFUL', data: sortedLeaderboard };
};

const generateAwayLeaderboard = async () => {
  const teamsData = await teamsModel.findAll();
  const matchesData = await matchesModel.findAll();

  const teamList = teamsData.map((teamData) => {
    const awayMatches = matchesData.filter(
      (matchData) => matchData.awayTeamId === teamData.id && !matchData.inProgress,
    );

    const statistics = calculaAway(awayMatches);

    return {
      name: teamData.teamName,
      totalGames: awayMatches.length,
      ...statistics,
    };
  });

  const sortedLeaderboard = sortLeaderboard(teamList);

  return { status: 'SUCCESSFUL', data: sortedLeaderboard };
};

const generateLeaderboard = (teams: teamsModel[], matches: matchesModel[]) => teams.map((team) => {
  const homeMatches = matches.filter((match) => match.homeTeamId === team.id && !match.inProgress);
  const awaysMatch = matches.filter((match) => match.awayTeamId === team.id && !match.inProgress);

  const home = calculaHome(homeMatches);
  const away = calculaAway(awaysMatch);

  const totalGames = homeMatches.length + awaysMatch.length;
  const totalVictories = home.totalVictories + away.totalVictories;

  return {
    name: team.teamName,
    totalGames,
    totalPoints: home.totalPoints + away.totalPoints,
    totalVictories,
    totalDraws: home.totalDraws + away.totalDraws,
    totalLosses: home.totalLosses + away.totalLosses,
    goalsFavor: home.goalsFavor + away.goalsFavor,
    goalsOwn: home.goalsOwn + away.goalsOwn,
    goalsBalance: home.goalsBalance + away.goalsBalance,
    efficiency: (((home.totalPoints + away.totalPoints) / (totalGames * 3)) * 100).toFixed(2),
  };
});

const generateLeaderboardList = async () => {
  const teamsData = await teamsModel.findAll();
  const matchesData = await matchesModel.findAll();

  const leaderboardList = generateLeaderboard(teamsData, matchesData);

  const sortedLeaderboard = sortLeaderboard(leaderboardList);

  return { status: 'SUCCESSFUL', data: sortedLeaderboard };
};

export default {
  generateHomeLeaderboard,
  generateAwayLeaderboard,
  generateLeaderboardList,
};
