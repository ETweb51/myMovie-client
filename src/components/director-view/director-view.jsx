import React from 'react';
import PropTypes from 'prop-types';

import './movie-view.scss';
import { Card } from 'react-bootstrap';

export class DirectorView extends React.Component {

    render() {
        const { director, onBackClick } = this.props;
        
        return (
            <Card>
            <Card.Body>
                <Card.Title>{director.Name}</Card.Title>
                <Card.Text>{director.Bio}</Card.Text>
                <Button onClick={() => onBackClick()} variant="link">Back</Button>
            </Card.Body>
        </Card>
        );
    }
}

DirectorView.propTypes = {
    Director: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Bio: PropTypes.string.isRequired
    }).isRequired
}