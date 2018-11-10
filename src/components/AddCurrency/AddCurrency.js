import React from 'react';

class AddCurrency extends React.Component {
  state = {
    currentTargetCurrency: null
  };

  addCurrency = event => {
    let target = this.state.currentTargetCurrency;

    if (target === '----' || target === null) return;
  };

  handleSelectChange = event => {
    this.setState({ currentTargetCurrency: event.target.value });
  };

  render() {
    let currencies = [
      <option key="empty" id="empty">
        ----
      </option>
    ];
    if (this.props.currencies) {
      for (let [currency] of Object.entries(this.props.currencies)) {
        currencies.push(
          <option key={currency} id={currency}>
            {currency}
          </option>
        );
      }
    }

    return (
      <>
        <div>Add currencies goes here.</div>
        <select onChange={this.handleSelectChange}>{currencies}</select>
        <button onClick={this.addCurrency}>Add</button>
      </>
    );
  }
}

export default AddCurrency;
