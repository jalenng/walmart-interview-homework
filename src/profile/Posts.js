import axios from 'axios'

import React from 'react'

import Post from './Post'
import Search from '../common/Search'

class Posts extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      show: false,
      searchQuery: '',
      allPosts: []
    }
  }

  retrievePosts() {
    const userId = this.props.userId
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/?userId=${userId}`)
      .then(
        response => {
          this.setState({
            ...this.state,
            allPosts: response.data
          })
          console.log(response.data)
        }
      )
  }

  render() {

    // Filter the posts based on the search query
    const searchQuery = this.state.searchQuery.toLowerCase()
    const filteredPosts = this.state.allPosts.filter(post => {
      const lowercaseTitle = post.title.toLowerCase()
      const lowercaseBody = post.body.toLowerCase()
      return lowercaseTitle.indexOf(searchQuery) !== -1
        || lowercaseBody.indexOf(searchQuery) !== -1
    })

    // Create React elements based on the filtered posts
    let filteredPostsElements = filteredPosts.map(post => (
      <Post
        key={post.id}
        id={post.id}
        title={post.title}
        body={post.body}
        onDelete={this.handlePostDelete.bind(this)}
      />
    ))

    if (filteredPostsElements.length === 0) {
      filteredPostsElements = (searchQuery.length === 0)
        ? <p>No posts found</p>
        : <p>No posts with <b>{this.state.searchQuery}</b> found</p>
    }

    return (
      <div className='container'>
        {/* eslint-disable-next-line */}
        <a
          onClick={this.handleShowHide.bind(this)}>
          <h1>{this.state.show ? '▾' : '▸'} Posts</h1>
        </a>

        {this.state.show && <Search
          startingValue={this.state.searchQuery}
          onChange={this.handleSearchChange.bind(this)}
          noun='posts'
        />}

        {this.state.show && filteredPostsElements}

      </div>
    )
  }

  // Handles the user clicking the "show/hide" button
  handleShowHide() {
    let newShowState = !this.state.show
    this.setState({ ...this.state, show: newShowState })
    if (newShowState)
      this.retrievePosts()
  }

  // Handles the user typing in the search box
  handleSearchChange(event) {
    this.setState({
      ...this.state,
      searchQuery: event.target.value
    })
  }

  // Handles a post getting deleted
  handlePostDelete(id) {
    const allPosts = this.state.allPosts.filter(post => post.id !== id)
    this.setState({ ...this.state, allPosts: allPosts })
  }

}

export default Posts