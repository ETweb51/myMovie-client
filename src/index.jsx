import React from 'react';
import ReactDOM from 'react-dom';
import MainView from './components/main-view/main-view';

// Import statement for bundle
import './index.scss';

// Main component
class MyMovieApplication extends React.Component {
    render() {
        return (
            <MainView />
        );
    }
}

// Finds the rout of my app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render the app in the root DOM element
ReactDOM.render(React.createElement(MyMovieApplication), container);