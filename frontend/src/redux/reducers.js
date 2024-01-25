import {
  CASE_CREATED,
  DOCUMENT_UPLOADED,
  CLIENT_ADDED,
  USER_REGISTERED,
  INVOICE_ISSUED,
  COURT_DATE_SET,
  TASK_COMPLETED,
  COMMUNICATION_LOGGED,
  RESEARCH_ACCESSED,
  PAYMENT_RECEIVED,
  SECURITY_CHECK_PASSED
} from './actions';

const initialState = {
  cases: [],
  documents: [],
  clients: [],
  users: [],
  invoices: [],
  courtDates: [],
  tasks: [],
  communications: [],
  research: [],
  payments: [],
  securityLogs: []
};

function legalMateReducer(state = initialState, action) {
  switch (action.type) {
    case CASE_CREATED:
      return {
        ...state,
        cases: [...state.cases, action.payload]
      };
    case DOCUMENT_UPLOADED:
      return {
        ...state,
        documents: [...state.documents, action.payload]
      };
    case CLIENT_ADDED:
      return {
        ...state,
        clients: [...state.clients, action.payload]
      };
    case USER_REGISTERED:
      return {
        ...state,
        users: [...state.users, action.payload]
      };
    case INVOICE_ISSUED:
      return {
        ...state,
        invoices: [...state.invoices, action.payload]
      };
    case COURT_DATE_SET:
      return {
        ...state,
        courtDates: [...state.courtDates, action.payload]
      };
    case TASK_COMPLETED:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id ? { ...task, completed: true } : task
        )
      };
    case COMMUNICATION_LOGGED:
      return {
        ...state,
        communications: [...state.communications, action.payload]
      };
    case RESEARCH_ACCESSED:
      return {
        ...state,
        research: [...state.research, action.payload]
      };
    case PAYMENT_RECEIVED:
      return {
        ...state,
        payments: [...state.payments, action.payload]
      };
    case SECURITY_CHECK_PASSED:
      return {
        ...state,
        securityLogs: [...state.securityLogs, action.payload]
      };
    default:
      return state;
  }
}

export default legalMateReducer;