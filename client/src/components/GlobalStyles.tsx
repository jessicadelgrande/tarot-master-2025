import { createGlobalStyle } from "styled-components";
import styled from "styled-components";
import Windsor from "../fonts/WindsorBT.ttf";
import WindsorCondensed from "../fonts/Windsor_Light_Condensed.ttf";
import Knockout34 from "../fonts/Knockout-34.woff";

export default createGlobalStyle`
  @font-face {
    font-family: "Windsor";
    src: url(${Windsor}) format("truetype");
    font-display: auto;
  }
 
    @font-face {
    font-family: "WindsorCondensed";
    src: url(${WindsorCondensed}) format("truetype");
    font-display: auto;
  }

  @font-face {
    font-family: "Knockout34";
    src: url(${Knockout34}) format("woff");
    font-display: auto;
  }

  :root {
    --font-titles: "Windsor", serif;
    --font-body: "WindsorCondensed", serif;
    --font-btn: "Knockout34", sans-serif;
    --accent-dark: #1a3c34;

  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    font-family: var(--font-body);
    color: var(--accent-dark);
  }

  html, body {
    max-width: 100vw;
    background-color: #faf7ef;

  }

  /* http://meyerweb.com/eric/tools/css/reset/
    v2.0 | 20110126
    License: none (public domain)
  */

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }

  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }

  body {
    line-height: 1.25;
  }

`;

export const Button = styled.button`
	cursor: pointer;
	background-color: #fff;
	height: 40px;
	border: 1px solid var(--accent-dark);
	border-radius: 0px;
	padding: 8px 16px;
	font-size: 1rem;
	font-family: var(--font-btn);
	text-transform: uppercase;
	white-space: nowrap;
	font-weight: 700;
	box-shadow: var(--accent-dark) 5px 5px 0 0;
	transition: 0.2s ease;
	&:hover {
		box-shadow: var(--accent-dark) 0 0 0 0;
	}
	&:disabled {
		cursor: default;
		color: #808080;
		border: 1px solid #808080;
		box-shadow: #808080 5px 5px 0 0;
		&:hover {
			box-shadow: #808080 5px 5px 0 0;
		}
	}
`;

export const GoogleButton = styled(Button)`
	margin-left: auto;
	display: flex;
	justify-content: center;
	align-items: center;
	& svg {
		margin-right: 8px;
	}
`;
