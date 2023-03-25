import { mkdir, access, appendFile, writeFile, constants, rm } from 'node:fs/promises'
import { getAccess } from './utils/fs'
// import path from 'node:path'
// import path from 'node:path'
const path = require('node:path')
const { exec } = require('node:child_process')

console.log(constants)
const srcPath = path.resolve(`${__dirname}`, '../src')
const viewPath = path.resolve(`${__dirname}`, '../src/views')
console.log(viewPath)

// export const getAccess = async (p: string) => {
//   try {
//     await access(p, constants.X_OK)
//     return true
//   } catch {
//     console.error(false)
//     await mkdir(p, { recursive: true })
//     return false
//   }
// }

const routes = {
  pc: {
    home: {
      name: '首页'
    },
    aboutUs: {
      name: '关于我们'
    },
    layout: {
      name: '布局'
    }
  },
  mobile: {
    home: {
      name: '首页'
    },
    space: {
      name: '个人空间'
    },
    detail: {
      name: '帖子详情'
    },
    layout: {
      name: '布局'
    }
  }
}
const upperCase = (k: string) => k?.replace(/^\S/, (s) => s.toUpperCase())
const createTsx = async (k: string, f: string, name: string, p: string) => {
  const [kUpper, fUpper] = [upperCase(k), upperCase(f)]
  const tsxString = `
  import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import './index.less'

const ${kUpper} = defineComponent({
  name: "${fUpper}${kUpper}",
  setup() {
    return () => (
      <div {...{class:'${f}-${k}'}}>
        ${name}
        ${k === 'layout' ? `<RouterView/>` : ''}
      </div>
    )
  }
})

export default ${kUpper}

  `
  const cssString = `
  .${f}-${k}{color:red}
  `
  console.log(p)
  writeFile(`${p}/index.tsx`, tsxString)
  writeFile(`${p}/index.less`, cssString)
}

const createPage = async (p, d, pKey?: string) => {
  if (!pKey) {
    await rm(viewPath, { recursive: true, force: true })
  }
  Object.entries(d).forEach(async ([key, json]) => {
    console.log(key, json)
    await getAccess(`${p}/${key}`)
    if (!Object.keys(json as Record<string, any>).includes('name')) {
      createPage(`${p}/${key}`, json, key)
      // createPage()
      // createTsx('layout', key, '布局', `${key}/layout`)
    } else {
      //@ts-ignore
      createTsx(...[key, pKey, json.name, `${p}/${key}`])
    }
  })
}

const createRoutes = (
  d:
    | Record<string, Record<string, { name: string }>>
    | Record<string, { name: string }>
    | { name: string },
  p?: string
) =>
  Object.entries(d)
    .filter(([k]) => k !== 'layout')
    .map(([k, json]) =>
      !Object.keys(json).includes('name')
        ? {
            path: `/${k}`,
            name: `${p ? upperCase(p) : ''}${upperCase(k)}`,
            component: `'() => import('@/views/${k}/layout')'`,
            redirect: `/${k}/home`,
            children: createRoutes(json, k)
          }
        : {
            path: `${k}`,
            name: `${p ? upperCase(p) : ''}${upperCase(k)}`,
            component: `'() => import('@/views/${p}/${k}')'`
          }
    )
const createRoutesFile = () => {
  writeFile(
    `${srcPath}/router/routes.ts`,
    `export const routes= ${JSON.stringify(createRoutes(routes), null, 4)
      .replace(/'"/g, '')
      .replace(/"'/g, '')}`
  )
}
createRoutesFile()
createPage(`${viewPath}`, { index: { name: 'index' } })
createPage(viewPath, routes)

exec('pnpm format', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`)
    return
  }
  console.log(`stdout: ${stdout}`)
  console.error(`stderr: ${stderr}`)
})

console.log(__dirname)
