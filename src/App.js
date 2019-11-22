import React from 'react';
import Input from './components/Input';
import Output from './components/Output';
import Transformations from './components/Transformations';
import AddTransformation from './components/AddTransformation';
import CONSTS from './constants';
import './App.css';

const defaultTransformationType = CONSTS.TRANSFORM_TYPES[1];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      transformations: []
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onAddTransformation = this.onAddTransformation.bind(this);
    this.onUpdateTransformation = this.onUpdateTransformation.bind(this);
    this.onRemoveTransformation = this.onRemoveTransformation.bind(this);
  }

  onInputChange(e) {
    this.setState({
      inputValue: e.target.value
    });
  }

  onAddTransformation(e) {
    console.log('added');
    const transformations = [
      ...this.state.transformations,
      { text: '', type: defaultTransformationType },
    ];
    this.setState({ transformations });
  }

  onRemoveTransformation(index) {
    console.log('removed');
    const transformations = this.state.transformations.filter(
      (t, i) => i !== index
    );
    this.setState({ transformations });
  }

  onUpdateTransformation(index, update) {
    console.log('updated');
    const transformations = this.state.transformations.map((t, i) =>
      i === index ? Object.assign(t, update) : t
    );
    this.setState({ transformations });
  }

  render() {
    return (
      <div className="container">
        <Input onInputChange={this.onInputChange}/>
        <Output value={this.state.inputValue} />
        <Transformations
          transformations={this.state.transformations}
          onRemoveTransformation={this.onRemoveTransformation}
          onUpdateTransformation={this.onUpdateTransformation}
        />
        <AddTransformation
          onAddTransformation={this.onAddTransformation}
        />
      </div>
    );
  }

}

export default App;
