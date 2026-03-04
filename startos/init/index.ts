import { sdk } from '../sdk'
import { seedFiles } from './seedFiles'
import { taskSetPassword } from './taskSetPassword'
import { setDependencies } from '../dependencies'
import { setInterfaces } from '../interfaces'
import { versionGraph } from '../install/versionGraph'
import { actions } from '../actions'
import { restoreInit } from '../backups'

export const init = sdk.setupInit(
  seedFiles,
  restoreInit,
  versionGraph,
  setInterfaces,
  setDependencies,
  actions,
  taskSetPassword,
)

export const uninit = sdk.setupUninit(versionGraph)
