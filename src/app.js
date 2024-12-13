import { Elysia } from 'elysia'
import { swagger } from '@elysiajs/swagger'

new Elysia()
	.use(swagger())

	.post('/login', async ({ request }) => {})
	.get('/main', Usuario)

	.listen(3000)
