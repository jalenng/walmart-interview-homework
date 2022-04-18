import axios from 'axios'

import React from 'react'

import Comments from './Comments'
import TextEditor from '../common/TextEditor'

class Post extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      id: this.props.id,
      title: this.props.title,
      body: this.props.body,

      showEditor: false,
      postEditorBody: this.props.body
    }
  }

  render() {

    // Post editor
    const editor = (
      <TextEditor
        startingText={this.state.body}
        submitLabel='💾 Save'
        onChange={this.handlePostEditorChange.bind(this)}
        onSubmit={this.handlePostUpdate.bind(this)}
      />
    )

    // Post actions
    const actions = (
      <div>
        <button onClick={this.handleShowEditor.bind(this)}>
          ✏️ Edit
        </button>
        <button onClick={this.handleDelete.bind(this)}>
          ❌
        </button>
      </div>
    )

    return (
      <div className='container'>
        <h2>{this.state.title}</h2>

        {/* Either show the editor or post and its actions */}

        {/* Non-editor mode */}
        {!this.state.showEditor && <p>{this.state.body}</p>}
        {!this.state.showEditor && actions}

        {/* Editor mode */}
        {this.state.showEditor && editor}

        {/* Comments component */}
        <Comments id={this.state.id} />

      </div>
    )
  }

  handleShowEditor() {
    this.setState({
      ...this.state,
      showEditor: true
    })
  }

  // Handles the user clicking the "delete" button
  handleDelete() {
    const id = this.state.id

    // Send the request
    axios
      .delete(`https://jsonplaceholder.typicode.com/posts/${id}`)

      // Remove the post from the state to be displayed
      .then(response => {
        this.props.onDelete(id)
      })
  }

  // Handles the user typing in the post editor
  handlePostEditorChange(event) {
    this.setState({
      ...this.state,
      postEditorBody: event.target.value
    })
  }

  // Handles the user clicking the "save" button
  handlePostUpdate() {
    const id = this.state.id
    const title = this.state.title
    const body = this.state.postEditorBody

    // Send the request
    axios
      .patch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        userId: 100,
        id: id,
        title: title,
        body: body
      })

      // Add the new comment to the state to be displayed
      .then(response => {
        this.setState({
          ...this.state,
          ...response.data,
          showEditor: false,
          postEditorBody: response.data.body
        })
      })
  }

}

export default Post