import styled from "styled-components";
import { IonButton, IonText, IonCard, IonTextarea } from "@ionic/react";

const Button = styled.button`
  background: ${({ color }) => (color ? color : "transparent")};
  padding: 6px !important;
  //   margin: 60px 0px 0px 16px
  font-size: ${({ size }) => (size ? size : "16px")};
  color: rgba(228, 239, 231, 1);
`;

const ButtonLabel = styled.label`
    color: rgba(228, 239, 231, 1)
    font-weight: 600;
    padding: 0px 6px
`;

const ThemeContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 60px 30px;
`;

const Container = styled.div`
  width: 100vw !important;
  height: 100vh !important;
  padding: ${({ padding }) => (padding ? padding : "0px")};
`;

const AccountText = styled(IonText)`
  font-weight: ${({ weight }) => (weight ? weight : 600)};
  color: ${({ color }) => (color ? color : "#444444")};
`;

const OptionText = styled.label`
  font-weight: ${({ weight }) => (weight ? weight : 600)};
  color: ${({ color }) => (color ? color : "#444444")};
  font-size: 12px;
`;

const ChatText = styled(IonText)`
    color: ${({ color }) => (color ? color : "#444444")};
    // font-family: "Roboto", sans-serif;
    font-family: monospace
`

const Lightbox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.77);
  display: ${({ display }) => (display ? display : "block")};
`;

const Modal = styled.div`
  width: 90%;
//   height: 600px;
//   background: rgba(195, 207, 198, 1);
background: ${({color}) => color ? color : "rgba(195, 207, 198)"};
  margin: 0px auto;
  margin-top: 100px;
  border-radius: 5px;
  padding-bottom: 32px
`;

const Icon = styled.div`
  font-size: ${({ size }) => (size ? size : "30px")};
  text-align: ${({ align }) => (align ? align : "left")};
  color: ${({ color }) => (color ? color : "#444444")};
  padding: ${({ padding }) => (padding ? padding : "0px")};
`;

const Card = styled(IonCard)`
  background: ${({ color }) => (color ? color : "#ffffff")};
  font-weight: 900;
`;

const TextareaContainer = styled.div`
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 8px;
    z-index: 1000
`

const TextArea = styled(IonTextarea)`
    padding: 8px;
    border: ${({border}) => border ? border : "none"};
    width: 95% !important;
    margin: 0px auto;
    border-radius: 5px;
    margin-top: 10px
    
`

const TextAreaButton = styled(IonButton)`
    padding: 0px !important;
`


export {
  Container,
  Button,
  ButtonLabel,
  AccountText,
  ChatText,
  OptionText,
  ThemeContainer,
  Lightbox,
  Modal,
  Icon,
  Card,
  TextareaContainer,
  TextArea,
  TextAreaButton
};
