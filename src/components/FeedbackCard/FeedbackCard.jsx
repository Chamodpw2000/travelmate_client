import React from 'react';

const FeedbackCard = (props) => {
    return (
        <div style={feedbackCardStyle}>
            <div style={feedbackContentStyle}>
                <h3 style={nameStyle}>{props.name}</h3>
                <p style={countryStyle}>From {props.country}</p>
                <hr style={dividerStyle} />
                <p style={messageStyle}>"{props.message}"</p>
            </div>
        </div>
    );
};

// Custom styles
const feedbackCardStyle = {
    padding: '20px',
    margin: '15px',
    borderRadius: '15px',
    backgroundColor: '#222',
    color: '#fff',
    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.3)',
    minHeight: '180px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    transition: 'transform 0.3s ease',  // Hover effect
};

const feedbackContentStyle = {
    width: '100%',
};

const nameStyle = {
    fontSize: '1.6rem',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#f39c12',
};

const countryStyle = {
    fontSize: '1.1rem',
    marginBottom: '15px',
    color: '#bdc3c7',
};

const messageStyle = {
    fontSize: '1.2rem',
    lineHeight: '1.5',
    fontStyle: 'italic',
};

const dividerStyle = {
    height: '2px',
    backgroundColor: '#f39c12',
    border: 'none',
    margin: '15px 0',
};

// Hover effect
feedbackCardStyle[':hover'] = {
    transform: 'scale(1.05)',
};

export default FeedbackCard;
