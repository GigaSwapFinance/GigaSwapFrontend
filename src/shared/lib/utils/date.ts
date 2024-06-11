export function getDate(date: Date | number, withYear: boolean = false) {
  const today = date ? new Date(date) : new Date()

  const day = today.getDate()
  const month = today.getMonth() + 1

  const d = day < 10 ? `0${day}` : day
  const m = month < 10 ? `0${month}` : month

  let dateString = `${d}.${m}`

  if (withYear) {
    const year = today.getFullYear().toString()
    const y = year < 10 ? `0${year}` : year

    dateString += `.${y}`
  }

  return dateString
}

export function getTime(date: Date | number, withSeconds: boolean = false) {
  const today = date ? new Date(date) : new Date()

  const hours = today.getHours()
  const minutes = today.getMinutes()

  const h = hours < 10 ? `0${hours}` : hours
  const m = minutes < 10 ? `0${minutes}` : minutes

  let timeString = `${h}:${m}`

  if (withSeconds) {
    const seconds = today.getSeconds()
    const s = seconds < 10 ? `0${seconds}` : seconds

    timeString += `:${s}`
  }

  return timeString
}

export function getTimeWithDate(date: Date | number, isFull: boolean) {
  const t = getTime(date)
  const d = getDate(date, isFull)

  return `${t} ${d}`
}

export function secondsToHours(seconds: number) {
  const sec_num = parseInt(seconds, 10)
  const hours   = Math.floor(sec_num / 3600)
  const minutes = Math.floor(sec_num / 60) % 60
  const secs = sec_num % 60

  const array = [hours,minutes,secs]
    .map(v => v < 10 ? "0" + v : v)
    .filter((v,i) => v !== "00" || i > 0)

  return array[0] + 'h ' + array[1] + 'm ' + array[2] + 's'
}