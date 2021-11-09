import { test, readInput } from "../utils/index"

const prepareInput = (rawInput: string) => rawInput

const input = prepareInput(readInput())

const requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"]

type PassportData = {
  [key: string]: string;
}

const formatPassportData = (input: string): PassportData[] => input
.split(/\n\n/)
.map((passportFields): PassportData =>
  Object.fromEntries(
    passportFields
      .split(/\n| /)
      .map((keyValuePair) => keyValuePair.split(/:/)),
  ),
)

const isValidPassport = (passport) => requiredFields.every((requiredField) => Object.keys(passport).includes(requiredField))


const goA = (input: string): number => {
  const passportList = formatPassportData(input)

  const vCount = passportList.reduce((count, passport) => {
    return isValidPassport(passport) ? ++count : count
  }, 0)

  return vCount
}

const goB = (input: string): number => {
  const passportList = formatPassportData(input)

  const isValidField = (givenField, requiredField: string): boolean => {
    switch (requiredField) {
      case "byr":
        return givenField >= 1920 && givenField <= 2002
      case "iyr":
        return givenField >= 2010 && givenField <= 2020
      case "eyr":
        return givenField >= 2020 && givenField <= 2030
      case "hgt":
        return givenField.match(/^(1([5-8][0-9]|9[0-3])cm|(59|6[0-9]|7[0-6])in)$/) 
      case "hcl":
        return givenField.match(/^#([0-9]|[a-f]){6}$/)
      case "ecl":
        return ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].some(
          (colour) => colour === givenField,
        )
      case "pid":
        return givenField.match(/^([0-9]{9})$/)
    }
  }

  const isValidFields = (passport: PassportData): boolean => requiredFields.every((requiredField): boolean => isValidField(passport[requiredField], requiredField))

  const vCount = passportList.reduce((count, passport): number => isValidPassport(passport) && isValidFields(passport) ? ++count : count, 0)

  return vCount
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
