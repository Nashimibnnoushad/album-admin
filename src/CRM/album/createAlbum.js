import React, { Component } from "react"
import {
    Button,
    Input,
    Spinner,
    Label,
    FormGroup,
    Card,
    CardHeader,
    CardBody, TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, CustomInput
} from "reactstrap"
import DataTable from "react-data-table-component"
import classnames from "classnames"
import {
    Edit,
    Trash,
    ChevronDown,
} from "react-feather"
import { connect } from "react-redux"
import "../../assets/scss/plugins/extensions/react-paginate.scss"
import "../../assets/scss/pages/data-list.scss"
import { CopyToClipboard } from "react-copy-to-clipboard"
import { toast, ToastContainer, Zoom } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "../../assets/scss/plugins/extensions/toastr.scss"
import './style.css'
import Avatar from '../../components/@vuexy/avatar/AvatarComponent'
// import { useDropzone } from "react-dropzone"
import Dropzone from 'react-dropzone';
import axios from 'axios'
import { saveAs } from "file-saver"

const chipColors = {
    "on hold": "warning",
    delivered: "success",
    pending: "primary",
    canceled: "danger"
}

const selectedStyle = {
    rows: {
        selectedHighlighStyle: {
            backgroundColor: "rgba(115,103,240,.05)",
            color: "#7367F0 !important",
            boxShadow: "0 0 1px 0 #7367F0 !important",
            "&:hover": {
                transform: "translateY(0px) !important"
            }
        }
    }
}
const conditionalRowStyles = [
    {
        when: row => row,
        style: {
            backgroundColor: '#c2c6dc66',
            color: "black !important",
            fontSize: "15px !important"
        },
    }
];


class createAlbum extends Component {
    constructor() {
        super();
        this.state = {
            files: [],
            category: '',
            categoryList: [{ 'id': 'engagement', 'workCategory': 'Engagement' }],
            clientList: [{ 'id': 1, 'client': 'Client 1' }, { 'id': 2, 'client': 'Client 2' }, { 'id': 3, 'client': 'Client 3' }, { 'id': 4, 'client': 'Client 4' }],
            client: '',
            clienName: '',
            active: 'engagement',
            album: [],
            coverPic: '',
            groomPic: '',
            bridePic: '',
            message: '',
            buttonStatus: false
        };
    }


    componentDidMount() {

    }


    componentDidUpdate(prevProps, prevState) {
    }

    changeCategory = (value) => {
        let selectedCategory = this.state.categoryList.find((val) => val.id == value)
        this.setState({ category: value }, () => {
            if (this.state.album.length > 0) {
                let item = []
                item = this.state.album.find((v) => v.id == selectedCategory.id)
                if (item == undefined) {
                    let albumItem = {
                        id: selectedCategory.id,
                        categoryName: selectedCategory.workCategory,
                        images: []
                    }
                    let album = this.state.album
                    album.push(albumItem)
                    this.setState({ album: album }, () => { this.enableButton() })
                }
            }
            else {
                let albumItem = {
                    id: selectedCategory.id,
                    categoryName: selectedCategory.workCategory,
                    images: []
                }
                let album = this.state.album
                album.push(albumItem)
                this.setState({ album: album }, () => { this.enableButton() })
            }
        })
    }

    handleClientChange(value) {
        let selectedClient = this.state.clientList.find((val) => val.id == value)
        this.setState({ client: value, clienName: selectedClient.client }, () => { this.enableButton() })
    }

    toggle = tab => {
        if (this.state.active !== tab) {
            this.setState({ active: tab }, () => { this.enableButton() })
        }
    }

    onDrop = (files) => {
        let newFiles = files.map(file =>
            Object.assign(file, {
                preview: URL.createObjectURL(file)
            })
        )
        let albumVal = this.state.album
        for (let i = 0; i < albumVal.length; i++) {
            if (albumVal[i].id == this.state.active) {
                newFiles.forEach(element => {
                    albumVal[i].images.push(element)
                });
            }
        }
        this.setState({ album: albumVal }, () => {
            this.enableButton()
            this.uploadFiles()
        })
    };

    coverPicChange = (e) => {
        let files = e.target.files[0]
        let newFile = Object.assign(files, {
            preview: URL.createObjectURL(files)
        })
        let coverpic = newFile
        this.setState({ coverPic: coverpic }, () => { this.enableButton() })
    }

    groomPicChange = (e) => {
        let files = e.target.files[0]
        let newFile = Object.assign(files, {
            preview: URL.createObjectURL(files)
        })
        let groompic = newFile
        this.setState({ groomPic: groompic }, () => { this.enableButton() })
    }

    bridePicChange = (e) => {
        let files = e.target.files[0]
        let newFile = Object.assign(files, {
            preview: URL.createObjectURL(files)
        })
        let bridepic = newFile
        this.setState({ bridePic: bridepic }, () => { this.enableButton() })
    }

    enableButton = () => {
        const { client, category, coverPic, bridePic, groomPic, message, album } = this.state
        this.setState({
            buttonStatus:
                // client !== '' && category !== '' && coverPic !== '' && bridePic !== '' &&
                // groomPic !== '' && message !== '' && 
                album.length !== 0
        })
    }

    onCopy = () => {
        // this.setState({ copied: true })
        toast.success("Profile URL Copied Successfully", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000
        })
    }

    uploadFiles = async () => {
        let files = this.state.album[0].images
        const formData = new FormData();
        formData.append('files', files);
        const res = await axios.post('http://localhost:5000/image/upload/engagement', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                "Authorization": `Manager Staff e62704f86aca2d8414e50bec614936cf332b2505626dec04d17f0adb64e5c84b78dfdca2be69d3de82e4e40b712cfc151fc8bd0d7b0995835cd8208f3288790cb92ae4ab21a4d6f639556ad5f72a91ccb46a594f124cecca3ee4f68e36fe3667`
            },
        });

        let albumVal = this.state.album
        for (let i = 0; i < albumVal.length; i++) {
            if (albumVal[i].id == this.state.active) {
                albumVal[i].path.push(res.data)
            }
        }
        this.setState({ album: albumVal })

    }

    saveAlbum = async () => {
        let events = this.state.album.map((item) => ({ eventId: 1, images: item.path }))
        const formData = new FormData();
        formData.append('workId', 123);
        formData.append('events', events)
        // let sendData = {
        //     "workId": 123,
        //     "events": events
        // }
        // console.log(sendData, 'sendData')
        // let fileName = 'events.json';

        // let fileToSave = new Blob([JSON.stringify(sendData, null, 4)], {
        //     type: 'application/json',
        //     name: fileName
        // });

        // window.saveAs(fileToSave, fileName);


        // make a POST request with Axios
        const res = await axios.post('http://localhost:5000/image', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                "Authorization": `Manager Staff e62704f86aca2d8414e50bec614936cf332b2505626dec04d17f0adb64e5c84b78dfdca2be69d3de82e4e40b712cfc151fc8bd0d7b0995835cd8208f3288790cb92ae4ab21a4d6f639556ad5f72a91ccb46a594f124cecca3ee4f68e36fe3667`
            },
        });

        console.log(res);
    }


    render() {
        const dropzone = {
            minHeight: '100px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: '2px dashed #7367f0',
            background: '#262c49',
            margin: '0px!important',
            textAlign: 'center'
        }
        const albumStyle = {
            minHeight: '100px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: '2px solid #7367f0',
            background: '#262c49',
            margin: '0px!important',
            textAlign: 'center'
        }
        let {
            categoryList,
            category,
            client,
            clienName,
            clientList,
            active,
            files,
            album,
            coverPic,
            groomPic,
            bridePic,
            message,
            buttonStatus
        } = this.state
        return (
            <>
                <div className="data-list-header d-flex justify-content-between flex-wrap">
                    <div className="actions-left d-flex flex-wrap">
                        <FormGroup style={{ width: '300px' }}>
                            <Label style={{ fontWeight: "bolder" }} for="category">Client<span style={{ color: 'red' }}>*</span></Label>
                            <Input
                                style={{ border: '1px solid #d9d9d9' }}
                                type="select"
                                id="client"
                                value={client}
                                onChange={e => this.handleClientChange(e.target.value)}
                                placeholder="Select Client">
                                <option value="">Select..</option>
                                {clientList.map((key, index) => {
                                    return (<option key={index} value={key.id}>{key.client}</option>)
                                })}
                            </Input>
                        </FormGroup>
                        {client !== '' &&
                            <>
                                <FormGroup style={{ width: '300px' }} className="ml-2">
                                    <Label style={{ fontWeight: "bolder" }} for="category">Category<span style={{ color: 'red' }}>*</span></Label>
                                    <Input
                                        style={{ border: '1px solid #d9d9d9' }}
                                        type="select"
                                        id="category"
                                        value={category}
                                        onChange={e => this.changeCategory(e.target.value)}
                                        placeholder="Select Category">
                                        <option value="">Select..</option>
                                        {categoryList.map((key, index) => {
                                            return (<option key={index} value={key.id}>{key.workCategory}</option>)
                                        })}
                                    </Input>
                                </FormGroup>
                            </>
                        }
                    </div>
                    <div className="actions-right d-flex flex-wrap mt-sm-0 mt-2">
                        {client !== '' &&
                            <Button
                                style={(buttonStatus) ? { height: '40px', marginTop: '18px', marginLeft: '15px' } : { height: '40px', marginTop: '18px', marginLeft: '15px', cursor: 'not-allowed' }}
                                // className="add-new-btn"
                                color="primary"
                                disabled={!buttonStatus}
                                onClick={() => this.saveAlbum()}
                                filled>
                                <span className="align-middle">Save</span>
                            </Button>
                        }
                    </div>
                </div>

                {client !== '' &&
                    <>
                        {/* Url Create */}
                        <div style={{ marginTop: '15px', marginBottom: '15px' }}>
                            <Row>
                                <Col md="2">
                                    <p style={{ marginTop: '10px', marginBottom: '0px' }}>Profile URL</p>
                                </Col>
                                <Col md='8'>
                                    <Input
                                        style={{ border: '1px solid #d9d9d9' }}
                                        type="text"
                                        id="profileurl"
                                        name="profileurl"
                                        value={`http://localhost:3001/home/${client}/${clienName.replace(/\s/g, "")}`}
                                        disabled
                                    />
                                </Col>
                                <Col md='2'>
                                    <CopyToClipboard
                                        onCopy={this.onCopy}
                                        text={`http://localhost:3001/home/${client}/${clienName.replace(/\s/g, "")}`}
                                    >
                                        <Button
                                            style={{ height: '40px', marginTop: '0px', marginLeft: '15px' }}
                                            color="success"
                                            // onClick={() => props.handleAddCategory()}
                                            filled>
                                            <span className="align-middle">Copy URL</span>
                                        </Button>
                                    </CopyToClipboard>
                                </Col>
                            </Row>
                        </div>
                        {/* Basic Details */}
                        <div>
                            <FormGroup>
                                <Label style={{ fontWeight: "bolder" }} for="category">Basic Details<span style={{ color: 'red' }}>*</span></Label>
                                <Card>
                                    <CardBody>
                                        <Row>
                                            <Col md="4" sm="12">
                                                <FormGroup>
                                                    <Label for="customFile">Cover Pic</Label>
                                                    <CustomInput
                                                        type="file"
                                                        id="coverPic"
                                                        name="coverPic"
                                                        accept="image/jpeg, image/png"
                                                        onChange={this.coverPicChange}
                                                    />
                                                    <div className="items">
                                                        <div className="gallery animate-box">
                                                            <a style={{ height: '200px !important' }} className="gallery-img image-popup" href={coverPic.preview ? coverPic.preview : ''}><img src={coverPic.preview ? coverPic.preview : ''} className="img-responsive" alt={coverPic.name ? coverPic.name : ''} /></a>
                                                        </div>
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                            <Col md="4" sm="12">
                                                <FormGroup>
                                                    <Label for="customFile">Groom</Label>
                                                    <CustomInput
                                                        type="file"
                                                        id="groomPic"
                                                        name="groomPic"
                                                        accept="image/jpeg, image/png"
                                                        onChange={this.groomPicChange}
                                                    />
                                                    {groomPic && groomPic.preview &&
                                                        <div style={{ marginLeft: '16%' }}>
                                                            <Avatar imgHeight="200px" imgWidth="200px" img={groomPic.preview ? groomPic.preview : ''} />
                                                        </div>
                                                    }
                                                </FormGroup>
                                            </Col>
                                            <Col md="4" sm="12">
                                                <FormGroup>
                                                    <Label for="customFile">Bride</Label>
                                                    <CustomInput
                                                        type="file"
                                                        id="bridePic"
                                                        name="bridePic"
                                                        accept="image/jpeg, image/png"
                                                        onChange={this.bridePicChange}
                                                    />
                                                    {bridePic && bridePic.preview &&
                                                        <div style={{ marginLeft: '16%' }}>
                                                            <Avatar imgHeight="200px" imgWidth="200px" img={bridePic.preview ? bridePic.preview : ''} />
                                                        </div>
                                                    }
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="12" sm="12">
                                                <FormGroup>
                                                    <Label for="customFile">Message</Label>
                                                    <Input
                                                        type="textarea"
                                                        id="message"
                                                        name="message"
                                                        value={message}
                                                        onChange={(e) => this.setState({ message: e.target.value }, () => { this.enableButton() })}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </FormGroup>
                        </div>

                        {/* Album Details */}
                        <div>
                            <FormGroup>
                                <Label style={{ fontWeight: "bolder" }} for="category">Albums<span style={{ color: 'red' }}>*</span></Label>
                                <Card>
                                    <CardBody>
                                        {album.length > 0 ?
                                            <>
                                                <Nav tabs>
                                                    {album.map((val, index) => {
                                                        return (
                                                            <NavItem key={index}>
                                                                <NavLink
                                                                    className={classnames({
                                                                        active: active == val.id
                                                                    })}
                                                                    onClick={() => {
                                                                        this.toggle(val.id)
                                                                    }}
                                                                >
                                                                    {val.categoryName}
                                                                </NavLink>
                                                            </NavItem>
                                                        )
                                                    })}
                                                </Nav>
                                                <TabContent activeTab={active}>
                                                    <TabPane tabId={album.find((val) => val.id == active).id}>
                                                        <Dropzone onDrop={this.onDrop}>
                                                            {({ getRootProps, getInputProps }) => (
                                                                <section className="pb-1">
                                                                    <div {...getRootProps({ className: "dropzone" })}>
                                                                        <input {...getInputProps()} accept="image/jpeg, image/png" />
                                                                        <p style={dropzone} className="">
                                                                            <em>Click/Drag&Drop Files<br />(Only *.jpeg and *.png images will be accepted)</em>
                                                                        </p>
                                                                    </div>
                                                                </section>
                                                            )}
                                                        </Dropzone>
                                                        <div className="container-fluid">
                                                            <div id="outer-block">
                                                                {album.find((v) => v.id === active).images.map((file) => {
                                                                    return (
                                                                        <div className="items" key={file.name}>
                                                                            <div className="gallery animate-box">
                                                                                <a className="gallery-img image-popup" href={file.preview}><img src={file.preview} className="img-responsive" alt={file.name} /></a>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                })}
                                                            </div>
                                                        </div>
                                                    </TabPane>
                                                </TabContent>
                                            </>
                                            :
                                            <p style={albumStyle} className="">
                                                <em>Select atleast one category</em>
                                            </p>
                                        }

                                    </CardBody>
                                </Card>
                            </FormGroup>
                        </div>
                    </>
                }

                <ToastContainer />

            </>
        )
    }
}

const mapStateToProps = state => {
    return {
    }
}

export default connect(mapStateToProps, {

})(createAlbum)
