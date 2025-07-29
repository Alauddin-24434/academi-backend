import type { Request, Response } from "express"
import { catchAsyncHandler } from "../../utils/catchAsyncHandler"
import { sendResponse } from "../../utils/sendResponse"
import { eventService } from "./event.service"

const createEvent = catchAsyncHandler(async (req: Request, res: Response) => {
  console.log(req.body)
  const result = await eventService.createEventService(req.body)
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Event created successfully",
    data: result,
  })
})

const getAllEvents = catchAsyncHandler(async (req: Request, res: Response) => {
  const result = await eventService.getAllEventsService()
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Events retrieved successfully",
    data: result,
  })
})

const getEventById = catchAsyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await eventService.getEventByIdService(id)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Event retrieved successfully",
    data: result,
  })
})



const updateEvent = catchAsyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await eventService.updateEventService(id, req.body)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Event updated successfully",
    data: result,
  })
})

const deleteEvent = catchAsyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params
  await eventService.deleteEventService(id)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Event deleted successfully",
  })
})

export const eventController = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
}
