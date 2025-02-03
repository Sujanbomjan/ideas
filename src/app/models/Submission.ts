import mongoose, { Document, Model, Schema } from 'mongoose';

interface ISubmission extends Document {
  message: string;
  name: string;
}

const submissionSchema: Schema = new Schema({
  message: { type: String, required: true },
  name: { type: String, required: true },
});

const Submission: Model<ISubmission> = mongoose.models.Submission || mongoose.model<ISubmission>('Submission', submissionSchema);

export default Submission;