import React, { Component } from "react"
import { Label, Input, FormGroup, Button, Row, Col, Form, } from "reactstrap"
import { DollarSign, Hexagon, X } from "react-feather"
import PerfectScrollbar from "react-perfect-scrollbar"
import classnames from "classnames"
import { User, Smartphone, Calendar, MapPin, Award, Bookmark, Package, Server, BookOpen } from "react-feather"
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/light.css";
import "../../assets/scss/plugins/forms/flatpickr/flatpickr.scss"

const eventOptions = [
  { value: "Engagement", label: "Engagement" },
  { value: "Wedding", label: "Wedding" },
  { value: "Reception", label: "Reception" },
  { value: "Engagement & Wedding", label: "Engagement - Wedding" },
  { value: "Engagement & Reception", label: "Engagement - Reception" },
  { value: "Reception & Wedding", label: "Reception - Wedding" },
  { value: "Engagement - Wedding - Reception", label: "Engagement - Wedding - Reception" }
]

const eventtypeOptions = [
  { value: "Single Side", label: "Single Side" },
  { value: "Bride & Groom", label: "Bride & Groom" }
]

const religionOptions = [
  { value: "Hindu", label: "Hindu" },
  { value: "Muslim", label: "Muslim" },
  { value: "Christian", label: "Christian" }
]

class WorkSidebar extends Component {
  state = {
    clientName: "",
    phone: "",
    event: "Engagement",
    location: "",
    eventType: "Single Side",
    engagementDate: new Date(),
    weddingDate: new Date(),
    receptionDate: new Date(),
    religion: "Hindu",
    packageAmount: "",
    albumLeaf: "",
    phoneValid: null,
    phoneValidationMessage: "",
    canSubmit: false,
    engagementhide: false,
    weddinghide: true,
    receptionhide: true,
    bankId:'',
    advance: 0
  }

  addNew = false

  componentDidUpdate(prevProps, prevState) {
    console.log(this.props.data, 'passed data')
    if (this.props.data !== null && prevProps.data === null) {
      if (this.props.data.clientName !== prevState.clientName) {
        if (this.props.data.clientName === null || this.props.data.clientName === "") {
          this.setState({ clientName: '' })
        }
        else {
          this.setState({ clientName: this.props.data.clientName })
        }
      }
      if (this.props.data.phone !== prevState.phone) {
        if (this.props.data.phone === null || this.props.data.phone === "") {
          this.handlePhoneChange('')
        }
        else {
          this.handlePhoneChange(this.props.data.phone)
        }
      }
      if (this.props.data.event !== prevState.event) {
        if (this.props.data.event === null || this.props.data.event === "") {
          this.handleEventChange('Engagement')
        }
        else {
          // this.setState({ event: this.props.data.event })
          this.handleEventChange(this.props.data.event)
        }
      }
      if (this.props.data.eventType !== prevState.eventType) {
        if (this.props.data.eventType === null || this.props.data.eventType === "") {
          this.setState({ eventType: 'Single Side' })
        }
        else {
          this.setState({ eventType: this.props.data.eventType })
        }
      }
      if (this.props.data.religion !== prevState.religion) {
        if (this.props.data.religion === null || this.props.data.religion === "") {
          this.setState({ religion: 'Hindu' })
        }
        else {
          this.setState({ religion: this.props.data.religion })
        }
      }
      if (this.props.data.location !== prevState.location) {
        if (this.props.data.location === null || this.props.data.location === "") {
          this.setState({ location: '' })
        }
        else {
          this.setState({ location: this.props.data.location })
        }
      }
      if (this.props.data.engagementDate !== prevState.engagementDate) {
        if (this.props.data.engagementDate === null || this.props.data.engagementDate === "") {
          this.setState({ engagementDate: new Date() })
        }
        else {
          this.setState({ engagementDate: this.formatDate(this.props.data.engagementDate) })
        }
      }
      if (this.props.data.weddingDate !== prevState.weddingDate) {
        if (this.props.data.weddingDate === null || this.props.data.weddingDate === "") {
          this.setState({ weddingDate: new Date() })
        }
        else {
          this.setState({ weddingDate: this.formatDate(this.props.data.weddingDate) })
        }
      }
      if (this.props.data.receptionDate !== prevState.receptionDate) {
        if (this.props.data.receptionDate === null || this.props.data.receptionDate === "") {
          this.setState({ receptionDate: new Date() })
        }
        else {
          this.setState({ receptionDate: this.formatDate(this.props.data.receptionDate) })
        }
      }
      if (this.props.data.packageAmount !== prevState.packageAmount) {
        if (this.props.data.packageAmount === null || this.props.data.packageAmount === "") {
          this.setState({ packageAmount: '' })
        }
        else {
          this.setState({ packageAmount: this.props.data.packageAmount })
        }
      }
      if (this.props.data.albumLeaf !== prevState.albumLeaf) {
        if (this.props.data.albumLeaf === null || this.props.data.albumLeaf === "") {
          this.setState({ albumLeaf: '' })
        }
        else {
          this.setState({ albumLeaf: this.props.data.albumLeaf })
        }
      }
      if (this.props.data.bankId !== prevState.bankId) {
        if (this.props.data.bankId === null || this.props.data.bankId === "" || this.props.data.bankId == undefined) {
          this.setState({ bankId: '' })
        }
        else {
          this.setState({ bankId: this.props.data.bankId })
        }
      }
      if (this.props.data.advance !== prevState.advance) {
        if (this.props.data.advance === null || this.props.data.advance === "" || this.props.data.advance == undefined) {
          this.setState({ advance: '' })
        }
        else {
          this.setState({ advance: this.props.data.advance })
        }
      }

    }
    if (this.props.data === null && prevProps.data !== null) {
      this.setState({
        clientName: "",
        phone: "",
        event: "Engagement",
        location: "",
        eventType: "Single Side",
        engagementDate: new Date(),
        weddingDate: new Date(),
        receptionDate: new Date(),
        religion: "Hindu",
        packageAmount: "",
        albumLeaf: "",
        phoneValid: null,
        phoneValidationMessage: "",
        canSubmit: false,
        engagementhide: false,
        weddinghide: true,
        receptionhide: true,
        bankId:'',
        advance: 0
      })
    }
    if (this.addNew) {
      this.setState({
        clientName: "",
        phone: "",
        event: "Engagement",
        location: "",
        eventType: "Single Side",
        engagementDate: new Date(),
        weddingDate: new Date(),
        receptionDate: new Date(),
        religion: "Hindu",
        packageAmount: "",
        albumLeaf: "",
        phoneValid: null,
        phoneValidationMessage: "",
        canSubmit: false,
        engagementhide: false,
        weddinghide: true,
        receptionhide: true,
        bankId:'',
        advance: 0
      })
    }
    this.addNew = false
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

  sendformatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    var date = [year, day, month].join('-');
    return date
  }


  handlePhoneChange = (value) => {
    this.setState({ phone: value })
    var decimal = /^\d{10}$/;
    if (value.match(decimal)) {
      this.setState({ phoneValidationMessage: "", canSubmit: true, phoneValid: true })
      return true;
    }
    else {
      if (value === "") {
        this.setState({ phoneValidationMessage: "", canSubmit: false, phoneValid: false })
      }
      else {
        this.setState({ canSubmit: false, phoneValid: false, phoneValidationMessage: "Invalid Phone Number!" })
      }
      return false;
    }
  }

  handleEventChange = (value) => {
    this.setState({ event: value })
    if (value === "Engagement") {
      this.setState({ engagementhide: false })
      this.setState({ weddinghide: true })
      this.setState({ receptionhide: true })
    }
    else if (value === "Wedding") {
      this.setState({ engagementhide: true })
      this.setState({ weddinghide: false })
      this.setState({ receptionhide: true })
    }
    else if (value === "Reception") {
      this.setState({ engagementhide: true })
      this.setState({ weddinghide: true })
      this.setState({ receptionhide: false })
    }
    else if (value === "Engagement & Wedding") {
      this.setState({ engagementhide: false })
      this.setState({ weddinghide: false })
      this.setState({ receptionhide: true })
    }
    else if (value === "Engagement & Reception") {
      this.setState({ engagementhide: false })
      this.setState({ weddinghide: true })
      this.setState({ receptionhide: false })
    }
    else if (value === "Reception & Wedding") {
      this.setState({ engagementhide: true })
      this.setState({ weddinghide: false })
      this.setState({ receptionhide: false })
    }
    else if (value === "Engagement - Wedding - Reception") {
      this.setState({ engagementhide: false })
      this.setState({ weddinghide: false })
      this.setState({ receptionhide: false })
    }
  }


  handleSubmit = obj => {
    let senddata = {}
    senddata.advance = obj.advance;
    senddata.bankId = obj.bankId;
    senddata.clientName = obj.clientName;
    senddata.phone = obj.phone;
    senddata.event = obj.event;
    senddata.location = obj.location;
    senddata.eventType = obj.eventType;
    senddata.religion = obj.religion;
    senddata.packageAmount = obj.packageAmount;
    senddata.albumLeaf = obj.albumLeaf;
    if (!Array.isArray(obj.engagementDate)) {
      senddata.engagementDate = this.sendformatDate(obj.engagementDate)
    }
    else {
      senddata.engagementDate = obj.engagementDate
    }
    if (!Array.isArray(obj.weddingDate)) {
      senddata.weddingDate = this.sendformatDate(obj.weddingDate)
    }
    else {
      senddata.weddingDate = obj.weddingDate
    }
    if (!Array.isArray(obj.receptionDate)) {
      senddata.receptionDate = this.sendformatDate(obj.receptionDate)
    }
    else {
      senddata.receptionDate = obj.receptionDate
    }
    console.log(senddata, 'send data')
    if (this.props.data !== null) {
      // this.props.updateData(obj)
      console.log(obj, 'update work')
      var workId = this.props.data.workId
      if (this.state.clientName !== "" && this.state.phone !== "" && this.state.event !== "" && this.state.eventType !== ""
        && this.state.religion !== ""
        && this.state.packageAmount !== "" && this.state.albumLeaf !== "") {
        if (this.state.phoneValid === true) {
          this.props.updateWork(senddata, workId).then(() => {
            if (this.props.workList && this.props.workList.work && this.props.workList.work.workUpdate) {
              this.props.handleSidebar(false, true, 'success')
              this.props.UpdateMessage()
            }
            else if (this.props.workList && this.props.workList.work && this.props.workList.work.workUpdateError) {
              this.props.notifyError()
            }
          })
        }
        else {
          this.props.validMessage()
        }
      }
      else {
        this.props.inCompleteData()
      }
    } else {
      // this.addNew = true
      console.log(obj, 'add work')
      // this.props.addData(obj)
      if (this.state.clientName !== "" && this.state.phone !== "" && this.state.event !== "" && this.state.eventType !== ""
        && this.state.religion !== ""
        && this.state.packageAmount !== "" && this.state.albumLeaf !== "") {
        if (this.state.phoneValid === true) {
          this.props.addWork(senddata).then(() => {
            if (this.props.workList && this.props.workList.work && this.props.workList.work.workAdd) {
              this.props.handleSidebar(false, true, 'success')
              this.props.AddMessage()
            }
            else if (this.props.workList && this.props.workList.work && this.props.workList.work.workAddError) {
              this.props.notifyError()
            }
          })
        }
        else {
          this.props.validMessage()
        }
      }
      else {
        this.props.inCompleteData()
      }

    }
  }

  render() {
    let { show, handleSidebar, data } = this.props
    let {
      clientName,
      phone,
      event,
      location,
      eventType,
      engagementDate,
      weddingDate,
      receptionDate,
      religion,
      packageAmount,
      albumLeaf,
      engagementhide,
      weddinghide,
      receptionhide,
      bankId,
      advance
    } = this.state
    return (
      <div
        className={classnames("data-list-sidebar", {
          show: show
        })}>
        <div className="data-list-sidebar-header mt-2 px-2 d-flex justify-content-between">
          <h4>{data !== null ? "UPDATE WORK" : "ADD NEW WORK"}</h4>
          <X size={20} onClick={() => handleSidebar(false, true)} />
        </div>
        <PerfectScrollbar
          className="data-list-fields px-2 mt-1"
          options={{ wheelPropagation: false }}>
          <Form>
            <Row>
              <Col sm="12">
                <Label for="clientName">Client Name</Label>
                <FormGroup className="has-icon-left position-relative">
                  <Input
                    type="text"
                    name="clientName"
                    value={clientName}
                    onChange={e => this.setState({ clientName: e.target.value })}
                    id="nameVerticalIcons"
                    placeholder="client Name"
                  />
                  <div className="form-control-position">
                    <User size={15} />
                  </div>
                </FormGroup>
              </Col>
              <Col sm="12">
                <Label for="lastName">Phone</Label>
                <FormGroup className="has-icon-left position-relative">
                  <Input
                    type="number"
                    name="phone"
                    id="phone"
                    placeholder="99********"
                    value={phone}
                    onChange={(e) => this.handlePhoneChange(e.target.value)}
                    valid={this.state.phoneValid === true}
                    invalid={this.state.phoneValid === false}
                  />
                  {this.state.phoneValidationMessage && <span className="invalid-tooltip"> {this.state.phoneValidationMessage}</span>}
                  <div className="form-control-position">
                    <Smartphone size={15} />
                  </div>
                </FormGroup>
              </Col>
              <Col sm="12">
                <Label for="event">Event</Label>
                <FormGroup className="has-icon-left position-relative">
                  <Input
                    type="select"
                    id="event"
                    value={event}
                    onChange={e => this.handleEventChange(e.target.value)}>
                    {eventOptions.map((key, index) => {
                      return (<option value={key.value}>{key.label}</option>)
                    })}
                  </Input>
                  <div className="form-control-position">
                    <Award size={15} />
                  </div>
                </FormGroup>
              </Col>
              <Col sm="12">
                <Label for="eventType">Event Type</Label>
                <FormGroup className="has-icon-left position-relative">
                  <Input
                    type="select"
                    id="eventType"
                    value={eventType}
                    onChange={e => this.setState({ eventType: e.target.value })}>
                    {eventtypeOptions.map((key, index) => {
                      return (<option value={key.value}>{key.label}</option>)
                    })}
                  </Input>
                  <div className="form-control-position">
                    <Bookmark size={15} />
                  </div>
                </FormGroup>
              </Col>
              <Col sm="12">
                <Label for="religion">Religion</Label>
                <FormGroup className="has-icon-left position-relative">
                  <Input
                    type="select"
                    id="religion"
                    value={religion}
                    onChange={e => this.setState({ religion: e.target.value })}>
                    {religionOptions.map((key, index) => {
                      return (<option value={key.value}>{key.label}</option>)
                    })}
                  </Input>
                  <div className="form-control-position">
                    <Server size={15} />
                  </div>
                </FormGroup>
              </Col>
              <Col sm="12">
                <Label for="location">Location</Label>
                <FormGroup className="has-icon-left position-relative">
                  <Input
                    type="text"
                    name="location"
                    value={location}
                    onChange={e => this.setState({ location: e.target.value })}
                    id="location"
                    placeholder="Location"
                  />
                  <div className="form-control-position">
                    <MapPin size={15} />
                  </div>
                </FormGroup>
              </Col>
              {!engagementhide &&
                <Col sm="12">
                  <Label for="engagementDate">Engagement Date</Label>
                  <FormGroup className="has-icon-left position-relative">
                    <Flatpickr
                      className="form-control"
                      value={engagementDate}
                      options={{ dateFormat: "d-m-Y" }}
                      onChange={date => {
                        this.setState({ engagementDate: date });
                      }}
                    />
                    <div className="form-control-position">
                      <Calendar size={15} />
                    </div>
                  </FormGroup>
                </Col>
              }
              {!weddinghide &&
                <Col sm="12">
                  <Label for="weddingDate">Wedding Date</Label>
                  <FormGroup className="has-icon-left position-relative">
                    <Flatpickr
                      className="form-control"
                      value={weddingDate}
                      options={{ dateFormat: "d-m-Y" }}
                      onChange={date => {
                        this.setState({ weddingDate: date });
                      }}
                    />
                    <div className="form-control-position">
                      <Calendar size={15} />
                    </div>
                  </FormGroup>
                </Col>
              }
              {!receptionhide &&
                <Col sm="12">
                  <Label for="receptionDate">Reception Date</Label>
                  <FormGroup className="has-icon-left position-relative">
                    <Flatpickr
                      className="form-control"
                      value={receptionDate}
                      options={{ dateFormat: "d-m-Y", }}
                      onChange={date => {
                        this.setState({ receptionDate: date });
                      }}
                    />
                    <div className="form-control-position">
                      <Calendar size={15} />
                    </div>
                  </FormGroup>
                </Col>
              }
              <Col sm="12">
                <Label for="packageAmount">Package Amount</Label>
                <FormGroup className="has-icon-left position-relative">
                  <Input
                    type="number"
                    name="packageAmount"
                    value={packageAmount}
                    onChange={e => this.setState({ packageAmount: e.target.value })}
                    id="packageAmount"
                    placeholder="Package Amount"
                  />
                  <div className="form-control-position">
                    <Package size={15} />
                  </div>
                </FormGroup>
              </Col>
              <Col sm="12">
                <Label for="albumLeaf">Album Leaf</Label>
                <FormGroup className="has-icon-left position-relative">
                  <Input
                    type="number"
                    name="albumLeaf"
                    value={albumLeaf}
                    onChange={e => this.setState({ albumLeaf: e.target.value })}
                    id="albumLeaf"
                    placeholder="Album Leaf"
                  />
                  <div className="form-control-position">
                    <BookOpen size={15} />
                  </div>
                </FormGroup>
              </Col>
              <Col sm="12">
                <Label for="bankId">Bank</Label>
                <FormGroup className="has-icon-left position-relative">
                  <Input
                    type="select"
                    id="bankId"
                    value={bankId}
                    onChange={e => this.setState({bankId:e.target.value})}>
                    <option value=''>Select..</option>
                    {this.props.bankList && this.props.bankList.map((key, index) => {
                      return (<option value={key.accountId}>{key.accountName}</option>)
                    })}
                  </Input>
                  <div className="form-control-position">
                    <Hexagon size={15} />
                  </div>
                </FormGroup>
              </Col>
              <Col sm="12">
                <Label for="advance">Advance Amount</Label>
                <FormGroup className="has-icon-left position-relative">
                  <Input
                    type="text"
                    name="advance"
                    value={advance}
                    onChange={e => this.setState({ advance: e.target.value })}
                    id="nameVerticalIcons"
                    placeholder="Advance Amount"
                  />
                  <div className="form-control-position">
                    <DollarSign size={15} />
                  </div>
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </PerfectScrollbar>
        <div className="data-list-sidebar-footer px-2 d-flex justify-content-start align-items-center mt-1">
          <Button color="primary" 
            disabled = {(this.props.workList && this.props.workList.work && this.props.workList.work.isworkaddLoading)|| (this.props.workList && this.props.workList.work && this.props.workList.work.isworkupdateLoading)}
            onClick={() => this.handleSubmit(this.state)}>
            {data !== null ? "Update" : "Submit"}
          </Button>
          <Button
            className="ml-1"
            color="danger"
            outline
            onClick={() => handleSidebar(false, true)}>
            Cancel
          </Button>
        </div>
      </div>
    )
  }
}
export default WorkSidebar
