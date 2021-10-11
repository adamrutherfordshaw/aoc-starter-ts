import { test, readInput } from "../utils/index"

const prepareInput = (rawInput: string) => rawInput

const input = prepareInput(readInput())

const calculateNumberOfTrees = (
  slopeHorizontal: number,
  slopeVertical: number,
  treeMap: string[],
): number => {
  const treeMapWidth: number = treeMap[0].length
  const treeMapHeight: number = treeMap.length
  let treeCount: number = 0
  let vertical: number = 0
  let horizontal: number = 0

  while (vertical <= treeMapHeight) {
    vertical < treeMapHeight &&
      treeMap[vertical][horizontal] === "#" &&
      treeCount++

    horizontal += slopeHorizontal
    vertical += slopeVertical

    if (horizontal >= treeMapWidth) horizontal = horizontal % treeMapWidth
  }

  return treeCount
}

const splitTreeMap = (treeMap: string): string[] => treeMap.split("\n")

const goA = (input: string): number => {
  const treeMap: string[] = splitTreeMap(input)

  const treeCount: number = calculateNumberOfTrees(3, 1, treeMap)

  return treeCount
}

const goB = (input: string): number => {
  const treeMap: string[] = splitTreeMap(input)
  let treeCounts: number[]

  treeCounts[0] *= calculateNumberOfTrees(1, 1, treeMap)
  treeCounts[1] *= calculateNumberOfTrees(3, 1, treeMap)
  treeCounts[2] *= calculateNumberOfTrees(5, 1, treeMap)
  treeCounts[3] *= calculateNumberOfTrees(7, 1, treeMap)
  treeCounts[4] *= calculateNumberOfTrees(1, 2, treeMap)

  return treeCounts.reduce((acc, count) => acc * count, 1)
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
