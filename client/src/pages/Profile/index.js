import { Tabs } from 'antd'
import React from 'react'
import Bookings from './Bookings';
import PageTitle from "../../components/PageTitle";
import TheatresList from "./TheatresList"

function Profile() {
    return (
        <div>
            <PageTitle title="Profile" />
            <Tabs defaultActiveKey='1'>
                <Tabs.TabPane tab="Bookings" key="1">
                    <Bookings/>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Apply for Theatre" key="2">
                    <TheatresList />
                </Tabs.TabPane>
            </Tabs>
        </div>
    )
}

export default Profile
