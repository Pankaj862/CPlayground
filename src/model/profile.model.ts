import mongoose, {Schema, Document, Types} from 'mongoose'

export interface IprofileSchema extends Document {
    
    connectedAccountId: Types.ObjectId;

    handle: string;

    rating: number;
    maxRating: number;

    rank: string;
    maxRank: string;

    avatar: string;
    titlePhoto: string;

    country?: string;
    city?: string;
    organization?: string;

    contribution: number;
    friendOfCount: number;

    lastSynced: Date;
}

const profileSchema: Schema<IprofileSchema> = new Schema({
    connectedAccountId: {
        type: Schema.Types.ObjectId,
        ref: "ConnectedAccount",
        required: true,
        unique: true,
    },

    handle: {
        type: String,
        required: true,
    },

    rating: {
        type: Number,
        default: 0,
    },

    maxRating: {
        type: Number,
        default: 0,
    },

    rank: {
        type: String,
        default: "",
    },

    maxRank: {
        type: String,
        default: "",
    },

    avatar: {
        type: String,
        default: "",
    },

    titlePhoto: {
        type: String,
        default: "",
    },

    country: {
        type: String,
    },

    city: {
        type: String,
    },

    organization: {
        type: String,
    },

    contribution: {
        type: Number,
        default: 0,
    },

    friendOfCount: {
        type: Number,
        default: 0,
    },

    lastSynced: {
        type: Date,
        default: Date.now,
    },
});

profileSchema.index(
    { connectedAccountId: 1 },
    { unique: true }
);

export default mongoose.models.Profile ||
mongoose.model<IprofileSchema>(
    "Profile",
    profileSchema
);