/*

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
      explain what a function does (with extra notes, if any) and that is
      likely to take multiple sentences.

    - CSS utility classes have been named like those provided by Twitter
      Bootstrap but with a preceding hyphen character (e.g., '-mr-1' for
      a particular 'margin-right' value).

      This has been done so that a quick glance at the HTML does not make
      the impression that they are Bootstrap classes.

*/




"use strict";

// If the minimum and maximum limits for the allowed length are changed
// in the HTML, they must be changed here as well.
const MIN_SEQ_LENGTH = 1;
const MAX_SEQ_LENGTH = 512;

// JS is used to reset the sequence length in the <input> to a default
// value on page load/reload. If the default value in the HTML code is
// changed, this needs to be changed as well.
const DEFAULT_SEQ_LENGTH = 8;



/*
------------------------------------------------------------------------

Some useful aliases

------------------------------------------------------------------------
*/

const _id = (id) => document.getElementById(id);

const _q = (selector, element) => (
    element
        ? element.querySelector(selector)
        : document.querySelector(selector)
);

const _qa = (selector, element) => (
    element
        ? element.querySelectorAll(selector)
        : document.querySelectorAll(selector)
);



/*
------------------------------------------------------------------------

Available characters of various types

------------------------------------------------------------------------
*/

const CHARACTERS = {

    lowercase: [
        "a", "b", "c", "d", "e", "f", "g", "h", "i", "j",
        "k", "l", "m", "n", "o", "p", "q", "r", "s", "t",
        "u", "v", "w", "x", "y", "z"
    ],

    uppercase: [
        "A", "B", "C", "D", "E", "F", "G", "H", "I", "J",
        "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T",
        "U", "V", "W", "X", "Y", "Z"
    ],

    numeric: [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9
    ],

    special: [
        "!", "\"", "#", "$", "%", "&", "'", "(", ")", "*",
        "+", ",", "-", ".", "/", ":", ";", "<", "=", ">",
        "?", "@", "[", "\\", "]", "^", "_", "`", "{", "|",
        "}", "~"
    ]

};



/*
------------------------------------------------------------------------

Available randomizers

------------------------------------------------------------------------
*/

const RANDOMIZERS = {

    /*
        Maybe the most common way of generating a random integer within a
        fixed range is used here to get a random index which is then used
        to return the corresponding character from the available character
        pool.

        This is, basically, just choosing one random character from all
        the available characters.
    */
    simplest: ({ lowercase, uppercase, numeric, special }) => {

        let charPool = [];

        // Based on type selection, the available character pool may
        // grow bigger.
        if (lowercase) {
            charPool = charPool.concat(CHARACTERS.lowercase);
        }
        if (uppercase) {
            charPool = charPool.concat(CHARACTERS.uppercase);
        }
        if (numeric) {
            charPool = charPool.concat(CHARACTERS.numeric);
        }
        if (special) {
            charPool = charPool.concat(CHARACTERS.special);
        }

        const min = 0;
        const max = charPool.length;

        // A random index is generated and the corresponding character
        // from the pool (array) is returned.
        const index = Math.floor( Math.random() * (max - min) + min );
        const randomChar = charPool[index];
        return randomChar;

    }

};



/*
------------------------------------------------------------------------

The exciting things start here

------------------------------------------------------------------------
*/

// Randomizer names are stored in an array so that names can be randomly
// chosen later to generate characters.
const RANDOMIZER_NAMES = [];
Object.keys(RANDOMIZERS).forEach(name => {
    RANDOMIZER_NAMES.push(name);
});



// Previously selected settings are reset on page load/reload.
resetSettings();



// Notes on available characters are generated using the JS arrays that
// are used for sequence generation.
generateNotes();



// Clicking the 'generate' button or pressing the 'g' key generates a
// random sequence.
_id("generate-btn").addEventListener("click", () => getRandomSequence());
document.addEventListener("keyup", function (event) {

    // Keyboard shortcuts will not work inside input fields.
    if (event.target.tagName === "INPUT") {
        return;
    }

    if (event.key === "g" || event.charCode === 103) {
        getRandomSequence();
    }
});



// Keyboard shortcuts to select sequence types. The first letter of each
// sequence type is used as the corresponding shortcut.
document.addEventListener("keyup", function (event) {

    // Keyboard shortcuts will not work inside input fields.
    if (event.target.tagName === "INPUT") {
        return;
    }

    if (event.key === "l" || event.charCode === 108) {
        toggleSequenceType("lowercase");
    }
    if (event.key === "u" || event.charCode === 117) {
        toggleSequenceType("uppercase");
    }
    if (event.key === "n" || event.charCode === 110) {
        toggleSequenceType("numeric");
    }
    if (event.key === "s" || event.charCode === 115) {
        toggleSequenceType("special");
    }
});



// A few buttons are provided to set various sequence lengths easily.
_id("s-length-sugg-16").onclick = () => {
    setSequenceLength(16);
};
_id("s-length-sugg-32").onclick = () => {
    setSequenceLength(32);
};
_id("s-length-sugg-64").onclick = () => {
    setSequenceLength(64);
};
_id("s-length-sugg-128").onclick = () => {
    setSequenceLength(128);
};



/*
------------------------------------------------------------------------

Function declarations

------------------------------------------------------------------------
*/

/*
    Returns a random character which can be of the following types:

        - a letter of the English alphabet (either lowercase or uppercase),
        - an integer including and between 0 and 9
        - a special character.
*/
function getRandomChar(options) {

    // A random index is used to determine which randomizer will be used.
    // This formula generates a number between the 'min' value and the
    // 'max' value including only the 'min'.
    const min = 0;
    const max = RANDOMIZER_NAMES.length;
    const index = Math.floor( Math.random() * (max - min) + min );

    // The chosen randomizer name is used as a property name to call the
    // corresponding method from the 'randomizers' object.
    const chosenName = RANDOMIZER_NAMES[index];
    const randomChar = RANDOMIZERS[chosenName](options);

    return randomChar;

}



/*
    Returns a sequence of random characters.

    The sequence is generated one character at a time. The type of each
    character is determined based on the types the user has selected on
    the page.

    'types' is a boolean array, with each item indicating if the character
    of the corresponding index in the resulting sequence will be numeric or
    not. There are 2 possible values for each item of the array:
        1. "a" indicates an alphabetical character
        2. "n" indicates a numerical character
*/
function getRandomSequence(types) {

    let sequence = "";

    // Sequence types as per user input.
    let canHaveLower = _id("sequence-type-lowercase").checked;
    let canHaveUpper = _id("sequence-type-uppercase").checked;
    let canHaveNumeric = _id("sequence-type-numeric").checked;
    let canHaveSpecial = _id("sequence-type-special").checked;

    // The sequence types are checked for non-boolean values.
    canHaveLower = typeof canHaveLower === "boolean" ? canHaveLower : false;
    canHaveUpper = typeof canHaveUpper === "boolean" ? canHaveUpper : false;
    canHaveNumeric = typeof canHaveNumeric === "boolean" ? canHaveNumeric : false;
    canHaveSpecial = typeof canHaveSpecial === "boolean" ? canHaveSpecial : false;

    // An alert is shown if no type is selected.
    if (!canHaveLower && !canHaveUpper && !canHaveNumeric && !canHaveSpecial) {
        alert("At least one type must be selected!");
        return;
    }

    // The length of the sequence as per user input.
    const sequenceLength = _id("sequence-length").value;

    // Just a check against current minimum and maximum limits for the
    // character length.
    if (sequenceLength > MAX_SEQ_LENGTH || sequenceLength < MIN_SEQ_LENGTH) {
        alert("Entered sequence length is not valid!");
        return;
    }

    // The sequence is built one character at a time. A randomly chosen
    // randomizer is used to generate each character.
    for (let i = 0; i < sequenceLength; ++i) {
        sequence += getRandomChar({
            lowercase: canHaveLower,
            uppercase: canHaveUpper,
            special: canHaveSpecial,
            numeric: canHaveNumeric
        });
    }

    // The generated sequence is simply shown on the page.
    _id("output").textContent = sequence;

    // let sequence = "";

    // // For each item of the 'types' array, a random character of that type
    // // is generated.
    // types.forEach(type => {
    //     const isNumeric = type === "n";
    //     const character = getRandomChar(isNumeric);
    //     sequence += character;
    // });

}



/*
    Enables/Disables sequence type selectors.
*/
function toggleSequenceType(type) {

    // HTML 'id' is determined based on passed type.
    const id = (
        type === "lowercase" ? "sequence-type-lowercase" : (
            type === "uppercase" ? "sequence-type-uppercase" : (
                type === "numeric" ? "sequence-type-numeric" : (
                    type === "special" ? "sequence-type-special" : undefined
                )
            )
        )
    );

    if (id === undefined) {
        return;
    }

    // The current state is reversed.
    _id(id).checked = !_id(id).checked;

}



/*
    Sets a value to the <input> element for the sequence length.

    This function is actually used for the predefined length suggestion
    buttons only.
*/
function setSequenceLength(length) {
    if (parseInt(length) === NaN) {
        return;
    }
    if (length >= MIN_SEQ_LENGTH && length <= MAX_SEQ_LENGTH) {
        _id("sequence-length").value = length;
    }
}



/*
    Generates notes, listing the available characters for various character
    types.

    An entire section's HTML code is not generated here via JS. For each
    section, the container element's HTML, with an 'id' attribute, must
    already be present in the HTML file. HTML code for only the characters
    for each section is generated and added here. The characters, for that,
    are obtained from the global JS object.
*/
function generateNotes() {

    // One note section is populated for each character type.
    Object.keys(CHARACTERS).forEach(charType => {

        // The HTML 'id' attribute for the current iteration's section
        // is obtained. If new character types are added in future,
        // corresponding 'id' values will have to be added here manually.
        const noteSectionId = (
            charType === "lowercase" ? "lowercase-note-section" : (
                charType === "uppercase" ? "uppercase-note-section" : (
                    charType === "numeric" ? "numeric-note-section" : (
                        charType === "special" ? "special-note-section" : undefined
                    )
                )
            )
        );

        // If a corresponding section exists in the HTML, its characters
        // are added to the section.
        if (noteSectionId) {

            let html = "";
            CHARACTERS[charType].forEach(char => {
                html += `<span class="char-item">${ char }</span>`;
            });

            const noteSection = _id(noteSectionId);
            noteSection.insertAdjacentHTML('beforeend', html);

        }

    });

}



/*
    On page load/reload, checkboxes are unchecked, and sequence length
    is reset to a default value.
*/
function resetSettings() {

    // All checkboxes except the one for the lowercase alphanumeric option
    // are unchecked so that only that one is selected by default.
    _qa("input.sequence-type-selector").forEach(checkbox => {
        checkbox.checked = checkbox.id === "sequence-type-lowercase";
    });

    // Sequence is reset as well.
    _id("sequence-length").value = DEFAULT_SEQ_LENGTH;

}