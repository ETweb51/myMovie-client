import React from 'react';
import ReactDOM from 'react-dom';
import MainView from './components/main-view/main-view';
import Container from 'react-bootstrap/Container';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import moviesApp from './reducers/reducers';
import { devToolsEnhancer } from 'redux-devtools-extension';

// Import statement for bundle
import './index.scss';

// Store
const store = createStore(moviesApp, devToolsEnhancer());

// Main component
class MyMovieApplication extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Container>
                    <MainView />
                </Container>
            </Provider>
        );
    }
}

// Finds the rout of my app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render the app in the root DOM element
ReactDOM.render(React.createElement(MyMovieApplication), container);