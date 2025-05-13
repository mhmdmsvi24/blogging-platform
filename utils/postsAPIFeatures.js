export class PostsAPI {
    constructor(reqQuery, DBQuery) {
        this.reqQuery = reqQuery;
        this.DBQuery = DBQuery;
    }

    filter() {
        const queryObj = Object.assign({}, this.reqQuery);
        const excludedFilters = ["page", "sort", "limit", "field"];

        excludedFilters.forEach((el) => {
            delete queryObj[el];
        });

        this.DBQuery = this.DBQuery.find(queryObj);
        return this;
    }

    sort() {
        if (this.reqQuery.sort) {
            const sortby = this.reqQuery.sort.split(",").join(" ");
            this.DBQuery = this.DBQuery.sort(sortby);
        } else {
            this.DBQuery = this.DBQuery.sort("-createdAt");
        }

        return this;
    }

    limitFields() {
        if (this.reqQuery.fields) {
            const fields = this.reqQuery.fields.split(",").join(" ");
            this.DBQuery = this.DBQuery.select(fields);
        } else {
            this.DBQuery = this.DBQuery.select("-__v");
        }

        return this;
    }

    paginate() {
        const page = this.reqQuery.page * 1 || 1;
        const limit = this.reqQuery.limit * 1 || 100;
        const skip = (page - 1) * limit;

        this.DBQuery = this.DBQuery.skip(skip).limit(limit);

        return this;
    }
}
