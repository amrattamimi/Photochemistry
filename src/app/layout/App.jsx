import React, {Component, Fragment} from 'react';
import GalleryDashboard from '../features/Gallery/GalleryDashboard/GalleryDashboard';
import NavBar from '../features/nav/NavBar/NavBar';
import { Container } from 'semantic-ui-react';
import { Route } from 'react-router-dom';
import HomePage from '../features/Gallery/Home/HomePage';
import PhotoDetailedPage from '../features/Gallery/PhotoDetailed/PhotoDetailedPage';
import PeoplesDashboard from '../features/Gallery/user/PeopleDashboard/PeoplesDashboard';
import UserDetailedPage from '../features/Gallery/user/UserDetailed/UserDetailedPage';
import SettingsDashboard from '../features/Gallery/user/Settings/SettingsDashboard';
import GalleryForm from '../features/Gallery/GalleryForm/GalleryForm';
import FeedDashboard from '../features/Gallery/feed/FeedDashboard/FeedDashboard';
import NetworkDashboard from '../features/Gallery/network/NetworkDashboard/NetworkDashboard';
import test from '../features/testArea/test';


class App extends Component {
  render(){
  return (


    <Fragment>
      <Route exact path='/' component ={HomePage}/>
      
      <Route path='/(.+)' render ={() =>(<Fragment>
      <NavBar/>
      <Container className="main">
        
        <Route path='/gallery' component ={GalleryDashboard}/>
        <Route path='/gallery/:id' component ={PhotoDetailedPage}/>
        <Route path='/people' component ={PeoplesDashboard}/>
        <Route path='/profile/:id' component ={UserDetailedPage}/>
        <Route path='/settings' component ={SettingsDashboard}/>
        <Route path='/createPost' component ={GalleryForm}/>
        <Route path='/feed' component ={FeedDashboard}/>
        <Route path='/network' component ={NetworkDashboard}/>
        <Route path='/test' component ={test}/>

     </Container>
     </Fragment>)}/>

      

    </Fragment>
    
  );
}
}

export default App;
