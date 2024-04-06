import { Tabs } from 'antd'
import React from 'react'

import PageTitle from "../../components/PageTitle";

function Admin() {
    return (
        <div>
            <PageTitle title="Admin" />
            <Tabs defaultActiveKey='movies'>
                <Tabs.TabPane tab="Movies" key="movies">
                    Movies List
                </Tabs.TabPane>
                <Tabs.TabPane tab="Theatres" key="theatres">
                    Theatres List
                </Tabs.TabPane>
            </Tabs>
        </div>
    )
}

export default Admin
