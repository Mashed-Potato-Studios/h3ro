import { execSync } from "child_process";
import { fileURLToPath} from "node:url";
import fs from "fs-extra";
import { join, resolve, relative } from "pathe"
import consola from "consola"

interface IOptions {
    template: string
    adapter: string
    packageManager: string
}

type getAdapter = (options: IOptions) => Promise<{ dir: string }>
type createNodeAdapter = (options: IOptions) => Promise<void>

declare const getAdapter: getAdapter


const getAdapterPath = async (options: IOptions): Promise<string> => {
    const { template, adapter } = options
    const adapterDir = '../templates/adapters'
    if (typeof template !== 'string') {
        throw new Error('Invalid name')
    }

    const currentPath = fileURLToPath(import.meta.url)
    const adapterPath = resolve(currentPath, adapterDir, adapter)
    console.log('adapterPath:', adapterPath)
    return adapterPath

}

export async function createNodeAdapter(options: IOptions): Promise<void> {
    try {
        const { template, adapter, packageManager } = options

    if (typeof template !== 'string') {
        throw new Error('Invalid name')
    }

    // Create the directory
    const directory = join(process.cwd(), template)
    fs.mkdirSync(directory)
    execSync(`cd ${directory} && ${packageManager} init`)

    // Find the path to the adapter in the template folder
    // const currentPath = import.meta.url
    //
    // // Find the adapter in the template folder from the current
    //
    // const adapterPath = relative(currentPath, adapter)
    // console.log('adapterPath:', adapterPath)
    const adapterPath = await getAdapterPath(options)

    // Copy the adapter to the directory
    await fs.copy(adapterPath, directory)
    consola.success('Adapter created successfully')
    // Find the path to the template in the template folder
    }    catch (err) {
        console.error(err)
        consola.error(err)
    }

}
