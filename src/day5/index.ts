import { test, readInput } from "../utils/index"

const prepareInput = (rawInput: string) => rawInput

const input = prepareInput(readInput())


interface SeatRange {
  front: number
  back: number
  left: number
  right: number
}

interface SeatBoundary extends SeatRange {
  seatDirection: string
}

const getSeatBoundary = ({front, back, left, right, seatDirection}: SeatBoundary): SeatRange => {
  if (seatDirection === 'F') back = Math.floor((back + front) / 2)
  if (seatDirection === 'B') front = Math.ceil((back + front) / 2)
  
  if (seatDirection === 'L') right = Math.floor((right + left) / 2)
  if (seatDirection === 'R') left = Math.ceil((right + left) / 2)
  return {front, back, left, right}
}

const getOccupiedSeats = (boardingPasses: string[]): number[] => boardingPasses.map(boardingPass => {
  let seatRange = {front: 0, back: 127, left: 0, right: 7}

  boardingPass.split('').forEach(seatDirection => {
    seatRange = {...getSeatBoundary({...seatRange, seatDirection})}
  })
  return (seatRange.front * 8 + seatRange.left)
})

const getOrderedSeats = (occupiedSeats: number[]): number[] => occupiedSeats.sort(function(a, b) {
  return a - b;
});

const goA = (input: string): number => {
  const boardingPasses = input.split('\n')
  
  const occupiedSeats = getOccupiedSeats(boardingPasses)

  const orderedSeats = getOrderedSeats(occupiedSeats)

  return orderedSeats[orderedSeats.length-1]
}

const goB = (input: string): number => {
  const boardingPasses = input.split('\n')
  
  const occupiedSeats = getOccupiedSeats(boardingPasses)

  const orderedSeats = getOrderedSeats(occupiedSeats)

  let missingSeat: number;
  let previousSeatNumber = orderedSeats[0] - 1

  orderedSeats.forEach(currentSeatNumber => {
    if (currentSeatNumber !== previousSeatNumber + 1) {
      missingSeat = currentSeatNumber - 1
    }

    previousSeatNumber = currentSeatNumber
  });

  return missingSeat
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
