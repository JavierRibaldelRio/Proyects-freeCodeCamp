#!/bin/bash

PSQL="psql --username=freecodecamp --dbname=number_guess -t --no-align -c"

# ask user data
echo Enter your username:
read USERNAME

# find user

USERNAME_INFO=$($PSQL "SELECT games_played, best_game FROM users_data WHERE username='$USERNAME'")

if [[ -z $USERNAME_INFO ]]
then
  # doesn't exist
  echo "Welcome, $USERNAME! It looks like this is your first time here."

  ADD_USER_RESULT=$($PSQL "INSERT INTO users_data(username, games_played, best_game) VALUES ('$USERNAME', 0, 0);")
  GAMES_PLAYED=0
  BEST_GAME=0
else
  # exists
  GAMES_PLAYED=$(echo $USERNAME_INFO | awk -F '|' '{print $1}')
  BEST_GAME=$(echo $USERNAME_INFO | awk -F '|' '{print $2}')
  echo Welcome back, $USERNAME! You have played $GAMES_PLAYED games, and your best game took $BEST_GAME guesses.
fi
# generate number

NUMBER_TO_GUESS=$(($RANDOM % 1000 +1))

echo "Guess the secret number between 1 and 1000:"
NUMBER=0

COUNT=0

# Loop
while [ $NUMBER != $NUMBER_TO_GUESS ]
do
  read NUMBER

  # Is a number 
  if [[  $NUMBER =~ ^[0-9]+$ ]]
  then
    COUNT=$((COUNT + 1))
    # Bigger
    if [[ $NUMBER_TO_GUESS -gt $NUMBER ]]
    then
      echo "It's higher than that, guess again:"
    else
      if [[ $NUMBER_TO_GUESS -lt $NUMBER ]]
      then
        echo "It's lower than that, guess again:"
      fi
    fi
    # Not a number
  else
    echo 'That is not an integer, guess again:'
  fi
done

ADD_GAMES_PLAYED_RESULT=$($PSQL "UPDATE users_data SET games_played=$((GAMES_PLAYED + 1)) WHERE username='$USERNAME'")

if [[ $BEST_GAME -lt $COUNT  ]]
then 
  CHANGE_BEST_GAME_RESULT=$($PSQL "UPDATE users_data SET best_game=$COUNT WHERE username='$USERNAME'")
fi

echo "You guessed it in $COUNT tries. The secret number was $NUMBER_TO_GUESS. Nice job!"