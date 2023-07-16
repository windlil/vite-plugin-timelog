import type { PluginOption, ResolvedConfig } from 'vite'
import colors from 'picocolors'
import { getDate } from './utils/timer'
import { compare, mapDir } from './utils/files'
import type { Options } from './types'

const VitePluginTimer = (options: Options):PluginOption => {
  let timerInterval = Number(options.interval)
  let timer: any
  let before: any
  let codingTime: number = 0

  return {
    name: 'vite-plugin-timer',
    configResolved(config:ResolvedConfig) {
      before = structuredClone(mapDir(config.root, config.root))
      if (config.command === 'serve' && !timer)  {
        timer = setInterval(() => {
          codingTime = codingTime + timerInterval
          const after = mapDir(config.root, config.root)
          const info = compare(before, after)
          const date = getDate()
          const time = `(${date})`
          console.log(`${colors.green(time)}`)
          console.log(`You've been coding for ${colors.blue(codingTime)} seconds, take a break!`)
        }, timerInterval)
      }
    }
  }
}

export {
  VitePluginTimer
}

export default VitePluginTimer