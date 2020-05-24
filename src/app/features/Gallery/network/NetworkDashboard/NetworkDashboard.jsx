import React from 'react'
import { Grid, Header, Segment, Card } from 'semantic-ui-react'
import { firestoreConnect } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { compose } from 'redux'
import PersonCard from '../PersonCard'


// query so we can get the followers and followings information on the reducer 
const query= ({ auth }) =>{
    return[ 
        {
            collection: 'users' ,
            doc: auth.uid,
            subcollections:[{ collection:'following'}],
            storeAs:'following'

        },
        {
            collection: 'users' ,
            doc: auth.uid,
            subcollections:[{ collection:'followers'}],
            storeAs:'followers'

        }
    ]
}
const mapStateToProps= state =>({ //passing downt the actions 
    followings: state.firestore.ordered.following,
    followers: state.firestore.ordered.followers,
    auth: state.firebase.auth
})

 const NetworkDashboard = ({followings,followers}) => {
    return (
        <Grid>
            <Grid.Column width={15}>
                <Segment>
                    <Header dividing content="following me "/>
                    {/* loops over every follower and every following to the person card component  */}
                    <Card.Group itemsPerRow={8} stackable>
                        {followers && followers.map(follower => <PersonCard key={follower.id} user={follower}/>)}
                    </Card.Group>
                </Segment>
                <Segment>
                    <Header dividing content="I'm following "/>
                    <Card.Group itemsPerRow={8} stackable>
                        {followings && followings.map(following => <PersonCard key={following.id} user={following}/>)}
                    </Card.Group>
                </Segment>
            </Grid.Column>

        </Grid>
    )
}
// map state from redux store, pass props (auth ) to our firestore query 
export default compose (connect(mapStateToProps), firestoreConnect(props => query(props)))(NetworkDashboard);
