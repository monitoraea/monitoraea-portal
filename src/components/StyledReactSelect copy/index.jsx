import styled from 'styled-components';
import Select from 'react-select';
import AsyncSelect from 'react-select/async/dist/react-select.esm';

export const reactSelectClassNamePrefix = 'reactSelectStyles_' + (Math.random() + 1).toString(36).substring(7);
const makeStyledSelect = SelectComponent => styled(SelectComponent)`
  & .${reactSelectClassNamePrefix}__control {
    background-color: #d6e6f8;
    border-color: #d6e6f8;
    height: 1.8rem; // Altura ajustada
    min-height: 1.8rem; // Altura mínima ajustada
    line-height: 1.8rem; // Altura da linha ajustada
    border-radius: 0.5rem;

    display: flex;
    align-items: center; // Centralizar conteúdo verticalmente

    padding: 0 10px; // Remover padding interno

    &:hover {
      border-color: #92bff5;
    }
  }

  & .${reactSelectClassNamePrefix}__value-container {
    padding: 0; // Remover padding interno do container de valor
    height: 1.8rem; // Altura ajustada
  }

  & .${reactSelectClassNamePrefix}__input {
    margin: 0; // Remover margem do input
    padding: 0; // Remover padding do input
  }

  & .${reactSelectClassNamePrefix}__single-value,
  & .${reactSelectClassNamePrefix}__placeholder {
    margin: 0; // Remover margem
    padding: 0; // Remover padding
    line-height: 1.8rem; // Ajustar altura da linha para centralizar
    color: #051e59;
  }

  & .${reactSelectClassNamePrefix}__multi-value {
    background-color: #92bff5;
    border-radius: 0.5rem;
    color: #fff;
    text-transform: lowercase;
    display: flex;
    align-items: center; // Centralizar tags verticalmente
  }

  & .${reactSelectClassNamePrefix}__multi-value__label {
    padding: 0 0.5rem; // Ajustar padding das tags
  }

  & .${reactSelectClassNamePrefix}__multi-value__remove {
    border-radius: 10px;
  }

  & .${reactSelectClassNamePrefix}__indicator {
    color: #051e59;
    display:none;

    /* &:hover {
      color: 666666;
    } */
  }

  & .${reactSelectClassNamePrefix}__indicator-separator {
    background-color: transparent;
  }
`;

export const StyledReactSelect = makeStyledSelect(Select);
export const StyledAsyncReactSelect = makeStyledSelect(AsyncSelect);
