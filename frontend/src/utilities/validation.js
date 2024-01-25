const validateCaseDetails = (caseDetails) => {
  const errors = {};
  if (!caseDetails.title || caseDetails.title.trim() === '') {
    errors.title = 'Case title is required';
  }
  if (!caseDetails.description || caseDetails.description.trim() === '') {
    errors.description = 'Case description is required';
  }
  // Additional validations can be added as per requirement
  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};

const validateDocument = (document) => {
  const errors = {};
  if (!document.name || document.name.trim() === '') {
    errors.name = 'Document name is required';
  }
  if (!document.type || document.type.trim() === '') {
    errors.type = 'Document type is required';
  }
  // Additional validations can be added as per requirement
  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};

const validateClientInfo = (clientInfo) => {
  const errors = {};
  if (!clientInfo.name || clientInfo.name.trim() === '') {
    errors.name = 'Client name is required';
  }
  // Additional validations can be added as per requirement
  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};

const validateUserInfo = (userInfo) => {
  const errors = {};
  if (!userInfo.username || userInfo.username.trim() === '') {
    errors.username = 'Username is required';
  }
  if (!userInfo.password || userInfo.password.trim() === '') {
    errors.password = 'Password is required';
  }
  // Additional validations can be added as per requirement
  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};

const validateInvoiceDetails = (invoiceDetails) => {
  const errors = {};
  if (!invoiceDetails.amount || isNaN(invoiceDetails.amount)) {
    errors.amount = 'Invoice amount must be a valid number';
  }
  if (!invoiceDetails.dueDate || new Date(invoiceDetails.dueDate) < new Date()) {
    errors.dueDate = 'Invoice due date must be in the future';
  }
  // Additional validations can be added as per requirement
  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};

export {
  validateCaseDetails,
  validateDocument,
  validateClientInfo,
  validateUserInfo,
  validateInvoiceDetails
};