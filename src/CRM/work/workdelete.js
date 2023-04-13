import React, { Fragment } from "react"
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "reactstrap"

class WorkDelete extends React.Component {

    state = {
        modal: false
    }

    toggleModal = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }))
    }

    DeleteUser = (row) => {
        this.toggleModal()
        this.props.notifyDeleted();
        // this.props.deleteWork(row.workId).then(() => {
        //     if (this.props.workList && this.props.workList.work && this.props.workList.work.workDelete) {
        //         this.toggleModal()
        //         this.props.notifyDeleted();
        //         this.props.handleRefresh('success')
        //     } else {
        //         this.props.notifyError()
        //     }
        // })
    }

    render() {
        return (
            <Fragment>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggleModal}
                    className="modal-dialog-centered"
                >
                    <ModalHeader toggle={this.toggleModal} className="bg-primary">
                        Delete Work
                    </ModalHeader>
                    <ModalBody>
                        <h5>Are you sure to delete this work category?</h5>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={(e) => this.toggleModal()}>
                            Cancel
                        </Button>{" "}
                        <Button color="primary"
                            disabled={this.props.workList && this.props.workList.work && this.props.workList.work.isworkdeleteLoading}
                            onClick={(e) => this.DeleteUser(this.props.workObj)}>
                            Delete
                        </Button>{" "}
                    </ModalFooter>
                </Modal>
            </Fragment>
        )
    }
}
export default WorkDelete
