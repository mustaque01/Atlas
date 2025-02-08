// src/components/DocumentScanner.js
import React, { useState } from 'react';
import axios from 'axios';
import { Button, Container, Paper, Typography, LinearProgress } from '@material-ui/core';

const DocumentScanner = () => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append('document', file);

        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/api/recognize', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setResult(response.data);
        } catch (error) {
            console.error('Upload failed:', error);
            setResult({ error: 'Recognition failed' });
        }
        setLoading(false);
    };

    return (
        <Container maxWidth="sm">
            <Paper style={{ padding: 20, marginTop: 20 }}>
                <Typography variant="h5" gutterBottom>
                    Document Recognition
                </Typography>

                <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="contained-button-file"
                    type="file"
                    onChange={handleFileChange}
                />
                <label htmlFor="contained-button-file">
                    <Button variant="contained" color="primary" component="span">
                        Upload Document
                    </Button>
                </label>

                {file && (
                    <div style={{ marginTop: 20 }}>
                        <Button 
                            variant="contained" 
                            color="secondary"
                            onClick={handleSubmit}
                        >
                            Process Document
                        </Button>
                    </div>
                )}

                {loading && <LinearProgress style={{ marginTop: 20 }} />}

                {result && (
                    <div style={{ marginTop: 20 }}>
                        <Typography variant="h6">Results:</Typography>
                        <Typography>
                            Confidence: {(result.confidence * 100).toFixed(2)}%
                        </Typography>
                        <Typography>
                            Document Type: {result.documentType}
                        </Typography>
                    </div>
                )}
            </Paper>
        </Container>
    );
};
export default DocumentScanner;