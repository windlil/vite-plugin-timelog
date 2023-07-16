import type { PluginOption, ResolvedConfig } from 'vite'
import colors from 'picocolors'
import { getDate, formatTime } from './utils/timer'
import { compare, mapDir, getInfo, createMap } from './utils/files'
import type { Options } from './types'

function normalizeOptions(options: Options) {
  let {interval} = options
  if (typeof interval === 'number') {
    interval = String(interval)
  }
  let timerInterval: number = 0
  const timeUnit = ['s', 'm', 'h']
  let unit: string = 's'
  timeUnit.forEach(u => {
    if ((interval as string).indexOf(u) !== -1) {
      unit = u
      return
    }
  })
  const timeNumber = Number(interval.replace(unit, ''))
  switch(unit) {
    case 's':
      timerInterval = timeNumber * 1000
      break
    case 'm':
      timerInterval = timeNumber * 60000
      break
    case 'h':
      timerInterval = timeNumber * 3600000
      break
  }
  return {
    interval: timerInterval
  }
}

const VitePluginTimer = (options: Options):PluginOption => {
  const { interval } = normalizeOptions(options)
  let timer: any
  let before: any
  let codingTime: number = 0
  let startTime: Date = new Date()

  return {
    name: 'vite-plugin-timer',
    configResolved(config:ResolvedConfig) {
      before = structuredClone(mapDir(config.root, config.root))
      if (config.command === 'serve' && !timer)  {
        timer = setInterval(() => {
          codingTime = codingTime + interval
          const after = mapDir(config.root, config.root)
          const info = getInfo(after)
          const map = createMap(info)
          const date = getDate()
          const time = `(${date})`
          console.log(`${colors.bold(colors.green(time))}`+ `   ⭐  ${colors.blue(`You've been coding for ${formatTime(codingTime)}` )}`)
          console.log(`${colors.yellow(`new files: ${''}`)}`)
        }, interval)
      }
    }
  }
}

export {
  VitePluginTimer
}

export default VitePluginTimer