import axios from 'axios'

import React from 'react'
import Search from '../common/Search'
import UserEntry from './UserEntry'

class Users extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      searchQuery: '',
      allUsers: [],
      filteredUsers: []
    }
  }

  // Retrieve all users from the API
  componentDidMount() {
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then(
        response => {
          this.setState({
            ...this.state,
            allUsers: response.data
          })
          console.log(response.data)
        }
      )
  }

  render() {

    // Filter the users based on the search query
    const searchQuery = this.state.searchQuery.toLowerCase()
    const filteredUsers = this.state.allUsers
      .filter(user => {
        const lowercaseName = user.name.toLowerCase()
        return lowercaseName.indexOf(searchQuery) !== -1
      })
      .sort((a, b) => {
        return a.name.localeCompare(b.name)
      })

    // Create React elements based on the filtered users
    let filteredUsersElements = filteredUsers.map(user => (
      <UserEntry key={user.id} {...user} />
    ))

    if (filteredUsersElements.length === 0) {
      filteredUsersElements = (searchQuery.length === 0)
        ? <p>No users found</p>
        : <p>No users with name <b>{this.state.searchQuery}</b> found</p>
    }

    return (
      <div>
        <Search
          onChange={this.handleSearchChange.bind(this)}
          noun="users"
        />
        {filteredUsersElements}
      </div>
    )
  }

  handleSearchChange(event) {
    this.setState({
      ...this.state,
      searchQuery: event.target.value
    })
  }
}

export default Users