import React, {Component} from 'react';
import { Button, Spin, List, Avatar, Checkbox } from 'antd';

import satellite from '../assets/images/satellite.svg';

class SatelliteList extends Component {
    state = {
        selected: []
    }

    render() {
        const { selected } = this.state;
        const {satInfo, isLoad} = this.props;
        const satList = satInfo ? satInfo.above : [];

        return (
            <div className="sat-list-box">
                <Button className="sat-list-btn" size="large"
                        disabled={ selected.length === 0}
                        onClick={this.showMap} >
                    Track on the map
                </Button>
                <hr/>
                {
                    isLoad ?
                        <div className="spin-box">
                            <Spin tip="Loading..." size="large"/>
                        </div>
                        :
                        <List className="sat-list"
                              itemLayout="horizontal"
                              dataSource={satList}
                              renderItem={ item => (
                                  <List.Item actions={[<Checkbox dataInfo={item} onChange={this.onChange}/>]}>
                                      <List.Item.Meta
                                          avatar={<Avatar src={satellite} size="large" alt="satellite"/>}
                                          title={<p>{item.satname}</p>}
                                          description={`Launch Date: ${item.launchDate}`}
                                      />
                                  </List.Item>
                              )}
                        />
                }
            </div>
        );
    }

    showMap = () => {
        const { selected } = this.state;
        this.props.onShowMap(selected);
    }

    onChange = e => {
        const { dataInfo, checked } = e.target;
        const { selected } = this.state;
        const list = this.addOrRemove(dataInfo, checked, selected);
        this.setState({
            selected: list
        })
    }

    addOrRemove = (item, status, list) => {
        const found = list.some( entry => entry.satid === item.satid );

        if(status && !found) {
            list.push(item);
        }

        if(!status && found) {
            list = list.filter( entry => entry.satid !== item.satid);
        }

        return list;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.satInfo !== this.props.satInfo) {
            this.setState({selected: []})
        }
    }
}

export default SatelliteList;
