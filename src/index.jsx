import React from 'react';
import ReactDOM from 'react-dom';

// Import statement for bundle
import './index.scss';

// Main component
class MyMovieApplication extends React.Component {
    render() {
        return (
            <div className="my-movie">
                <div>Good morning</div>
            </div>
        );
    }
}

// Finds the rout of my app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render the app in the root DOM element
ReactDOM.render(React.createElement(MyMovieApplication), container);