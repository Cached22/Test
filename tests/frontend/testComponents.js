import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import store from '../src/redux/store';
import CaseComponent from '../src/components/CaseComponent';
import DocumentComponent from '../src/components/DocumentComponent';
import ClientComponent from '../src/components/ClientComponent';
import UserComponent from '../src/components/UserComponent';
import InvoiceComponent from '../src/components/InvoiceComponent';
import CourtTrackerComponent from '../src/components/CourtTrackerComponent';
import WorkflowComponent from '../src/components/WorkflowComponent';
import CommunicationComponent from '../src/components/CommunicationComponent';
import ResearchComponent from '../src/components/ResearchComponent';
import BillingComponent from '../src/components/BillingComponent';
import SecurityComponent from '../src/components/SecurityComponent';

describe('Frontend Component Tests', () => {
  it('renders CaseComponent without crashing', () => {
    render(
      <Provider store={store}>
        <CaseComponent />
      </Provider>
    );
    expect(screen.getByTestId('caseComponent')).toBeInTheDocument();
  });

  it('renders DocumentComponent without crashing', () => {
    render(
      <Provider store={store}>
        <DocumentComponent />
      </Provider>
    );
    expect(screen.getByTestId('documentComponent')).toBeInTheDocument();
  });

  it('renders ClientComponent without crashing', () => {
    render(
      <Provider store={store}>
        <ClientComponent />
      </Provider>
    );
    expect(screen.getByTestId('clientComponent')).toBeInTheDocument();
  });

  it('renders UserComponent without crashing', () => {
    render(
      <Provider store={store}>
        <UserComponent />
      </Provider>
    );
    expect(screen.getByTestId('userComponent')).toBeInTheDocument();
  });

  it('renders InvoiceComponent without crashing', () => {
    render(
      <Provider store={store}>
        <InvoiceComponent />
      </Provider>
    );
    expect(screen.getByTestId('invoiceComponent')).toBeInTheDocument();
  });

  it('renders CourtTrackerComponent without crashing', () => {
    render(
      <Provider store={store}>
        <CourtTrackerComponent />
      </Provider>
    );
    expect(screen.getByTestId('courtTrackerComponent')).toBeInTheDocument();
  });

  it('renders WorkflowComponent without crashing', () => {
    render(
      <Provider store={store}>
        <WorkflowComponent />
      </Provider>
    );
    expect(screen.getByTestId('workflowComponent')).toBeInTheDocument();
  });

  it('renders CommunicationComponent without crashing', () => {
    render(
      <Provider store={store}>
        <CommunicationComponent />
      </Provider>
    );
    expect(screen.getByTestId('communicationComponent')).toBeInTheDocument();
  });

  it('renders ResearchComponent without crashing', () => {
    render(
      <Provider store={store}>
        <ResearchComponent />
      </Provider>
    );
    expect(screen.getByTestId('researchComponent')).toBeInTheDocument();
  });

  it('renders BillingComponent without crashing', () => {
    render(
      <Provider store={store}>
        <BillingComponent />
      </Provider>
    );
    expect(screen.getByTestId('billingComponent')).toBeInTheDocument();
  });

  it('renders SecurityComponent without crashing', () => {
    render(
      <Provider store={store}>
        <SecurityComponent />
      </Provider>
    );
    expect(screen.getByTestId('securityComponent')).toBeInTheDocument();
  });
});