#! /bin/bash

if [[ $1 == "test" ]]
then
  PSQL="psql --username=postgres --dbname=worldcuptest -t --no-align -c"
else
  PSQL="psql --username=freecodecamp --dbname=worldcup -t --no-align -c"
fi

# Do not change code above this line. Use the PSQL variable above to query your database.

#  Function to get the id of a team or add it if it is missing

get_id_or_add_it(){

  # Get team id
  TEAM_ID=$($PSQL "SELECT team_id FROM teams WHERE name='$1'")

  # Insert new winner
  if [[ -z $TEAM_ID ]]
  then
    local INSERT_TEAM_RESULT=$($PSQL "INSERT INTO teams(name) VALUES ('$1')")
    
    if [[ $INSERT_TEAM_RESULT == "INSERT 0 1" ]]
    then
      TEAM_ID=$($PSQL "SELECT team_id FROM teams WHERE name='$1'")
    fi
  fi
  
  echo $TEAM_ID

}


# Read csv 

cat games.csv | while IFS="," read YEAR ROUND WINNER OPPONENT WINNER_GOALS OPPONENT_GOALS
do
  
  # Avoid processing first line
  if [[ $YEAR != "year" ]]
  then  

    # Gets winner id
    WINNER_ID="$(get_id_or_add_it "$WINNER")" 

    OPPONENT_ID="$(get_id_or_add_it "$OPPONENT")"

    RESULT_INSERT_GAMES=$($PSQL "INSERT INTO games(year, round, winner_id, opponent_id, winner_goals, opponent_goals) VALUES($YEAR, '$ROUND', $WINNER_ID, $OPPONENT_ID, $WINNER_GOALS, $OPPONENT_GOALS)")   

  fi
done