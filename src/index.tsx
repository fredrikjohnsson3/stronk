import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './state/store';
import Main from './components/main';
// import Header from './components/header';

const App = () => {
    return (
        <Provider store={store}>
            <Main />
        </Provider>
    );
};

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
