import React, {Component} from 'react';

import Form from "./form";
import Table from "./table";

class Dashboard extends Component {

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        {/*form*/}
                        <Form/>
                    </div>
                    <div className="col-md-6">
                        {/*table*/}
                        <Table/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;