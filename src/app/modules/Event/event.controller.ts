import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { createEventSchema, updateEventSchema } from "./event.schema";
import { eventService } from "./event.service";
import { IEvent } from "./event.interface";

const createEvent = catchAsync(async (req: Request, res: Response) => {
  const validatedData = createEventSchema.parse(req.body);
  const event = await eventService.createEvent(validatedData as IEvent);
  res.status(201).json({ success: true, data: event });
});

const getEvent = catchAsync(async (req: Request, res: Response) => {
  const event = await eventService.getEventById(req.params.id);
  res.status(200).json({ success: true, data: event });
});

const getAllEvents = catchAsync(async (req: Request, res: Response) => {
  const events = await eventService.getAllEvents();
  res.status(200).json({ success: true, data: events });
});

const updateEvent = catchAsync(async (req: Request, res: Response) => {
  const validatedData = updateEventSchema.parse(req.body);
  const updatedEvent = await eventService.updateEventById(req.params.id, validatedData as IEvent);
  res.status(200).json({ success: true, data: updatedEvent });
});

export const eventController = {
  createEvent,
  getEvent,
  getAllEvents,
  updateEvent,
};
