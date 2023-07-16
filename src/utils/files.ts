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
  return info
}



interface Structure {
  [key: string]: {
    count: number,
    proportion: string
  }
}



export function structureToArray(structure: Structure) {
  const arr: {
    name: string,
    count: number,
    proportion: number
  }[] = []
  for(const key in structure) {
    arr.push({
      name: key,
      count: structure[key].count,
      proportion: Number(structure[key].proportion)
    })
  }
  return arr.sort((a: any,b: any) => {
    return b.count - a.count
  })
}

export function createMap(structure: Structure) {
  const structureArr = structureToArray(structure)
  let map = ''
  for (const item of structureArr) {
    console.log(`${colors.magenta(item.name)}`)
  }
}