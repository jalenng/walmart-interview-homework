import React from 'react'

// A TextEditor component is comprised of a textarea and a submit button.
class TextEditor extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      text: props.startingText
    }
  }

  render() {
    return (
      <div>
        <textarea
          placeholder={this.props.placeholder}
          onChange={this.handleChange.bind(this)}
          value={this.state.text}
          rows="5"
        />
        <div>
          <button onClick={this.props.onSubmit}>
            {this.props.submitLabel}
          </button>
        </div>
      </div>
    )
  }

  handleChange(event) {
    this.setState({
      ...this.state,
      text: event.target.value
    })

    this.props.onChange(event)
  }

}

export default TextEditor
