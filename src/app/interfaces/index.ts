export interface ApiResponse<T = any> {
  success: boolean
  message: string
  data?: T
  error?: string
}

export interface PaginationQuery {
  page?: string
  limit?: string
  search?: string
  sortBy?: string
  sortOrder?: "asc" | "desc"
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

export interface AuthUser {
  id: string
  email: string
  name: string
  role: string
}

export interface JwtPayload {
  userId: string
  email: string
  role: string
}
