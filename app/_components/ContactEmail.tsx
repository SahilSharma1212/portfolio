import * as React from 'react';

interface ContactEmailProps {
  email: string;
  message: string;
}

export const ContactEmail: React.FC<Readonly<ContactEmailProps>> = ({
  email,
  message,
}) => (
  <div style={{
    fontFamily: 'system-ui, -apple-system, sans-serif',
    color: '#333',
    padding: '20px',
    border: '1px solid #eaeaea',
    borderRadius: '5px',
    maxWidth: '600px',
  }}>
    <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>New Contact Message</h1>
    <p style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}><strong>From:</strong> {email}</p>
    <div style={{
      backgroundColor: '#f9f9f9',
      padding: '15px',
      borderRadius: '5px',
      border: '1px dashed #ccc',
      marginTop: '20px',
    }}>
      <p style={{ fontSize: '16px', lineHeight: '1.6', margin: 0 }}>{message}</p>
    </div>
    <hr style={{ border: 'none', borderTop: '1px solid #eaeaea', margin: '30px 0' }} />
    <p style={{ fontSize: '12px', color: '#999' }}>Neural Portfolio Transmission Protocol</p>
  </div>
);
