import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { caseReducer } from './reducers';
import { documentReducer } from './reducers';
import { clientReducer } from './reducers';
import { userReducer } from './reducers';
import { invoiceReducer } from './reducers';
import { courtTrackerReducer } from './reducers';
import { workflowReducer } from './reducers';
import { communicationReducer } from './reducers';
import { researchReducer } from './reducers';
import { billingReducer } from './reducers';
import { securityReducer } from './reducers';

const rootReducer = combineReducers({
  caseState: caseReducer,
  documentState: documentReducer,
  clientState: clientReducer,
  userState: userReducer,
  invoiceState: invoiceReducer,
  courtTrackerState: courtTrackerReducer,
  workflowState: workflowReducer,
  communicationState: communicationReducer,
  researchState: researchReducer,
  billingState: billingReducer,
  securityState: securityReducer,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;