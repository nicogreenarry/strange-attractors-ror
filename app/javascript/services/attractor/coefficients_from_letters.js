const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

function coefficientFromLetter(letter) {
  return (alphabet.findIndex(l => l === letter) - 12) / 10;
}

export default function coefficientsFromLetters(letters) {
  return letters.toLowerCase().split('').map(coefficientFromLetter);
}