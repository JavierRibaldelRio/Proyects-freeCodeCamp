import copy
import random

class Hat:
    def __init__(self,**kargs):
        content = []
        for color, n in kargs.items():
            content.extend([color]*n)
        self.contents = content.copy() 
    
    def draw(self, n):

        # create a copy of contents

        contents = self.contents

        # Check if there are enough balls

        if len(contents) <= n:
            self.contents=[]
            return contents
        
        # Choose balls
        extracted_balls=[]
        
        # Choices a ball randomly, an then it removes it from the list
        for _ in range(n):
            extraction = random.choice(contents)
            contents.remove(extraction)
            extracted_balls.append(extraction)
        
        return extracted_balls

            



def experiment(hat, expected_balls, num_balls_drawn, num_experiments):

    # Sets to 0 the number of success
    success = 0

    # Repeat the experiment the requiered number of times
    for _ in range(num_experiments):
        
        # Create a copy of the hat
        copy_hat = copy.deepcopy(hat)

        # Extracts the ball
        extracted_balls = copy_hat.draw(num_balls_drawn)
        
        # Checks if all the excepted balls are present in the extractions
        if all([extracted_balls.count(color) >= repetitions for color, repetitions in expected_balls.items()]):
            success +=1
    # Uses Laplace's law to calculate the probability
    return success/num_experiments
