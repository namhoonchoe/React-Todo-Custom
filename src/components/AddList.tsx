import { styled } from "styled-components";
import AddIcon from "./Icons/AddIcon";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { categoryState } from "../atoms";
import {
  Form,
  FormInput,
  ButtonContainer,
  TextButton,
} from "./UI/StyledFragments";
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
   background-color: black;
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

const AddButtonContainer = styled(ButtonContainer)`
  &:hover {
    background-color: #464646;
  }
`;

const AddButton = styled(TextButton)`
  background-color: #579dff;
  &:hover {
    background-color: #1e22f5;
  }
`;

const FormButton = styled(AddCategory)`
  padding-left: 0;
`;

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
          <AddButtonContainer>
            <AddIcon />
          </AddButtonContainer>
          <AddMessage>add Another list</AddMessage>
        </AddCategory>
      )}
    </>
  );
}
