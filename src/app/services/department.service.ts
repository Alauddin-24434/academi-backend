import { IDepartmentCreatePayload } from "../interfaces/department.interface";
import prisma from "../shared/prisma-client";

export const createDepartment = async (payload: IDepartmentCreatePayload) => {
  // const exists = await prisma.department.findFirst({
  //   where: {
  //     universityId: payload.universityId,

  //   },
  // });
  // console.log("exists", exists)

  // if (exists) {
  //   throw new Error("This university already has a department for the selected category.");
  // }


  // যদি না থাকে তাহলে create করো
  const data = await prisma.department.create({
    data: payload
  });
  console.log("data",data)
  return data;

};


export const getDepartmentById = async (id: string) => {
  return prisma.department.findUnique({ where: { id } });
};

export const getAllDepartments = async () => {
  return prisma.department.findMany();
};

export const updateDepartment = async (id: string, data: Partial<IDepartmentCreatePayload>) => {
  return prisma.department.update({ where: { id }, data });
};

export const deleteDepartment = async (id: string) => {
  return prisma.department.delete({ where: { id } });
};