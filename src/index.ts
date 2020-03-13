import * as commander from 'commander'

import { oneShot, watch } from './pulls'
import writer from './todo'

commander
  .command('pulls')
  .option('-w, --watch', 'watch mode', true)
  .description("get a list of your coworkers' open pull requests")
  .action(async a => (a.watch ? await watch() : await oneShot()))

commander
  .command('start <endDate>')
  .description('start a sprint')
  .action(endDate => console.log(endDate))

commander
  .command('add <ticketNum>')
  .description('add a to-do to your active sprint')
  .action(writer.addItem)

commander
  .command('finish <ticketNum>')
  .description('finish a to-do to your active sprint')
  .action(writer.deleteItem)

commander
  .command('ls')
  .description('list all pending to-dos')
  .action(writer.listItems)

commander.parse(process.argv)
