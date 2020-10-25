```
/**
 * Essentials of Parsing.
 *
 * Course info: http://dmitrysoshnikov.com/courses/essentials-of-parsing/
 *
 * (C) 2020-present Dmitry Soshnikov <dmitry.soshnikov@gmail.com>
 */
```

```python
# Algorithm of the LL(1) parser
#
# Prerequisite: calculated LL(1) parsing table
#
# Maintains parsing stack, applying left-most derivation.
#

# --------------------------------------------
# Calculate LL(1) parsing table (lecture 10):

T = ParsingTable()

# --------------------------------------------
# Parsing stack:

stack = []

# Initialize the stack to contain the $ sign,
# and the starting symbol from the grammar:

stack.push($)
stack.push(grammar.start)

# --------------------------------------------
# Parsing string and cursor:

string = '(5 + 3) *2'
i = 0

while string[i] != $ and stack.top != $:

  # ----------------------------------------------
  # Case #1: Non-terminal is on top of the stack:
  #
  #   - Obtain the predicted production from the table
  #   - Replace the non-terminal with RHS

  if is_non_terminal(stack.top):

    # Predicted production:
    production = T[stack.top, string[i]]

    if production is ∅:
      throw 'Parse error!'

    # Pop the non-terminal:
    stack.pop()

    # Push its RHS:
    push_in_reverse_order(production.RHS)

  # ----------------------------------------------
  # Case #2: Terminal is on top of the stack:
  #
  # Just pop it if it equals to the current token
  # and advance the string cursor

  else if stack.top == string[i]:

    stack.pop()
    i++
```