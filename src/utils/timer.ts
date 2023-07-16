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