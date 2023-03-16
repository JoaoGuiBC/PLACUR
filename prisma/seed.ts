import { PrismaClient } from "@prisma/client";

import { courseCategories } from "../src/utils/selectValues";

const prisma = new PrismaClient();

async function main() {
  const createdCourseCategories = await Promise.all(
    courseCategories.map((category) => {
      return prisma.courseCategory.upsert({
        where: { id: category.value },
        update: {},
        create: {
          id: category.value,
          title: category.text,
        },
      });
    })
  );

  console.log({ createdCourseCategories });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
