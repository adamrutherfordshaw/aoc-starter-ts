import { test, readInput } from "../utils/index"

const prepareInput = (rawInput: string) => rawInput

const input = prepareInput(readInput())

const getNumberArray = (input: string): number[] => {
  return input.split('\n').map(num => Number.parseInt(num))
}

const checkSum = (...args: number[]): boolean => {
  return (args.reduce((acc, num) => acc + num, 0)) === 2020
}

const getProduct = (...args: number[]): number => {
  return (args.reduce((acc, num) => acc * num, 1))
}

const goA = (input: string): number => {
  const allNumbers: number[] = getNumberArray(input)

  for (let a=0; a<allNumbers.length; a++) {
    for (let b=a+1; b<allNumbers.length; b++) {
      if (checkSum(allNumbers[a], allNumbers[b]))
        return getProduct(allNumbers[a], allNumbers[b])
    }
  }
}

const goB = (input: string): number => {
  const allNumbers: number[] = getNumberArray(input)

  for (let a=0; a<allNumbers.length; a++) {
    for (let b=a+1; b<allNumbers.length; b++) {
      for (let c=b+1; c<allNumbers.length; c++) {
        if (checkSum(allNumbers[a], allNumbers[b], allNumbers[c]))
          return getProduct(allNumbers[a], allNumbers[b], allNumbers[c])
      }
    }
  }
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
