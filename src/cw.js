/**
 * LZSCC212 - Advanced Programming Coursework 2.
 * Author: Gines Moratalla
 * 
 */
"use strict";
const cwlib = require( './cwlib.js' );													// Import 'cwlib.js' file
cwlib.setup(process.argv[2]);															// Setup function from 'cwlib.js' --> reads input file from terminal

let data_string = '';																	// String used to check for balanced substrings
let line_index = 0;																		// Variable that tracks the current line index
let total_max = 0;																		// Variable that tracks the length of the current longest balanced substring
let line_longest_substr = [];															// Array that will store the longest substrings from one line
let total_longest_substr = [];															// Array that will store longest substrings from all the lines
/**
 * @function balancedSubstring below checks wether a substring 'substring' is balanced
 * @param {*} substring passed substring from 'data' hook
 * 
 * Function creates a set of every unique character in the substring as 'unique_chars'
 * and filters the substring for upperCase and lowerCase examples for every char in 'unique_chars'
 * 
 * @returns true if all counts are true (all unique chars are balanced)
 */
function balancedSubstring(substring) {
	
	let unique_chars = [...new Set(substring)];	   									

	return unique_chars.every((char) => {												// every() === true if all characters 'char' in 'unique_chars' meet the conditions below
	  let lowerCase = substring.filter((i) => i === char.toLowerCase()).length;			// lowerCase --> counter for lowercase characters
	  let upperCase = substring.filter((i) => i === char.toUpperCase()).length;			// upperCase --> counter for uppercase characters
	  return lowerCase === upperCase; 
	});
};
/**
 * @function currentSubstrings below slices string passed 'str' into all possible substrings inside of it
 * @param {*} str parameter passed for the function to be "substringed". Type String
 * 
 * This function will convert a str into an array of characters in order to work with indexes
 * and display the indexes of the balanced substrings found, instead of printing the
 * substring itself
 * 
 * @returns nothing, but instead it will keep adding all balanced substrings for each line to a 'line_longest_substr' array
 */
function currentSubstrings(str) {

	let character_array = [...str];														// Convert passed string into array of characters

	character_array.map((current_char, i) =>											// 'current_char' is unused, as we only need index of chars ('i' and 'j')
		character_array.slice(i).map((current_char, j) => {								// Starting in index i, for all j, find all substrings in range [i, j]

			let sub_array = character_array.slice(i, i + j + 1);						// Get substring starting from i and ending at index i + j										

			if(balancedSubstring(sub_array) && 											// True IF sub_array is balanced and it was not previously added
			!line_longest_substr.some(index => index[0] === i && index[1] === i + j)) {	// to avoid adding repeated strings by index

				let substring_index = [i, i + j];										// Create setup (this variable will be added to the list of balanced substrings)
				console.log(substring_index);											// Print current balanced substring
				line_longest_substr.push(substring_index);								// Add substring to current line's set of balanced substrings
			}
    	})
    );
}
/**
 * Hooks from cwlib.js
 * -------------------------------------------------------------------------------------
 * 
 * Ready hook --> runs the program
 */ 
cwlib.on( 'ready', function() { cwlib.run(); });									
/**
 * Data hook --> receives data from input file, one at a time
 * 'data' variable is treated as a character (each char from input file)
 */
cwlib.on( 'data', function( data ) {												
	data_string += data;																// Push data character into a data_string (Type String)
	currentSubstrings(data_string);														// Send current data string to 'currentSubstrings' function (creates all possible substrings)
} );
/**
 * Reset hook --> function called when the end of a line is detected in any input file given
 */
cwlib.on( 'reset', function() {

	const line_max = Math.max(...line_longest_substr.map(arr => arr[1] - arr[0] + 1));	// Check for current line's max substring length (by substracting index bounds)
	if(line_max > total_max) total_max = line_max;										// Update global max length if this line's length is bigger

	const result = line_longest_substr.filter(subarray =>								// Filter out all balanced substrings that are not of line_max length
		subarray[1] - subarray[0] + 1 === line_max);

	console.log("Longest balanced substrings for this line: ", result, "\n");			// Print statement --> prints current line's substring index bounds for all strings with length 'line_max'
	total_longest_substr.push([line_index, result]);									// Push all max length substrings from this line to overall max substring array (with their line index)
	line_longest_substr = [];															// Empty current line's substrings to work with next lines
	line_index++;																		// Increment the index line for the next line in the input file
	data_string = '';																	// Empty data_string to run functions again for any new line
} );
/**
 * End hook --> function called when input file ends, running process will stop after this function finished
 * @param filtered_substrings will filter out all max substrings that are not of 'total_max' length
 */
cwlib.on( 'end', function() {

	const filtered_substrings = total_longest_substr.filter(substring =>				// substring[0] will correspond to the line index
	substring[1].some(index => index[1] - index[0] + 1 === total_max)					// substring[1] contains max length substrings for each line
	);																					// some() will retrieve only the ones where the index substraction === total_max
	console.log("Overall longest balanced substrings:"); 
	filtered_substrings.forEach((substring) => {console.log(substring)});				// Print all balanced substrings of total_max length with their respective index line
}); 
