import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import store from './redux/store';
import CaseComponent from './components/CaseComponent';
import DocumentComponent from './components/DocumentComponent';
import ClientComponent from './components/ClientComponent';
import UserComponent from './components/UserComponent';
import InvoiceComponent from './components/InvoiceComponent';
import CourtTrackerComponent from './components/CourtTrackerComponent';
import WorkflowComponent from './components/WorkflowComponent';
import CommunicationComponent from './components/CommunicationComponent';
import ResearchComponent from './components/ResearchComponent';
import BillingComponent from './components/BillingComponent';
import SecurityComponent from './components/SecurityComponent';
import './styles/main.scss';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Switch>
            <Route path="/cases" component={CaseComponent} />
            <Route path="/documents" component={DocumentComponent} />
            <Route path="/clients" component={ClientComponent} />
            <Route path="/users" component={UserComponent} />
            <Route path="/invoices" component={InvoiceComponent} />
            <Route path="/court-tracker" component={CourtTrackerComponent} />
            <Route path="/workflow" component={WorkflowComponent} />
            <Route path="/communications" component={CommunicationComponent} />
            <Route path="/research" component={ResearchComponent} />
            <Route path="/billing" component={BillingComponent} />
            <Route path="/security" component={SecurityComponent} />
            <Route path="/" exact component={CaseComponent} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;