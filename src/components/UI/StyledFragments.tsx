import { styled } from "styled-components";

export const ButtonContainer = styled.button`
  outline: #fff;
  border-radius: 0.5rem;
  border-color: transparent;
  background-color: transparent;
  width: 1.5rem;
  height: 1.5rem;
`;

export const Form = styled.form`
  width: 100%;
  padding: 1rem 0.5rem;
  gap: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
`;

export const FormInput = styled.input`
  width: 100%;
  height: 5rem;
  border-radius: 12px;

  background-color: #1f2937;
  border-color: transparent;
  padding-left: 8px;
  color: #fff;
  text-transform: capitalize;
  &:focus {
    border: 2px solid;
    border-color: #7ca3f8;
    outline: none;
  }
`;

export const FormButton = styled.section`
  display: flex;
  flex-shrink: 0;
  flex-grow: 0;
  align-items: center;
  justify-content: flex-start;
  background-color: #0d1117;
  border-radius: 12px;
  min-height: 3rem;
  gap: 0.75rem;
  color: #fff;
  text-transform: capitalize;
`;

export const AddButton = styled.button`
  font-size: 12px;
  text-transform: capitalize;
  font-weight: 600;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  background-color: #579dff;
  color: #fff;
`;

export const TextButton  = styled.button`
font-size: 12px;
text-transform: capitalize;
font-weight: 600;
padding: 0.5rem 0.75rem;
border-radius: 8px;
 
color: #fff;
 
`;