import React from 'react';
import PropTypes from 'prop-types';

import './movie-view.scss';
import { Card } from 'react-bootstrap';

export class GenreView extends React.Component {

    render() {
        const { genre, onBackClick } = this.props;
        
        return (
            <Card>
            <Card.Body>
                <Card.Title>{genre.Name}</Card.Title>
                <Card.Text>{genre.Description}</Card.Text>
                <Button onClick={() => onBackClick()} variant="link">Back</Button>
            </Card.Body>
        </Card>
        );
    }
}

GenreView.propTypes = {
    Genre: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired
    }).isRequired
}