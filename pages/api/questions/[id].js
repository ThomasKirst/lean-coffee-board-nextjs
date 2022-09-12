import dbConnect from '../../../dbConnect';
import Question from '../../../models/Question';

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === 'DELETE') {
    const id = request.query.id;

    await Question.findByIdAndDelete(id);

    response.status(200).json({ message: 'question deleted' });
  }
}
