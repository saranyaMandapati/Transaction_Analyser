import React, { useState } from 'react';
import FileUploader from '../../components/FileUploader/FileUploader';
import SearchContainer from '../SearchContainer/SearchContainer';

const AnalyserContainer = () => {
  const [fileName, setFileName] = useState('');
  return (
    <>
      <FileUploader setFileName={setFileName} />
      {fileName ? <SearchContainer uploadedFileName={fileName} /> : null}
    </>
  );
};

export default AnalyserContainer;
