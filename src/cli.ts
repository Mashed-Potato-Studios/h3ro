import { defineCommand } from "citty";
import { commands } from "./commands";
import h3roPackageJson from "../package.json" assert {type: 'json'}

export const cli = defineCommand({
    meta: {
        name: h3roPackageJson.name,
        version: h3roPackageJson.version,
        description: h3roPackageJson.description,
    },
    subCommands: commands,
    async setup(context) {
        const command = context.args._[0]
        console.log('Command:', command)
        if (command === 'help') {
            console.log('Help')
            process.exit(0)
        }

    }
})