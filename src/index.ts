import * as commander from 'commander'

import { oneShot, watch } from './pulls'

commander
  .command('pulls')
  .option('-w, --watch', 'watch mode')
  .description("get a list of your coworkers' open pull requests")
  .action(async a => (a.watch ? await watch() : await oneShot()))

commander
  .command('start <endDate>')
  .description('start a sprint')
  .action(endDate => console.log(endDate))

commander
  .command('todo <ticketNum>')
  .description('add a to-do to your active sprint')
  .action(ticketNum => console.log(ticketNum))

commander.parse(process.argv)
