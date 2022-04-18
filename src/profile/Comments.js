import axios from 'axios'

import React from 'react'

import TextEditor from '../common/TextEditor'

class Comments extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      show: false,
      currentComment: '',
      comments: []
    }
  }

  retrieveComments() {
    const id = this.props.id
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
      .then(
        response => {
          this.setState({
            ...this.state,
            currentComment: '',
            comments: response.data
          })
          console.log(response.data)
        }
      )
  }

  render() {

    const commentTextbox = (
      <div className='container'>
        <TextEditor
          startingText=''
          submitLabel='💬 Comment'
          placeholder='Write a comment...'
          onChange={this.handleCommentChange.bind(this)}
          onSubmit={this.handleCommentPost.bind(this)}
        />
      </div>
    )

    const comments = this.state.comments.map(comment => (
      <div key={comment.id} className='container'>
        <h3>{comment.name}</h3>
        <h4>{comment.email}</h4>
        <p>{comment.body}</p>
      </div>
    ))

    return (
      <div>
        {/* eslint-disable-next-line */}
        <a onClick={this.handleShowHide.bind(this)}>
          <h3>{this.state.show ? '▾' : '▸'} Comments</h3>
        </a>

        {this.state.show && commentTextbox}
        {this.state.show && comments}

      </div>
    )
  }

  // Handles the user clicking the "show/hide" button
  handleShowHide() {
    let newShowState = !this.state.show
    this.setState({ ...this.state, show: newShowState })
    if (newShowState)
      this.retrieveComments()
  }

  // Handles the user typing in the comment textbox
  handleCommentChange(event) {
    this.setState({
      ...this.state,
      currentComment: event.target.value
    })
  }

  // Handles the user clicking the "comment" button
  handleCommentPost() {
    const id = this.props.id
    const comment = this.state.currentComment

    // Send the request
    axios
      .post(`https://jsonplaceholder.typicode.com/posts/${id}/comments`, {
        name: 'You',
        email: 'you@email.com',
        body: comment
      })

      // Add the new comment to the state to be displayed
      .then(response => {
        this.setState({
          ...this.state,
          comments: [response.data, ...this.state.comments]
        })
      })
  }
}

export default Comments