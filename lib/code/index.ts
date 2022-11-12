import glob from "fast-glob"
import { promises as fs } from "fs"
import hasha from "hasha"
import NodeCache from "node-cache"
import path from "path"
import { VFile } from "vfile"
import * as z from "zod"

const codeCache = new NodeCache()

export interface Source<T> {
  contentPath: string
  basePath: string
  sortBy?: string
  sortOrder?: "asc" | "desc"
  frontMatter: T
}

interface CodeFile {
  filepath: string
  slug: string
  url: string
}

interface CodeFileData {
  content: string
  answer: string
  hash: string
}

export function createSource<T extends z.ZodType>(source: Source<T>) {
  const { contentPath, basePath, sortBy, sortOrder } = source

  async function getCodeFiles() {
    // contentPath = content/snippets
    const files = await glob(`${contentPath}/**/*.{js,ts}`)
    // files: [ 'content/snippets/example.js' ]

    if (!files.length) return []

    return files.map((filepath) => {
      let slug = filepath
        .replace(contentPath, "")
        .replace(/^\/+/, "")
        .replace(new RegExp(path.extname(filepath) + "$"), "")

      slug = slug.replace(/\/?index$/, "")

      return {
        filepath,
        slug,
        url: `${basePath?.replace(/\/$/, "")}/${slug}`,
      }
    })
  }

  async function getFileData(file: CodeFile): Promise<CodeFileData> {
    const content = await fs.readFile(file.filepath, "utf-8")
    const answer = await fs.readFile(
      `${file.filepath.slice(0, -3)}-answer.js`,
      "utf-8"
    )

    const hash = hasha(content.toString())

    const cachedContent = codeCache.get<CodeFileData>(hash)
    if (cachedContent?.hash === hash) {
      return cachedContent
    }

    const fileData = {
      content,
      answer,
      hash,
    }

    codeCache.set(hash, fileData)

    return fileData
  }

  async function getCodeNode(slug: string | string[]) {
    const _slug = Array.isArray(slug) ? slug.join("/") : slug
    console.log("🚀 ~ file: index.ts ~ line 81 ~ getMdxNode ~ _slug", _slug)

    const files = await getCodeFiles()
    console.log("🚀 ~ file: index.ts ~ line 83 ~ getMdxNode ~ files", files)

    if (!files?.length) return null

    const [file] = files.filter((file) => file.slug === _slug)

    if (!file) return null

    const data = await getFileData(file)
    console.log("🚀 ~ file: index.ts ~ line 93 ~ getMdxNode ~ data", data)

    return {
      ...file,
      ...data,
    }
  }

  async function getAllCodeNodes() {
    const files = await getCodeFiles()

    if (!files.length) return []

    const nodes = await Promise.all(
      files.map(async (file) => {
        return await getCodeNode(file.slug)
      })
    )

    return nodes
  }

  return {
    getCodeFiles,
    getFileData,
    getCodeNode,
    getAllCodeNodes,
  }
}
