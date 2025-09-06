import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import{useContext} from "react"
import {ThemeContext} from "../context/ThemeContext.jsx"
import ExploreContainer from '../components/ExploreContainer';
import './Tab2.css';

const Tab2 = () => {
  const {theme, degrees} = useContext(ThemeContext)
  return (
    <IonPage>
      <div
        className="container"
        style={
          theme
            ? {
                background: `linear-gradient(${degrees}deg,rgba(250, 241, 230, 1) 0%, rgba(253, 250, 246, 1) 50%, rgba(228, 239, 231, 1) 100%)`,
              }
            : {
                background: `linear-gradient(${degrees}deg,rgba(15, 15, 15, 1) 0%, rgba(30, 32, 31, 1) 50%, rgba(44, 48, 47, 1) 100%)`,
              }
        }
      ></div>
    </IonPage>
  );
};

export default Tab2;
