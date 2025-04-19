import { readFileSync, writeFileSync } from "fs";

export default class DataBase {
    constructor(path) {
        this.path = path;

        this.db = this.read_db;
        this.latest_user_id = this.get_latest_user;

        // the next added user must use this id
        this.available_user_id = this.latest_user_id + 1;
    }

    // returns the latest user id
    get get_latest_user() {
        return Number(this.db[this.db.length - 1].id);
    }

    // Returns the latest version of the database
    get read_db() {
        const file = readFileSync(this.path, "utf-8");
        return JSON.parse(file);
    }

    // checks if the user alredy exists
    is_user(username) {
        for (let i = 0; i < this.db.length; i += 1) {
            if (this.db[i].username == username) {
                return true;
            }
        }

        return false;
    }

    // Adds a user to the db
    add_user(userdata) {
        // check if the user exists
        if (this.is_user(userdata.username)) return ["User Already Exists!", false];

        // if possible add the user to the db
        this.db.push(userdata);

        try {
            writeFileSync(this.path, JSON.stringify(this.db));
        } catch (error) {
            return [`Failed to write: ${error}`, false];
        }

        return ["Operation Success", true];
    }
}
