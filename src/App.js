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
    const transformations = this.state.transformations.filter(
      (t, i) => i !== index
    );
    this.setState({
      transformations,
      comparisons: this.applyTransforms(this.state.comparisons, transformations)
    });
  }

  onUpdateTransformation(index, update) {
    let transformations = this.state.transformations.slice(); // don't mutate
    const needsInsert = CONSTS.INSERT_TRANSFORMS.includes(update.type);
    transformations[index] = Object.assign(
      transformations[index],
      needsInsert ? { insert: '' } : {},
      update
    );
    this.setState({
      transformations,
      comparisons: this.applyTransforms(this.state.comparisons, transformations)
    });
  }

  onUpdateComparison(index, e) {
    let updatedComps = this.state.comparisons.slice(); // don't mutate
    updatedComps[index] = { inputValue: e.target.value };
    this.setState({ comparisons: this.applyTransforms(updatedComps) });
  }

  onAddComparison(e) {
    let updatedComps = [
      ...this.state.comparisons,
      { inputValue: '' },
    ];
    this.setState({ comparisons: this.applyTransforms(updatedComps) });
  }

  onRemoveComparison(index) {
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
          t.insert ? t.insert : '',
        );
      }
      c.outputValue = temp;
    }
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
