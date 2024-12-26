import { Elysia } from 'elysia'
import { swagger } from '@elysiajs/swagger'

// Configuración de la app
const app = new Elysia()
	.use(swagger())

	//un get que devuelve un string
	.get('/', 'hola mundo')
	.listen(3005)

const serverUrl = 'http://localhost:3005'
console.log(`🦊 Server running at ${serverUrl}`)
app.routes.forEach((route) => {
	console.log(` ${route.method.toUpperCase()} ${serverUrl}${route.path}`)
})
