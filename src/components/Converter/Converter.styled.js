import styled from "styled-components";
import Select from "react-select";
import { NumericFormat } from "react-number-format";

export const StyledMain = styled.main`
  max-width: 1200px;
  margin: 0 auto;
`;

export const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 48px;
  gap: 20px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

export const StyledSelect = styled(Select)`
  width: 300px;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

export const StyledLabel = styled.div`
  margin-bottom: 20px;
`;

export const StyledInput = styled(NumericFormat)`
  box-sizing: border-box;
  height: 48px;
  width: 300px;
  padding: 2px 8px;
  font-size: 16px;
  border: 1px solid hsl(0, 0%, 80%);
  border-radius: 4px;
  outline: none;
  &:focus {
    border: 2px solid #2684ff;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;
