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

  async function handleSubmit(event) {
    event.preventDefault();

    const formElements = event.target.elements;

    const updatedQuestion = {
      text: formElements.name.value,
      name: formElements.text.value
    };

    await fetch(
      process.env.NEXT_PUBLIC_API_SERVER_URL + `api/questions/${id}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedQuestion),
      }
    );

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
            <Input
              aria-label="Your question"
              name="text"
              id="text"
              type="text"
              defaultValue={text}
            ></Input>
            <Input
              aria-label="Author"
              name="name"
              id="name"
              type="text"
              defaultValue={name}
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
