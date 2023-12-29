# balanced-substrings
Balanced Substring finder in JavaScript (Functional Programming nodejs)

Coursework for my Advanced Programming module (2nd year Computer Science)

### Goals
- Find balanced substrings in set of strings given as input
- Do so without using loops (making use of functional programming and high order functions/lambdas from JavaScript)

### Balanced Substrings
Following the Coursework conventions for a balanced substring:

"_A non-empty ASCII string is called balanced if, for each letter of the English alphabet,
the number of its lowercase occurrences equates the number of uppercase
occurrences. For example, aaAbabABAB and abAB are balanced, while abA and
aaAbabABA are not. However, even if a string is not balanced, it can have a
substring (i.e., one contiguous sequence of its characters) which is. Taking again our
last non-balanced example, aaAbabABA, the substring going from its fifth to its
eighth letters (abAB) is balanced, so that [4,7] is a balanced substring of it.
Similarly for [1,2]. It is easy to check that there are no other balanced substrings.
Note that the definition of a balanced string allows non-alphabet characters: the
string a5A is balanced and your program should return [0,2] (and not [0,1]!) on it._"


