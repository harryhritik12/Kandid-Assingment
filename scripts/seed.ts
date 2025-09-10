// scripts/seed.ts
import "dotenv/config";
import { faker } from "@faker-js/faker";
import { db } from "@/lib/db";
import { campaigns, leads } from "@/drizzle/schema";

async function main() {
  console.log("🌱 Seeding database...");

  // Step 1: Insert campaigns
  const campaignData = [
    { id: faker.string.uuid(), name: "Gynoveda" },
    { id: faker.string.uuid(), name: "Digi Sidekick" },
    { id: faker.string.uuid(), name: "The Skin Story" },
    { id: faker.string.uuid(), name: "PokoNut" },
    { id: faker.string.uuid(), name: "Re’equil" },
  ];

  await db.insert(campaigns).values(campaignData);
  console.log("✅ Campaigns seeded!");

  // Step 2: Insert leads referencing campaigns
  const fakeLeads = Array.from({ length: 50 }).map(() => {
    const randomCampaign = faker.helpers.arrayElement(campaignData);
    return {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      company: faker.company.name(),
      status: faker.helpers.arrayElement([
        "Pending Approval",
        "Sent 7 mins ago",
        "Do Not Contact",
        "Followup 10 mins ago",
      ]),
      campaignId: randomCampaign.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  });

  await db.insert(leads).values(fakeLeads);
  console.log("✅ Leads seeded!");

  console.log("🎉 Seeding complete!");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
