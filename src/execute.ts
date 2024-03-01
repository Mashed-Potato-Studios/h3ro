// import { fileURLToPath } from "node:url";
import { runCommand as cliCommand, runMain as cliMain } from "citty";
import { commands } from "./commands";
import { cli } from "./cli";


export const runCliMain = async () => cliMain(cli)

export async function runCliCommand(
    name: string,
    args: string[] = process.argv.slice(2),
    data: { overrides?: Record<string, any> } = {}
) {
    if (!(name in commands)) {
        throw new Error(`Command ${name} not found`)
    }
    return cliCommand(await commands[name as keyof typeof commands](), {
        rawArgs: args,
        data: {
            overrides: data.overrides || {},
        }
    })
}

