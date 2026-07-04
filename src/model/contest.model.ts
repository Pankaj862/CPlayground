import mongoose, {Schema, Document, Types} from 'mongoose'

export interface Icontest extends Document {
    connectedAccountId: Types.ObjectId,
    contestId: number,
    contestName: string,
    rank: number,
    oldRating: number,
    newRating: number,
    delta: number,
    contestDate: Date
}

const contestSchema: Schema<Icontest> = new Schema({
    connectedAccountId: {
    type:  Schema.Types.ObjectId,
    ref: "ConnectedAccount",
    required: true,
    },
    contestId: {
        type: Number,
        required: true,
    },
    contestName: {
        type: String,
        required: true,
    },
    rank: {
        type: Number,
        required: true,
    },
    oldRating: {
        type: Number,
        required: true,
    },
    newRating: {
        type: Number,
        required: true,
    },
    delta: {
        type: Number,
        required: true,
    },
    contestDate: {
        type: Date,
        required: true,
    }

})

contestSchema.index({connectedAccountId:1, contestId:1}, {unique:true}) //user can have one entry for a contest

export default mongoose.models.Contest ||
mongoose.model<Icontest>(
    "Contest",
    contestSchema
);