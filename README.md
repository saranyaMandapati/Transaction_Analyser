This project was bootstrapped with [Create React App]

## Scripts to run the Transaction_Analyser system

In the project directory, you need to run:
1.npm install
2.npm start

### `npm test`

**Make sure to run 'npm run globals' before running test inorder to run test cases with create-react-app**
test:watch runs the test cases in the watch mode.

### Transaction_Analyser system

1. AnalyserContainer is the parent component which houses for _FileUploader_ and _SearchContainer_
2. Input the csv transactions file using fileInput in _FileUploader_.
3. On input the uploaded files are stored in the uploads folder and the _searchContainer_ is mounted.
4. On searchCntainer Mount or update, the csv data from the file is retrieved in Array of JSON format using axios, node and csvtojson.
5. JSON data is processed by the _transactionAnalyser.js_ file to calculate the totalBalance and numberofTransactions is dislayed by _Result Component_

### Pseudo logic

1. All the transactions are iterated at least once for checking the Reversal Transactions at the nth position.
2. If transaction time is within the given timeframe it performs following operations:
   - Transaction type: Payment
     - subtract amount if accountId in fromAccount
     - add amount if accountId in toAccount
   - Transaction type: Reversal
     - add amount if accountId in fromAccount
     - subtract amount if accountId in toAccount
   - For all the above cases transactionsIds mapped with associated Array index are stored in the object for accesing the associated record using Related TransactionId
3. If transaction time is outside the given timeframe it performs following operations:
   - Transaction type: Reversal
     - add amount if accountId in fromAccount
     - subtract amount if accountId in toAccount

### Pending Implementations

1. File type, form and field level vaildations aren't implemented.
2. The given system can be embedded with the redux for maintaing the store.
