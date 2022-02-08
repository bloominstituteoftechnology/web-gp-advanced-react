import React from 'react'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { renderChild: false }
  }
  render() {
    return (
      <div>
        <h2>The React Life Cycle</h2>
        <button>toggle child</button>
        {
          this.state.renderChild ? <TheChild lady='gaga' /> : null
        }
      </div>
    )
  }
}

class TheChild extends React.Component {
  constructor(props) {
    super(props)
    this.state = { counter: 0 }
  }
  render() {
    return (
      <div>
        <h3>The count is {this.state.counter}</h3>
        <button>increment</button>
      </div>
    )
  }
}
