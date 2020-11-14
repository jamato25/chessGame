import React, {Component} from 'react'

import Board from './Board'
import Speech from './Speech'
import Start from './Start'

class App extends Component {

  render() {
    return (
        <main>
          <Board />
          <Speech />
        </main>
    )
  }
}
