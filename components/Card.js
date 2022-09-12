import styled from 'styled-components';
import { useState } from 'react';

import { RiDeleteBinLine } from 'react-icons/ri';
import { AiOutlineSave } from 'react-icons/ai';
import { AiOutlineEdit } from 'react-icons/ai';

export default function Card({
  name,
  text,
  onRemoveQuestion,
  id,
  onUpdateQuestion,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [questionText, setQuestionText] = useState(text);
  const [questionName, setQuestionName] = useState(name);

  async function handleSubmit(event) {
    event.preventDefault();

    const updatedQuestion = {
      text: questionText,
      name: questionName,
    };

    await fetch(`api/questions/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedQuestion),
    });

    onUpdateQuestion();

    setIsEditing(false);
  }

  return (
    <CardWrapper>
      <IconWrapper>
        <RiDeleteBinLine onClick={() => onRemoveQuestion(id)} />
      </IconWrapper>
      {!isEditing && (
        <>
          <p>{text}</p>
          <IconWrapper>
            <AiOutlineEdit onClick={() => setIsEditing(true)} />
          </IconWrapper>
          <Name>{name}</Name>
        </>
      )}
      {isEditing && (
        <>
          <Form onSubmit={handleSubmit}>
            <label htmlFor="text"></label>
            <Input
              name="text"
              id="text"
              type="text"
              value={questionText}
              onChange={(event) => {
                setQuestionText(event.target.value);
              }}
            ></Input>
            <label htmlFor="name"></label>
            <Input
              name="name"
              id="name"
              type="text"
              value={questionName}
              onChange={(event) => {
                setQuestionName(event.target.value);
              }}
            ></Input>
            <IconWrapper>
              <AiOutlineSave />
            </IconWrapper>
          </Form>
        </>
      )}
    </CardWrapper>
  );
}

const CardWrapper = styled.li`
  display: grid;
  margin: 0 10px 0 10px;
  align-content: space-between;
  border-radius: 7px;
  padding: 20px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
`;

const Name = styled.div`
  text-transform: uppercase;
  font-size: 0.8em;
  margin-top: 10px;
  color: darkslategray;
`;

const IconWrapper = styled.button`
  display: flex;
  align-items: center;
  width: 2rem;
  color: #fe4b13;
  background: transparent;
  border: none;
  justify-self: end;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Input = styled.input`
  color: black;
  padding: 0.2rem;
  width: calc(100% - 2rem);
`;
