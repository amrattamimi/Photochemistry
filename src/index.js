import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/layout/App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from './app/store/configureStore';
import ScrollToTop from './app/common/utils/ScrollToTop'; //component to restore the scroll issue 
import ReduxToastr from 'react-redux-toastr';  
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'


const store = configureStore();

  store.firebaseAuthIsReady.then(()=>{ // the app will render only when authorisation is ready using attachAuthIsReady from configstore 
    ReactDOM.render(
      <Provider store={store}>
      <React.StrictMode  >
        <BrowserRouter>
        <ScrollToTop > 
          <ReduxToastr //toastr component, it will include all the children component in app 
          position="bottom-center"
          transitionIn="bounceIn"
          transitionOut="bounceOut"/>
        <App />
        </ScrollToTop>
        
        </BrowserRouter>
     </React.StrictMode>
     </Provider>
     ,
      document.getElementById('root')
    );

  })
 
// })

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
