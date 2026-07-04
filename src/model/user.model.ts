import mongoose, {Schema, Document} from 'mongoose' 


export interface IUser extends Document {
    username: string
    email: string
    password: string
    createdAt: Date;
    updatedAt: Date;
    image: string
}

const userSchema: Schema<IUser> = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
        trim: true,
        lowercase: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email is invalid"],
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: "https://res.cloudinary.com/dxjv0gq1f/image/upload/v1690911685/default-avatar_oq6k7r.png"
    }
},{
    timestamps: true
})

export default mongoose.models.User ||
mongoose.model<IUser>(
    "User",
    userSchema
);
