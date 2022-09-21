import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    :root{
        --eciBlue:#0A0055;
        --eciBlueHover:#0A00554D;
        --lightGray:#F5F8FB;
        --deemGray:rgba(4, 8, 15, 0.5);
        --todoYellow:#F3AD6C;
        --lightYellow:#FFF7E7;
        --todoOrange: #E88A71;
        --todoRed:#F26666;
        --lightRed:#FDF4F6;
        --todoGreen:#A9CD91;
        --lightGreen:#EBF9F4;
        --textGray:#e5e5e5;
        --darkGray:#04080F80;
        --disableGray: #DADADA;
        --required: #F26666;
        --textDarkGray:#898b8f;

    }
    *{
        box-sizing:border-box;
        font-size:10px;
        /* .dom-container{
          z-index:0 !important;
        } */

    }
    html{
      @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500&display=swap');

        width:100%;
        font-size:10px;
        padding:0;
        margin:0;
        
        body{
            margin:0;
            padding:0;
        }
        ::-webkit-scrollbar {
    width: 5px;
    height: 7px;

  }
  ::-webkit-scrollbar-track {
    background-color: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background-clip: padding-box;
    border: 15px solid transparent;
    width: 5px;
    background: rgba(4, 8, 15, 0.3);
  }
    }`;
export default GlobalStyle;
// 사용 : background-color: var(--grn-1);
