import { test, readInput } from "../utils/index"

const prepareInput = (rawInput: string) => rawInput

const input = prepareInput(readInput())

interface SplitPasswordLine {
  num1: number
  num2: number
  requiredChar: string
  passwordStringArray: string[]
}

const getPasswordList = (input: string): string[][] =>
  input.split("\n").map((line) => line.split(" "))

const splitPasswordArrays = (passwordRule: string[]): SplitPasswordLine => {
  return {
    num1: Number.parseInt(passwordRule[0].split("-")[0]),
    num2: Number.parseInt(passwordRule[0].split("-")[1]),
    requiredChar: passwordRule[1].split("")[0],
    passwordStringArray: passwordRule[2].split(""),
  }
}

const goA = (input: string): number => {
  const passwordList: string[][] = getPasswordList(input)
  let validPasswordCount: number = 0

  passwordList.forEach((passwordRule: string[]) => {

    const {num1: minCount, num2: maxCount, requiredChar, passwordStringArray}: SplitPasswordLine = splitPasswordArrays(passwordRule)

    let count: number = 0

    passwordStringArray.forEach((character: string) => {
      if (character === requiredChar) count++
    })

    if (count >= minCount && count <= maxCount) validPasswordCount++
  })

  return validPasswordCount
}

const goB = (input: string): number => {
  const passwordList: string[][] = getPasswordList(input)
  let validPasswordCount: number = 0

  passwordList.forEach((passwordRule: string[]) => {
    const {num1: requiredPos1, num2: requiredPos2, requiredChar, passwordStringArray} = splitPasswordArrays(passwordRule)

    if (
      (passwordStringArray[requiredPos1-1] === requiredChar &&
        passwordStringArray[requiredPos2-1] !== requiredChar) ||
      (passwordStringArray[requiredPos1-1] !== requiredChar &&
        passwordStringArray[requiredPos2-1] === requiredChar)
    )
      validPasswordCount++
  })

  return validPasswordCount
}

/* Tests */

// test()

/* Results */

console.time("Time")
const resultA = goA(input)
const resultB = goB(input)
console.timeEnd("Time")

console.log("Solution to part 1:", resultA)
console.log("Solution to part 2:", resultB)
