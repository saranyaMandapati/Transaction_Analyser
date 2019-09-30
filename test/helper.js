const trnsctnData = [
  {
    transactionId: 'TX10001',
    fromAccountId: 'ACC334455',
    toAccountId: 'ACC778899',
    createdAt: '20/10/2018 12:47:55',
    amount: '25',
    transactionType: 'PAYMENT',
    relatedTransaction: ''
  },
  {
    transactionId: 'TX10002',
    fromAccountId: 'ACC334455',
    toAccountId: 'ACC998877',
    createdAt: '20/10/2018 17:33:43',
    amount: '10.5',
    transactionType: 'PAYMENT',
    relatedTransaction: ''
  },
  {
    transactionId: 'TX10005',
    fromAccountId: 'ACC998877',
    toAccountId: 'ACC778899',
    createdAt: '20/10/2018 18:00:00',
    amount: '5',
    transactionType: 'PAYMENT',
    relatedTransaction: ''
  },
  {
    transactionId: 'TX10004',
    fromAccountId: 'ACC334455',
    toAccountId: 'ACC998877',
    createdAt: '20/10/2018 19:45:00',
    amount: '10.5',
    transactionType: 'REVERSAL',
    relatedTransaction: 'TX10002'
  },
  {
    transactionId: 'TX10005',
    fromAccountId: 'ACC334455',
    toAccountId: 'ACC778899',
    createdAt: '21/10/2018 09:30:00',
    amount: '7.25',
    transactionType: 'PAYMENT',
    relatedTransaction: ''
  }
];

export default trnsctnData;
