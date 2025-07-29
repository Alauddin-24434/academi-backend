import { AppError } from "../../error/AppError"
import { prisma } from "../../lib/prisma"
import { IEvent } from "./event.interface"


const createEventService = async (payload: IEvent) => {



  // return prisma.event.create({
  //   data: payload,
    
    
  //   include: {
  //     registrations: true,


  //   },
  // })
}

const getAllEventsService = async () => {
  return prisma.event.findMany({
    include: {
      registrations: {
        select: { id: true, status: true },
      },


      _count: {
        select: {
          registrations: true,
        },
      },
    },
    // orderBy: [{ startDate: "asc" }],
  })
}

const getEventByIdService = async (id: string) => {
  const event = await prisma.event.findUnique({
    where: { id },
    include: {
      registrations: {
        include: {
          // Add any additional fields you want to include
        },
      },

    },
  })

  if (!event) {
    throw new AppError(404, "Event not found")
  }

  return event
}



const updateEventService = async (id: string, payload: IEvent) => {
  const existingEvent = await prisma.event.findUnique({
    where: { id },
  })

  if (!existingEvent) {
    throw new AppError(404, "Event not found")
  }

  const updateData: any = { ...payload }

  if (payload.startDate) {
    updateData.startDate = new Date(payload.startDate)
  }
  if (payload.endDate) {
    updateData.endDate = new Date(payload.endDate)
  }
  if (payload.registrationDeadline) {
    updateData.registrationDeadline = new Date(payload.registrationDeadline)
  }



  return prisma.event.update({
    where: { id },
    data: updateData,
    include: {
      registrations: true,
    },
  })
}

const deleteEventService = async (id: string) => {
  const existingEvent = await prisma.event.findUnique({
    where: { id },
  })

  if (!existingEvent) {
    throw new AppError(404, "Event not found")
  }

  return prisma.event.delete({
    where: { id },
  })
}

export const eventService = {
  createEventService,
  getAllEventsService,
  getEventByIdService,
  updateEventService,
  deleteEventService,
}
