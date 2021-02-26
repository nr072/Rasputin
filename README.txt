Rasputin
---------------------------------------------

(Random Alphanumeric Sequence Producer, Understandably Typical In Nature)

Rasputin generates random character sequences that can contain letters
of the English alphabet, integers from and including 0 to 9, and some
special characters. A very common use of this would be random password
generation.

Although naming it 'Yet Another Random Sequence Generator' would be
considered a cliché, Rasputin actually is yet another random sequences
generator, just with a slightly different name.



Features
---------------------------------------------

There are 2 main features:

    - Character type selection,
    - Sequence length.

The character type selection currently provides 4 options:

    - Lowercase alphabetical,
    - Uppercase alphabetical,
    - Numerical,
    - Special characters.

Selecting any of these types means that the resulting sequence will
include that type of characters. If multiple types are selected, that
means each character can be from either of the selected types.

For example, if only 'lowercase' is selected, each character of the
resulting sequence can be a lowercase letter. And if both 'lowercase'
and 'numeric' are selected, each character of the resulting sequence
can be a lowercase letter or a digit between and including 0 and 9.

The sequence length can currently be an integer between and including
1 and 512.

Keyboard shortcuts are also provided for selecting sequence types and
generating sequences. The letters 'l', 'u', 'n', 's', and 'g' are used
for relevant actions.



Notes on coding style
---------------------------------------------

- JS variables have been named as if they were case insensitive, while
  using the 'camelCase' style for ease of comprehension.

- Global variable names have been written in uppercase letters since
  sometimes it might be important to distinguish which one is global
  between two similar variable names.

  Some common conventions might suggest using uppercase for constant
  values only. But since 'const' has been used so much here, it is not
  an option to write some in uppercase and some in lowercase letters
  (because, obviously, having three quarters of the variable names in
  uppercase would not look good).

  The helpful aliases have been spared this. They are supposed to be
  named in a way that will not create any confusion on the first place.

- The multi-line commenting syntax (i.e., starting with a forward slash
  by an asterisk, and ending with an asterisk followed by a forward
  slash) has been used to write comments before function declarations
  for no particular reason other than that those are good places to
  explain what a function does (with extra notes, if any).
