const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const profile = await prisma.villageProfile.findFirst();
  if (profile) {
    await prisma.villageProfile.update({
      where: { id: profile.id },
      data: {
        population: "279",
        malePop: "150",
        femalePop: "129",
      }
    });
    console.log("Database updated successfully!");
  } else {
    console.log("Profile not found.");
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
