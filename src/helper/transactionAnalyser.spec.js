import { expect } from 'chai';
import transactionAnalyser from './transactionAnalyser';
import moment from 'moment';
import trnsctnData from '../../test/helper';

describe('Transaction Analyser Logic', function() {
  var formData;
  function getDateinMilli() {
    formData.fromTime = moment(
      formData.fromTime,
      'DD/MM/YYYY HH:mm:ss'
    ).valueOf();
    formData.toTime = moment(formData.toTime, 'DD/MM/YYYY HH:mm:ss').valueOf();
  }

  describe('trsctn type PAYMENT within timeframe', () => {
    it('should subtract funds if accountID in fromAccountID', function() {
      formData = {
        accountId: 'ACC998877',
        fromTime: '20/10/2018 18:00:00',
        toTime: '20/10/2018 19:00:00'
      };
      getDateinMilli(formData.fromTime, formData.toTime);
      expect(transactionAnalyser(trnsctnData, formData)).to.include({
        totalBalance: parseFloat(-5),
        noOfTransactions: 1
      });
    });

    it('should add funds if accountID in toAccountID', function() {
      formData = {
        accountId: 'ACC778899',
        fromTime: '20/10/2018 18:00:00',
        toTime: '20/10/2018 19:00:00'
      };
      getDateinMilli(formData.fromTime, formData.toTime);
      expect(transactionAnalyser(trnsctnData, formData)).to.include({
        totalBalance: parseFloat(5),
        noOfTransactions: 1
      });
    });
  });

  describe('trsctn type PAYMENT not within timeframe', () => {
    it('should return 0 funds if accountID in fromAccountID', function() {
      formData = {
        accountId: 'ACC334455',
        fromTime: '21/10/2018 12:00:00',
        toTime: '21/10/2018 13:00:00'
      };
      getDateinMilli(formData.fromTime, formData.toTime);
      expect(transactionAnalyser(trnsctnData, formData)).to.include({
        totalBalance: parseFloat(0),
        noOfTransactions: 0
      });
    });

    it('should return 0 funds if accountID in toAccountID', function() {
      formData = {
        accountId: 'ACC778899',
        fromTime: '21/10/2018 12:00:00',
        toTime: '21/10/2018 18:00:00'
      };
      getDateinMilli(formData.fromTime, formData.toTime);
      expect(transactionAnalyser(trnsctnData, formData)).to.include({
        totalBalance: parseFloat(0),
        noOfTransactions: 0
      });
    });
  });

  describe('trsctn type Reversal & realtedTrnsctn within timeframe', () => {
    it('should add funds back if accountId in fromAccountID', function() {
      formData = {
        accountId: 'ACC334455',
        fromTime: '20/10/2018 12:00:00',
        toTime: '20/10/2018 18:00:00'
      };
      getDateinMilli(formData.fromTime, formData.toTime);
      expect(transactionAnalyser(trnsctnData, formData)).to.include({
        totalBalance: parseFloat(-25),
        noOfTransactions: 1
      });
    });

    it('should revert funds if accountID in toAccountID', function() {
      formData = {
        accountId: 'ACC998877',
        fromTime: '21/10/2018 12:00:00',
        toTime: '21/10/2018 18:00:00'
      };
      getDateinMilli(formData.fromTime, formData.toTime);
      expect(transactionAnalyser(trnsctnData, formData)).to.include({
        totalBalance: parseFloat(0),
        noOfTransactions: 0
      });
    });
  });

  describe('trsctn type Reversal & realtedTrnsctn NOT within timeframe', () => {
    it('should not add funds back if accountId in fromAccountID', function() {
      formData = {
        accountId: 'ACC334455',
        fromTime: '20/10/2018 12:00:00',
        toTime: '20/10/2018 13:00:00'
      };
      getDateinMilli(formData.fromTime, formData.toTime);
      expect(transactionAnalyser(trnsctnData, formData)).to.include({
        totalBalance: parseFloat(-25),
        noOfTransactions: 1
      });
    });

    it('should not revert funds if accountID in toAccountID', function() {
      formData = {
        accountId: 'ACC998877',
        fromTime: '21/10/2018 12:00:00',
        toTime: '21/10/2018 18:00:00'
      };
      getDateinMilli(formData.fromTime, formData.toTime);
      expect(transactionAnalyser(trnsctnData, formData)).to.include({
        totalBalance: parseFloat(0),
        noOfTransactions: 0
      });
    });
  });
});
