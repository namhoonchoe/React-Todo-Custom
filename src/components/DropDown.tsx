import { usePopper } from "react-popper";
import { useState, useRef } from "react";
import { createPortal } from "react-dom";
import MoreIcon from "./Icons/MoreIcon";
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
const DropDown = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const referenceElement = useRef<HTMLButtonElement>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );

  const toggleOpen = () => setIsOpen((prev) =>!prev);
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
          <div
            style={{
              width:"12rem",
              marginTop: "1rem",
              aspectRatio:1.2,
              borderRadius: "12px",
              backgroundColor: "black",
              color: "white",
           
            }}
          >
            Popper Content
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default DropDown;
