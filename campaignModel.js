import mongoose from 'mongoose';

const campaignModel = mongoose.Schema({
	title: {type: String},
	content: {type: String},
	user: {type: mongoose.Types.ObjectId, ref: 'User', required: true},
});

export default mongoose.model('campaign', campaignModel);
