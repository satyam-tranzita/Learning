import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const adapter = new PrismaMariaDb({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Sat@1234",
  database: "prisma_relations",
  connectionLimit: 5,
});

const prisma = new PrismaClient({
  adapter,
});



async function main() {
  const users = await prisma.user.findMany();

  console.log(users);
}

main()
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });