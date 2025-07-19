// roles.js

const roles = {
  ADMIN: {
    name: 'Admin',
    description: 'System administrator with full access',
    permissions: ['VIEW_ALL', 'EDIT_ALL', 'DELETE_ALL', 'MANAGE_USERS']
  },
  HR_MANAGER: {
    name: 'HR Manager',
    description: 'Manages human resources operations',
    permissions: ['VIEW_EMPLOYEES', 'EDIT_EMPLOYEE_DATA', 'APPROVE_LEAVE']
  },
  FINANCE_MANAGER: {
    name: 'Finance Manager',
    description: 'Oversees financial operations',
    permissions: ['VIEW_FINANCIAL_DATA', 'APPROVE_TRANSACTIONS', 'GENERATE_REPORTS']
  },
  INVENTORY_MANAGER: {
    name: 'Inventory Manager',
    description: 'Manages inventory operations',
    permissions: ['MANAGE_STOCK', 'PROCESS_ORDERS', 'GENERATE_INVENTORY_REPORTS']
  },
  EMPLOYEE: {
    name: 'Employee',
    description: 'Basic user with limited access',
    permissions: ['VIEW_PERSONAL_DATA', 'SUBMIT_LEAVE_REQUEST']
  },
  VENDOR: {
    name: 'Vendor',
    description: 'External partner with limited access',
    permissions: ['VIEW_PURCHASE_ORDERS', 'UPLOAD_INVOICES']
  }
};

module.exports = roles;
