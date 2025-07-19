// HR Module API
app.get('/api/hr/employees', getEmployees);
app.get('/api/hr/employee/:id', getEmployeeById);
app.post('/api/hr/employee', createEmployee);

// Finance Module API
app.get('/api/finance/transactions', getTransactions);
app.get('/api/finance/transaction/:id', getTransactionById);
app.post('/api/finance/transaction', createTransaction);

// Inventory Module API
app.get('/api/inventory/items', getInventoryItems);
app.get('/api/inventory/item/:id', getInventoryItemById);
app.post('/api/inventory/item', createInventoryItem);
