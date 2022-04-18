import axios from 'axios'

import React from 'react'
import { useParams } from 'react-router-dom'

function withParams(Component) {
  return props => <Component {...props} params={useParams()} />
}

class Album extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      images: []
    }
  }

  componentDidMount() {
    const id = this.props.params.id
    axios
      .get(`https://jsonplaceholder.typicode.com/photos/?albumId=${id}`)
      .then(
        response => {
          this.setState({
            ...this.state,
            images: response.data
          })
          console.log(response.data)
        }
      )
  }

  render() {
    const imageElements = this.state.images.map(image => {
      return (
        <a
          href={image.url}
          key={image.id}>
          <img
            src={image.thumbnailUrl}
            alt={image.name} />
        </a>
      )
    })
    return imageElements
  }

}

export default withParams(Album)