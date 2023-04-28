import { PrismaClient, Prisma } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const admins: Prisma.AdminCreateInput[] = [
  {
    name: 'Cristiano Ronaldo O Lendário',
    email: 'cr7@gmail.com',
    password: '1234qwer',
    is_first_access: false,
    role: { connect: { name: 'Leader' } },
  },
];

const adminRoles: Prisma.AdminRoleCreateInput[] = [
  { name: 'Leader', power_level: 4 },
  { name: 'Co-leader', power_level: 3 },
  { name: 'Elder', power_level: 2 },
  { name: 'Member', power_level: 1 },
];

const reportPriorities: Prisma.ReportPriorityCreateInput[] = [
  {
    name: 'Urgent',
    priority_level: 4,
  },
  {
    name: 'High',
    priority_level: 3,
  },
  {
    name: 'Medium',
    priority_level: 2,
  },
  {
    name: 'Low',
    priority_level: 1,
  },
];

const reportStatuses: Prisma.ReportStatusCreateInput[] = [
  {
    name: 'Open',
  },
  {
    name: 'Closed',
  },
  {
    name: 'Archived',
  },
];

const reportSources: Prisma.ReportSourceCreateInput[] = [
  {
    name: 'E-mail',
  },
  {
    name: 'In-person meeting',
  },
  {
    name: 'Reporting system',
  },
  {
    name: 'Hotline',
  },
  {
    name: 'Phone',
  },
  {
    name: 'Other',
  },
];

const reportCategories: Prisma.ReportCategoryCreateInput[] = [
  {
    name: 'Bullying (Mobbing, Bossing, Staffing, Gossip)',
  },
  {
    name: 'Occupational Health and Safety Concerns',
  },
  {
    name: 'Suspicion of Theft, Corruption or Embezzlement',
  },
  {
    name: 'Physical Aggression',
  },
  {
    name: 'Discrimination (Race, Age, Gender, Sexual Orientation, Religion, etc.)',
  },
  {
    name: 'Consumer Protection and Product or Food Safety',
  },
  {
    name: 'Non-compliance with Company Regulations, Directives, or Ethical Code',
  },
  {
    name: 'Violation of the Law or the Labor Code',
  },
  {
    name: 'Environmental Protection',
  },
  {
    name: 'Damage to the Company (Property or Reputation)',
  },
  {
    name: 'Damage to an Employees Property',
  },
  {
    name: 'Sexual Harassment',
  },
  {
    name: 'Other',
  },
];

async function main() {
  console.log(`Start seeding ...`);

  const hashPassword = await bcrypt.hash(admins[0].password, 10);

  // The creation of roles needs to come first so that an admin can be connected to a already created role
  for (const [index, c] of adminRoles.entries()) {
    await prisma.adminRole.create({
      data: { ...c, id: `${index}` },
    });
  }

  for (const [index, c] of admins.entries()) {
    await prisma.admin.create({
      data: { ...c, password: hashPassword, id: `${index}` },
    });
  }

  for (const [index, c] of reportPriorities.entries()) {
    await prisma.reportPriority.create({
      data: { ...c, id: `${index}` },
    });
  }

  for (const [index, c] of reportStatuses.entries()) {
    await prisma.reportStatus.create({
      data: { ...c, id: `${index}` },
    });
  }

  for (const [index, c] of reportSources.entries()) {
    await prisma.reportSource.create({
      data: { ...c, id: `${index}` },
    });
  }

  for (const [index, c] of reportCategories.entries()) {
    await prisma.reportCategory.create({
      data: { ...c, id: `${index}` },
    });
  }

  console.log(`Seeding finished.`);
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
