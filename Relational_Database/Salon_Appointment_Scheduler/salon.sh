#! /bin/bash

PSQL="psql --username=freecodecamp --dbname=salon --tuples-only -c"

echo -e "\n\n~~~~ Salón: \"La Avenida\" ~~~~\n"

# Main Menu

MAIN_MENU(){

  echo -e "\n$1\n"

  # Print services

  echo "$($PSQL "SELECT * FROM services ORDER BY service_id")" | while read  SERVICE_ID bar SERVICE
  do
    echo "$SERVICE_ID) $SERVICE"
  done

  # get customer choice
  read SERVICE_ID_SELECTED

  # check if the id exists and gets the name
  SERVICE_NAME=$($PSQL "SELECT name FROM services WHERE service_id=$SERVICE_ID_SELECTED")
  if [[ -z $SERVICE_NAME ]]
  then
    # redirects to main menu
    MAIN_MENU "I could not find that service. What would you like today?"

  else

    # get customer name
    echo "Perfect, what's your phone number?"
    read CUSTOMER_PHONE

    # check phone/get customer name

    CUSTOMER_NAME=$($PSQL "SELECT name FROM customers WHERE phone='$CUSTOMER_PHONE'")
    if [[ -z $CUSTOMER_NAME ]]
    then
      # get customer name
      echo -e "\nOhh, we do not have your data. What's your name?"
      read CUSTOMER_NAME
      
      # add to database

      RESULT_ADD_CUSTOMER=$($PSQL "INSERT INTO customers(phone, name) VALUES('$CUSTOMER_PHONE','$CUSTOMER_NAME')")
    fi

    # get customer id
    CUSTOMER_ID=$($PSQL "SELECT customer_id FROM customers WHERE phone='$CUSTOMER_PHONE'")


    # get time
    echo -e "\nAt what time would like to have your$SERVICE_NAME done, $CUSTOMER_NAME?"
    read SERVICE_TIME

    # Add appointment
    RESULT_ADD_APPOINTMENT=$($PSQL "INSERT INTO appointments(time,customer_id, service_id) VALUES ('$SERVICE_TIME',$CUSTOMER_ID,$SERVICE_ID_SELECTED)")
    
    echo -e "\nI have put you down for a $SERVICE_NAME at $SERVICE_TIME, $CUSTOMER_NAME."
  fi 
}

# Manage user

MAIN_MENU "Welcome to Salón La Avenida the \"Fashinest\" salon in Spain.\nWhat would you like today?"

