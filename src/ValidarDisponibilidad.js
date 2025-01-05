import { addDay, parse, format, hourStart, hourEnd, date } from '@formkit/tempo'

const date1 = new Date()
console.log(date1)
const addDate = addDay(date1, 2)

console.log(addDate, '\n')

const hourTerminada = hourStart(addDate)
const date2 = format(hourTerminada, { date: 'full', time: 'full' })
console.log(date2)
