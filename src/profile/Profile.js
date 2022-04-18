import React from 'react'
import { useParams } from 'react-router-dom'

import Overview from './Overview'
import Posts from './Posts'
import Albums from './Albums'

function withParams(Component) {
  return props => <Component {...props} params={useParams()} />
}

class Profile extends React.Component {
  render() {
    const userId = this.props.id || this.props.params.id
    return (
      <div>
        <Overview userId={userId} />
        <Posts userId={userId} />
        <Albums userId={userId} />
      </div>
    )
  }

}

export default withParams(Profile)