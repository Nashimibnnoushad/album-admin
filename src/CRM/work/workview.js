import React, { Fragment } from "react"
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Card,
    CardHeader,
    CardImg,
    CardBody,
    Row,
    Col,
} from "reactstrap"
import img1 from "../../assets/img/pages/content-img-1.jpg"
import { Smartphone, Calendar, MapPin, Award, Bookmark, Package, Server, BookOpen } from "react-feather"

class WorkView extends React.Component {

    state = {
        modal: false
    }

    toggleModal = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }))
    }

    formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        var date = [day, month, year].join('-');
        return date
    }


    render() {
        console.log(this.props.workObj, 'staff data')
        return (
            <Fragment>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggleModal}
                    className="modal-dialog-centered"
                >
                    <ModalHeader toggle={this.toggleModal} className="bg-primary">
                        Work Details
                    </ModalHeader>
                    <ModalBody>
                        <Card>
                            {/* <CardImg
                                top
                                className="img-fluid"
                                src={img1}
                                alt="card image cap"
                            /> */}
                            <CardBody className="text-center">
                                <h4>{this.props.workObj.clientName}</h4>
                                <hr className="my-2" />
                                <ul className="activity-timeline timeline-left list-unstyled">
                                    <li style={{"marginRight":"75px"}}>
                                        <div className="timeline-icon bg-danger">
                                            <Smartphone size="18" />
                                        </div>
                                        <div className="timeline-info">
                                            <p className="font-weight-bold">Phone Number</p>
                                            <span>{this.props.workObj.phone}</span>
                                        </div>
                                        
                                    </li>
                                    <li style={{"marginRight":"75px"}}>
                                        <div className="timeline-icon bg-danger">
                                            <Award size="18" />
                                        </div>
                                        <div className="timeline-info">
                                            <p className="font-weight-bold">Event</p>
                                            <span>{this.props.workObj.event}</span>
                                        </div>
                                    </li>
                                    <li style={{"marginRight":"75px"}}>
                                        <div className="timeline-icon bg-danger">
                                            <Bookmark size="18" />
                                        </div>
                                        <div className="timeline-info">
                                            <p className="font-weight-bold">Event Type</p>
                                            <span>{this.props.workObj.eventType}</span>
                                        </div>
                                    </li>
                                    <li style={{"marginRight":"75px"}}>
                                        <div className="timeline-icon bg-danger">
                                            <Server size="18" />
                                        </div>
                                        <div className="timeline-info">
                                            <p className="font-weight-bold">Religion</p>
                                            <span>{this.props.workObj.religion}</span>
                                        </div>
                                    </li>
                                    <li style={{"marginRight":"75px"}}>
                                        <div className="timeline-icon bg-danger">
                                            <MapPin size="18" />
                                        </div>
                                        <div className="timeline-info">
                                            <p className="font-weight-bold">Location</p>
                                            <span>{this.props.workObj.location}</span>
                                        </div>
                                    </li>
                                    <li style={{"marginRight":"75px"}}>
                                        <div className="timeline-icon bg-danger">
                                            <Calendar size="18" />
                                        </div>
                                        <div className="timeline-info">
                                            <p className="font-weight-bold">Engagement Date</p>
                                            <span>{this.formatDate(this.props.workObj.engagementDate)}</span>
                                        </div>
                                    </li>
                                    <li style={{"marginRight":"75px"}}>
                                        <div className="timeline-icon bg-danger">
                                            <Calendar size="18" />
                                        </div>
                                        <div className="timeline-info">
                                            <p className="font-weight-bold">Wedding Date</p>
                                            <span>{this.formatDate(this.props.workObj.weddingDate)}</span>
                                        </div>
                                    </li>
                                    <li style={{"marginRight":"75px"}}>
                                        <div className="timeline-icon bg-danger">
                                            <Calendar size="18" />
                                        </div>
                                        <div className="timeline-info">
                                            <p className="font-weight-bold">Reception Date</p>
                                            <span>{this.formatDate(this.props.workObj.receptionDate)}</span>
                                        </div>
                                    </li>
                                    <li style={{"marginRight":"75px"}}>
                                        <div className="timeline-icon bg-danger">
                                            <Package size="18" />
                                        </div>
                                        <div className="timeline-info">
                                            <p className="font-weight-bold">Package Amount</p>
                                            <span>{this.props.workObj.packageAmount}</span>
                                        </div>
                                    </li>
                                    <li style={{"marginRight":"75px"}}>
                                        <div className="timeline-icon bg-danger">
                                            <BookOpen size="18" />
                                        </div>
                                        <div className="timeline-info">
                                            <p className="font-weight-bold">Album Leaf</p>
                                            <span>{this.props.workObj.albumLeaf}</span>
                                        </div>
                                    </li>
                                   
                                </ul>

                            </CardBody>
                        </Card>
                    </ModalBody>
                    {/* <ModalFooter>
                        <Button color="danger" onClick={(e) => this.toggleModal()}>
                            Close
                        </Button>{" "}
                    </ModalFooter> */}
                </Modal>
            </Fragment>
        )
    }
}
export default WorkView
