/**
 * Function to randomize a number within a range from 0 to maxNumber
 * @param maxNumber
 * @returns
 */

function randomize(maxNumber: number) {
  return Math.floor(Math.random() * maxNumber)
}

export default randomize
