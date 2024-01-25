// Action Types
export const CASE_CREATED = 'CASE_CREATED';
export const DOCUMENT_UPLOADED = 'DOCUMENT_UPLOADED';
export const CLIENT_ADDED = 'CLIENT_ADDED';
export const USER_REGISTERED = 'USER_REGISTERED';
export const INVOICE_ISSUED = 'INVOICE_ISSUED';
export const COURT_DATE_SET = 'COURT_DATE_SET';
export const TASK_COMPLETED = 'TASK_COMPLETED';
export const COMMUNICATION_LOGGED = 'COMMUNICATION_LOGGED';
export const RESEARCH_ACCESSED = 'RESEARCH_ACCESSED';
export const PAYMENT_RECEIVED = 'PAYMENT_RECEIVED';
export const SECURITY_CHECK_PASSED = 'SECURITY_CHECK_PASSED';

// Action Creators
export const createCase = caseDetails => ({
  type: CASE_CREATED,
  payload: caseDetails,
});

export const uploadDocument = documentDetails => ({
  type: DOCUMENT_UPLOADED,
  payload: documentDetails,
});

export const addClient = clientDetails => ({
  type: CLIENT_ADDED,
  payload: clientDetails,
});

export const registerUser = userDetails => ({
  type: USER_REGISTERED,
  payload: userDetails,
});

export const issueInvoice = invoiceDetails => ({
  type: INVOICE_ISSUED,
  payload: invoiceDetails,
});

export const setCourtDate = courtDateDetails => ({
  type: COURT_DATE_SET,
  payload: courtDateDetails,
});

export const completeTask = taskDetails => ({
  type: TASK_COMPLETED,
  payload: taskDetails,
});

export const logCommunication = communicationDetails => ({
  type: COMMUNICATION_LOGGED,
  payload: communicationDetails,
});

export const accessResearch = researchDetails => ({
  type: RESEARCH_ACCESSED,
  payload: researchDetails,
});

export const receivePayment = paymentDetails => ({
  type: PAYMENT_RECEIVED,
  payload: paymentDetails,
});

export const checkSecurity = securityDetails => ({
  type: SECURITY_CHECK_PASSED,
  payload: securityDetails,
});