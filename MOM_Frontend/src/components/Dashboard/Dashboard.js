import React, { Component } from 'react'
import Sidebar from './Sidebar.js'
import Card from './OutlinedCard.js'
import { trackPromise } from 'react-promise-tracker';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            meetList: [],
            loaded: false
        }
    }

    getMeet = () => {
        let token = localStorage.getItem('token');
        //console.log("token", token);
        if (token) {
            trackPromise(
                fetch('http://localhost:8000/api/current_user/', {
                    headers: {
                        Authorization: `JWT ${localStorage.getItem('token')}`
                    }
                })
                    .then(res => res.json())
                    .then(json => {
                        if (json === undefined || json.email === '' || json.email === undefined) {
                            return;
                        }
                        else {
                            fetch('http://localhost:8000/api/getMeet', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': "application/json",
                                    Authorization: `JWT ${localStorage.getItem('token')}`
                                },
                                body: JSON.stringify({ email: json.email })
                            })
                                .then(res => res.json())
                                .then(req2 => {
                                    let dashboardContent = [];
                                    req2.forEach(element => {
                                        dashboardContent.push(element);
                                    });
                                    //console.log("dashboardContent", dashboardContent);
                                    this.setState({ meetList: dashboardContent, loaded: true});
                                    return (dashboardContent);
                                });
                        }
                    })
            );
        }
    }

    logoutHandler = () => {
        localStorage.removeItem('token');
        this.props.manageState({ logged_in: false, email: '', name: '' });
    }

    componentDidMount() {
        let token = localStorage.getItem('token');
        if (token) {
            fetch('http://localhost:8000/api/current_user/', {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`
                }
            })
                .then(res => res.json())
                .then(json => {
                    if (json === undefined || json.email === '' || json.email === undefined) {
                        this.props.manageState({ logged_in: false, email: '', name: '' });
                    }
                    else {
                        // If token is correct
                        this.props.manageState({ logged_in: true, email: json.email, name: json.name });
                        this.getMeet();
                    }
                })
        }
    }

    render() {

        const logged_in_dashboard = (
            <div>
                <Sidebar logoutHandler={this.logoutHandler} user={this.props.userState.email} name={this.props.userState.name} meetL={this.state.meetList}>
                    {!this.state.loaded ? <LoadingIndicator color="#000000" /> : null}
                </Sidebar>
            </div>)

        const logged_out_dashboard = (
            <div>
            </div>)
        return (
            <div>
                {this.props.userState.logged_in ? logged_in_dashboard : logged_out_dashboard}
            </div>
        )
    }
}

export default Dashboard;
