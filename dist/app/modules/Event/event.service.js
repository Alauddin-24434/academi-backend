"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventService = void 0;
const AppError_1 = require("../../error/AppError");
const prisma_1 = require("../../lib/prisma");
const createEventService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // return prisma.event.create({
    //   data: payload,
    //   include: {
    //     registrations: true,
    //   },
    // })
});
const getAllEventsService = () => __awaiter(void 0, void 0, void 0, function* () {
    return prisma_1.prisma.event.findMany({
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
    });
});
const getEventByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const event = yield prisma_1.prisma.event.findUnique({
        where: { id },
        include: {
            registrations: {
                include: {
                // Add any additional fields you want to include
                },
            },
        },
    });
    if (!event) {
        throw new AppError_1.AppError(404, "Event not found");
    }
    return event;
});
const updateEventService = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingEvent = yield prisma_1.prisma.event.findUnique({
        where: { id },
    });
    if (!existingEvent) {
        throw new AppError_1.AppError(404, "Event not found");
    }
    const updateData = Object.assign({}, payload);
    if (payload.startDate) {
        updateData.startDate = new Date(payload.startDate);
    }
    if (payload.endDate) {
        updateData.endDate = new Date(payload.endDate);
    }
    if (payload.registrationDeadline) {
        updateData.registrationDeadline = new Date(payload.registrationDeadline);
    }
    return prisma_1.prisma.event.update({
        where: { id },
        data: updateData,
        include: {
            registrations: true,
        },
    });
});
const deleteEventService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existingEvent = yield prisma_1.prisma.event.findUnique({
        where: { id },
    });
    if (!existingEvent) {
        throw new AppError_1.AppError(404, "Event not found");
    }
    return prisma_1.prisma.event.delete({
        where: { id },
    });
});
exports.eventService = {
    createEventService,
    getAllEventsService,
    getEventByIdService,
    updateEventService,
    deleteEventService,
};
