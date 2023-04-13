import React from "react"
import { Card, CardBody } from "reactstrap"
import Chart from "react-apexcharts"

class StatisticsCards extends React.Component {
  render() {
    return (
      <div style={this.props.borderColor ? this.props.borderColor : null}>
      <Card  style={this.props.cardStyle ? this.props.cardStyle : null}>
        <CardBody style={this.props.cardBodyStyle ? this.props.cardBodyStyle : null}
          className={`${this.props.className ? this.props.className : "stats-card-body"} d-flex ${
            !this.props.iconRight && !this.props.hideChart
              ? "flex-column align-items-start"
              : this.props.iconRight
              ? "justify-content-between flex-row-reverse align-items-center"
              : this.props.hideChart && !this.props.iconRight
              ? "justify-content-center flex-column text-center"
              : null
          } ${!this.props.hideChart?  "pb-0" : this.props.padding===false? "pb-1" : "pb-2"} ${this.props.padding===false? "pt-0" : "pt-2"}`}
        >
          <div className="icon-section">
            <div
              className={`avatar avatar-stats p-50 m-0 ${
                this.props.iconBg
                  ? `bg-rgba-${this.props.iconBg}`
                  : "bg-rgba-primary"
              }`}
            >
              <div className="avatar-content">{this.props.icon}</div>
            </div>
          </div>
          <div className="title-section">
            <h2 style={this.props.statStyle ? this.props.statStyle : null} className="text-bold-600 mt-1 mb-25">{this.props.stat}</h2>
            <p className="mb-0">{this.props.statTitle}</p>
          </div>
        </CardBody>
        {!this.props.hideChart && (
          <Chart
            options={this.props.options}
            series={this.props.series}
            type={this.props.type}
            height={this.props.height ? this.props.height : 100}
          />
        )}
      </Card>
      </div>
    )
  }
}
export default StatisticsCards
