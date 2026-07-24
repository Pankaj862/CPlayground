import mongoose, {Schema, Document, Types} from 'mongoose'


export interface IsubmissionSchema extends Document {
    connectedAccountId: Types.ObjectId
    contestId: number
    problemId: string
    problemName: string
    platform: string
    verdict: string
    programmingLanguage: string
    rating?: number
    tags: string[]
    solvedAt: Date
}

const submissionSchema: Schema<IsubmissionSchema> = new Schema({
     connectedAccountId: {
        type: Schema.Types.ObjectId,
        ref: "ConnectedAccount",
        required: true
     },
     contestId: {
        type: Number,
        required: true
     },
     problemId: {
        type: String,
        required: true
     },
     problemName: {
        type: String,
        required: true
     },
     platform: {
        type: String,
        required: true
     },
     verdict: {
        type: String,
        enum:[
        "OK",
        "WRONG_ANSWER",
        "TIME_LIMIT_EXCEEDED",
        "MEMORY_LIMIT_EXCEEDED",
        "RUNTIME_ERROR",
        "COMPILATION_ERROR"
        ],
        required: true
     },
     programmingLanguage: {
        type: String,
        required: true
     },
     rating: {
        type: Number,
        default: null
     },
     tags: {
        type: [String],
        default: []
     },
     solvedAt: {
        type: Date,
        required: true
     },
     
},{
   timestamps:true
})

submissionSchema.index(
{
    connectedAccountId:1,

    problemId:1,

    solvedAt:1
},
{
    unique:true
})

export default mongoose.models.Submission ||
mongoose.model<IsubmissionSchema>(
    "Submission",
    submissionSchema
);