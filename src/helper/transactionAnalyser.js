import moment from 'moment';

function getCretedAtDate(dateParam) {
  return moment(dateParam, 'DD/MM/YYYY HH:mm:ss').valueOf();
}

/**Helper function to Analyse the transactions**/
const transactionAnalyser = (trnsctnsData, formData) => {
  let totalBalance = 0;
  let numberOfTransctns = 0;
  const { accountId, fromTime, toTime } = formData;
  let transctnRcrdsWithinTime = {};
  trnsctnsData.forEach((trnsctn, index) => {
    let transctnDate = getCretedAtDate(trnsctn.createdAt);
    if (transctnDate >= fromTime && transctnDate <= toTime) {
      if (trnsctn.transactionType.toUpperCase() === 'PAYMENT') {
        if (trnsctn.fromAccountId === accountId) {
          totalBalance = parseFloat(totalBalance) - parseFloat(trnsctn.amount);
          numberOfTransctns++;
          transctnRcrdsWithinTime[trnsctn.transactionId] = index;
        }
        if (trnsctn.toAccountId === accountId) {
          totalBalance = parseFloat(totalBalance) + parseFloat(trnsctn.amount);
          numberOfTransctns++;
          transctnRcrdsWithinTime[trnsctn.transactionId] = index;
        }
      } else {
        if (trnsctn.fromAccountId === accountId) {
          totalBalance = parseFloat(totalBalance) + parseFloat(trnsctn.amount);
          if (numberOfTransctns > 0) {
            numberOfTransctns--;
          }
          transctnRcrdsWithinTime[trnsctn.transactionId] = index;
        }
        if (trnsctn.toAccountId === accountId) {
          totalBalance = parseFloat(totalBalance) - parseFloat(trnsctn.amount);
          if (numberOfTransctns > 0) {
            numberOfTransctns--;
          }
          transctnRcrdsWithinTime[trnsctn.transactionId] = index;
        }
      }
    } else {
      if (trnsctn.transactionType.toUpperCase() === 'REVERSAL') {
        let reversalTransactionId = trnsctn.relatedTransaction;
        if (reversalTransactionId in transctnRcrdsWithinTime) {
          let transcRecordIndx = transctnRcrdsWithinTime[reversalTransactionId];
          let reversalTrnsctnRecord = trnsctnsData[transcRecordIndx];
          let reversalRecordDate = getCretedAtDate(
            reversalTrnsctnRecord.createdAt
          );
          if (reversalRecordDate >= fromTime && reversalRecordDate <= toTime) {
            if (trnsctn.fromAccountId === accountId) {
              totalBalance =
                parseFloat(totalBalance) + parseFloat(trnsctn.amount);
              numberOfTransctns--;
            }
            if (trnsctn.toAccountId === accountId) {
              totalBalance =
                parseFloat(totalBalance) - parseFloat(trnsctn.amount);
              numberOfTransctns--;
            }
          }
        }
      }
    }
  });
  return {
    totalBalance: parseFloat(totalBalance),
    noOfTransactions: numberOfTransctns
  };
};
export default transactionAnalyser;
