import glob from "fast-glob"
import { promises as fs } from "fs"
import hasha from "hasha"
import NodeCache from "node-cache"
import path from "path"
import { VFile } from "vfile"
import * as z from "zod"

const mdxCache = new NodeCache()

export interface Source<T> {
  contentPath: string
  basePath: string
  sortBy?: string
  sortOrder?: "asc" | "desc"
  frontMatter: T
}

interface MdxFile {
  filepath: string
  slug: string
  url: string
}

interface MdxFileData<TFrontmatter> {
  raw: string
  hash: string
  content: string
}

export function createSource<T extends z.ZodType>(source: Source<T>) {
  const { contentPath, basePath, sortBy, sortOrder } = source

  async function getMdxFiles() {
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

  async function getFileData(file: MdxFile): Promise<MdxFileData<z.infer<T>>> {
    const raw = await fs.readFile(file.filepath, "utf-8")

    const hash = hasha(raw.toString())

    const cachedContent = mdxCache.get<MdxFileData<z.infer<T>>>(hash)
    if (cachedContent?.hash === hash) {
      return cachedContent
    }

    const vfile = new VFile({ value: raw })
    const fileData = {
      raw,
      hash,
      content: String(vfile.value),
    }

    mdxCache.set(hash, fileData)

    return fileData
  }

  async function getMdxNode(slug: string | string[]) {
    const _slug = Array.isArray(slug) ? slug.join("/") : slug
    console.log("🚀 ~ file: index.ts ~ line 81 ~ getMdxNode ~ _slug", _slug)

    const files = await getMdxFiles()
    console.log("🚀 ~ file: index.ts ~ line 83 ~ getMdxNode ~ files", files)

    if (!files?.length) return null

    const [file] = files.filter((file) => file.slug === _slug)

    if (!file) return null

    const data = await getFileData(file)

    return {
      ...file,
      ...data,
    }
  }

  async function getAllMdxNodes() {
    const files = await getMdxFiles()

    if (!files.length) return []

    const nodes = await Promise.all(
      files.map(async (file) => {
        return await getMdxNode(file.slug)
      })
    )

    return nodes
  }

  return {
    getMdxFiles,
    getFileData,
    getMdxNode,
    getAllMdxNodes,
  }
}
