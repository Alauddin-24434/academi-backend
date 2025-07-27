import { prisma } from "../../lib/prisma";
import { AppError } from "../../error/AppError";
import { IEvent } from "./event.interface";
const createEvent = async (data: IEvent) => {
    return prisma.event.create({
        data: {
            name: data.name,
            description: data.description,
            date: new Date(data.date),
            images: data.images || [],

        },
    });
};

const getEventById = async (id: string) => {
    const event = await prisma.event.findUnique({
        where: { id },
    });
    if (!event) throw new AppError("Event not found", 404);
    return event;
};

const getAllEvents = async () => {
    return prisma.event.findMany();
};

const updateEventById = async (id: string, data: Partial<IEvent>) => {
    const event = await prisma.event.findUnique({ where: { id } });
    if (!event) throw new AppError("Event not found", 404);

    return prisma.event.update({
        where: { id },
        data: {
            name: data.name,
            description: data.description,
            images: data.images || [],
        }
    });
};

export const eventService = {
    createEvent,
    getEventById,
    getAllEvents,
    updateEventById,
};
