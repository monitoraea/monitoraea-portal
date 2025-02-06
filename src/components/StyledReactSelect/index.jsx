import styled from 'styled-components';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';

export const reactSelectClassNamePrefix = 'reactSelectStyles_' + (Math.random() + 1).toString(36).substring(7);

const defaultSize = '1rem';

const makeStyledSelect = SelectComponent => styled(SelectComponent)`
  & .${reactSelectClassNamePrefix}__control {
    background-color: #d6e6f8;
    border-color: #d6e6f8;
    min-height: ${defaultSize}; // Altura mínima ajustada
    border-radius: 0.5rem;
    padding: 0 0.5rem; // Ajustar padding interno

    display: flex;
    align-items: center; // Centralizar conteúdo verticalmente

    &:hover {
      border-color: #92bff5;
    }
  }

  & .${reactSelectClassNamePrefix}__value-container {
    padding: 0; // Remover padding interno do container de valor
    display: flex;
    align-items: center; // Centralizar conteúdo verticalmente
    min-height: ${defaultSize}; // Garantir altura mínima do container de valor
  }

  & .${reactSelectClassNamePrefix}__input {
    margin: 0; // Remover margem do input
    padding: 0; // Remover padding do input
  }

  & .${reactSelectClassNamePrefix}__single-value,
  & .${reactSelectClassNamePrefix}__placeholder {
    margin: 0; // Remover margem
    padding: 0; // Remover padding
    line-height: ${defaultSize}; // Ajustar altura da linha para centralizar
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

  & .${reactSelectClassNamePrefix}__indicators {
    height: ${defaultSize}; // Ajustar altura dos indicadores
    display: flex;
    align-items: center; // Centralizar indicadores verticalmente
    margin: auto 0;
    &>div {padding: 0 0.1rem;} // Ajustar padding dos indicadores 

    svg {
      fill: #fff; // Ajustar a cor de preenchimento dos ícones SVG
    }
  }

  & .${reactSelectClassNamePrefix}__indicator-separator {
    display: none; // Opcional: remover o separador de indicadores
  }
`;

export const StyledReactSelect = makeStyledSelect(Select);
export const StyledAsyncReactSelect = makeStyledSelect(AsyncSelect);
