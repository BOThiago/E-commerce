import { IconType } from "react-icons";
import styled from "styled-components";

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
}

const ButtonWrapper = styled.button<ButtonProps>`
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: ${(props) => (props.small ? "0.5rem 1rem" : "1rem 2rem")};
  font-size: ${(props) => (props.small ? "0.875rem" : "1rem")};
  font-weight: ${(props) => (props.small ? "300" : "600")};
  text-align: center;
  text-decoration: none;
  white-space: nowrap;
  border-radius: 0.375rem;
  border: ${(props) =>
    props.outline ? "1px solid black" : "2px solid var(--color-primary)"};
  background-color: ${(props) =>
    props.outline ? "transparent" : "var(--color-primary)"};
  color: ${(props) => (props.outline ? "black" : "white")};
  transition: opacity 0.2s ease-in-out;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.disabled ? "0.7" : "1")};

  &:hover:not(:disabled) {
    opacity: 0.8;
  }
`;

const ButtonIcon = styled.span`
  position: absolute;
  left: 1rem;
  top: 1rem;
`;

const ButtonLabel = styled.span`
  margin: 0 auto;
`;

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
}) => {
  return (
    <ButtonWrapper
      disabled={disabled}
      label={label}
      onClick={onClick}
      outline={outline}
      small={small}
    >
      {Icon && (
        <ButtonIcon>
          <Icon size={24} />
        </ButtonIcon>
      )}
      <ButtonLabel>{label}</ButtonLabel>
    </ButtonWrapper>
  );
};

export default Button;
