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
# Algorithm of the LR(1) parser
#
# Prerequisite: calculated LR(1) parsing table
#
# Maintains parsing stack, applying right-most derivation.
#

# --------------------------------------------
# Calculate LR(1) parsing table (Lecture 15):

T = ParsingTable()

# --------------------------------------------
# Parsing stack:

stack = []

# Initialize the stack to contain the state 0.

stack.push(0)

# --------------------------------------------
# Parsing string and cursor:

string = '5 + 3 * 2'
i = 0

# --------------------------------------------
# Main parsing loop:

do:

  # Obtain the current table entry.
  #
  # Row - current state (always on top of the stack)
  # Columns - current token:

  entry = T[stack.top, string[i]]

  # ------------------------------------------
  # No entry - parse error:

  if entry is ∅:
    throw 'Parse error!'

  # ------------------------------------------
  # Shift entry:
  #
  # Example: s4 - shift and transit to state 4

  if is_shift(entry):

    # Push current token on top of the stack,
    # and increase the string cursor:

    stack.push(string[i++])

    # Push the next state on top of the stack
    stack.push(entry.state)

  # ------------------------------------------
  # Reduce entry:
  #
  # Example: r1 - reduce by production 1

  else if is_reduce(entry):

    # Pop the full RHS from the stack
    # and also their states (RHS.length * 2):

    stack.popN(entry.production.RHS.length * 2)

    # Obtain next state:
    #
    # Row - top of the stack
    # Column - LHS of the production

    next_state = T[stack.top, entry.production.LHS]

    # Push LHS of the production:
    stack.push(entry.production.LHS)

    # Push next state
    stack.push(next_state)

  # ------------------------------------------
  # Accept:

  else if is_accept(entry):

    # Pop the last symbol and its state:
    stack.pop()
    stack.pop()

    # Asset on accept that only the starting state
    # is on the stack, and the string cursor is at EOF:

    assert stack.length == 1
    assert stack[0] === 0
    assert string[i] == $

    return true
```