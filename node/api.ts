// import {  } from 'fs/promises'
import { setTimeout } from 'node:timers/promises'
import { getAccess } from './utils/fs'
import { writeFile, appendFile, readFile, rm } from 'node:fs/promises'
const path = require('node:path')
const { exec } = require('node:child_process')

// exec('curl http://127.0.0.1:4523/export/openapi?projectId=1003929&version=3.1', (e, s) => {
//   console.log(s)
// })

const apiPath = path.resolve(__dirname, '../src/api')

const getApiJson = (url: string): Promise<{ paths: Record<string, any> }> =>
  new Promise((resolve, reject) => {
    exec(`curl ${url}`, (e: string, s: string) => {
      if (e) {
        reject(e)
        return
      }
      // console.log(JSON.parse(s))
      resolve(JSON.parse(s))
    })
  })

const createApi = async ({ paths }) => {
  // const list: { name: string; children?: [] }[] = []
  const map = {}
  // return [
  //   ...Object.entries(paths).map(([key, json]) => {
  //     const keyList = key.split('/')
  //     const [method] = Object.entries(json as Record<string, any>)
  //     if (keyList.length === 1) {
  //       // const [k1, k2, k3] = keyList

  //     }
  //     return [keyList, { method }]
  //   })
  // ]
  for await (const [key, json] of Object.entries(paths).filter(([key]) => key !== '/')) {
    const keyList = key.split('/').filter((item) => !!item)
    // if (key === '/') {
    //   console.log(keyList, keyList.length)
    // }
    const [k1, k2, k3] = keyList
    // console.log(keyList)
    const dirPath = keyList.length === 1 ? `${apiPath}/other` : `${apiPath}/${k1}`
    await getAccess(dirPath)
    const [method] = Object.keys(json as Record<string, any>)

    const filePath = `${dirPath}/${keyList.length === 1 ? 'index.ts' : `${k2}.ts`}`

    try {
      await readFile(filePath)
      await writeApiFile(
        k3 || k1,
        { method, p: filePath, url: key, name: json?.[method].summary },
        false
      )
    } catch {
      await writeApiFile(
        k3 || k1,
        { method, p: filePath, url: key, name: json?.[method].summary },
        true
      )
    }
  }
}

const writeApiFile = async (
  k: string,
  { method, url, p, name }: { method: string; p: string; url: string; name?: string },
  isNew: boolean
) => {
  const type = method === 'get' ? 'params' : 'data'
  // console.log(k, url)
  if (url.includes('/user/userInfo/')) {
    console.log(url, isNew)
  }
  console.log(isNew)
  try {
    if (isNew) {
      console.log('创建:', p)
      await writeFile(
        p,
        `import request from '@/utils/request';

        /**
         * @description ${name}
         */
    export const ${k} = (${type}:Record<string,any>) =>
    request({
      url: "${url}",
      method: "${method}",
      ${type},
    });

    `
      )
    } else {
      console.log('更新:', k)
      await appendFile(
        p,
        `
        /**
 * @description ${name}
 */
      export const ${k} = (${type}:Record<string,any>) =>
    request({
      url: "${url}",
      method: "${method}",
      ${type},
    });

    `
      )
    }
  } catch {
    console.log('error:', url)
  }
}
;(async () => {
  await rm(`${apiPath}`, { recursive: true, force: true })
  const d = await getApiJson('http://127.0.0.1:4523/export/openapi?projectId=1003929&version=3.1')

  await createApi(d)
  // await setTimeout(5000)
  exec('pnpm format', (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`)
      return
    }
    console.log(`stdout: ${stdout}`)
    console.error(`stderr: ${stderr}`)
  })
})()
