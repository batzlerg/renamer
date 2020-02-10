import React from 'react';
import ComparisonRowContainer from './components/ComparisonRowContainer';
import TransformRowContainer from './components/TransformRowContainer';
import ShellCommand from './components/ShellCommand';
import CONSTS from './constants';
import { generateRandomStringStates } from './utils';
import './styles/App.css';

const defaultTransformationType = CONSTS.TRANSFORM_TYPES[0];
const getDefaultTransform = () => ({ text: '', type: defaultTransformationType });
const getDefaultComparison = () => ({ inputValue: '', outputValue: '' });

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transformations: [ getDefaultTransform() ],
      comparisons: [ getDefaultComparison() ],
      scrambledTitles: [],
      scrambledTitleIndex: 0,
      intervalId: null
    };
    const bind = [
      'onAddTransformation',
      'onUpdateTransformation',
      'onRemoveTransformation',
      'onClearTransformations',
      'onAddComparison',
      'onUpdateComparison',
      'onRemoveComparison',
      'onClearComparisons',
    ];
    for (let f of bind) {
      this[f] = this[f].bind(this);
    }
  }

  componentDidMount() {
    const scrambledTitles = generateRandomStringStates(CONSTS.APP_TITLE);
    this.setState({ scrambledTitles });
    const intervalId = setInterval(() => {
      if (this.state.scrambledTitleIndex === (scrambledTitles.length - 1)) {
        clearTimeout(this.state.intervalId);
      } else {
        this.setState({ scrambledTitleIndex: this.state.scrambledTitleIndex + 1 });
      }
    }, 100);
    this.setState({ intervalId });
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
    transformations[index] = Object.assign(transformations[index], update);

    if ("type" in update) {
      // new type needs insert field
      const isInsertType = CONSTS.INSERT_TRANSFORMS.includes(update.type);
      // old type already has insert field
      const hasInsert = "insert" in transformations[index];

      if (isInsertType && !hasInsert) {
        transformations[index].insert = '';
      } else if (!isInsertType && hasInsert) {
        delete transformations[index].insert;
      }
    }

    this.setState({
      transformations,
      comparisons: this.applyTransforms(this.state.comparisons, transformations)
    });
  }

  onClearTransformations() {
    this.setState({ transformations: [getDefaultTransform()] });
  }

  onAddComparison(e) {
    let updatedComps = [
      ...this.state.comparisons,
      { inputValue: '' },
    ];
    this.setState({ comparisons: this.applyTransforms(updatedComps) });
  }

  onRemoveComparison(index) {
    this.setState({
      comparisons: this.state.comparisons.filter((t, i) => i !== index)
    });
  }

  onUpdateComparison(index, e) {
    let updatedComps = this.state.comparisons.slice(); // don't mutate
    updatedComps[index] = { inputValue: e.target.value };
    this.setState({ comparisons: this.applyTransforms(updatedComps) });
  }

  onClearComparisons() {
    this.setState({ comparisons: [getDefaultComparison()] });
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
      <>
        <div className="pageWrapper">
          <h1>{this.state.scrambledTitles[this.state.scrambledTitleIndex]}</h1>
          <div className="container">
            <ComparisonRowContainer
              comparisons={this.state.comparisons}
              onAddComparison={this.onAddComparison}
              onUpdateComparison={this.onUpdateComparison}
              onRemoveComparison={this.onRemoveComparison}
              onClear={this.onClearComparisons}
            />
            <TransformRowContainer
              transformations={this.state.transformations}
              onAddTransformation={this.onAddTransformation}
              onRemoveTransformation={this.onRemoveTransformation}
              onUpdateTransformation={this.onUpdateTransformation}
              onClear={this.onClearTransformations}
            />
            <ShellCommand transformations={this.state.transformations}/>
          </div>
          <footer>
            <a href="https://grahammak.es">graham</a> made this &copy; {`2019-${new Date().getFullYear()}`}
          </footer>
        </div>
      </>
    );
  }
}

export default App;
