import React from "react"
import Breadcrumbs from "../../components/@vuexy/breadCrumbs/BreadCrumb"
import { Row, Col } from "reactstrap"
import WorkList from "./worklist"
import queryString from "query-string"
class Work extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Breadcrumbs
                    breadCrumbTitle="Work Category"
                    breadCrumbParent="Home"
                    breadCrumbActive="Work Category List"
                />
                <Row>
                    <Col sm="12">
                        <WorkList/>
                    </Col>
                </Row>
            </React.Fragment>
        )
    }
}

export default Work
