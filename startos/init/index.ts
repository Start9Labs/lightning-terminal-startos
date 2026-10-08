import { sdk } from '../sdk'
import { seedFiles } from './seedFiles'
import { taskSetPassword } from './taskSetPassword'
import { dependencies } from '../dependencies'
import { setInterfaces } from '../interfaces'
import { versionGraph } from '../versions'
import { actions } from '../actions'
import { restoreInit } from '../backups'

export const init = sdk.setupInit(
  restoreInit,
  versionGraph,
  seedFiles,
  setInterfaces,
  actions,
  dependencies,
  taskSetPassword,
)

export const uninit = sdk.setupUninit(versionGraph)
