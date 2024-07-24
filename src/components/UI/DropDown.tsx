import { usePopper } from "react-popper";
import { useState, useRef,  ReactNode } from "react";
import { createPortal } from "react-dom";
import MoreIcon from "../Icons/MoreIcon";
import { styled } from "styled-components";
 
const ButtonContainer = styled.button`
  outline: #fff;
  border-radius: 20%;
  border-color: transparent;
  background-color: transparent;
  width: 1.5rem;
  height: 1.5rem;
  &:hover {
    background-color: #3b506d;
  }
`;
 

const DropDownWrapper = styled.div`
  width: 12rem;
  padding: 1rem;
  aspect-ratio: 1;
  border-radius: 12px;
  background-color: black;
  color: white; 
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  gap: 0.5rem;
  overflow: hidden;
`

type DropDownProps = { 
  children: ReactNode;
  isOpen: boolean;
  toggleOpen: () => void;
}

const DropDown:React.FC<DropDownProps> = ({children,isOpen,toggleOpen}) => {
  const referenceElement = useRef<HTMLButtonElement>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );

   const { styles, attributes } = usePopper(
    referenceElement.current,
    popperElement,
    {
      placement:'top-start'
    }
  );

  return (
    <>
      <button
        type="button"
        ref={referenceElement}
        style={{ width: "1.5rem", height: "1.5rem" }}
      >
        <ButtonContainer onClick={toggleOpen}>
          <MoreIcon />
        </ButtonContainer>
      </button>
     
      {isOpen && createPortal(
        <div
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
        >
          <DropDownWrapper
          
          >
            {children}
          </DropDownWrapper>
        </div>,
        document.body
      )}
    </>
  );
};

export default DropDown;
