import styled, { css } from "styled-components";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { BiDollar } from "react-icons/bi";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register?: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const InputField = styled.input<{ hasErrors: boolean; formatPrice: boolean }>`
  width: 100%;
  padding: 1rem;
  padding-top: 1.5rem;
  font-weight: 300;
  background-color: white;
  border: 2px solid ${({ hasErrors }) => (hasErrors ? "#f43f5e" : "#e5e7eb")};
  border-radius: 0.375rem;
  outline: none;
  transition: border-color 0.15s ease-in-out;

  &::placeholder {
    color: #9ca3af;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  ${({ formatPrice }) =>
    formatPrice &&
    css`
      padding-left: 3.5rem;
    `}

  &:focus {
    border-color: ${({ hasErrors }) => (hasErrors ? "#f43f5e" : "black")};
  }
`;

const Label = styled.label<{ hasErrors: boolean; formatPrice: boolean }>`
  position: absolute;
  top: 1rem;
  left: ${({ formatPrice }) => (formatPrice ? "3.5rem" : "1rem")};
  font-size: 1rem;
  font-weight: 400;
  color: ${({ hasErrors }) => (hasErrors ? "#f43f5e" : "#6b7280")};
  transform-origin: 0;
  transform: translateY(-50%);
  transition: all 0.15s ease-in-out;

  &.shrink {
    transform: translate(0, -150%) scale(0.75);
    font-size: 0.75rem;
    font-weight: 300;
  }

  & + ${InputField} {
    padding-top: 1rem;
  }

  ${({ formatPrice }) =>
    formatPrice &&
    css`
      left: 3.5rem;
    `}
`;

const DollarIcon = styled(BiDollar)`
  position: absolute;
  top: 1.25rem;
  left: 1rem;
  color: #6b7280;
`;

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = "text",
  disabled,
  formatPrice,
  register,
  required,
  errors,
}) => {
  const hasErrors = Boolean(errors[id]);

  const handleLabelShrink = (e: React.FocusEvent<HTMLInputElement>) => {
    const label = e.target.previousSibling as HTMLLabelElement;
    label.classList.add("shrink");
  };

  const handleLabelExpand = (e: React.FocusEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;
    const label = input.previousSibling as HTMLLabelElement;
    if (!input.value) label.classList.remove("shrink");
  };

  return (
    <InputWrapper>
      {formatPrice && <DollarIcon size={24} />}
      <InputField
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=" "
        type={type}
        hasErrors={hasErrors}
        formatPrice={formatPrice ?? false}
        onFocus={handleLabelShrink}
        onBlur={handleLabelExpand}
      />
      <Label
        htmlFor={id}
        hasErrors={hasErrors}
        formatPrice={formatPrice ?? false}
      >
        {label}
      </Label>
    </InputWrapper>
  );
};

export default Input;
