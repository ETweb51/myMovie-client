import React from 'react';
import PropTypes from 'prop-types';

import './movie-view.scss';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export class MovieView extends React.Component {

    render() {
        const { movie, onBackClick } = this.props;
        
        return (
            <Card>
            <Card.Img variant="top" src={movie.ImageUrl} />
            <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text>{movie.Description}</Card.Text>
                <Link to={`genres/${movie.Genre.Name}`}>
                  <Button>{movie.Genre.Name}</Button>
                </Link>
                <Link to={`/directors/${movie.Director.Name}`}>
                  <Button>{movie.Director.Name}</Button>
                </Link>
                <Button onClick={() => onBackClick()} variant="link">Back</Button>
            </Card.Body>
        </Card>
        );
    }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
      Title: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      ImageUrl: PropTypes.string.isRequired,
      Genre: PropTypes.shape({
        Name: PropTypes.string.isRequired
      }),
      Director: PropTypes.shape({
        Name: PropTypes.string.isRequired
      }),
  }).isRequired
}