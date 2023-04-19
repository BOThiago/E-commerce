import { useState, useCallback, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import styled, { keyframes } from "styled-components";
import Button from "./Button";

const ModalWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 50;
  outline: none;
  background-color: rgba(49, 51, 55, 0.7);
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;
  max-height: 90vh;
  max-width: 90vw;
  margin: auto;
  border: none;
  border-radius: 0.5rem;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  background-color: white;

  @media (min-width: 768px) {
    width: 75%;
    max-width: 720px;
  }

  @media (min-width: 1024px) {
    width: 60%;
    max-width: 900px;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  border-radius: 0.5rem 0.5rem 0 0;
`;

const ModalBody = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 1.5rem;
  flex-grow: 1;
`;

const ModalFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 1.5rem;
  border-top: 1px solid #e5e7eb;
  border-radius: 0 0 0.5rem 0.5rem;
`;

const ModalOverlay = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
`;

const ModalCloseButton = styled.button`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  border: none;
  background: transparent;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
`;

const ModalActionWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1.5rem;
`;
const ModalSecondaryAction = styled(Button)`
  margin-right: 0.5rem;
`;

const ModalAction = styled(Button)`
  margin-left: 0.5rem;
`;

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

const ModalComponent: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  actionLabel,
  footer,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose, disabled]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [onSubmit, disabled]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }

    secondaryAction();
  }, [secondaryAction, disabled]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <ModalWrapper>
        <ModalContent>
          <ModalOverlay />
          <ModalHeader>
            <ModalCloseButton onClick={handleClose}>
              <IoMdClose size={24} />
            </ModalCloseButton>
            <ModalTitle>{title}</ModalTitle>
          </ModalHeader>
          <ModalBody>{body}</ModalBody>
          <ModalFooter>
            <ModalActionWrapper>
              {secondaryAction && secondaryActionLabel && (
                <ModalSecondaryAction
                  disabled={disabled}
                  label={secondaryActionLabel}
                  onClick={handleSecondaryAction}
                  outline
                />
              )}
              <ModalAction
                disabled={disabled}
                label={actionLabel}
                onClick={handleSubmit}
              />
            </ModalActionWrapper>
            {footer}
          </ModalFooter>
        </ModalContent>
      </ModalWrapper>
    </>
  );
};

export default ModalComponent;
