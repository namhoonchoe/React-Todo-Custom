import { styled } from "styled-components";
import AddIcon from "./Icons/AddIcon";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { categoryState } from "../atoms";

import DismissIcon from "./Icons/DismissIcon";
import { useState } from "react";

const AddLayout = styled.section`
  display: flex;
  flex-shrink: 0;
  flex-grow: 0;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  border-radius: 12px;
  overflow: hidden;
  width: 18rem;
  min-height: 9rem;
  padding: 1rem 0.5rem;
  background-color: black;
`;

const Form = styled.form`
  width: 100%;
  gap: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
`;

const FormInput = styled.input`
  width: 100%;
  height: 3.5rem;
  background-color: #1f2937;
  border-color: transparent;
  border-radius: 12px;
  padding-left: 8px;
  color: #fff;
  &:focus {
    border: 2px;
    border-color: #7ca3f8;
    outline: none;
  }
`;

const AddCategory = styled.section`
  display: flex;
  flex-shrink: 0;
  flex-grow: 0;
  align-items: center;
  justify-content: flex-start;
  background-color: #0d1117;
  border-radius: 12px;
  width: 100%;
  max-width: 18rem;
  min-height: 3rem;
  gap: 0.5rem;
  padding-left: 1rem;

  color: #fff;
  text-transform: capitalize;
`;

const ButtonContainer = styled.button`
  outline: #fff;
  border-radius: 0.5rem;
  border-color: transparent;
  background-color: transparent;
  width: 1.5rem;
  height: 1.5rem;
  &:hover {
    background-color: #464646;
  }
`;

const AddButton = styled.button`
  font-size: 12px;
  text-transform: capitalize;
  font-weight: 600;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  background-color: #579dff;
  color: #fff;
  &:hover {
    background-color: #1e22f5;
  }
`;

const FormButton = styled(AddCategory)`
  padding-left: 0;
`

const AddMessage = styled.p`
  font-size: 12px;
  text-transform: capitalize;
  font-weight: 600;
`;

type FormInput = {
  categoryName: string;
};

export default function AddList() {
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const { register, handleSubmit, setValue } = useForm<FormInput>();
  const setCategories = useSetRecoilState(categoryState);
  const handleValid = ({ categoryName }: FormInput) => {
    setCategories((oldCategories) => [
      ...oldCategories,
      {
        categoryId: crypto.randomUUID(),
        categoryName: categoryName,
      },
    ]);
    setValue("categoryName", "");
    setIsAdding(false);
  };
  return (
    <>
      {isAdding ? (
        <AddLayout>
          <Form onSubmit={handleSubmit(handleValid)}>
            <FormInput
              placeholder="Please write a board name"
              {...register("categoryName", {
                required: "Please write a board name",
              })}
            />
            <FormButton>
              <AddButton type="submit">add list</AddButton>
              <ButtonContainer onClick={() => setIsAdding(!isAdding)}>
                <DismissIcon />
              </ButtonContainer>
            </FormButton>
          </Form>
        </AddLayout>
      ) : (
        <AddCategory onClick={() => setIsAdding(!isAdding)}>
          <ButtonContainer>
            <AddIcon />
          </ButtonContainer>
          <AddMessage>add Another list</AddMessage>
        </AddCategory>
      )}
    </>
  );
}
