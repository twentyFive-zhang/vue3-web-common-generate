import { mkdir, access, appendFile, writeFile, constants, rm } from 'node:fs/promises'
export const getAccess = async (p: string) => {
  try {
    await access(p, constants.X_OK)
    return true
  } catch {
    // console.error(false)
    await mkdir(p, { recursive: true })
    return false
  }
}
