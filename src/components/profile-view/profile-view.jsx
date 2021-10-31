import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Container, Row, Col, Form, Button, CardGroup, Card } from 'react-bootstrap';

import './profile-view.scss';

export function ProfileView(props) {
    const [ username, setUsername] = useState('');
    const [ password, setPassword] = useState('');
    const [ email, setEmail] = useState('');
    const [ birthday, setBirthday] = useState('');

    constructor() {
        super();
    
        this.state = {
          Username: null,
          Password: null,
          Email: null,
          Birthday: null,
          FavoriteMovies: []
        };
    }

    showUser() {
        e.preventDefault();
        const user = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        axios.get(`https://mymoviedbcf.herokuapp.com/users/${user}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
            this.setState({
                Username: response.data.Name,
                Password: response.data.Password,
                Email: response.data.Email,
                Birthday: response.data.Birthday
            });
        })
        .catch(e => {
            console.log(`An error occured. Cannot get information of user ${user}`);
        })
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        const user = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        axios.put(`https://mymoviedbcf.herokuapp.com/users/${user}`, {
            Name: username,
            Password: password,
            Mail: email,
            Birthday: birthday
        }, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
            const data = response.data;
            console.log(data);
            window.open('/', '_self');
        })
        .catch(e => {
            console.log('An error occured. Cannot update profile.')
        })
    }

    const handleDelete = (e) => {
        e.preventDefault();
        const user = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        axios.delete(`https://mymoviedbcf.herokuapp.com/users/${user}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response =>{
            console.log(`${user} has been deleted.`);
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            window.open('/register', '_self');
        })
        .catch(e => {
            console.log(`An error occured. Cannot delete user ${user}`);
        })
    }

    deleteMovie(id) {
        e.preventDefault();
        const user = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        axios.delete(`https://mymoviedbcf.herokuapp.com/users/${user}/movies/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
            console.log('Movie was succesfully removed from list of favorite movies.');
        })
        .catch(e => {
            console.log('An error ocurred. Cannot delete movie from list of favorite movies.');
        })
    }

    render() {
        const { movie, user } = this.props;

        return(
            <Container className="profile-view">
                <Row>
                    <Col>
                        <Card className="profile-information">
                            <Card.Body>
                                <Card.Title>Profile Informations</Card.Title>
                                <Card.Text>Username: {this.state.Username}</Card.Text>
                                <Card.Text>Email: {this.state.Email}</Card.Text>
                                <Card.Text>Birthday: {this.state.Birthday}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card className="update-profile">
                            <Card.Body>
                                <Card.Title>Update your user information</Card.Title>
                                <Form>
                                    <Form.Group controlId="formUsername">
                                        <Form.Label>Username:</Form.Label>
                                        <Form.Control type="text" value={username} placeholder="Username" onChange={e => setUsername(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group controlId="formPassword">
                                        <Form.Label>Password:</Form.Label>
                                        <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group controlId="formEmail">
                                        <Form.Label>Email:</Form.Label>
                                        <Form.Control type="email" value={email} placeholder="example@email.com" onChange={e => setEmail(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group controlId="formBirthday">
                                        <Form.Label>Birthday:</Form.Label>
                                        <Form.Control type="date" value={birthday} onChange={e => setBirthday(e.target.value)} />
                                    </Form.Group>
                                    <Button variant="primary" type="submit" onClick={handleUpdate}>Uptade</Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card className="delete-profile">
                            <Card.Body>
                                <Card.Title>Delete your profile</Card.Title>
                                <Button variant="primary" type="submit" onClick={handleDelete}>Register</Button>
                                <Card.Text>Be careful! There is no going back.</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    {FavoriteMovies.map((movie) => {
                        return(
                            <Col>
                                <Card>
                                    <Card.Img variant="top" src={movie.imageUrl} />
                                    <Card.Body>
                                        <Card.Title>{movie.Title}</Card.Title>
                                        <Card.Text>{movie.Description}</Card.Text>
                                        <Link to={`/movies/${movie._id}`}>
                                            <Button variant="link">Open</Button>
                                        </Link>
                                        <Button variant="primary" onClick={() => deleteMovie(movie._id)}>Remove from list</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
            </Container>
        );
    }
}

ProfileView.propTypes = {
    Update: PropTypes.shape({
        Username: PropTypes.string.isRequired,
        Password: PropTypes.string.isRequired,
        Email: PropTypes.string.isRequired
    }).isRequired
};