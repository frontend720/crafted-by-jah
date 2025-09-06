import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonButton,
  IonText,
  IonCard,
} from "@ionic/react";
import {
  Container,
  Button,
  ButtonLabel,
  AccountText,
  Lightbox,
  Modal,
  Icon,
  OptionText,
  Card,
} from "../Styles.jsx";
import { IoMoon, IoSunny, IoClose } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { HiOutlinePaintBrush } from "react-icons/hi2";
import { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext.jsx";
import { AxiosContext } from "../context/AxiosContext.jsx";

import "./Tab3.css";

const Tab3 = () => {
  const { onThemeChange, theme, degrees } = useContext(ThemeContext);
  const {
    currentStyleName,
    currentModelName,
    changeImageStyle,
    changeTextModel,
    currentImageModelName,
    changeImageModel,
  } = useContext(AxiosContext);

  const [modal, setModal] = useState(false);

  const onModalView = () => {
    setModal((prev) => !prev);
  };

  return (
    <IonPage>
      <Container
        padding="60px 20px"
        style={
          theme
            ? {
                background: `linear-gradient(${degrees}deg,rgba(250, 241, 230, 1) 0%, rgba(253, 250, 246, 1) 50%, rgba(228, 239, 231, 1) 100%)`,
              }
            : {
                background: `linear-gradient(${degrees}deg,rgba(15, 15, 15, 1) 0%, rgba(30, 32, 31, 1) 50%, rgba(44, 48, 47, 1) 100%)`,
              }
        }
      >
        <Icon
          style={{ position: "fixed" }}
          color={theme ? "rgba(44, 48, 47, 1)" : "rgba(228, 239, 231, 1)"}
        >
          <GiHamburgerMenu
            style={modal ? { display: "none" } : { display: "" }}
            onClick={onModalView}
          />
        </Icon>
        <IonCard
          // className={theme ? "card-light" : "card-dark"}
          color={theme ? "#ffffff" : "#1c1c1d"}
          style={modal ? { display: "none" } : { marginTop: 60, padding: 16 }}
        >
          <AccountText weight="900" color={theme ? "#555555" : "#ffffff"}>
            Heres the bag I lied
          </AccountText>
        </IonCard>
      </Container>
      <Lightbox display={modal ? "" : "none"}>
        <Modal color={theme ? "#FBF5EC" : "#141515"}>
          <Icon
            padding="16px 16px 0px 0px"
            color={!theme ? "#FBF5EC" : "#141515"}
            size="36px"
            align="right"
            onClick={onModalView}
          >
            <IoClose />
          </Icon>
          <div style={{ marginBottom: 20 }} className="flex">
            <Button onClick={onThemeChange}>
              {theme ? (
                <IoMoon color="#141515" size="30px" />
              ) : (
                <IoSunny color="#fbf5ecc9" size="30px" />
              )}
            </Button>
            <AccountText color={!theme ? "#FBF5EC" : "#141515"}>
              {theme ? "Dark" : "Light"} theme
            </AccountText>
          </div>
          <div className="flex">
            <Button
              className="option-button"
              color="rgba(44, 48, 47, 1)"
              onClick={changeTextModel}
            >
              <ButtonLabel htmlFor="">Change Chat Model</ButtonLabel>
            </Button>
            <OptionText color={!theme ? "#FBF5EC" : "#141515"}>
              {currentModelName}
            </OptionText>
          </div>
          <div className="flex">
            <Button
              className="option-button"
              color="rgba(44, 48, 47, 1)"
              onClick={changeImageModel}
            >
              <ButtonLabel htmlFor="">Change Image Model</ButtonLabel>
            </Button>
            <OptionText color={!theme ? "#FBF5EC" : "#141515"}>
              {currentImageModelName}
            </OptionText>
          </div>
          <div className="flex">
            <Button
              className="option-button"
              color="rgba(44, 48, 47, 1)"
              onClick={changeImageStyle}
            >
              <ButtonLabel htmlFor="">
                <HiOutlinePaintBrush />
              </ButtonLabel>
            </Button>
            <OptionText color={!theme ? "#FBF5EC" : "#141515"}>
              {currentStyleName}
            </OptionText>
          </div>
        </Modal>
      </Lightbox>
    </IonPage>
  );
};

export default Tab3;
