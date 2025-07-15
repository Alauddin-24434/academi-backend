

export interface IUniversityDepartmentCreatePayload {

    universityId: string
    departmentId: string
    seatCapacity: number

}


export interface IGlobalDepartment extends IUniversityDepartmentCreatePayload {
    id: string;
    createdAt: string;
    updatedAt: string;
}
