import { Tabs } from 'antd'
import React from 'react'

import PageTitle from "../../components/PageTitle";

function Profile() {
    return (
        <div>
            <PageTitle title="Profile" />
            <Tabs defaultActiveKey='1'>
                <Tabs.TabPane tab="Bookings" key="1">
                    Bookings
                </Tabs.TabPane>
                <Tabs.TabPane tab="Apply for Theatre" key="2">
                    Theatres List
                </Tabs.TabPane>
            </Tabs>
        </div>
    )
}

export default Profile
