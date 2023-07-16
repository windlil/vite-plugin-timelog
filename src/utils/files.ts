import fs from 'fs'
import { relative } from 'path'
import { extname } from 'path'
import { normalizePath } from 'vite'

const result: {
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
  return result[name].find((n:string) => n == value)
}

export function mapDir(path: string, bPath?: string): Result {
  if (bPath) basePath = bPath
  const list = fs.readdirSync(path)
  list.forEach((name: string) => {
    if (name == 'node_modules') return 
    const currentPath = path + '/' + name
    const isDir = fs.statSync(currentPath).isDirectory()
    const rp = relative(basePath, currentPath)
    if (isDir && !isExist('dirs', rp)) {
      result.dirs.push(normalizePath(rp))
      mapDir(currentPath)
    } else if (!isDir && !isExist('files', rp)) {
      result.files.push(normalizePath(rp))
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
  console.log(files)
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
}

export function createMap(structure: any) {
  
}