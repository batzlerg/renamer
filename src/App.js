import React from 'react';
import ComparisonRowContainer from './components/Comparison/ComparisonRowContainer';
import TransformRowContainer from './components/Transformation/TransformRowContainer';
import CONSTS from './constants';
import './App.css';

const defaultTransformationType = CONSTS.TRANSFORM_TYPES[0];
const getDefaultTransform = () => ({ text: '', type: defaultTransformationType });

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transformations: [ getDefaultTransform() ],
      comparisons: [{ inputValue: '', outputValue: '' }]
    };
    this.onAddTransformation = this.onAddTransformation.bind(this);
    this.onUpdateTransformation = this.onUpdateTransformation.bind(this);
    this.onRemoveTransformation = this.onRemoveTransformation.bind(this);
    this.onAddComparison = this.onAddComparison.bind(this);
    this.onUpdateComparison = this.onUpdateComparison.bind(this);
    this.onRemoveComparison = this.onRemoveComparison.bind(this);
  }

  onAddTransformation(e) {
    console.log('added transformation');
    const transformations = [
      ...this.state.transformations,
      getDefaultTransform(),
    ];
    this.setState({
      transformations,
      comparisons: this.applyTransforms(this.state.comparisons, transformations)
    });
  }

  onRemoveTransformation(index) {
    console.log('removed transformation');
    const transformations = this.state.transformations.filter(
      (t, i) => i !== index
    );
    this.setState({
      transformations,
      comparisons: this.applyTransforms(this.state.comparisons, transformations)
    });
  }

  onUpdateTransformation(index, update) {
    console.log('updated transformation');
    let transformations = this.state.transformations.slice(); // don't mutate
    transformations[index] = Object.assign(transformations[index], update);
    this.setState({
      transformations,
      comparisons: this.applyTransforms(this.state.comparisons, transformations)
    });
  }

  onUpdateComparison(index, e) {
    console.log('updated comparison');
    let updatedComps = this.state.comparisons.slice(); // don't mutate
    updatedComps[index] = { inputValue: e.target.value };
    this.setState({ comparisons: this.applyTransforms(updatedComps) });
  }

  onAddComparison(e) {
    console.log('added comparison');
    let updatedComps = [
      ...this.state.comparisons,
      { inputValue: '' },
    ];
    this.setState({ comparisons: this.applyTransforms(updatedComps) });
  }

  onRemoveComparison(index) {
    console.log('removed comparison');
    const comparisons = this.state.comparisons.filter((t, i) => i !== index);
    this.setState({ comparisons });
  }

  applyTransforms(comps, trans = this.state.transformations) {
    for (let c of comps) {
      let temp = c.inputValue;
      for (let t of trans) {
        temp = CONSTS.JS_TRANSFORMS[t.type](
          temp,
          t.text,
          t.insert ? t.insert : null,
        );
      }
      c.outputValue = temp;
    }
    console.log(comps);
    return comps;
  }

  render() {
    return (
      <div className="container">
        <ComparisonRowContainer
          comparisons={this.state.comparisons}
          onAddComparison={this.onAddComparison}
          onUpdateComparison={this.onUpdateComparison}
          onRemoveComparison={this.onRemoveComparison}
        />
        <TransformRowContainer
          transformations={this.state.transformations}
          onAddTransformation={this.onAddTransformation}
          onRemoveTransformation={this.onRemoveTransformation}
          onUpdateTransformation={this.onUpdateTransformation}
        />
      </div>
    );
  }

}

export default App;
