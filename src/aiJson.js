import OpenAI from 'openai'

const aiJson = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
})

export async function apiJson(msg) {
	try {
		const hist = [
			{
				role: 'system',
				content: `retorna un json con el siguiente formato: {DDD:[HH:MM,HH:MM,HH:MM]}. 
						Por ejemplo "Lunes, martes, miercoles, jueves, viernes y sabado  9 a 2" 
						retorna:
						{
							lun: [ "09:00", "10:00", "11:00", "12:00", "13:00", "14:00" ],
							mar: [ "09:00", "10:00", "11:00", "12:00", "13:00", "14:00" ],
							mie: [ "09:00", "10:00", "11:00", "12:00", "13:00", "14:00" ],
							jue: [ "09:00", "10:00", "11:00", "12:00", "13:00", "14:00" ],
							vie: [ "09:00", "10:00", "11:00", "12:00", "13:00", "14:00" ],
							sab: [ "09:00", "10:00", "11:00", "12:00", "13:00", "14:00" ],
						}
						
						ejemplo 2 "Lunes, Martes, Miercoles 1 a 5":
						retornar:
						{
							lun: [ "13:00", "14:00", "15:00", "16:00", "17:00" ],
							mar: [ "13:00", "14:00", "15:00", "16:00", "17:00" ],
							mie: [ "13:00", "14:00", "15:00", "16:00", "17:00" ],
						}

						Nota: ignora las tildes (en caso de miercoles: 'mie')
						Importante: Hazlo en formato 24 horas.
						teniendo en cuenta que el horario laboral va desde las 06:00 a las 18:00 de lunes a sabado (ignora los domingos)
						Si el array del horario está vacio no pongas el dia`,
			},
		]

		hist.push({ role: 'user', content: msg })

		const completion = await aiJson.chat.completions.create({
			model: 'gpt-4o-mini',
			messages: hist,
			response_format: { type: 'json_object' },
		})

		let responseJson = completion.choices[0].message.content
		responseJson = JSON.parse(responseJson)
		return responseJson
	} catch (error) {
		console.error('Error en la API de OpenAI:', error.message)
		throw new Error('Hubo un problema al obtener la respuesta de la IA.')
	}
}

const prac = [
	'Sabados de 8 a 11',
	'Sabado de 8 a 12',
	'Lunes, martes y miercoles 12',
	'Sabados de 8 a 11',
	'lunes Martes miercoles jueves y sabados antes de las 4 y sabados de 8 a 11',
	'Lunes desde la 1 o cualquier dia de la semana',
	'Lunes a jueves 10 am a 5 pm',
	'Todos los dias desde las 12 hasta las 5 pm',
	'Lunes a viernes 10 am a 4 pm',
	'Martes 8 a 1',
	'Martes de 2 a 5 sabados',
	'Sabados',
	'Sabados',
	'lunes a viernes de 4 a 6',
	'Lunes, miercoles y viernes de 9 a 2 pm',
	'sabados 9 a 10',
	'Sabados',
	'Sabados 8 y 9',
	'Lunes a jueves 1 a 4',
	'Sabado 8 y 9',
	'Martes a viernes 8 a 12',
	'Martes a viernes 8 a 12',
	'martes y jueves de 1 a 6',
	'martes y jueves de 1 a 6',
	'Sabados 10 a 11',
	'Lunes, martes y miercoles 8 a 12',
	'Sabados 9 y 10',
	'Lunes, Martes, miercoles 1 a 5',
	'Lunes, Martes, miercoles 1 a 5',
	'todos los dias de 4 a 6',
	'lunes a jueves de 1 a 5',
	'Sabados',
	'Sabados',
	'Sabados',
	'Martes, miercoles y jueves de 1 a 5',
	'Sabados',
	'martes, miercoles jueves 1 a 5',
	'sabados',
	'Lunes miercoles 2 a 5',
	'Sabados 8 y 9',
	'SABADOS',
	'SABADOS',
	'Sabados 8 y 9',
	'Sabados 10 a 11 siguiente',
	'Lunes, Martes, Miercoles 1 a 5',
	'Lunes, Martes, Miercoles 1 a 5',
	'Lunes, Martes, Miercoles 1 a 5',
	'Sabados el siguiente',
	'Sabados el siguiente',
	'Lunes, martes, miercoles 1 a 5',
	'Sabados 8 y 9',
	'Sabados',
	'Pendiente',
	'Lunes, martes y miercoles de 1 a 5',
	'Sabados',
	'Lunes, miercoles y jueves de 1 a 5',
	'Lunes, miercoles y jueves de 1 a 5',
	'Jueves 4 y 5',
	'Sabados',
	'Martes y Jueves Mañanas',
	'Sabados 31',
	'entre semana de 1 a 5',
	'Sabado',
	'Martes 8 y 9',
	'Sábado',
	'Sabados',
	'Sabado',
	'Martes',
	'martes y viernes 1 a 5',
	'martes y viernes 1 a 5',
	'lunes a viernes de 3 a 6',
	'Sabados',
	'Martes 1 a 3',
	'Martes 1 a 3',
	'Martes 1 a 3',
	'Miercoles 9 y 10',
]

for (let index = 0; index < 79; index++) {
	const horarioJson = await apiJson(prac[index])
	console.log(horarioJson)
}
