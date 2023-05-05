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
import { BACKEND_URL } from "../../services/hostSetting"

const token = JSON.parse(localStorage.getItem('crmtoken'))
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
            categoryList: [
                { 'id': 0, 'workCategory': 'Wedding', 'apiCall': 'wedding' },
                { 'id': 1, 'workCategory': 'Engagement', 'apiCall': 'engagement' },
                { 'id': 2, 'workCategory': 'Reception', 'apiCall': 'reception' },
                { 'id': 3, 'workCategory': 'Save the Date', 'apiCall': 'savethedate' },
                { 'id': 4, 'workCategory': 'Post Wedding', 'apiCall': 'postwedding' },
                { 'id': 5, 'workCategory': 'Haldi', 'apiCall': 'haldi' },
                { 'id': 6, 'workCategory': 'Mehandi', 'apiCall': 'mehandi' },
            ],
            clientList: [],
            client: '',
            clienName: '',
            active: '',
            album: [],
            coverPic: '',
            groomPic: '',
            bridePic: '',
            message: '',
            buttonStatus: false,
            loading:false
        };
    }


    componentDidMount = async() => {
        this.getClientList()
    }


    componentDidUpdate(prevProps, prevState) {
    }

    capitalizeFirstLetter(string) {
        let str1 = string.toLowerCase()
        let str2 = str1.charAt(0).toUpperCase()
        let str3 = str1.slice(1)
        let str4 = str2 + str3
        return str4;
    }

    getClientList = async() =>{
        const res = await axios.get(`${BACKEND_URL}client`, {
            headers: {
                "Authorization": `Staff ${token}`
            },
        });
        this.setState({
            clientList: res?.data?.length > 0 ? res.data.map(function(val){return {'id': val.id, 'client': val.clientTitleName }}) : []
        })
    }

    getClientDetails = async() =>{
        this.setState({loading: true})
        const res = await axios.get(`${BACKEND_URL}image/getimages?workid=${this.state.client}`, {
            headers: {
                "Authorization": `Staff ${token}`
            },
        });
        let clientData = res.data
        this.setState({
            category: '',
            active: clientData?.imageData?.length > 0 ? clientData?.imageData[0].eventId : '',
            coverPic: clientData?.client?.coverPic ? clientData?.client?.coverPic : "",
            groomPic: clientData?.client?.groomPic ? clientData?.client?.groomPic : "",
            bridePic: clientData?.client?.bridePic ? clientData?.client?.bridePic : "",
            message: clientData?.client?.description ? clientData?.client?.description : "",
            album: clientData?.imageData?.length > 0 ? clientData?.imageData.map((item) => ({ id: item.eventId, categoryName: this.capitalizeFirstLetter(item.eventName), images: item.imagePath, path: item.imagePath })) : []
        })
        this.setState({loading: false})
    }

    changeCategory = (value) => {
        let selectedCategory = this.state.categoryList.find((val) => val.id == value)
        this.setState({ category: value }, () => {
            if(this.state.active === ''){
                this.setState({active: selectedCategory.id})
            }
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
                this.setState({ album: album }, () => { this.enableButton()})
            }
        })
    }

    handleClientChange(value) {
        this.setState({loading:true})
        let selectedClient = this.state.clientList.find((val) => val.id == value)
        this.setState({ client: value, clienName: selectedClient.client }, () => { 
            this.getClientDetails()
            this.enableButton() 
        })
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
                let images = albumVal[i].images
                let newImages = newFiles
                albumVal[i].images = images.concat(newImages)
            }
        }
        this.setState({ album: albumVal }, () => {
            this.enableButton()
            this.uploadFiles(files)
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

    uploadFiles = async (files) => {
        // let files = this.state.album[0].images
        let selectedCategory = this.state.categoryList.find((val) => val.id == this.state.active)
        const formData = new FormData();
        for(let i=0;i<files.length;i++){
            formData.append('files',files[i],files[i].name)
        }
        // formData.append('files', files);
        const res = await axios.post(`${BACKEND_URL}image/upload/${selectedCategory.apiCall}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                "Authorization": `Staff ${token}`
            },
        });
        let albumVal = this.state.album
        for (let i = 0; i < albumVal.length; i++) {
            if (albumVal[i].id == this.state.active) {
                if(albumVal[i].path===undefined){
                    albumVal[i].path = res.data
                }
                else{
                    res.data.map((val)=> albumVal[i].path.push(val))
                }
            }
        }
        this.setState({ album: albumVal })

    }

    saveAlbum = async () => {
        let events = this.state.album.map((item) => ({ eventId: item.id, images: item.path }))

        const formData = {
            "events": events,
            "workId": this.state.client
        }
        const res = await axios.post(`${BACKEND_URL}image/submit`, formData, {
            headers: {
                "Authorization": `Staff ${token}`
            },
        });

        if(res.status === 200){
            toast.success("Client Details Saved Successfully", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000
            })
            this.getClientDetails()
        }
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
            buttonStatus,
            loading
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
                        {!loading && client !== '' &&
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
                        {!loading && client !== '' &&
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

                {!loading && client !== '' &&
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
                                                                {album.find((v) => v.id === active).images.map((file,index) => {
                                                                    return (
                                                                        <div className="items" key={index}>
                                                                            <div className="gallery animate-box">
                                                                                <a className="gallery-img image-popup" href={file.preview?file.preview:file}><img src={file.preview?file.preview:file} className="img-responsive" alt={file.name?file.name:'images'} /></a>
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
