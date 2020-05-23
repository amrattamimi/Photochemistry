import React, { Component } from 'react'
import { Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';
import {closeModal} from "../../modals/modalActions"
 
const mapStateToProps = {closeModal};
 class favList extends Component {
    render() {
        return (
            <div>
                 <Modal
                size='mini'
                open={true}
                onClose={this.props.closeModal}
            >
                <Modal.Header>
                    Sign up to PhotoChemsitry 
                </Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <p>hey girl </p>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
                
            </div>
        )
    }
}

export default connect(null, mapStateToProps)(favList)
