import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadDocument, DOCUMENT_UPLOADED } from '../redux/actions';
import { api } from '../utilities/api';
import { validation } from '../utilities/validation';
import '../styles/DocumentComponent.scss';

const DocumentComponent = () => {
  const [documentData, setDocumentData] = useState({
    title: '',
    description: '',
    file: null,
  });
  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch();
  const { documents } = useSelector(state => state.documents);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDocumentData({ ...documentData, [name]: value });
  };

  const handleFileChange = (e) => {
    setDocumentData({ ...documentData, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validation.validateDocument(documentData)) {
      alert('Please fill in all fields and select a document.');
      return;
    }
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('title', documentData.title);
      formData.append('description', documentData.description);
      formData.append('file', documentData.file);

      const response = await api.upload('/documents', formData);
      dispatch(uploadDocument(response.data));
      dispatch({ type: DOCUMENT_UPLOADED, payload: response.data });
      alert('Document uploaded successfully!');
    } catch (error) {
      alert('Error uploading document: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    // Fetch documents when component mounts
    const fetchDocuments = async () => {
      const response = await api.get('/documents');
      // Assuming action creator 'setDocuments' exists
      dispatch(uploadDocument(response.data));
    };

    fetchDocuments();
  }, [dispatch]);

  return (
    <div id="documentComponent" className="document-component">
      <h2>Document Management</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Document Title"
          value={documentData.title}
          onChange={handleInputChange}
        />
        <textarea
          name="description"
          placeholder="Document Description"
          value={documentData.description}
          onChange={handleInputChange}
        />
        <input
          type="file"
          name="file"
          onChange={handleFileChange}
        />
        <button type="submit" disabled={uploading}>
          {uploading ? 'Uploading...' : 'Upload Document'}
        </button>
      </form>
      <div className="document-list">
        {documents.map(doc => (
          <div key={doc.id} className="document-item">
            <h3>{doc.title}</h3>
            <p>{doc.description}</p>
            {/* Assuming there's a function to download the document */}
            <button onClick={() => api.downloadDocument(doc.id)}>Download</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentComponent;