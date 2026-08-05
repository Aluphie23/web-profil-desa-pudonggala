const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const profile = await prisma.villageProfile.findFirst();
  if (profile) {
    await prisma.villageProfile.update({
      where: { id: profile.id },
      data: {
        households: "88"
      }
    });
    console.log("Database updated: households set to 88.");
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
