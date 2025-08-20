import React, { useState } from 'react';
import './CustomQuote.css';

const CustomQuote = () => {
    // Form state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        phone2: '',
        phone2Type: '',
        clientType: '',
        otherCustomer: '',
        companyName: '',
        companyAddress: '',
        companyPhone: '',
        purchased: '',
        fieldMeasure: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

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
                            {/* Intro text */}
                            <div className="text-center mb-4">
                                <p className="lead">
                                    Fill out the form below and a representative will contact you via email or phone with your custom quote.
                                    The details submitted will only be used to provide you pricing and information about your appliance installation project.
                                </p>
                            </div>

                            <div className="quote-form-container">
                                <form className="quote-form">

                                    {/* Client Information Section */}
                                    <div className="form-section">
                                        <div className="section-header">
                                            <h3 className="form-section-title">Client Information</h3>
                                            <div className="required-note">
                                                <span className="required-asterisk">*</span>
                                                <span className="required-text">= Required</span>
                                            </div>
                                        </div>
                                        <hr className="section-divider" />

                                        <div className="row">
                                            {/* Name Field */}
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label">
                                                    <span className="required-asterisk">*</span> Your Name:
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    className="form-control"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>

                                            {/* Email Field */}
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label">
                                                    <span className="required-asterisk">*</span> Email Address:
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    className="form-control"
                                                    placeholder="you@domain.com"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="row">
                                            {/* Phone Field */}
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label">
                                                    <span className="required-asterisk">*</span> Cell Phone Number:
                                                </label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    className="form-control"
                                                    placeholder="(123) 555-1234"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                                <div className="form-note">
                                                    <span className="required-asterisk">*</span>
                                                    <span className="note-text">Strongly suggested, as we communicate scheduling information via text message.</span>
                                                </div>
                                            </div>

                                            {/* Phone 2 Field */}
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label">
                                                    Phone Number 2:
                                                </label>
                                                <input
                                                    type="tel"
                                                    name="phone2"
                                                    className="form-control"
                                                    placeholder="(123) 555-1234"
                                                    value={formData.phone2}
                                                    onChange={handleInputChange}
                                                />

                                                {/* Conditional Phone Type - only show if phone2 has value */}
                                                {formData.phone2 && (
                                                    <div className="mt-2">
                                                        <label className="form-label">
                                                            <span className="required-asterisk">*</span> Phone Type:
                                                        </label>
                                                        <div className="radio-group">
                                                            {['Home', 'Cell', 'Work', 'Other'].map(type => (
                                                                <div key={type} className="form-check form-check-inline">
                                                                    <input
                                                                        type="radio"
                                                                        name="phone2Type"
                                                                        value={type}
                                                                        className="form-check-input"
                                                                        checked={formData.phone2Type === type}
                                                                        onChange={handleInputChange}
                                                                    />
                                                                    <label className="form-check-label">{type}</label>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <hr className="field-divider" />

                                        {/* Client Type */}
                                        <div className="row">
                                            <div className="col-12 mb-3">
                                                <label className="form-label">
                                                    <span className="required-asterisk">*</span> Client Type:
                                                </label>
                                                <div className="radio-group vertical">
                                                    {[
                                                        'Homeowner',
                                                        'Property Manager/Landlord',
                                                        'Contractor',
                                                        'Store/Vendor',
                                                        'Other'
                                                    ].map(type => (
                                                        <div key={type} className="form-check">
                                                            <input
                                                                type="radio"
                                                                name="clientType"
                                                                value={type}
                                                                className="form-check-input"
                                                                checked={formData.clientType === type}
                                                                onChange={handleInputChange}
                                                            />
                                                            <label className="form-check-label">{type}</label>
                                                        </div>
                                                    ))}
                                                </div>

                                                {/* Conditional Other Customer Field */}
                                                {formData.clientType === 'Other' && (
                                                    <div className="mt-3">
                                                        <label className="form-label">Other Customer:</label>
                                                        <input
                                                            type="text"
                                                            name="otherCustomer"
                                                            className="form-control"
                                                            value={formData.otherCustomer}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Conditional Company Fields */}
                                        {formData.clientType && formData.clientType !== 'Homeowner' && (
                                            <div className="company-fields">
                                                <div className="row">
                                                    <div className="col-md-6 mb-3">
                                                        <label className="form-label">Company Name:</label>
                                                        <input
                                                            type="text"
                                                            name="companyName"
                                                            className="form-control"
                                                            value={formData.companyName}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                    <div className="col-md-6 mb-3">
                                                        <label className="form-label">Company Phone:</label>
                                                        <input
                                                            type="tel"
                                                            name="companyPhone"
                                                            className="form-control"
                                                            placeholder="(123) 555-1234"
                                                            value={formData.companyPhone}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-12 mb-3">
                                                        <label className="form-label">Company Address:</label>
                                                        <input
                                                            type="text"
                                                            name="companyAddress"
                                                            className="form-control"
                                                            placeholder="Street, City, Zip"
                                                            value={formData.companyAddress}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Pre-Install Site Assessment Section */}
                                    <div className="form-section">
                                        <div className="section-header">
                                            <h3 className="form-section-title">Pre-Install Site Assessment</h3>
                                        </div>
                                        <hr className="section-divider" />

                                        {/* Appliances Purchased Question */}
                                        <div className="row mb-4">
                                            <div className="col-md-8">
                                                <label className="form-label">
                                                    <span className="required-asterisk">*</span> Have the appliances been purchased already?
                                                </label>
                                                <div className="radio-group">
                                                    <div className="form-check">
                                                        <input
                                                            type="radio"
                                                            name="purchased"
                                                            value="Yes"
                                                            className="form-check-input"
                                                            checked={formData.purchased === 'Yes'}
                                                            onChange={handleInputChange}
                                                        />
                                                        <label className="form-check-label">Yes</label>
                                                    </div>
                                                    <div className="form-check">
                                                        <input
                                                            type="radio"
                                                            name="purchased"
                                                            value="No"
                                                            className="form-check-input"
                                                            checked={formData.purchased === 'No'}
                                                            onChange={handleInputChange}
                                                        />
                                                        <label className="form-check-label">No</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                {/* Conditional info based on purchased status */}
                                                {formData.purchased === 'Yes' && (
                                                    <div className="info-note info-purchased">
                                                        <p className="note-text">
                                                            Many who have already made their appliance selections utilize a <strong>Pre-Install Site Assessment</strong> to verify site/appliance compatibility, and either get a firm quote for any site modifications, or the opportunity to choose a different unit that does not require site modifications.
                                                        </p>
                                                    </div>
                                                )}
                                                {formData.purchased === 'No' && (
                                                    <div className="info-note info-not-purchased">
                                                        <p className="note-text">
                                                            If you have not yet chosen your appliances, the completed Field Measure form you receive after a <strong>Pre-Install Site Assessment</strong> will provide your sales associate with the necessary information to assist with your selections, and potentially eliminate or minimize the need for site modifications.
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <hr className="field-divider" />

                                        {/* Field Measure Question */}
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label className="form-label">
                                                    <span className="required-asterisk">*</span> Would you like us to perform a<br />
                                                    Pre-Install Site Assessment?
                                                </label>
                                                <div className="radio-group">
                                                    <div className="form-check">
                                                        <input
                                                            type="radio"
                                                            name="fieldMeasure"
                                                            value="Yes"
                                                            className="form-check-input"
                                                            checked={formData.fieldMeasure === 'Yes'}
                                                            onChange={handleInputChange}
                                                        />
                                                        <label className="form-check-label">Yes</label>
                                                    </div>
                                                    <div className="form-check">
                                                        <input
                                                            type="radio"
                                                            name="fieldMeasure"
                                                            value="No"
                                                            className="form-check-input"
                                                            checked={formData.fieldMeasure === 'No'}
                                                            onChange={handleInputChange}
                                                        />
                                                        <label className="form-check-label">No</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="info-note">
                                                    <p className="note-text">
                                                        Fees for Pre-Install Site Assessment vary by project, and will be quoted upon review of the information you provide. This option is highly recommended for all remodels or new construction projects to avoid potential fees due to site non-readiness.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Placeholder for next sections */}
                                    <div className="text-center mt-5">
                                        <p className="text-muted">Next: Another section...</p>
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