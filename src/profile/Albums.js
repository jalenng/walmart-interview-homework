import axios from 'axios'

import React from 'react'
import { Link } from 'react-router-dom'

class Albums extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      show: false,
      albums: []
    }
  }

  retrieveAlbums() {
    const userId = this.props.userId
    axios
      .get(`https://jsonplaceholder.typicode.com/albums/?userId=${userId}`)
      .then(
        response => {
          this.setState({
            ...this.state,
            albums: response.data
          })
          console.log(response.data)
        }
      )
  }

  render() {
    const albums = this.state.albums.map(album => (
      <div key={album.id} className="container-entry">
        <Link to={`/album/${album.id}`}>
          {album.title}
        </Link>
      </div>
    ))
    return (
      <div className='container'>
        {/* eslint-disable-next-line */}
        <a onClick={this.handleShowHide.bind(this)}>
          <h1>{this.state.show ? '▾' : '▸'} Albums</h1>
        </a>

        {this.state.show && albums}

      </div>
    )
  }

  handleShowHide() {
    let newShowState = !this.state.show
    this.setState({ ...this.state, show: newShowState })
    if (newShowState)
      this.retrieveAlbums()
  }
}

export default Albums