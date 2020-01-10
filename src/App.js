import React from 'react';
import ComparisonRowContainer from './components/Comparison/ComparisonRowContainer';
import TransformRowContainer from './components/Transformation/TransformRowContainer';
import ShellCommand from './components/Export/ShellCommand';
import CONSTS from './constants';
import './App.css';

const defaultTransformationType = CONSTS.TRANSFORM_TYPES[0];
const getDefaultTransform = () => ({ text: '', type: defaultTransformationType });

const title = "renamer";
let randomTitleStates = [];
const generateRandomStates = str => {
  const exploded = Array.from(str);
  randomTitleStates.push([...exploded]);

  function shuffleLetters(i) {
    let newArr = [...exploded];
    let randIndex = Math.floor(Math.random() * (Math.floor(str.length - i)));
    let oldChr = newArr[i];
    newArr[i] = newArr[randIndex];
    newArr[randIndex] = oldChr;
    return newArr;
  }
  exploded.forEach((_, i) => {
    let updated = shuffleLetters(i);
    while (updated === randomTitleStates[randomTitleStates.length - 1]) {
      updated = shuffleLetters(i);
    }
    randomTitleStates.push([...updated]);
  })
  randomTitleStates = [
    ...randomTitleStates,
    ...randomTitleStates.slice(0, randomTitleStates.length-1).reverse()
  ];
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transformations: [ getDefaultTransform() ],
      comparisons: [{ inputValue: '', outputValue: '' }],
      h1StateIndex: 0,
      intervalId: null
    };
    this.onAddTransformation = this.onAddTransformation.bind(this);
    this.onUpdateTransformation = this.onUpdateTransformation.bind(this);
    this.onRemoveTransformation = this.onRemoveTransformation.bind(this);
    this.onAddComparison = this.onAddComparison.bind(this);
    this.onUpdateComparison = this.onUpdateComparison.bind(this);
    this.onRemoveComparison = this.onRemoveComparison.bind(this);
  }

  componentDidMount() {
    generateRandomStates(title);
    const intervalId = setInterval(() => {
      if (this.state.h1StateIndex === (randomTitleStates.length - 1)) {
        clearTimeout(this.state.intervalId);
      } else {
        this.setState({ h1StateIndex: this.state.h1StateIndex + 1 });
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
    transformations[index] = Object.assign(
      transformations[index],
      update
    );

    if ("type" in update) {
      // updated type needs insert field
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
      <>
        <div className="page-wrapper">
          <h1>{randomTitleStates[this.state.h1StateIndex]}</h1>
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
