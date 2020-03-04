import { oneShot, watch } from './pulls'

const isWatch = flags => flags.includes('--watch') || flags.includes('-w')
const flags = process.argv.filter(i => /^\-/.test(i))

if (!isWatch(flags)) {
  oneShot()
} else {
  watch()
}
