import React from 'react';
import ComparisonRow from './ComparisonRow';
import AddRemoveButton from '../AddRemoveButton';
import './ComparisonRowContainer.css';

class ComparisonRowContainer extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      comparisons: [{ inputValue: '' }]
    };
    this.onUpdateComparison = this.onUpdateComparison.bind(this);
    this.onAddComparison = this.onAddComparison.bind(this);
  }

  onUpdateComparison(index, e) {
    console.log('updated');
    let comparisons = this.state.comparisons.slice(); // don't mutate
    comparisons[index] = { inputValue: e.target.value };
    this.setState({ comparisons });
  }

  onAddComparison(e) {
    console.log('added');
    const comparisons = [
      ...this.state.comparisons,
      { inputValue: '' },
    ];
    this.setState({ comparisons });
  }

  onRemoveComparison(index) {
    debugger;
    console.log('removed');
    const comparisons = this.state.comparisons.filter(
      (t, i) => i !== index
    );
    this.setState({ comparisons });
  }

  render() {
    return (
      <div className="comparisonRowContainer">
        { this.state.comparisons.map((t, i) =>
          <ComparisonRow
            key={i}
            showRemoveButton={i > 0}
            inputValue={t.inputValue}
            onRemoveComparison={() => this.onRemoveComparison(i)}
            onInputChange={value => this.onUpdateComparison(i, value)}
          />
        )}
        <AddRemoveButton
          type="add"
          onClick={this.onAddComparison}
          className="addComparison"
          text="Add a comparison row"
        />
      </div>
    );
  }
}

export default ComparisonRowContainer;
