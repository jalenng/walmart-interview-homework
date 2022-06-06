import React from 'react'
import { Link } from 'react-router-dom'

class UserEntry extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      showPopup: false
    }
  }

  render() {
    return (
      <div>

        {/* Main entry */}
        <Link to={`/profile/${this.props.id}`}>
          <div
            className="container-entry"
            onMouseEnter={this.showPopup.bind(this)}
            onMouseLeave={this.hidePopup.bind(this)}
          >
            {this.props.name}
          </div>
        </Link>

        {/* Popup */}
        {this.state.showPopup &&
          <div className='popup'>
            <h1>{this.props.name}</h1>
            <h2>{this.props.username}</h2>
            📧 {this.props.email}
          </div>
        }

      </div>
    )
  }

  showPopup() {
    this.setState({
      ...this.state,
      showPopup: true
    })
  }
  hidePopup() {
    this.setState({
      ...this.state,
      showPopup: false
    })
  }

}

export default UserEntry
