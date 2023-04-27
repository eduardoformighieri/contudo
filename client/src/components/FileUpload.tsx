import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_BASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);
const bucketName = import.meta.env.VITE_SUPABASE_BUCKET;

function FileUpload() {
  const [files, setFiles] = useState([]);

  function handleFileSelect(event: any) {
    const selectedFiles: any = Array.from(event.target.files);
    setFiles(selectedFiles);
  }

  function handleRemoveFile(index: number) {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  }

  async function handleUpload() {
    const promises = files.map(async (file: any) => {
      const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(file.name, file);
      if (error) {
        console.log(`Error uploading file ${file.name}:`, error);
      } else {
        console.log(`File ${file.name} uploaded successfully!`);
        console.log('data: ', data);
      }
    });

    const keys = await Promise.all(promises);
    console.log('All files uploaded successfully!');
    console.log('File paths:', keys);

    // Clear selected files
    setFiles([]);
  }

  return (
    <div>
      <input type="file" multiple onChange={handleFileSelect} />
      <div>
        {files.map((file: any, index) => (
          <div key={index}>
            <span>{file.name}</span>
            <button onClick={() => handleRemoveFile(index)}>Remove</button>
          </div>
        ))}
      </div>
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default FileUpload;
