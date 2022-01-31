import mongoose from 'mongoose';

const campaignModel = mongoose.Schema({
	caption: String,
	user: String,
	image: String,
});

export default mongoose.model('campaign', campaignModel);
