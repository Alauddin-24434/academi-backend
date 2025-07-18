// src/utils/idGenerator.ts
import { prisma } from "../lib/prisma";

function getPrefix(degree?: string | null): string {
  if (degree && degree.toUpperCase() === "HONOURS") {
    return "HON";
  }
  return "STD";
}

export async function generateStudentId(
  degree?: string | null, 
  session?: string | null
): Promise<string> {
  if (!session) throw new Error("Session is required for studentId generation");
  
  const year = session.split("-")[0]; 
  const prefix = getPrefix(degree);

  const count = await prisma.student.count({
    where: {
      studentId: {
        startsWith: `${prefix}${year}`,
      },
    },
  });

  const serial = (count + 1).toString().padStart(3, "0");

  return `${prefix}${year}-${serial}`;
}
