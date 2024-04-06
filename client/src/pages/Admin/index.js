import { Tabs } from 'antd'
import React from 'react'

import PageTitle from "../../components/PageTitle";
import MoviesList from './MoviesList';

function Admin() {
    return (
        <div>
            <PageTitle title="Admin" />
            <Tabs defaultActiveKey='movies'>
                <Tabs.TabPane tab="Movies" key="movies">
                    <MoviesList />
                </Tabs.TabPane>

                <Tabs.TabPane tab="Theatres" key="theatres">
                    Theatres List
                </Tabs.TabPane>
            </Tabs>
        </div>
    )
}

export default Admin
