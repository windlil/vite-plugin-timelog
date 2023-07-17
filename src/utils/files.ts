import fs from 'fs'
import { relative } from 'path'
import { extname } from 'path'
import { normalizePath } from 'vite'
import colors from 'picocolors'

let result: {
  dirs: string[]
  files: string[]
} = {
  dirs: [],
  files: []
}

interface Result {
  dirs: string[]
  files: string[]
}

let basePath: string

function isExist(name: string, value: string) {
  const resulta = result[name].find((n:string) => {
    return n === value
  })

  return resulta
}

export function mapDir(path: string, bPath?: string): Result {
  if (bPath)  {
    basePath = bPath
    result = {
      dirs: [],
      files: []
    }
  }
  const list = fs.readdirSync(path)
  list.forEach((name: string) => {
    if (name == 'node_modules') return 
    const currentPath = path + '/' + name
    const isDir = fs.statSync(currentPath).isDirectory()
    const rp = relative(basePath, currentPath)
    if (isDir) {
      if (!isExist('dirs', normalizePath(rp))) {
        result.dirs.push(normalizePath(rp))
      }
      mapDir(currentPath)
    } else {
      if (!isExist('files', normalizePath(rp))) {
        result.files.push(normalizePath(rp))
      }
    }
  })
  return result
}

export function compare(before: Result, after: Result) {
  const add = new Set()
  after.files.forEach(a => {
    if (!before.files.includes(a)) add.add(a) 
  })
  return {
    count: add.size
  }
}

export function getInfo(node: Result) {
  const files = node.files

  const info = {}
  let filesCount = 0
  files.forEach(f => {
    const ext = extname(f)
    if (!info[ext]) {
      info[ext] = {
        count: 0,
        proportion: 0
      }
    }
    info[ext].count++
    filesCount++
  })
  for (const key in info) {
    info[key].proportion = (info[key].count / filesCount).toFixed(2)
  }
  return {
    info,
    filesCount
  }
}



interface Structure {
  [key: string]: {
    count: number,
    proportion: string
  }
}



export function structureToArray(structure: Structure) {
  const list = ['.ts', '.js', '.tsx', '.jsx', '.vue', '.css', '.less', '.sass', '.html', '.json']
  const arr: {
    name: string,
    count: number,
    proportion: number
  }[] = []
  for(const key in structure) {
    if (list.includes(key)) {
      arr.push({
        name: key,
        count: structure[key].count,
        proportion: Number(structure[key].proportion)
      })
    } else {
      const exist = arr.find((item) => item.name = 'other')
      if (exist) {
        exist.count += structure[key].count
        exist.proportion += Number(structure[key].proportion)
      } else {
        arr.push({
          name: 'other',
          count: structure[key].count,
          proportion: Number(structure[key].proportion)
        })
      }
    }
  }
  return arr.sort((a: any,b: any) => {
    return b.count - a.count
  })
}



export function createMap(structure: Structure, fileCount: number, styleOption: any) {
  const structureArr = structureToArray(structure)
  let map = `Total number of files: ${colors.underline(fileCount)} \n\n`
  for (const item of structureArr) {
    let str = styleOption.barstyle?styleOption.barstyle:'\u2588'
    for (let i = 0; i < (item.proportion * 100); i++) {
      str += styleOption.barstyle?styleOption.barstyle:'\u2588'
    }
    let name = item.name + ':'

    for (let i = name.length; i < 8; i++) {
      name += " "
    }
    const spaced = styleOption.spaced? '\n': ''

    let info = `${(item.proportion * 100).toFixed(0)}%`
    switch(item.name) {
      case '.ts':
        map += `${colors.blue(`${name}${str}  ${info}`)}\n` + spaced
        break;
      case '.tsx':
        map += `${colors.blue(`${name}${str}  ${info}`)}\n`+ spaced
        break;
      case '.js':
        map += `${colors.yellow(`${name}${str}  ${info}`)}\n`+ spaced
        break
      case '.jsx':
        map += `${colors.yellow(`${name}${str}  ${info}`)}\n`+ spaced
        break
      case '.css':
        map += `${colors.magenta(`${name}${str}  ${info}`)}\n`+ spaced
        break
      case '.less':
        map += `${colors.magenta(`${name}${str}  ${info}`)}\n`+ spaced
        break
      case '.sass':
        map += `${colors.magenta(`${name}${str}  ${info}`)}\n`+ spaced
        break
      case '.vue':
        map += `${colors.green(`${name}${str}  ${info}`)}\n`+ spaced
      break
      case '.json':
        map += `${colors.white(`${name}${str}  ${info}`)}\n`+ spaced
      break
      case '.html':
        map += `${colors.red(`${name}${str}  ${info}`)}\n`+ spaced
      break
      default:
        map += `${colors.dim(`${name}${str}  ${info}`)}\n`+ spaced
    }    
  }
  console.log(map)
}