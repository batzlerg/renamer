import React from 'react';
import ComparisonRowContainer from './components/Comparison/ComparisonRowContainer';
import Transformations from './components/Transformations';
import AddRemoveButton from './components/AddRemoveButton';
import CONSTS from './constants';
import './App.css';

const defaultTransformationType = CONSTS.TRANSFORM_TYPES[1];
const getDefaultTransform = () => ({ text: '', type: defaultTransformationType });

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transformations: [getDefaultTransform()]
    };
    this.onAddTransformation = this.onAddTransformation.bind(this);
    this.onUpdateTransformation = this.onUpdateTransformation.bind(this);
    this.onRemoveTransformation = this.onRemoveTransformation.bind(this);
  }

  onAddTransformation(e) {
    console.log('added');
    const transformations = [
      ...this.state.transformations,
      getDefaultTransform(),
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
    debugger;
    let transformations = this.state.transformations.slice(); // don't mutate
    transformations[index] = Object.assign(transformations[index], update);
    this.setState({ transformations });
  }

  render() {
    return (
      <div className="container">
        <ComparisonRowContainer />
        <Transformations
          transformations={this.state.transformations}
          onRemoveTransformation={this.onRemoveTransformation}
          onUpdateTransformation={this.onUpdateTransformation}
        />
      <AddRemoveButton
        type="add"
        onClick={this.onAddTransformation}
        text="Add a transformation"
      />
      </div>
    );
  }

}

export default App;
