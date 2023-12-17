import { evenWeek, oddWeek } from "./cabinetInfo.js";

export function getDay(param, day = new Date()) {
    const today = day.getDay()
    let dayNum = 0;
    if (today === 0) {
        dayNum = 6
    } else {
        dayNum = today - 1
    }
    return dayNum + Number(param[0])
}

export function isEvenWeek(date = new Date()) {
    const startYear = new Date(date.getFullYear(), 0, 1)
    const startDayYear = startYear.getDay(startYear)
    const numberDayInYear = Math.floor((date - startYear) / 8640000)

    const weekNumber = Math.floor((numberDayInYear + startDayYear) / 7)

    return !!(weekNumber % 2 === 0)
}

export function getShedule(param) {
    return isEvenWeek() ? evenWeek[getDay(param)] : oddWeek[getDay(param)]
}