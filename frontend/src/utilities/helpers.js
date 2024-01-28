const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

const getDeadlineClass = (deadline) => {
  const today = new Date();
  const deadlineDate = new Date(deadline);
  const timeDiff = deadlineDate.getTime() - today.getTime();
  const dayDiff = timeDiff / (1000 * 3600 * 24);

  if (dayDiff < 3) {
    return 'deadline-critical';
  } else if (dayDiff < 7) {
    return 'deadline-warning';
  } else {
    return 'deadline-ok';
  }
};

const sortCasesByDate = (cases) => {
  return cases.sort((a, b) => new Date(a.nextCourtDate) - new Date(b.nextCourtDate));
};

const filterDocumentsByCase = (documents, caseId) => {
  return documents.filter(document => document.caseId === caseId);
};

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const generateUniqueId = () => {
  return Math.random().toString(36).substr(2, 9);
};

export {
  formatDate,
  formatCurrency,
  getDeadlineClass,
  sortCasesByDate,
  filterDocumentsByCase,
  capitalizeFirstLetter,
  generateUniqueId
};