import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { store, persistor } from './store/configureStore';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import Routes from 'routes';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import './styles/index.scss';
import DateFnsUtils from '@date-io/date-fns';
import CssBaseline from '@material-ui/core/CssBaseline';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Provider store={store}>
          <PersistGate loading={<div />} persistor={persistor}>
            <CssBaseline />
            <Routes />
          </PersistGate>
        </Provider>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
}

export default App;
