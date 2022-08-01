import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
    }
    
    a {
        color: inherit;
        text-decoration: none;
    }

    input, button, select, textarea {
        /* background: none; */
        /* border: none;
        outline: none; */
    }

    button {
        cursor: pointer;
    }
`;