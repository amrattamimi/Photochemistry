import React, { Component } from 'react'
import { decrementCounter, incrementCounter } from './testActions'
import { Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import {openModal} from '../modals/modalActions'



const mapStateToProps =state=> ({data: state.test.data})
const mapDispatchToProps= { incrementCounter, decrementCounter,openModal}


class test extends Component  {
    render(){
    const{data,incrementCounter,decrementCounter, openModal} = this.props;
    return (
        <div>
            <h1>{data}</h1>
            <Button onClick={incrementCounter} positive content='increment'/>
            <Button onClick={decrementCounter} negative content='decrement'/>
            <Button
          onClick={() => openModal('testModal', { data: 42 })}
          color='teal'
          content='Open Modal'
        />
            
        </div>
    )
 }
}

export default connect(mapStateToProps, mapDispatchToProps)(test)
