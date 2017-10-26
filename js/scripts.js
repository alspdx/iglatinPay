var alphaChar = /[A-Za-z]/;
var vowels = /[aeiouAEIOU]/;
var letterY = /[yY]/;
var letterU = /[uU]/;
var pigLatinWords = [];
var pigLatinSentence = [];
var output;

var words = function(sentence) {
  return sentence.split(" ");
};

var letters = function(word) {
  return word.split("");
};

var consonantShift = function(_userLetters) {
  var i = 0;
  if (letterY.test(_userLetters[0])) {
    _userLetters.push(_userLetters.shift());
  };
  while ((!vowels.test(_userLetters[0])) && (!letterY.test(_userLetters[0])) && (i <= _userLetters.length)) {
    _userLetters.push(_userLetters.shift());
    i += 1;
  };
  return _userLetters;
};

var quShift = function(_userLetters) {
  while (!letterU.test(_userLetters[_userLetters.length - 1])) {
    _userLetters.push(_userLetters.shift());
  };
  return _userLetters;
};

// logic function starts here
var iglatinPay = function(userSentence) {
  var userWords = words(userSentence);

  userWords.forEach(function(word) {
    var userLetters = letters(word);

    if (vowels.test(userLetters[0])) {
      userLetters.push("w", "a", "y");
      pigLatinWords = userLetters.join("");
    } else if (userLetters.slice(0, 2).join("").toUpperCase() === "QU" ||
              userLetters.slice(0, 3).join("").toUpperCase() === "SQU") {
      var quLetters = quShift(userLetters);
      quLetters.push("a", "y");
      pigLatinWords = quLetters.join("");
    } else if ((alphaChar.test(userLetters[0])) && (!vowels.test(userLetters[0]))) {
      var shiftedLetters = consonantShift(userLetters);
      shiftedLetters.push("a", "y");
      pigLatinWords = shiftedLetters.join("");
    } else {
      pigLatinWords = userLetters.join("");
    };
    pigLatinSentence.push(pigLatinWords);
  });
  return pigLatinSentence.join(" ");
};


$(function(){
  $("#pig-latin").submit(function(event){
    event.preventDefault();
    var userInput = $("#user-input").val();
    var pigLatin = iglatinPay(userInput);
    $("div#result").text(pigLatin);
  });
});
