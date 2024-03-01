import { relative, resolve } from 'pathe'
import { consola } from 'consola'
import { installDependencies, PackageManagerName } from 'nypm'
import { defineCommand } from 'citty'
// import { sharedArguments } from './sharedArguments'
// import { downloadTemplate } from 'giget'
import fs from 'fs-extra'
import path from 'path'
import { createNodeAdapter } from '../modules/createNodeAdapter'

const DEFAULT_TEMPLATE_NAME = 'H3ro'
const DEFAULT_ADAPTER_NAME = 'nodejs'

const init = defineCommand({
  meta: {
    name: 'init',
    description: 'Initialize a new project',
  },
  args: {
    // ...sharedArguments,
    dir: {
      type: 'positional',
      default: '',
      description: 'The directory to initialize the project in',
    },
    template: {
      type: 'string',
      alias: 't',
      description: 'Specify a template to use',
    },
    packageManager: {
      type: 'string',
      alias: 'pm',
      description: 'Specify a package manager to use (npm, pnpm, yarn)',
    },
    adapter: {
      type: 'string',
      alias: 'a',
      description:
        'Specify a list of adapters to use (nodejs, web, plain, bun, deno, cloudflare, netlify)',
    },
  },
  async run({ args }) {
    const { dir, packageManager, template, adapter } = args
    const cwd = resolve(dir || '.')
    console.log('cwd:', cwd)
    const log = consola.info('init')

    // Get the adapter name
    const adapterName = adapter || DEFAULT_ADAPTER_NAME

    if (typeof adapterName !== 'string') {
      consola.error('Invalid adapter name')
      process.exit(1)
    }

    const templateName = template || DEFAULT_TEMPLATE_NAME

    if (typeof templateName !== 'string') {
      consola.error('Invalid template name')
      process.exit(1)
    }

    let templateInfo

    try {
      // Template
        createNodeAdapter({
          packageManager, adapter, template
      })
    } catch (error) {
      consola.error(error)
      process.exit(1)
    }
    // Package manager
    const _packageManagerOpts: PackageManagerName[] = [
      'npm',
      'pnpm',
      'yarn',
      'bun',
    ]
    const packagesArgs = packageManager as PackageManagerName
    const selectedPackageManager = _packageManagerOpts.includes(packagesArgs)
      ? packagesArgs
      : await consola.prompt('Please select a package manager', {
          type: 'select',
          options: _packageManagerOpts,
        })

    try {
      await installDependencies({
        cwd: dir,
        packageManager: {
          name: selectedPackageManager,
          command: selectedPackageManager,
        },
      })
    } catch (error) {
      consola.error(error)
      process.exit(1)
    }
    consola.success('dependencies installed successfully!')

    //TODO: Add support for git init

    //
  },
})

export default init
