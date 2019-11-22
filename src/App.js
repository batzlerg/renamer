import React from 'react';
import Input from './components/Input';
import Output from './components/Output';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(e) {
    this.setState({
      inputValue: e.target.value
    });
  }

  render() {
    return (
      <div className="container">
        <Input onInputChange={this.onInputChange}/>
        <Output value={this.state.inputValue} />
      </div>
    );
  }

}

export default App;
