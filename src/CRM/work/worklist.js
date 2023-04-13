import React, { Component } from "react"
import {
  Button,
  Input,
  Spinner,
  Label,
  FormGroup,
} from "reactstrap"
import DataTable from "react-data-table-component"
import classnames from "classnames"
import {
  Edit,
  Trash,
  ChevronDown,
} from "react-feather"
import { connect } from "react-redux"
import WorkDelete from './workdelete';
import "../../assets/scss/plugins/extensions/react-paginate.scss"
import "../../assets/scss/pages/data-list.scss"
import { toast, ToastContainer, Zoom } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "../../assets/scss/plugins/extensions/toastr.scss"

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

const ActionsComponent = props => {
  return (
    <div className="data-list-action">
      <Edit
        className="cursor-pointer mr-1"
        size={20}
        onClick={() => {
          return props.currentData(props.row)
        }}
      />
      <Trash
        className="cursor-pointer"
        size={20}
        onClick={() => {
          props.deleteRow(props.row)
        }}
      />
    </div>
  )
}

const CustomHeader = props => {
  return (
    <div className="data-list-header d-flex justify-content-between flex-wrap">
      <div className="actions-left d-flex flex-wrap">
        <FormGroup style={{ width: '300px' }}>
          <Label style={{ fontWeight: "bolder" }} for="category">Category<span style={{ color: 'red' }}>*</span></Label>
          <Input
            style={{ border: '1px solid #d9d9d9' }}
            type="text"
            name="category"
            value={props.category}
            onChange={e => props.changeCategory(e.target.value)}
            id="category"
            placeholder="Work Category">
          </Input>
        </FormGroup>
        {props.editMode ?
          <Button
            style={props.category == '' ? { height: '40px', marginTop: '18px', marginLeft: '15px', cursor: 'not-allowed' } : { height: '40px', marginTop: '18px', marginLeft: '15px' }}
            // className="add-new-btn"
            color="primary"
            disabled={props.category == ''}
            onClick={() => props.handleUpdateCategory()}
            filled>
            <span className="align-middle">Update</span>
          </Button>
          :
          <Button
            style={props.category == '' ? { height: '40px', marginTop: '18px', marginLeft: '15px', cursor: 'not-allowed' } : { height: '40px', marginTop: '18px', marginLeft: '15px' }}
            // className="add-new-btn"
            color="primary"
            disabled={props.category == ''}
            onClick={() => props.handleAddCategory()}
            filled>
            <span className="align-middle">Add New</span>
          </Button>
        }
      </div>
    </div>
  )
}

const notifyUpdate = () => toast.info("Work Category Updated Successfully", { transition: Zoom })
const notifyBounce = () => toast.success("Work Category Added Successfully", { transition: Zoom })
const notifyError = () => toast.warning("Something went wrong.Please try again..", { transition: Zoom })
const notifyDeleted = () => toast.success("Work deleted Succesfully", { transition: Zoom })

class WorkList extends Component {
  notifySuccess = () =>
    toast.error("Work Added Successfully", {
      position: toast.POSITION.TOP_RIGHT,
      transition: Zoom
    })


  state = {
    data: [{ 'id': 1, 'workCategory': 'Highlights' }, { 'id': 2, 'workCategory': 'Mehandi/Haldi' }, { 'id': 3, 'workCategory': 'Wedding' }, { 'id': 4, 'workCategory': 'Reception' }],
    totalPages: 0,
    currentPage: 0,
    columns: [
      {
        name: "Sl.No",
        selector: "id",
        sortable: true,
        // minWidth: "240px",
        // maxWidth: "25%",
        cell: row => (<span>{row.id}</span>),
      },
      {
        name: "Work Category",
        selector: "workCategory",
        sortable: true,
        minWidth: "75%",
        maxWidth: "75%",
        cell: row => (<span>{row.workCategory}</span>),
      },
      {
        name: "Actions",
        sortable: true,
        // minWidth: "140px",
        // maxWidth: "14%",
        cell: row => (
          <ActionsComponent
            row={row}
            currentData={this.handleCurrentData}
            deleteRow={this.handleDelete}
          />
        )
      }
    ],
    allData: [],
    value: "",
    currentData: null,
    workObj: "",
    category: '',
    editMode: false
  }
  child = React.createRef();
  view = React.createRef();

  componentDidMount() {
    // this.GetAllWorkData(1)
  }

  GetAllWorkData(pageno) {
    // this.props.getWorkList(pageno).then(() => {
    //   if (this.props.workList && this.props.workList.work && this.props.workList.work.workList && this.props.workList.work.workList.result) {
    //     this.setState({
    //       data: this.props.workList.work.workList.result,
    //       allData: this.props.workList.work.workList.result,
    //       totalPages: this.props.workList.work.workList.numPages,
    //       currentPage: parseInt(this.props.workList.work.workList.currentPage) - 1,
    //       rowsPerPage: parseInt(this.props.workList.work.workList.displayCount),
    //       totalRecords: this.props.workList.work.workList.numItems,
    //       sortIndex: [this.props.workList.work.workList.itemStart, this.props.workList.work.workList.itemEnd]
    //     })
    //   }
    // })
  }

  componentDidUpdate(prevProps, prevState) {
  }


  handleRowsPerPage = value => {
    console.log('filter')
    // let page = parsedFilter.page !== undefined ? parsedFilter.page : 1
    // history.push(`/data-list/list-view?page=${page}&perPage=${value}`)
    // this.setState({ rowsPerPage: value })
  }

  changeCategory = (value) => {
    this.setState({ category: value })
  }

  handleAddCategory = () => {
    notifyBounce()
    // if (status === 'success') {
    //   this.GetAllWorkData(this.state.currentPage + 1)
    // }
  }

  handleUpdateCategory = () => {
    notifyUpdate()
    this.setState({ editMode: false, category: '' })
    // if (status === 'success') {
    //   this.GetAllWorkData(this.state.currentPage + 1)
    // }
  }

  handleRefresh = (status) => {
    if (status === 'success') {
      this.GetAllWorkData(this.state.currentPage + 1)
    }
  }

  handleDelete = row => {
    this.setState({ workObj: row }, () => this.child.current.toggleModal());
    this.setState({ editMode: false, category: '' })
  }

  handleCurrentData = obj => {
    this.setState({ category: obj.workCategory, editMode: true })
  }


  render() {
    let {
      columns,
      data,
      allData,
      value,
      currentData,
      category,
      editMode
    } = this.state
    return (
      <>
        {/* {this.props.workList.work.isworklistLoading ? */}
        {/* <div className="text-center">
            <Spinner color="primary" size="lg" />
          </div>
          : */}
        <>
          <div
            className={`data-list ${this.props.thumbView ? "thumb-view" : "list-view"
              }`}>
            <DataTable
              columns={columns}
              data={value.length ? allData : data}
              noHeader
              subHeader
              responsive
              pointerOnHover
              // customStyles={selectedStyle}
              conditionalRowStyles={conditionalRowStyles}
              subHeaderComponent={
                <CustomHeader
                  handleAddCategory={this.handleAddCategory}
                  category={category}
                  changeCategory={this.changeCategory}
                  handleUpdateCategory={this.handleUpdateCategory}
                  editMode={editMode}
                />
              }
              sortIcon={<ChevronDown />}
            />

          </div>
        </>
        {/* } */}
        <WorkDelete
          ref={this.child}
          workObj={this.state.workObj}
          notifyDeleted={notifyDeleted}
          notifyError={notifyError}
          handleRefresh={this.handleRefresh}
          {...this.props} />
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

})(WorkList)
