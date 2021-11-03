import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import { setMovies } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView} from '../profile-view/profile-view';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './main-view.scss';

class MainView extends React.Component {

    constructor(){
        super();
        this.state = {
            user: null
        };
    }

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getMovies(accessToken);
        }
    }

    getMovies(token) {
        axios.get('https://mymoviedbcf.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
            this.props.setMovies(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    onLoggedIn(authData) {
        console.log(authData);
        this.setState({
            user: authData.user.Username
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
    }

    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
            user: null
        });
    }

    render() {
        const { movies } = this.props;
        const { user } = this.state;
    
        if (movies.length === 0) return <div className="main-view" />
    
        return (
            <Router>
                <Row className="main-view justify-content-md-center">
                    <Col>
                        <button onClick={() => {this.onLoggedOut()}} >Logout</button>
                    </Col>
                    <Route exact path="/" render={() => {
                        if (!user) return
                            <Col>
                                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                            </Col>
                        if (movies.length === 0) return <div className="main-view" />
                        return <MoviesList movies={movies}/>
                    }} />
                    <Route path="/register" render={() => {
                        if (user) return <Redirect to="/" />
                        return <Col>
                            <RegistrationView />
                        </Col>
                    }} />
                    <Route path="/movies/:movieId" render={({ match, history }) => {
                        if (!user) return
                        <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>
                        if (movies.length === 0) return <div className="main-view" />
                        return <Col md={8}>
                            <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
                        </Col>
                    }}/>
                    <Route path="/directors/:name" render={({ match, history }) => {
                        if (!user) return
                        <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>
                        if (movies.length === 0) return <div className="main-view" />
                        return <Col md={8}>
                            <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
                        </Col>
                    }}/>
                    <Route path="/genres/:name" render={({ match, history }) => {
                        if (!user) return
                        <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>
                        if (movies.length === 0) return <div className="main-view" />
                        return <Col md={8}>
                            <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
                        </Col>
                    }}/>
                    <Route path="/users/:username" render={(history) => {
                        if (!user) return
                        <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>
                        if (movies.length === 0) return <div className="main-view" />
                        return <Col md={8}>
                            <ProfileView history={history} movies={movies} />
                        </Col>
                    }}/>
                </Row>
          </Router>
        );
    }
}

let mapStateToProps = state => {
    return { movies: state.movies }
}

export default connect(mapStateToProps, { setMovies } )(MainView);