import { ForwardedRef, ReactNode, forwardRef, CSSProperties } from "react";
import { styled } from "styled-components";

 
type ModalProps = {
  modalMessage: string;
  children: ReactNode;
  mainStyle?:CSSProperties;
};

const ModalWrapper = styled.dialog`
  width: 18rem;
  height: 14rem;
  margin: auto;
  border: 0;
  padding: 1rem 0;
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  background-color: #000;
`;

const ModalContent = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  position: absolute;
  gap: 0.5rem;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const ModalHeader = styled.header`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 3rem;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
`;

const ModalMain = styled.main`
  width: 100%;
`;

const ModalMessage = styled.p`
  color: #fff;
  font-size: 16px;
  text-transform: capitalize;
  font-weight: 600;
`;

export default forwardRef(function Modal(
  { modalMessage, children,mainStyle }: ModalProps,
  ref: ForwardedRef<HTMLDialogElement>
) {
  return (
    <ModalWrapper ref={ref}>
      <ModalContent>
        <ModalHeader>
          <ModalMessage>{modalMessage}</ModalMessage>
        </ModalHeader>
        <ModalMain style={mainStyle}>{children}</ModalMain>
      </ModalContent>
    </ModalWrapper>
  );
});
