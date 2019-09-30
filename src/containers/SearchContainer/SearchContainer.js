import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Input from '../../components/UI/Input/Input';
import transactionAnalyser from '../../helper/transactionAnalyser';
import Result from '../../components/Result/Result';

export default class SearchContainer extends Component {
  state = {
    searchForm: {
      accountId: {
        label: 'AccountId',
        elemType: 'text',
        elemAttr: {
          type: 'input',
          placeholder: 'AccountId'
        },
        value: ''
      },
      fromTime: {
        label: 'From (DD/MM/YYYY HH:mm:ss)',
        elemType: 'dateinput',
        elemAttr: {
          placeholder: 'Select From Date'
        },
        value: ''
      },
      toTime: {
        label: 'To (DD/MM/YYYY HH:mm:ss)',
        elemType: 'dateinput',
        elemAttr: {
          placeholder: 'Select To Date'
        },
        value: ''
      }
    },
    formIsValid: false,
    transactionsData: [],
    totalBalance: 0,
    numberOfTransactions: 0,
    displayResults: false
  };

  componentDidMount() {
    this.getTransactionsData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.uploadedFileName !== this.props.uploadedFileName) {
      this.getTransactionsData();
    }
  }

  getTransactionsData = () => {
    const fileName = this.props.uploadedFileName;
    axios.get(`http://localhost:8080/getUploads/${fileName}`, {}).then(res => {
      const clearedForm = this.clearForm();
      this.setState({
        searchForm: clearedForm,
        transactionsData: res.data,
        displayResults: false,
        totalBalance: 0,
        numberOfTransactions: 0
      });
    });
  };

  clearForm = () => {
    const updatedSearchForm = { ...this.state.searchForm };
    for (var formElem in updatedSearchForm) {
      updatedSearchForm[formElem].value = '';
    }
    return updatedSearchForm;
  };

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedSearchForm = { ...this.state.searchForm };
    const updatedFormElement = { ...updatedSearchForm[inputIdentifier] };
    if (inputIdentifier === 'accountId') {
      updatedFormElement.value = event.target.value;
    } else {
      updatedFormElement.value = event.valueOf();
    }
    updatedSearchForm[inputIdentifier] = updatedFormElement;
    this.setState({ searchForm: updatedSearchForm });
  };

  analyseTransactions = event => {
    event.preventDefault();
    const formData = {};
    for (let formElement in this.state.searchForm) {
      formData[formElement] = this.state.searchForm[formElement].value;
    }
    const { totalBalance, noOfTransactions } = transactionAnalyser(
      this.state.transactionsData,
      formData
    );
    this.setState({
      totalBalance: totalBalance,
      numberOfTransactions: noOfTransactions,
      displayResults: true
    });
  };

  render() {
    const { searchForm } = this.state;
    return (
      <>
        <form onSubmit={this.analyseTransactions}>
          <h4>Provide input to analyse the transactions</h4>
          {Object.keys(searchForm).map(formInput => {
            return (
              <div key={formInput}>
                <label htmlFor={formInput}>
                  {searchForm[formInput]['label']}
                </label>
                <Input
                  id={formInput}
                  value={searchForm[formInput].value}
                  elemType={searchForm[formInput]['elemType']}
                  elemAttr={searchForm[formInput]['elemAttr']}
                  changed={event => this.inputChangedHandler(event, formInput)}
                />
              </div>
            );
          })}
          <button type="submit">Submit</button>
        </form>
        {this.state.displayResults ? (
          <Result
            totalBalance={this.state.totalBalance}
            numberOfTransactions={this.state.numberOfTransactions}
          />
        ) : null}
      </>
    );
  }
}

SearchContainer.propTypes = {
  uploadedFileName: PropTypes.string.isRequired
};
