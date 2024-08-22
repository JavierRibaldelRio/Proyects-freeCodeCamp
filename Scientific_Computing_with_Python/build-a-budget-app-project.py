import math

class Category:
    def __init__(self, name):
        self.name = name
        self.ledger = []
        self.withdraws = 0
        self.balance = 0

    def deposit(self, amount, description =""):
        self.balance += amount
        self.ledger.append({'amount':amount, 'description': description})
    
    def withdraw(self, amount, description = ""):
        if self.check_funds(amount):
            self.balance -= amount
            self.withdraws +=amount
            self.ledger.append({'amount':-amount, 'description': description})
            return True
        return False
    


    def get_balance(self):
        return self.balance

    def transfer(self, amount, budget):
        if self.withdraw(amount, 'Transfer to '+ budget.name ):
            budget.deposit(amount,"Transfer from " + self.name )
            return True
        return False
    
    def check_funds(self, amount):
        return self.balance >= amount

    def __str__(self):

        string = ''

        # 30 Line
        stars_in_line = 30 - len(self.name)

        stars_per_side = '*'*(stars_in_line // 2)
        string += stars_per_side + self.name + stars_per_side +"\n"


        # Print ledger
        for movement in self.ledger:
            # Movement
            description_show = movement["description"][:23]
            description_extra_spaces = ' ' * (23 - len(description_show))

            # Amount
            amount_formated = format(movement["amount"],".2f")
            amount_extra_spaces = ' '* (7 -len(amount_formated))

            string += description_show + description_extra_spaces +  amount_extra_spaces + amount_formated +"\n"
        
        # Total

        string += "Total: " + format(self.balance, ".2f")


        return string


def create_spend_chart(categories):
    # Header
    string = "Percentage spent by category\n"
    
    # Calculate percentages
    category_bars = []

    total_withdraws = sum([category.withdraws for category in categories])

    for category in categories:
        percentage = category.withdraws / total_withdraws*100
        percentage_round = math.floor(percentage/10) *10

        print(percentage)

        category_bars.append({"name":category.name, "percentage":percentage_round})


    # Plot

    for i in range(100,-1,-10):
    
    # Y Exis

        extra_spaces = ' ' * (3-len(str(i)))
        string += extra_spaces + str(i) +"|"
        for category in category_bars:
            
            string += " "+("o" if category["percentage"] >= i else " ")+" "


        string += " \n"
    
    # Line
    string += "    " + "---" * len(categories) + "-"

    # Names

    max_word = max(list(map(lambda x: len(x.name),categories )))
    
    for i in range(max_word):
        string += "\n    "
        for category in categories:
            try:
                string += " " + category.name[i]+ " "
            except:
                string += "   "
        
    
        string += " "

   

    return string

food = Category('Food')
food.deposit(900, 'deposit')
food.withdraw(105.55, 'groceries')
clothing = Category('Enterteiment')
clothing.deposit(900, 'deposit')
clothing.withdraw(33.40,"34")

bussiy = Category('Bussiness')
bussiy.deposit(900, 'deposit')
bussiy.withdraw(10.99, 'groceries')

print(create_spend_chart([bussiy,food, clothing]))

