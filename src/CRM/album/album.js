import React from "react"
import Breadcrumbs from "../../components/@vuexy/breadCrumbs/BreadCrumb"
import { Row, Col } from "reactstrap"
import CreateAlbum from "./createAlbum"
import queryString from "query-string"
class Album extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Breadcrumbs
                    breadCrumbTitle="Create Album"
                    breadCrumbParent="Home"
                    breadCrumbActive="Create Album"
                />
                <Row>
                    <Col sm="12">
                        <CreateAlbum/>
                    </Col>
                </Row>
            </React.Fragment>
        )
    }
}

export default Album
