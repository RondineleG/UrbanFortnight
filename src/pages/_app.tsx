import '../styles/theme.scss'
import '../../node_modules/font-awesome/css/font-awesome.min.css'; 
import Sidebar from "@/components/layout/Sidebar";
import AdminFooter from "@/components/layout/Footer";
import NavBar from '@/components/layout/NavBar';
import Content from '@/components/layout/Content';
import "semantic-ui-css/semantic.min.css";
import "../styles/globals.scss";
import { appWithTranslation } from "next-i18next";
import { FunctionComponent } from 'react';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import {createStore, combineReducers} from 'redux';
import {reducer as toastrReducer} from 'react-redux-toastr';
import {Provider}  from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
import { HotKeys } from "react-hotkeys";

const reducers = {
  toastr: toastrReducer
};

const reducer = combineReducers(reducers);
const store = createStore(reducer);

type MyAppProps = {
  contentTitle: string,
  contentTitleButton: string
};
const keyMap = {
  MOVE_UP: "ctrl+up",
  MOVE_DOWN: "ctrl+down"
};

const MyApp: FunctionComponent<any> = ({ Component, pageProps }, props: MyAppProps) => {
  return (
    <HotKeys keyMap={keyMap}>
    <>
      <div className={"wrapper"}>
        <NavBar />
        <Sidebar />
        <Provider store={store}>  
          <Content className={"wrapper"} title={props.contentTitle} titleButton={props.contentTitleButton}>
            <Component {...pageProps} />
          </Content>
          <ReduxToastr
            timeOut={4000}
            newestOnTop={false}
            preventDuplicates
            position="top-right"
            getState={(state) => state.toastr}
            transitionIn="fadeIn"
            transitionOut="fadeOut"
            progressBar
            closeOnToastrClick/>
        </Provider>
        <AdminFooter leftContent={"Urban Fortnight"} rightContent={"Version 0.0.1"} />
      </div>
    </>
    </HotKeys>
  )
};

export default appWithTranslation(MyApp);

