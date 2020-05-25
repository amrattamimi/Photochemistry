import React from 'react'
import { Image, Card } from 'semantic-ui-react'

const favCards = ({fav}) => { //passing down the props from favs dashbaord 
    return (
        <Card >
        <Image src={fav.photoURL || '/assets/user.png'}/>
        <Card.Content textAlign='center'>
            <Card.Header content={fav.title}/>
        </Card.Content>
        <Card.Meta textAlign="center">
            <span>{fav.date}</span>
        </Card.Meta>
        </Card>
    )
}

export default favCards