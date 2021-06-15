import React, { Component } from 'react';
import UserService from '../services/UserService';

class ListUserComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            users: []
        }
        this.addUser = this.addUser.bind(this);
        this.makePayment = this.makePayment.bind(this);
    }

    makePayment(id) {
        this.props.history.push(`/make-payment/${id}`);
    }

    componentDidMount(){
        UserService.getUsers().then((res) => {
            this.setState({ users: res.data});
        });
        
    }

    addUser(){
        this.props.history.push('/add-user');
    }

    render() {
        return (
            <div>
                <h2 className="text-center">List of Users</h2>
                <div className="row">
                    <button className="btn btn-primary" onClick={this.addUser}>Add User</button>
                </div>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>User First Name</th>
                                <th>User Last Name</th>
                                <th>User Total Amount Spent</th>
                                <th>User Total Rewards Points</th>
                                <th>Actions</th>
                            </tr>

                        </thead>

                        <tbody>
                            {
                                this.state.users.map(
                                    user =>
                                    <tr key={user.id}>
                                        <td>{user.firstName}</td>
                                        <td>{user.lastName}</td>
                                        <td>{user.total}</td>
                                        <td>{user.points}</td>
                                        <td>
                                            <button onClick={ () => this.makePayment(user.id)} className="btn btn-info">Make a Payment</button>
                                        </td>
                                    </tr>
                                )
                            }

                        </tbody>

                    </table>
                </div>
            </div>
        );
    }
}

export default ListUserComponent;