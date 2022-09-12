import dbConnect from '../../../dbConnect';
import Question from '../../../models/Question';

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === 'POST') {
    const data = request.body;

    await Question.create(data);

    response.status(201).json({ newCard: data });
  }
}
