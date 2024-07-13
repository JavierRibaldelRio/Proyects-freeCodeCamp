#! /bin/bash

PSQL="psql --username=freecodecamp --dbname=worldcup --no-align --tuples-only -c"

# Do not change code above this line. Use the PSQL variable above to query your database.

echo -e "\nTotal number of goals in all games from winning teams:"
echo "$($PSQL "SELECT SUM(winner_goals) FROM games")"

echo -e "\nTotal number of goals in all games from both teams combined:"
echo "$($PSQL "SELECT SUM(winner_goals + opponent_goals) FROM games")"

echo -e "\nAverage number of goals in all games from the winning teams:"
echo "$($PSQL "SELECT AVG(winner_goals) FROM games")"

echo -e "\nAverage number of goals in all games from the winning teams rounded to two decimal places:"
echo "$($PSQL "SELECT ROUND(AVG(winner_goals), 2) FROM games")"

echo -e "\nAverage number of goals in all games from both teams:"
echo "$($PSQL "SELECT AVG(winner_goals + opponent_goals) FROM games")"

echo -e "\nMost goals scored in a single game by one team:"
echo "$($PSQL "SELECT MAX(winner_goals) FROM games")"

echo -e "\nNumber of games where the winning team scored more than two goals:"
echo "$($PSQL "SELECT COUNT(*) FROM games WHERE winner_goals > 2;")"

echo -e "\nWinner of the 2018 tournament team name:"
echo "$($PSQL "SELECT name FROM teams INNER JOIN games ON winner_id=team_id WHERE round = 'Final' AND year = 2018")"

echo -e "\nList of teams who played in the 2014 'Eighth-Final' round:"
# We don't have to check for the round because all the teams that were on the tournament at least played Eight-Final.
echo "$($PSQL "SELECT DISTINCT(t.name) FROM teams AS t FULL JOIN games AS w ON t.team_id=w.winner_id FULL JOIN games AS o ON t.team_id = o.opponent_id WHERE w.year=2014 OR o.year=2014 ORDER BY t.name")"

echo -e "\nList of unique winning team names in the whole data set:"
echo "$($PSQL "SELECT DISTINCT(name) FROM teams RIGHT JOIN  games ON team_id=winner_id ORDER BY name")"

echo -e "\nYear and team name of all the champions:"
echo "$($PSQL "SELECT year, name FROM games JOIN teams ON winner_id=team_id WHERE round='Final' ORDER BY name DESC")"

echo -e "\nList of teams that start with 'Co':"
echo "$($PSQL "SELECT name FROM teams WHERE name LIKE 'Co%'")"
