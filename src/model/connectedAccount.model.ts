import mongoose, {Schema, Document, Types} from 'mongoose'


export interface IConnectedAccount extends Document {
    userId: Types.ObjectId;
    platform: string;
    handle: string;
    connectedAt: Date;
    verified: boolean;
}

const connectedAccountSchema: Schema<IConnectedAccount> = new Schema({
    userId: {
    type:  Schema.Types.ObjectId,
    ref: "User",
    required: true,
    },
    platform: {
        type: String,
        enum:[
        "codeforces"
        ],
        required: true,   
    },
    handle: {
        type: String,
        required: true,
    },
    connectedAt: {
        type: Date,
        default: Date.now,
    },
    verified: {
        type: Boolean,
        default: false
    }
})

connectedAccountSchema.index(
    {
        platform: 1,
        handle: 1,
    },
    {
        unique: true,
    }
);


export default mongoose.models.ConnectedAccount ||
mongoose.model<IConnectedAccount>(
    "ConnectedAccount",
    connectedAccountSchema
);