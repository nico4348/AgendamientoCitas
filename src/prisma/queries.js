import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

console.log(
	await prisma.paciente.findMany({
		where: { nombre: 'nicolas' },
		select: { nombre: true },
	})
)
