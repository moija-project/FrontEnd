import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
    ${reset};
    * {
        box-sizing: border-box;
        font-weight: 600;
    }
    body{
        padding: 0;
        margin: 0;
        font-family: 'Noto Sans KR', sans-serif;
    };
    button{
        display: flex;
        cursor: pointer;
        outline: none;
        border: none;
        background-color: transparent;        
    };
    input{
        display: flex;
        outline: none;
        padding-left: 10px;
    }
    ol,
    ul {
        list-style: none;
    }

    :root {
        --background-color : #f0f0f0 ;
        --light-gray01 : #F7F7F7 ; 
        --light-gray02 : #e3e3e3 ;        
        --gray01 : #8F8F8F;
        --purple : #CEA1E7 ;
        --yellow : #FFF59F ;
        --white : #FBFBFB ;    
    }
`;

export default GlobalStyle;
