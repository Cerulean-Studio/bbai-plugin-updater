'use client';

import { useState } from 'react';

const Uploader = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                alert('File uploaded successfully');
            } else {
                alert('File upload failed');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('File upload failed');
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '5px', width: '300px' }}>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '10px' }}>
                        <label htmlFor="file-upload" style={{ display: 'block', marginBottom: '5px' }}>Upload your file:</label>
                        <input type="file" id="file-upload" onChange={handleFileChange} />
                    </div>
                    <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Uploader;