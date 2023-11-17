const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    const categories = [
      "Computer Science",
      "Music",
      "Fitness",
      "Photography",
      "Accounting",
      "Enginneering",
      "Filming",
      "Technology",
    ];

    for (let category of categories) {
      await database.category.create({
        data: {
          name: category,
        },
      });
    }

    console.log("success");
  } catch (err) {
    console.log("ERROR seeding catageries in database", err);
  } finally {
    await database.$disconnect();
  }
}

main();
