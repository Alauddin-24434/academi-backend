

import { AppError } from "../error/appError";
import { IUniversityDepartmentCreatePayload } from "../interfaces/universityDepartment.interface";
import prisma from "../shared/prisma-client";

const createDepartment = async (payload: IUniversityDepartmentCreatePayload) => {

    const isExist = await prisma.universityDepartment.findUnique({
        where: {
            universityId_departmentId: {
                universityId: payload.universityId,
                departmentId: payload.departmentId
            }
        }
    })

    if (isExist) {
        throw new AppError(400, "This university and department combination already exists.", "UniversityDepartmentAlreadyExistsError");

    }

    const data = await prisma.universityDepartment.create({
        data: {

            universityId: payload.universityId,
            departmentId: payload.departmentId,
            seatCapacity: Number(payload.seatCapacity),

        },
    });

    return data;
};



const getDepartmentById = async (id: string) => {
    return prisma.universityDepartment.findUnique({ where: { id } });
};

const getAllDepartments = async () => {
    return prisma.universityDepartment.findMany({
        include: {
            university: true,
            department: true,
        },
    });
};

const updateDepartment = async (id: string, data: Partial<IUniversityDepartmentCreatePayload>) => {
    return prisma.universityDepartment.update({ where: { id }, data });
};

const deleteDepartment = async (id: string) => {
    return prisma.universityDepartment.delete({ where: { id } });
};

export const departmentServices = {
    createDepartment,
    getAllDepartments,
    getDepartmentById,
    updateDepartment,
    deleteDepartment
}