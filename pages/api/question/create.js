import dbConnect from "../../../dbConnect";
import Question from "../../../models/Question";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "POST") {
    const data = JSON.parse(request.body);

    await Question.create(data);

    response.status(200).json({
      message: "question created",
    });
  }
}
