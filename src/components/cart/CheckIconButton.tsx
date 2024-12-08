import { FaRegCheckCircle, FaRegCircle } from "react-icons/fa";
import styled from "styled-components";

interface Props {
  isChecked: boolean;
  onCheck: () => void;
}

function CheckIconButton({ isChecked, onCheck }: Props) {
  return (
    <CheckIconButtonStyle onClick={onCheck}>
      {isChecked ? <FaRegCheckCircle /> : <FaRegCircle />}
    </CheckIconButtonStyle>
  );
}

const CheckIconButtonStyle = styled.button`
  background: nond;
  border: 0;
  cursor: pointer;

  svg {
    width: 24px;
    height: 24px;
  }
`;

export default CheckIconButton;
