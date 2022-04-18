import axios from 'axios'

import React from 'react'

class Overview extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      user: {}
    }
  }

  componentDidMount() {
    const userId = this.props.userId
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then(
        response => {
          this.setState({
            ...this.state,
            user: response.data
          })
          console.log(response.data)
        }
      )
  }

  render() {
    const user = this.state.user
    const url = user.website
    return (
      <div className='container'>
        <h1>{user.name}</h1>
        <h2>{user.username}</h2>

        <a href={`mailto:${user.email}`}>📧 {user.email}</a><br />
        <a href={`tel:${user.phone}`}>📞 {user.phone}</a><br />
        <a href={`//${url}`}>🌐 {url}</a><br />

      </div>
    )
  }

}

export default Overview