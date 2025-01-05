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
						
						Nota: ignora las tildes (en caso de miercoles: 'mie')`,
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

for (let index = 0; index < 10; index++) {
	const horarioJson = await apiJson('Lunes, miercoles, sabado  12 a 3 ')
	console.log(horarioJson)
	console.log(horarioJson.mie)
}
