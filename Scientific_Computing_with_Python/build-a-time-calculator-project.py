DAYS = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]

def parse_time(time, start=False):
    
    parsed_time={}
    # Splits the time
    splited_time=time.split(':')

    parsed_time['hours'] = int(splited_time[0])

    # If it is 24 hours time
    if start:
        split_minutes = splited_time[1].split(' ')

        parsed_time['minutes'] = int(split_minutes[0])

        parsed_time["PM"] = split_minutes[1] == "PM"

    else:
        parsed_time['minutes'] = int(splited_time[1])

    return parsed_time


# Tranform a number into 0

def pad(n):
    return str(n).zfill(2)

# Creates the answer
def create_answer(time):
    answer = ''

    # hour
    answer += str(time["hours"]) if not time["hours"] == 0 else "12" 
    # minutes
    answer += ":" + pad(time["minutes"])  +" "

    # am/p,
    answer += "PM" if time["PM"] else "AM"

    if time["day_name"] > -1 :
        answer += ", " + DAYS[time["day_name"]]

    days = time["days"]

    if not days == 0:
        if days == 1:
            answer += " (next day)"
        
        else:
            answer += " (" + str(days) + " days later)"


    return answer






def add_time(start, duration,day=""):

    new_time={}

    new_time["day_name"] = -1

    # Parse start minutes 
    start_time=parse_time(start,True)

    # Parse adition al time
    addition_time=parse_time(duration)

    # Operations
    # Minutes
    total_minutes = start_time['minutes'] + addition_time['minutes']

    new_time['minutes']= total_minutes % 60
    adicional_hours = total_minutes // 60

    # Hours
    
    total_hours = start_time['hours'] + addition_time['hours'] + adicional_hours


    # days
    new_time['days'] = total_hours//24

    #AM/PM & Set hours

    new_time["PM"] = start_time["PM"]
    residual_hours = total_hours % 24

    # More than 12 hours residual
    if residual_hours >= 12:

        residual_hours -=12
        new_time["PM"] = not new_time["PM"]

        if not new_time["PM"]:
            new_time["days"] +=1
    
    new_time["hours"] = residual_hours


    # Day

    if day.capitalize() in DAYS:
        new_time["day_name"] = (DAYS.index(day.capitalize()) +  new_time['days']) % 7


    # Print date
    return create_answer(new_time)




print(

add_time('11:59 PM', '24:05', 'Wednesday'))