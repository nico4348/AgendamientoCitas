import { addDay, parse, format, sameDay, date } from '@formkit/tempo'

const date1 = new Date()
console.log(typeof date1)
const addDate = addDay(date1, 2)

console.log(addDate, '\n')

const date2 = format(addDate, 'full')
console.log(date2)
