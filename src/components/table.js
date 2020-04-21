import React, {Component} from 'react';

const axios = require('axios');

class Table extends Component {

    constructor(props) {
        super(props);
        this.state = {
          users: null
        };
    }

    componentDidMount() {

        var self = this;
        //get data from the database
        axios.get('http://localhost:5000/user')
            .then(function (response) {
                // handle success
                console.log(response.data);
                self.setState({users: response.data})
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }

    render() {
        let users;
        if (this.state.users !== null){
            users = this.state.users.map((user) => {
                return(
                    <tr>
                        <td>{user.name}</td>
                        <td>{user.nic}</td>
                        <td>{user.gender}</td>
                    </tr>
                );
            });
        }

        return (
            <div>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">NIC</th>
                        <th scope="col">Gender</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Table;