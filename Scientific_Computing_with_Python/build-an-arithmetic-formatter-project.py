def pad_string_with_spaces(string, target_len):

    spaces_to_add = target_len - len(string)
    return ' '*spaces_to_add +string 

def fill_with_characters(number, char =' '):
    return char*number

def gap():
    return fill_with_characters(4)


def arithmetic_arranger(problems, show_answers=False):

    # More than five problems
    if len(problems) > 5:
        return 'Error: Too many problems.'

    
    first_row=''
    operation_row='\n'
    dash_row='\n'

    ans_row=''

    if show_answers:
        ans_row='\n'

    # For each problem
    for problem in problems:

        # List with the operation
        operation= problem.split()

        # The number of digits of the biggest number
        max_digit = max(len(operation[0]),len(operation[2]))
               
        
        # Error checks
        # Operation diferent to addition or substraction
        if operation[1] not in ['+','-']:
            return "Error: Operator must be '+' or '-'."
        
        # More than four digits
        if max_digit > 4:
             return 'Error: Numbers cannot be more than four digits.'
        # Not numeric characters
        if not operation[0].isnumeric() or not operation[2].isnumeric():
            return 'Error: Numbers must only contain digits.'

        # The length of the operation
        length_with_operator = max_digit +2

        first_row += pad_string_with_spaces(operation[0],length_with_operator ) + gap()

        operation_row += operation[1] +pad_string_with_spaces(operation[2],length_with_operator - 1) + gap() 
        
        dash_row += fill_with_characters(length_with_operator,'-') + gap()

        # If we need to solve
        if show_answers:
            ans_row += pad_string_with_spaces(str(eval(problem)),length_with_operator)+gap()

        

    first_row = first_row.rstrip()
    operation_row =operation_row.rstrip()
    dash_row = dash_row.rstrip()
    ans_row = ans_row.rstrip()
    return first_row +   operation_row +   dash_row + ans_row 

print(f'\n{arithmetic_arranger(["3801 - 2", "123 + 49"], True)}')


