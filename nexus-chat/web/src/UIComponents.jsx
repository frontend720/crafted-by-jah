import styled from "styled-components";
import TextareaAutosize from "react-textarea-autosize";

const Container = styled.div`
  border: ${({ border }) => (border ? border : "none")};
  padding: 24px;
  background: ${({ background }) => (background ? background : "#9EADC8")};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
//   padding-bottom: 200px;
padding-bottom: ${({bottom}) => bottom ? bottom : "200px"}
`;

const MessageText = styled.p`
  font-family: "Inter", sans-serif;
  font-optical-sizing: auto;
  font-weight: ${({ weight }) => (weight ? weight : "400")};
  color: ${({ font_color }) => (font_color ? font_color : "#ffffff")};
  text-align: ${({ align }) => (align ? align : "left")};
  font-size: 16px;
  line-height: 1.5;
  letter-spacing: 0.2px;
`;

const TextContainer = styled.div`
  background: ${({ isUser }) => (isUser ? isUser : "#000")};
  padding: 8px 6px;
  //   margin: 16px auto;
  margin: 16px 0px;
  width: 85%;
  max-width: 90%;
  align-self: ${({ align }) => (align ? align : "flex-start")};
  border-radius: ${({ radius }) =>
    radius ? "16px 0px 16px 16px" : "0px 16px 16px 16px"};
  padding: 12px 16px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
`;

const ChangeThemeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 24px;
  //   background: #f3f4f6;
  //   border-bottom: 1px solid #d1d5db;
`;

const ThemeButton = styled.button`
  background: #4f46e5;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  font-family: "Inter", sans-serif;
  cursor: pointer;
  transition: background 0.3s ease;
  &:hover {
    background: #4338ca;
  }
`;

const ThemeText = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #4338ca;
  font-family: "Inter", sans-serif;
`;

const InputContainer = styled.div`
  display: ${({ display }) => (display ? display : "flex")};

  align-items: flex-end; /* Aligns button with bottom of textarea */
  gap: 12px;
  padding: 16px 10px;
  background: #222222b1;
  position: ${({ position }) => (position ? position : "fixed")};
  bottom: 0;
  margin-bottom: 115px;
  left: 50%;
  transform: translateX(-50%);
  width: ${({ width }) => (width ? width : "85%")};
  border-radius: 10px;
`;

const StyledTextarea = styled(TextareaAutosize)`
  flex: 1;
  resize: none;
  padding: 12px 16px;
  font-size: 16px;
  font-family: "Inter", sans-serif;
  border-radius: 8px;
  background: #7e7e7eff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  max-height: 120px; /* Prevents overflow */
  overflow-y: auto;
`;

const SendButton = styled.button`
  color: white;
  padding: ${({ padding }) => (padding ? padding : "10px 16px")};
  border: none;
  border-radius: 8px;
    font-weight: 500;

  font-family: "Inter", sans-serif;

  cursor: pointer;
  transition: background 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  background: transparent;
`;

const P = styled.p`
  font-family: "Inter", sans-serif;
  color: #f5f5f5;
  line-height: 1.6;
  font-size: 1em;
  margin-bottom: 1em;
`;

// --- Headings ---
const H1 = styled.h1`
  font-family: "Inter", sans-serif;
  font-size: 2.2em;
  font-weight: 700;
  color: #34495e;
  margin-top: 0;
  margin-bottom: 0.5em;
  letter-spacing: -0.02em;
`;

// --- Bold Text ---
const Strong = styled.strong`
  font-weight: 700;
  color: #f5f5f5;
`;

// --- Emphasized Text (Italics) ---
const EM = styled.em`
  font-style: italic;
  color: #f5f5f5;
`;

// --- Unordered Lists ---
const UL = styled.ul`
  list-style-type: disc;
  padding-left: 20px;
  margin-bottom: 1em;
  margin-top: 1em;
`;

const ListItem = styled.li`
  margin-bottom: 0.5em;
  font-family: "Inter", sans-serif;
  color: #e8e8e8cb;
`;

// --- Ordered Lists ---
const OL = styled.ol`
  list-style-type: decimal;
  padding-left: 20px;
  margin-bottom: 1em;
  margin-top: 1em;
`;

const WeatherContainer = styled.div`
  padding: 16px;
`;

const LocationPermissionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  // Card-like styling
  background-color: #f8f9fa; /* A soft, light gray background */
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin: 2rem;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
`;

// Styled heading for the main message
const Heading = styled.h2`
  font-size: 1.5rem;
  color: #343a40;
  margin-bottom: 1rem;
`;

// Styled paragraph for the description
const Paragraph = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  color: #6c757d;
  margin-bottom: 1.5rem;
`;

// Styled button with a clear call to action
const LocationButton = styled.button`
  background-color: #007bff; /* A nice blue color */
  color: white;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3; /* Darken on hover */
  }

  &:active {
    background-color: #003d80;
  }
`;

export {
  Container,
  MessageText,
  TextContainer,
  ChangeThemeContainer,
  ThemeButton,
  ThemeText,
  InputContainer,
  StyledTextarea,
  SendButton,
  P,
  EM,
  UL,
  OL,
  ListItem,
  H1,
  Strong,
  WeatherContainer,
  LocationPermissionContainer,
  Heading,
  Paragraph,
  LocationButton,
};
