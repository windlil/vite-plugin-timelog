function addZero(value:number) {
  return value < 10? '0' + value: value
}

export function getDate():string {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDay()
  const hh = addZero(date.getHours())
  const mm = addZero(date.getMinutes())
  const ss = addZero(date.getSeconds())
  const result = `${year}-${month}-${day} ${hh}:${mm}:${ss}`
  return result
}

export function formatTime(time: number) {
  const diff = time
  const hour = diff / (3600000)
  const min = diff % (1000 * 24 * 60 * 60) % (1000 * 60 * 60) / (1000 * 60)
  const sec = diff % (1000 * 24 * 60 * 60) % (1000 * 60 * 60) % (1000 * 60) / 1000
  if (diff < 60000) {
    return sec + 's'
  } else if (diff < 3600000) {
    return Math.floor(min) + 'm' + `${Math.floor(sec) == 0? '': Math.floor(sec) + 's'}`
  } else {
    return Math.floor(hour) + 'h' + Math.floor(min) + 'm' + `${Math.floor(sec) == 0? '': Math.floor(sec) + 's'}`
  }
}