export interface IStaff {
  id: string
  name: string
  phone?: string
  position: string
  title?: string
  department?: string
  qualification?: string
  experience?: number
  specialization?: string
  bio?: string
  achievements?: any
  awards?: number
  officeLocation?: string
  officeHours?: string
  linkedinUrl?: string
  researchUrl?: string
  profileImage?: string
  coverImage?: string
  isActive: boolean
  isFeatured: boolean
  displayOrder?: number
  joinedDate?: Date
  userId: string
  createdAt: Date
  updatedAt: Date
}

export interface ICreateStaffInput {
  name: string
  phone?: string
  position: string
  title?: string
  department?: string
  qualification?: string
  experience?: number
  specialization?: string
  bio?: string
  userId: string
  joinedDate?: Date
}

export interface IUpdateStaffInput {
  name?: string
  phone?: string
  position?: string
  title?: string
  department?: string
  qualification?: string
  experience?: number
  specialization?: string
  bio?: string
  achievements?: any
  awards?: number
  officeLocation?: string
  officeHours?: string
  linkedinUrl?: string
  researchUrl?: string
  profileImage?: string
  coverImage?: string
  isActive?: boolean
  isFeatured?: boolean
  displayOrder?: number
}
