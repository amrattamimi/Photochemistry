import React from 'react'
import { Link } from 'react-router-dom'
import { Image, Card } from 'semantic-ui-react'

const PersonCard = ({user}) => {
    return (
        <Card as={Link} to={`/profile/${user.id}`}>
        <Image src={user.PhotoURL || '/assets/user.png'}/>
        <Card.Content textAlign='center'>
            <Card.Header content={user.displayName}/>
        </Card.Content>
        <Card.Meta textAlign="center">
            <span>{user.city}</span>
        </Card.Meta>
        </Card>
    )
}

export default PersonCard
