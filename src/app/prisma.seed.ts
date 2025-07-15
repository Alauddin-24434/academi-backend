// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import { IGlobalDepartment } from './interfaces/globalDepartment.interface';

const prisma = new PrismaClient();

const departments = {
  SCIENCE: [
    { code: "CSE", name: "Computer Science & Engineering" },
    { code: "EEE", name: "Electrical & Electronic Engineering" },
    { code: "PHY", name: "Physics" },
    { code: "MAT", name: "Mathematics" },
    { code: "CHE", name: "Chemistry" },
    { code: "STA", name: "Statistics" },
    { code: "BIO", name: "Biology" },
    { code: "GEO", name: "Geography & Environment" },
    { code: "MIC", name: "Microbiology" },
    { code: "GNS", name: "Genetic Engineering" },
    { code: "PHR", name: "Pharmacy" },
    { code: "NUR", name: "Nursing" },
    { code: "MED", name: "Medical Science" },
    { code: "ARC", name: "Architecture" },
    { code: "CIV", name: "Civil Engineering" },
    { code: "MEC", name: "Mechanical Engineering" },
    { code: "ENV", name: "Environmental Science" },
  ],
  HUMANITIES: [
    { code: "ENG", name: "English" },
    { code: "BAN", name: "Bangla" },
    { code: "HIS", name: "History" },
    { code: "PHI", name: "Philosophy" },
    { code: "ISL", name: "Islamic Studies" },
    { code: "PAK", name: "Political Science" },
    { code: "SOC", name: "Sociology" },
    { code: "ANT", name: "Anthropology" },
    { code: "IR", name: "International Relations" },
    { code: "WOM", name: "Women & Gender Studies" },
    { code: "JRN", name: "Journalism & Media Studies" },
    { code: "LIN", name: "Linguistics" },
    { code: "THE", name: "Theatre and Performance Studies" },
    { code: "MUS", name: "Music" },
    { code: "FINE", name: "Fine Arts" },
  ],
  COMMERCE: [
    { code: "BBA", name: "Business Administration" },
    { code: "ACC", name: "Accounting" },
    { code: "FIN", name: "Finance" },
    { code: "MKT", name: "Marketing" },
    { code: "MGT", name: "Management" },
    { code: "ECO", name: "Economics" },
    { code: "IB", name: "International Business" },
    { code: "HRM", name: "Human Resource Management" },
    { code: "TAX", name: "Taxation" },
    { code: "BANF", name: "Banking & Finance" },
    { code: "ACT", name: "Actuarial Science" },
    { code: "HOS", name: "Hospitality & Tourism Management" },
  ],
};

async function main() {
  const allDepartments:IGlobalDepartment[] = [];

  for (const category in departments) {
    const items = departments[category as keyof typeof departments];
    for (const item of items) {
      allDepartments.push({
        code: item.code,
        name: item.name,
        category,
      });
    }
  }

  await prisma.department.createMany({
    data: allDepartments,
    skipDuplicates: true,
  });

  console.log("✅ Departments inserted successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
