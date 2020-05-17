import React from 'react'
import {  Grid } from 'semantic-ui-react'
import SettingsNav from './SettingsNav'
import BasicPage from './BasicPage'
import AccountPage from './AccountPage'
import { Route, Redirect } from 'react-router-dom'
import AboutPage from './AboutPage'
import PhotosPage from './PhotosPage'
import { updatePassword } from '../../../auth/Login/Register/authActions'
import { connect } from 'react-redux'
import { updateProfile } from '../UserDetailed/userActions'




const mapDispatchToProps={
    updateProfile,
    updatePassword
}

const mapStateToProps= state=>({
    user: state.firebase.profile
})


export const SettingsDashboard = ({updatePassword,user,updateProfile}) => {
    return (
        <Grid>
            <Grid.Column width ={10}>
                {/* <Redirect exact from='/settings' to='/settings/basic'/> */}
                <Route path='/settings/basic'
                 render={()=> <BasicPage initialValues={user} updateProfile={updateProfile}/>}// passing down the initial values as the user name in firestore
                 />
                <Route path='/settings/about' 
                render={()=> <AboutPage initialValues={user} updateProfile={updateProfile}/>}
                />
                
                <Route path='/settings/photos' component={PhotosPage}/>
                <Route path='/settings/account' 
                render={()=> <AccountPage updatePassword={updatePassword}/>}
                />
            </Grid.Column>
            <Grid.Column width ={3}>
                <SettingsNav/>
            </Grid.Column>
        </Grid>
    )
}
export default connect(mapStateToProps, mapDispatchToProps)(SettingsDashboard)
