import express from "express";
import { getTours, createTours, findTour } from "../controllers/tours.controller.js";

const tourRouter = express.Router();

tourRouter
    .route("/")
    .get(getTours)
    .post(createTours)

tourRouter
    .route("/:id")
    .get(findTour)

export default tourRouter;
