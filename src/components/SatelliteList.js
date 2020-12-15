import React, {Component} from 'react';
import { Button } from 'antd';
import { List, Avatar,Checkbox,Spin } from 'antd';
import satellite from "../assets/images/satellite.svg";


class SatelliteList extends Component {
    state = {
        selected: [],
        isLoad: false
    };


    onChange = e => {
        const { dataInfo, checked } = e.target;
        const { selected } = this.state;
        const list = this.addOrRemove(dataInfo, checked, selected);
        console.log(list);
        this.setState({ selected: list })
    }

    addOrRemove = (item, status, list) => {
        const found = list.some( entry => entry.satid === item.satid);
        if(status && !found){
            list = [...list, item]
            // list.push(item)
        }

        if(!status && found){
            list = list.filter( entry => {
                return entry.satid !== item.satid;
            });
        }
        return list;
    }

    onShowSatMap = () =>{
        this.props.onShowMap(this.state.selected);
    }



    render() {
        const satList = this.props.satInfo ? this.props.satInfo.above : [];
        // console.log(satList);
        const { isLoad } = this.props;
        return (
            <div className="sat-list-box">
                <div className="btn-container">
                    <Button className="sat-list-btn"
                            type="primary"
                            size="large"
                            onClick={this.onShowSatMap}
                    >Track on the map</Button>
                </div>

                <hr/>
                {isLoad ? (
                    <div className="spin-box">
                        <Spin tip="Loading..." size="large" />
                    </div>
                ) : (
                    <List
                        className="sat-list"
                        itemLayout="horizontal"
                        size="small"
                        dataSource={satList}
                        renderItem={item => (
                            <List.Item
                                actions={[
                                    <Checkbox dataInfo={item} onChange={this.onChange} />
                                ]}
                            >
                                <List.Item.Meta
                                    avatar={<Avatar size={50} src={satellite} />}
                                    title={<p>{item.satname}</p>}
                                    description={`Launch Date: ${item.launchDate}`}
                                />
                            </List.Item>
                        )}
                    />
                )}
            </div>
        );
    }
}

export default SatelliteList;
