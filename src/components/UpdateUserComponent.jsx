import React, { Component } from 'react';
import UserService from '../services/UserService';

class UpdateUserComponent extends Component {
    constructor(props) {
        super(props)

        this.state ={
            id: this.props.match.params.id,
            firstName: '',
            lastName: '',
            points: '',
            total: ''
        }

        this.makeAPayment = this.makeAPayment.bind(this);
    }

    componentDidMount(){
        UserService.getUserById(this.state.id).then( (res) =>{
            let user = res.data;
            this.setState({
                total: user.total
            });
        });
    }

    makeAPayment = (e) =>{
        e.preventDefault();
        let user = {total: this.state.total};
        console.log('user price => ', JSON.stringify(this.state.total));
        UserService.makePayment(user, this.state.id).then( res => {
            this.props.history.push(`/users`);
        });
    }

    changePrice = (event) => {
        this.setState({total: event.target.value});
    }

    cancel(){
        this.props.history.push('/users');
    }


    render() {
        return (
            <div>
                <br/>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            <h2 className="text-center">Make a Payment</h2>
                            <div className="card-body">
                                <form>
                                    <div>
                                        <label>Payment amount:</label>
                                        <input type="number" placeholder="0.00" name="price" className="form-control"
                                            value={this.state.price} onChange={this.changePrice}/>
                                    </div>

                                    <button className="btn btn-success" onClick={this.makeAPayment}>Make A Payment</button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)}>Cancel</button>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UpdateUserComponent;