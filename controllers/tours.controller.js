import { readFileSync, writeFile } from "fs";
import path from "path";
import { __dirname } from "../utils/utils.js";

// Tours
const tours = JSON.parse(readFileSync(path.join(__dirname, "data", "tours.json"), "utf-8"))

export function getTours(req, res) {
    res.status(200).json({
        status: "success",
        results: tours.length,
        data: {
            tours
        }
    })
}

export function createTours(req, res) {
    const newTourID = tours.length;
    const newTour = Object.assign({ id: newTourID }, req.body);

    tours.push(newTour);

    writeFile(path.join(__dirname, "data", "tours.json"), JSON.stringify(tours), () => {
        res.status(201).json({
            status: "success",
            data: {
                tour: newTour
            }
        })
    })
}

export function findTour(req, res) {
    const requestdTourID = +req.params.id;
    const isFound = tours.find(tour => tour.id === requestdTourID)

    res.send(isFound ?? "Not Found")
}
