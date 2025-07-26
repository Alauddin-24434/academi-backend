import { AppError } from "../../error/AppError";
import { prisma } from "../../lib/prisma";
import { IAcademicSession } from "./academicSession.interface";
import { CreateAcademicSessionInput } from "./academicSession.schema";

const createAcademicSession = async (
    input: IAcademicSession
) => {

    const isExist = await prisma.academicSession.findUnique({
        where: { name: input.name }
    })
    if (isExist) {
        throw new AppError("Name alredy exist", 400)
    }
    const session = await prisma.academicSession.create({
        data: input,
    });
    return session;
};
const getAllAcademicSessions = async (): Promise<IAcademicSession[]> => {
    return prisma.academicSession.findMany();
};
const getAcademicSessionById = async (id: string): Promise<IAcademicSession | null> => {
    return prisma.academicSession.findUnique({ where: { id } });
};


export const academicSessionService = {
    createAcademicSession,
    getAcademicSessionById,
    getAllAcademicSessions
}