import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import {
  ellipse,
  square,
  triangle,
  personCircle,
  settings,
  chatbubble,
  imageSharp,
} from "ionicons/icons";
import Chat from "./pages/Chat";
import Tab2 from "./pages/Tab2";
import Tab3 from "./pages/Tab3";
import { useContext } from "react";
import { ThemeContext } from "./context/ThemeContext";
import "./main.css";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import "@ionic/react/css/palettes/dark.system.css";

/* Theme variables */
import "./theme/variables.css";

setupIonicReact();

const App = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs lines="none" slot="bottom">
          <IonRouterOutlet>
            <Route exact path="/tab1">
              <Chat />
            </Route>
            <Route exact path="/tab2">
              <Tab2 />
            </Route>
            <Route path="/tab3">
              <Tab3 />
            </Route>
            <Route exact path="/">
              <Redirect to="/tab1" />
            </Route>
          </IonRouterOutlet>
          <IonTabBar className={theme ? "tab-bar-light" : "tab-bar"} slot="bottom">
            <IonTabButton
            className="ion-tab-button"
              style={
                theme ? { backgound: "#FBF5EC" } : { background: "#141515" }
              }
              tab="tab1"
              href="/tab1"
            >
              <IonIcon aria-hidden="true" icon={chatbubble} />
              <IonLabel>Chat</IonLabel>
            </IonTabButton>
            <IonTabButton
              style={
                theme ? { backgound: "#FBF5EC" } : { background: "#141515" }
              }
              tab="tab2"
              href="/tab2"
            >
              <IonIcon aria-hidden="true" icon={imageSharp} />
              <IonLabel>Create</IonLabel>
            </IonTabButton>
            <IonTabButton
              style={
                theme ? { backgound: "#FBF5EC" } : { background: "#141515" }
              }
              tab="tab3"
              href="/tab3"
            >
              <IonIcon aria-hidden="true" icon={settings} />
              <IonLabel>Settings</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
