import { useState } from 'react';

import styled from 'styled-components';
import Card from '../components/Card';
import Form from '../components/Form';
import { getAllQuestions } from '../services/questionsService';

export async function getServerSideProps() {
  const questions = await getAllQuestions();

  return {
    props: {
      questions: questions,
    },
  };
}

export default function Home({ questions }) {
  const [questionList, setQuestionList] = useState(questions);

  async function removeQuestion(id) {
    await fetch(`api/question/${id}`, {
      method: 'DELETE',
    });
    getQuestions();
  }

  async function getQuestions() {
    const response = await fetch('api/question/', {
      method: 'GET',
    });
    const newQuestionList = await response.json();
    setQuestionList(newQuestionList);
  }

  return (
    <BoardWrapper>
      <CardGrid>
        <Card name="Niklas" text="Async/await oder .then?" />
        <Card name="Lene" text="Was sind ServerSideProps?" />
        <Card name="Merle" text="Wo ist mein Fahrrad?" />
        <Card name="Thomas" text="Können wir Tailwind machen?" />
        {questionList.map((question) => {
          return (
            <Card
              key={question.id}
              name={question.name}
              text={question.text}
              onRemoveQuestion={removeQuestion}
              id={question.id}
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
