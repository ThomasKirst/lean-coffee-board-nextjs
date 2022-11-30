import { useEffect, useState } from 'react';

import styled from 'styled-components';
import Card from '../components/Card';
import Form from '../components/Form';

export default function Home() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    getQuestions();
  }, []);

  async function getQuestions() {
    const response = await fetch(
      `https://lean-coffee-board-api-nextjs.vercel.app/api/questions`
    );
    const questionList = await response.json();
    setQuestions(questionList);
  }

  async function removeQuestion(id) {
    await fetch(
      `https://lean-coffee-board-api-nextjs.vercel.app/api/questions/${id}`,
      {
        method: 'DELETE',
      }
    );
    getQuestions();
  }

  return (
    <BoardWrapper>
      <CardGrid>
        {questions?.map((question) => {
          return (
            <Card
              key={question.id}
              name={question.name}
              text={question.text}
              onRemoveQuestion={removeQuestion}
              id={question.id}
              onUpdateQuestion={getQuestions}
            />
          );
        })}
      </CardGrid>
      <Form onAddQuestion={getQuestions} />
    </BoardWrapper>
  );
}

const BoardWrapper = styled.section`
  display: grid;
  grid-template-rows: min-content auto 48px;
  height: inherit;
`;

const CardGrid = styled.ul`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  align-content: start;
  margin: 0;
  padding: 20px;
  overflow-y: auto;
`;
