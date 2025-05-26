import mongoose from "mongoose";

const PostsSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: [true, "post title is required"],
			trim: true,
			unique: true,
			maxLength: [50, "post title can not exceed 50 characters"],
			minLength: [10, "post title must be minimum 10 characters"],
		},
		description: {
			type: String,
			required: [true, "post description is required"],
			trim: true,
		},
		content: {
			type: String,
			trim: true,
			required: [true, "post must can not be without any contents"],
			minLength: [50, "post content length must be minimum 50 characters"],
		},
		likes: {
			type: Number,
			default: 0,
		},
		deleted: {
			type: Boolean,
			default: false,
			select: false,
		},
	},
	{
		timestamps: true,
	}
);

PostsSchema.pre(/^find/, function (next) {
	this.find({ deleted: { $ne: true } });
	this.start = Date.now();
	next();
});

PostsSchema.post(/^find/, function (doc, next) {
	// eslint-disable-next-line no-console
	console.log("Query Took: ", Date.now() - this.start, "ms");
	delete doc.start;
	next();
});

export const PostModel = mongoose.model("Post", PostsSchema);
