import { getAllQuestions } from '../../../services/questionsService';

export default async function handler(request, response) {
  if (request.method === 'GET') {
    const questions = await getAllQuestions();
    return response.status(200).json(questions);
  }
}
