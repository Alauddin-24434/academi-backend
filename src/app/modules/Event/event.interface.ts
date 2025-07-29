export interface IEvent {
  name: string
  description?: string
  startDate?: string;
  endDate?: string;
  startTime?: string
  endTime?: string
  location: string
  venue?: string
  address?: string
  mapUrl?: string
  status: "DRAFT" | "UPCOMING" | "ONGOING" | "COMPLETED" | "CANCELLED" | "POSTPONED"
  category: string
  type: "PHYSICAL" | "VIRTUAL" | "HYBRID"
  maxAttendees?: number
  expectedAttendees?: number
  registrationRequired: boolean
  registrationDeadline?: string
  registrationFee?: number
  galleryImages?: string[];
  bannerImage?: string
  tags?: any
  contactEmail?: string
  contactPhone?: string
  organizerName?: string

  createdAt: Date
  updatedAt: Date
}




