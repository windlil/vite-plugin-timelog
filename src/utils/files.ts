import fs from 'fs'
import { relative } from 'path'
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

export function mapDir(path: string, bPath?: string): Result {
  if (bPath) basePath = bPath
  const list = fs.readdirSync(path)
  list.forEach((name: string) => {
    if (name == 'node_modules') return 
    const currentPath = path + '/' + name
    const isDir = fs.statSync(currentPath).isDirectory()
    const rp = relative(basePath, currentPath)
    if (isDir) {
      result.dirs.push(normalizePath(rp))
      mapDir(currentPath)
    } else {
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
