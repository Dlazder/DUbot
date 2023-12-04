import { evenWeek, oddWeek } from "./cabinetInfo.js";

export function getDay(day = new Date()) {
    const today = day.getDay()
    if (today === 0) {
        return 6
    } else {
        return today - 1
    }
}

export function isEvenWeek(date = new Date()) {
    const startYear = new Date(date.getFullYear(), 0, 1)
    const startDayYear = startYear.getDay(startYear)
    const numberDayInYear = Math.floor((date - startYear) / 8640000)

    const weekNumber = Math.floor((numberDayInYear + startDayYear) / 7) + 1

    return !!(weekNumber % 2 === 0)
}

export function getShedule() {
    return isEvenWeek() ? evenWeek[getDay()] : oddWeek[getDay()]
}