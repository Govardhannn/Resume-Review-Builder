import mongose from "mongoose";

const resumeAnalysisSchema = new mongose.Schema({
    userId:{
        type: mongose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    jobDescription: {
        type: String,
        required: true,
    },
    resumeText: {
        type: String,
    },
    matchScore: {
        type: Number,
        required: true
    },
    missingSkills:{
       type: [String],
       required: true
    },
    suggestions: {
        type: String,
        required: true
    }
},{timestamps: true})

const resumeAnalysisModel = mongose.model('resumeAnalysis',resumeAnalysisSchema);
export default resumeAnalysisModel;