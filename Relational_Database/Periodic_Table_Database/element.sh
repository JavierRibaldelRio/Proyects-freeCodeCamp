#!/bin/bash

PSQL="psql --username=freecodecamp --dbname=periodic_table -t --no-align -c"

# Check if there is parameter
if [[ $1 ]]
then 

  # Is a number

  if [[  $1 =~ ^[0-9]+$ ]]
  then
    ELEMENT_INFO=$($PSQL "SELECT atomic_number, name, symbol, type, atomic_mass, melting_point_celsius, boiling_point_celsius FROM  elements INNER JOIN properties USING(atomic_number) INNER JOIN types USING (type_id) WHERE atomic_number=$1");
  else

    # Is a symbol
    if [[ $1 =~ ^[A-Z][a-z]?$ ]]
    then
      ELEMENT_INFO=$($PSQL "SELECT atomic_number, name, symbol, type, atomic_mass, melting_point_celsius, boiling_point_celsius FROM  elements INNER JOIN properties  USING(atomic_number) INNER JOIN types USING (type_id) WHERE symbol ILIKE '$1'");
    else
    
      # Is the name
      ELEMENT_INFO=$($PSQL "SELECT atomic_number, name, symbol, type, atomic_mass, melting_point_celsius, boiling_point_celsius FROM  elements INNER JOIN properties  USING(atomic_number) INNER JOIN types USING (type_id) WHERE name ILIKE '$1'");
    fi
  fi

  # check if there is answer
  if [[ -z $ELEMENT_INFO ]]
  then
   echo "I could not find that element in the database."
  

  else

    echo "The element with atomic number $(echo $ELEMENT_INFO| awk -F '|' '{print $1}') is $(echo $ELEMENT_INFO| awk -F '|' '{print $2}') ($(echo $ELEMENT_INFO| awk -F '|' '{print $3}')). It's a $(echo $ELEMENT_INFO| awk -F '|' '{print $4}'), with a mass of $(echo $ELEMENT_INFO| awk -F '|' '{print $5}') amu. $(echo $ELEMENT_INFO| awk -F '|' '{print $2}') has a melting point of $(echo $ELEMENT_INFO| awk -F '|' '{print $6}') celsius and a boiling point of $(echo $ELEMENT_INFO| awk -F '|' '{print $7}') celsius."

  fi



else
  echo "Please provide an element as an argument."
fi