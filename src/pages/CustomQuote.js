import React from 'react';
import './CustomQuote.css';

const CustomQuote = () => {
  return (
    <div className="quote-page">
      {/* Hero Section */}
      <div className="quote-hero">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8">
              <h1 className="page-title">Custom Quote Request</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="quote-content">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              {/* Intro text in white area */}
              <div className="text-center mb-4">
                <p className="lead">
                  Fill out the form below and a representative will contact you via email or phone with your custom quote. 
                  The details submitted will only be used to provide you pricing and information about your appliance installation project.
                </p>
              </div>

              <div className="quote-form-container">
                <form className="quote-form">
                  {/* We'll build the form sections here step by step */}
                  <div className="text-center">
                    <h3 className="section-title">Form sections will be added here step by step...</h3>
                    <p className="text-muted">Starting with Client Information section next!</p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomQuote;