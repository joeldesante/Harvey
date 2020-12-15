import mongoose, {Document, Schema} from "mongoose";

export interface CourseDocument extends Document {
    name: string,
    role_id: string,
    channel_id: string
}

const CourseSchema: Schema = new Schema({
    name: { type: String, required: true, lowercase: true, unique: true},
    role_id: { type: String, required: true },
    channel_id: { type: String, required: true }
});

export default mongoose.model<CourseDocument>('Course', CourseSchema);