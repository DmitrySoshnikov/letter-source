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
# Algorithm for constructing LL(1) parsing table:
#
# Rows: Non-terminals
# Columns: Terminals
#
# Entries: produciton numbers predicted for the
# (non-terminal, terminal) pair.
#
# Example grammar:
#
#     1. E  : T E'
#
#     2. E' :  "+" T E'
#     3. E' : ε
#
#     4. T  : F T'
#
#     5. T' : "*" F T'
#     6. T' : ε
#
#     7. F : number
#     8. F : "(" E ")"
#
# LL(1) parsing table:
#
# ┌────┬─────┬─────┬─────┬─────┬────────┬───┐
# │    │ "+" │ "*" │ "(" │ ")" │ number │ $ │
# ├────┼─────┼─────┼─────┼─────┼────────┼───┤
# │ E  │     │     │ 1   │     │ 1      │   │
# ├────┼─────┼─────┼─────┼─────┼────────┼───┤
# │ E' │ 2   │     │     │ 3   │        │ 3 │
# ├────┼─────┼─────┼─────┼─────┼────────┼───┤
# │ T  │     │     │ 4   │     │ 4      │   │
# ├────┼─────┼─────┼─────┼─────┼────────┼───┤
# │ T' │ 6   │ 5   │     │ 6   │        │ 6 │
# ├────┼─────┼─────┼─────┼─────┼────────┼───┤
# │ F  │     │     │ 8   │     │ 7      │   │
# └────┴─────┴─────┴─────┴─────┴────────┴───┘
#

# ---------------------------------------
# Initialize the table:

table = {}

# Go through each production in the grammar:
#
# Example: two alternatives for the E' symbol:
#
# E' : '+' T E'
# E' : ε

for production in grammar:

  # ---------------------------------------
  # Initialize table row if it doesn't exist yet:

  if !table.key_exists(production.LHS):
    table[production.LHS] = {}

  # ---------------------------------------
  # Row for this non-terminal symbol:

  row = table[production.LHS]

  # ---------------------------------------
  # E' : '+' T E'
  #
  #   production.nubmer = 2
  #   production.LHS = E'
  #   production.RHS = '+' T E'
  #
  # If it's a non-epsilon production,
  # the production number should go under
  # the terminals from the First set.

  if !production.is_epsilon():
    set = First(production.RHS)

  # ---------------------------------------
  # E': ε
  #
  #   production.nubmer = 3
  #   production.LHS = E'
  #   production.RHS = ε
  #
  # Otherwise, it's the epsilon production,
  # and its number should go under the
  # terminals from the Follow set.

  else:
    set = Follow(production.LHS)

  # ---------------------------------------
  # Merge the set to the table row:

  for terminal in set:
    row[terminal] = production.number
```