import React from 'react'
import { Link } from 'react-router-dom'
import { Image, Card } from 'semantic-ui-react'

const favCards = ({fav}) => {
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