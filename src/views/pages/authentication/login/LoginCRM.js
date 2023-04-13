import React from "react"
import { Link } from "react-router-dom"
import { CardBody, FormGroup, Form, Input, Button, Label } from "reactstrap"
import Checkbox from "../../../../components/@vuexy/checkbox/CheckboxesVuexy"
import { Mail, Lock, Check } from "react-feather"
import { loginWithJWT } from "../../../../redux/actions/auth/loginActions"
import { connect } from "react-redux"
import { history } from "../../../../history"
// import axios from "axios"
import { toast, ToastContainer, Zoom } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "../../../../assets/scss/plugins/extensions/toastr.scss"
import {Spinner} from "reactstrap"

const notifyTopCenter = () =>
  toast.error("Incorrect username or password.Try again.", {
    position: toast.POSITION.TOP_CENTER
  })

class LoginCRM extends React.Component {

  loginError = () => toast.warning("Incorrect User Credentials!!", { transition: Zoom })
  ApprovalError = () => toast.warning("Your account is not approved by admin at this time..Please wait or contact admin", { transition: Zoom })


  state = {
    email: "",
    password: "",
    remember: false,
    user_role: "Admin",
    loading: false
  }

  handleLogin = e => {
    e.preventDefault()
    this.setState({loading : true})
      this.props.loginWithJWT(this.state).then(() => {
        this.setState({loading : false})
        console.log(this.props.loginValues,'login values')
        if (this.props.loginValues && this.props.loginValues.loginResponse && this.props.loginValues.loginResponse.status === 1){
            localStorage.setItem("crmtoken", JSON.stringify("loggedin"))
            localStorage.setItem("crmuser", JSON.stringify(this.props.loginValues.loginResponse))
            history.push("/dashboard")
        }
        if (this.props.loginValues && this.props.loginValues.values) {
          notifyTopCenter()
        }
      })
  }

  render() {
    
    return (
      <React.Fragment>
        <CardBody className="pt-1">
          <Form action="/" onSubmit={this.handleLogin}>
            <FormGroup className="form-label-group position-relative has-icon-left">
              <Input
                type="text"
                placeholder="Email"
                value={this.state.email}
                onChange={e => this.setState({ email: e.target.value })}
                required
              />
              <div className="form-control-position">
                <Mail size={15} />
              </div>
              <Label>Email</Label>
            </FormGroup>
            <FormGroup className="form-label-group position-relative has-icon-left">
               <Input
                type="password"
                placeholder="Password"
                value={this.state.password}
                onChange={e => this.setState({ password: e.target.value })}
                required
              />
              <div className="form-control-position">
                <Lock size={15} />
              </div>
              <Label>Password</Label>
            </FormGroup>
            <FormGroup className="d-flex justify-content-between align-items-center">
              <Checkbox
                color="primary"
                icon={<Check className="vx-icon" size={16} />}
                label="Remember me"
                defaultChecked={false}
                // onChange={this.handleRemember}
              />
              <div className="float-right">
                <Link to="/pages/forgot-password">Forgot Password?</Link>
              </div>
            </FormGroup>
            <div className="d-flex justify-content-between">
              <Button.Ripple color="primary" type="submit">
                Login
                {this.state.loading == true &&
                  <Spinner color="white" size="sm" style={{marginLeft:"5px", float:"right"}} />
                }
              </Button.Ripple>
            </div>
          </Form>
        </CardBody>
        <ToastContainer />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    loginValues: state.auth.login

  }
}
export default connect(mapStateToProps, { loginWithJWT })(LoginCRM)
