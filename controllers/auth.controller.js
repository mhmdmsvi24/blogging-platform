import { UserModel } from "../models/users.model";
import mongoose from "mongoose";

export async function sighup(res, req, next) {
    const newUser = UserModel.create(res.body);

    res.status(201).json({
        status: "success",
        data: {
            user: newUser,
        }
    })
}
