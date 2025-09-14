import { Redirect, Route } from "react-router-dom";
import { useContext, useEffect } from "react";
import { ThemeContext } from "./ThemeContext.jsx";
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
  home,
  square,
  triangle,
  bookmark,
  settings,
} from "ionicons/icons";
import Tab1 from "./pages/Feed.jsx";
import Tab2 from "./pages/Tab2.jsx";
import Tab3 from "./pages/Tab3.jsx";
import Authentication from "./Authentication.jsx";
import { StatusBar } from "@capacitor/status-bar";
import "./App.css";

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
import "@ionic/react/css/palettes/dark.system.css";

/* Theme variables */
import "./theme/variables.css";
import { AuthenticationContext } from "./AuthenticationContext.jsx";

setupIonicReact();

const App = () => {
  const { theme } = useContext(ThemeContext);
  const { auth_id } = useContext(AuthenticationContext);

  useEffect(() => {
    const hideStatusBar = async () => {
      await StatusBar.hide();
    };
    hideStatusBar();
  }, []);
  return (
    <>
      {auth_id === null ? (
        <Authentication />
      ) : (
        <IonApp>
          <IonReactRouter>
            <IonTabs>
              <IonRouterOutlet>
                <Route exact path="/tab1">
                  <Tab1 />
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
              <IonTabBar
                className={theme ? "tab-bar-dark" : "tab-bar-light"}
                slot="bottom"
              >
                <IonTabButton
                  style={{ background: "red !important" }}
                  tab="tab1"
                  href="/tab1"
                >
                  <IonIcon aria-hidden="true" icon={home} />
                  <IonLabel>Home</IonLabel>
                </IonTabButton>
                <IonTabButton tab="tab2" href="/tab2">
                  <IonIcon aria-hidden="true" icon={bookmark} />
                  <IonLabel>Saves</IonLabel>
                </IonTabButton>
                <IonTabButton tab="tab3" href="/tab3">
                  <IonIcon aria-hidden="true" icon={settings} />
                  <IonLabel>Account</IonLabel>
                </IonTabButton>
              </IonTabBar>
            </IonTabs>
          </IonReactRouter>
        </IonApp>
      )}
    </>
  );
};

export default App;
