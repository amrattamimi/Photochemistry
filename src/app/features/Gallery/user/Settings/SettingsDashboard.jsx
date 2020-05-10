import React from 'react'
import {  Grid } from 'semantic-ui-react'
import SettingsNav from './SettingsNav'
import BasicPage from './BasicPage'
import AccountPage from './AccountPage'
import { Route, Redirect } from 'react-router-dom'
import AboutPage from './AboutPage'
import PhotosPage from './PhotosPage'

export const SettingsDashboard = () => {
    return (
        <Grid>
            <Grid.Column width ={10}>
                <Redirect exact from='/settings' to='/settings/basic'/>
                <Route path='/settings/basic' component={BasicPage}/>
                <Route path='/settings/about' component={AboutPage}/>
                <Route path='/settings/photos' component={PhotosPage}/>
                <Route path='/settings/account' component={AccountPage}/>
            </Grid.Column>
            <Grid.Column width ={3}>
                <SettingsNav/>
            </Grid.Column>
        </Grid>
    )
}
export default SettingsDashboard
