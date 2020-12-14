import React, {Component} from 'react';
import { Button } from 'antd';

class SatelliteList extends Component {
    render() {
        const satList = this.props.satInfo ? this.props.satInfo.above : [];
        console.log(satList);
        return (
            <div className="sat-list-box">
                <div className="btn-container">
                    <Button className="sat-list-btn"
                            type="primary"
                            size="large">Track on the map</Button>
                </div>

                <hr/>
                <div>data</div>
            </div>
        );
    }
}

export default SatelliteList;
