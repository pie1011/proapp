import React, { useState } from 'react';
import './CustomQuote.css';

const CustomQuote = () => {
    // Form state
    const [formData, setFormData] = useState({
        // ... existing fields ...
        purchased: '',
        fieldMeasure: '',
        // Add all these new appliance fields:
        appliances: {
            range: false,
            hood: false,
            cooktop: false,
            microwave: false,
            oven: false,
            dishwasher: false,
            refrigerator: false,
            wine: false,
            ice: false,
            disposal: false,
            trash: false,
            washer: false
        },
        applianceDetails: {
            range: { brand: '', model: '', notes: '', specifics: [] },
            hood: { brand: '', model: '', notes: '', specifics: [] },
            cooktop: { brand: '', model: '', notes: '', specifics: [] },
            microwave: { brand: '', model: '', notes: '', specifics: [] },
            oven: { brand: '', model: '', notes: '', specifics: [] },
            dishwasher: { brand: '', model: '', notes: '', specifics: [] },
            refrigerator: { brand: '', model: '', notes: '', specifics: [] },
            wine: { brand: '', model: '', notes: '', specifics: [] },
            ice: { brand: '', model: '', notes: '', specifics: [] },
            disposal: { brand: '', model: '', notes: '', specifics: [] },
            trash: { brand: '', model: '', notes: '', specifics: [] },
            washer: { brand: '', model: '', notes: '', specifics: [], pedestalModel: '' }
        }
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle appliance checkbox changes
    const handleApplianceChange = (appliance) => {
        setFormData(prev => ({
            ...prev,
            appliances: {
                ...prev.appliances,
                [appliance]: !prev.appliances[appliance]
            }
        }));
    };

    // Handle appliance detail changes
    const handleApplianceDetailChange = (appliance, field, value) => {
        setFormData(prev => ({
            ...prev,
            applianceDetails: {
                ...prev.applianceDetails,
                [appliance]: {
                    ...prev.applianceDetails[appliance],
                    [field]: value
                }
            }
        }));
    };

    // Handle appliance specifics (checkbox arrays)
    const handleApplianceSpecificChange = (appliance, specific) => {
        setFormData(prev => {
            const currentSpecifics = prev.applianceDetails[appliance].specifics;
            const newSpecifics = currentSpecifics.includes(specific)
                ? currentSpecifics.filter(s => s !== specific)
                : [...currentSpecifics, specific];

            return {
                ...prev,
                applianceDetails: {
                    ...prev.applianceDetails,
                    [appliance]: {
                        ...prev.applianceDetails[appliance],
                        specifics: newSpecifics
                    }
                }
            };
        });
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


                                    {/* Appliance Details Section */}
                                    <div className="form-section">
                                        <div className="section-header">
                                            <h3 className="form-section-title">Appliance Details</h3>
                                        </div>
                                        <hr className="section-divider" />

                                        <div className="row mb-4">
                                            <div className="col-md-6">
                                                <label className="form-label">
                                                    Which appliances can we assist you with?<br />
                                                    <span className="note-text">Check all that apply.</span>
                                                </label>
                                            </div>
                                            <div className="col-md-6">
                                                {/* Conditional disclaimer based on field measure */}
                                                {formData.fieldMeasure === 'No' && (
                                                    <div className="model-disclaimer">
                                                        <p className="disclaimer-text">
                                                            If you do not know the model numbers of your appliances, please call to discuss your project and receive a verbal estimate, or request a Pre-Install Site Assessment (above).
                                                        </p>
                                                    </div>
                                                )}
                                                {formData.fieldMeasure === 'Yes' && (
                                                    <div className="model-note">
                                                        <p className="note-text">Please provide model numbers, if known.</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Appliance Grid */}
                                        <div className="appliance-grid">

                                            {/* Range */}
                                            <div className="appliance-row">
                                                <div className="appliance-checkbox">
                                                    <div className="form-check">
                                                        <input
                                                            type="checkbox"
                                                            id="appliance-range"
                                                            className="form-check-input"
                                                            checked={formData.appliances.range}
                                                            onChange={() => handleApplianceChange('range')}
                                                        />
                                                        <label htmlFor="appliance-range" className="form-check-label appliance-label clickable-label">Range</label>
                                                    </div>

                                                    {formData.appliances.range && (
                                                        <div className="appliance-specifics">
                                                            {['Wider than 36"', 'Downdraft Range', 'Liquid Propane Conversion'].map(specific => (
                                                                <div key={specific} className="form-check">
                                                                    <input
                                                                        type="checkbox"
                                                                        className="form-check-input"
                                                                        checked={formData.applianceDetails.range.specifics.includes(specific)}
                                                                        onChange={() => handleApplianceSpecificChange('range', specific)}
                                                                    />
                                                                    <label className="form-check-label">{specific}</label>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>

                                                {formData.appliances.range && (
                                                    <div className="appliance-details">
                                                        <div className="detail-field">
                                                            <label className="form-label">Brand and Model Name:</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                value={formData.applianceDetails.range.brand}
                                                                onChange={(e) => handleApplianceDetailChange('range', 'brand', e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="detail-field">
                                                            <label className="form-label">
                                                                Model Number:
                                                                {formData.fieldMeasure === 'No' && <span className="required-asterisk"> *</span>}
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                value={formData.applianceDetails.range.model}
                                                                onChange={(e) => handleApplianceDetailChange('range', 'model', e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="detail-field">
                                                            <label className="form-label">Notes:</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                value={formData.applianceDetails.range.notes}
                                                                onChange={(e) => handleApplianceDetailChange('range', 'notes', e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Hood */}
                                            <div className="appliance-row">
                                                <div className="appliance-checkbox">
                                                    <div className="form-check">
                                                        <input
                                                            type="checkbox"
                                                            id="appliance-hood"
                                                            className="form-check-input"
                                                            checked={formData.appliances.hood}
                                                            onChange={() => handleApplianceChange('hood')}
                                                        />
                                                        <label htmlFor="appliance-hood" className="form-check-label appliance-label clickable-label">Hood</label>
                                                    </div>

                                                    {formData.appliances.hood && (
                                                        <div className="appliance-specifics">
                                                            {['44" or Wider', 'Chimney Hood', 'Island Hood', 'Internal Blower Only', 'Exterior Blower'].map(specific => (
                                                                <div key={specific} className="form-check">
                                                                    <input
                                                                        type="checkbox"
                                                                        className="form-check-input"
                                                                        checked={formData.applianceDetails.hood.specifics.includes(specific)}
                                                                        onChange={() => handleApplianceSpecificChange('hood', specific)}
                                                                    />
                                                                    <label className="form-check-label">{specific}</label>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>

                                                {formData.appliances.hood && (
                                                    <div className="appliance-details">
                                                        <div className="detail-field">
                                                            <label className="form-label">Brand and Model Name:</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                value={formData.applianceDetails.hood.brand}
                                                                onChange={(e) => handleApplianceDetailChange('hood', 'brand', e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="detail-field">
                                                            <label className="form-label">
                                                                Model Number:
                                                                {formData.fieldMeasure === 'No' && <span className="required-asterisk"> *</span>}
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                value={formData.applianceDetails.hood.model}
                                                                onChange={(e) => handleApplianceDetailChange('hood', 'model', e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="detail-field">
                                                            <label className="form-label">Notes:</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                value={formData.applianceDetails.hood.notes}
                                                                onChange={(e) => handleApplianceDetailChange('hood', 'notes', e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Cooktop */}
                                            <div className="appliance-row">
                                                <div className="appliance-checkbox">
                                                    <div className="form-check">
                                                        <input
                                                            type="checkbox"
                                                            id="appliance-cooktop"
                                                            className="form-check-input"
                                                            checked={formData.appliances.cooktop}
                                                            onChange={() => handleApplianceChange('cooktop')}
                                                        />
                                                        <label htmlFor="appliance-cooktop" className="form-check-label appliance-label clickable-label">Cooktop</label>
                                                    </div>

                                                    {formData.appliances.cooktop && (
                                                        <div className="appliance-specifics">
                                                            {['44" or Wider', 'Downdraft Cooktop', 'Separate Downdraft Unit', 'Liquid Propane Conversion'].map(specific => (
                                                                <div key={specific} className="form-check">
                                                                    <input
                                                                        type="checkbox"
                                                                        className="form-check-input"
                                                                        checked={formData.applianceDetails.cooktop.specifics.includes(specific)}
                                                                        onChange={() => handleApplianceSpecificChange('cooktop', specific)}
                                                                    />
                                                                    <label className="form-check-label">{specific}</label>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>

                                                {formData.appliances.cooktop && (
                                                    <div className="appliance-details">
                                                        <div className="detail-field">
                                                            <label className="form-label">Brand and Model Name:</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                value={formData.applianceDetails.cooktop.brand}
                                                                onChange={(e) => handleApplianceDetailChange('cooktop', 'brand', e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="detail-field">
                                                            <label className="form-label">
                                                                Model Number:
                                                                {formData.fieldMeasure === 'No' && <span className="required-asterisk"> *</span>}
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                value={formData.applianceDetails.cooktop.model}
                                                                onChange={(e) => handleApplianceDetailChange('cooktop', 'model', e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="detail-field">
                                                            <label className="form-label">Notes:</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                value={formData.applianceDetails.cooktop.notes}
                                                                onChange={(e) => handleApplianceDetailChange('cooktop', 'notes', e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Microwave */}
                                            <div className="appliance-row">
                                                <div className="appliance-checkbox">
                                                    <div className="form-check">
                                                        <input
                                                            type="checkbox"
                                                            id="appliance-microwave"
                                                            className="form-check-input"
                                                            checked={formData.appliances.microwave}
                                                            onChange={() => handleApplianceChange('microwave')}
                                                        />
                                                        <label htmlFor="appliance-microwave" className="form-check-label appliance-label clickable-label">Microwave</label>
                                                    </div>

                                                    {formData.appliances.microwave && (
                                                        <div className="appliance-specifics">
                                                            {['Over-the-Range Microwave', 'Built-In Microwave with Trim Kit', 'Under-Cabinet Microwave', 'Microwave Drawer'].map(specific => (
                                                                <div key={specific} className="form-check">
                                                                    <input
                                                                        type="checkbox"
                                                                        className="form-check-input"
                                                                        checked={formData.applianceDetails.microwave.specifics.includes(specific)}
                                                                        onChange={() => handleApplianceSpecificChange('microwave', specific)}
                                                                    />
                                                                    <label className="form-check-label">{specific}</label>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>

                                                {formData.appliances.microwave && (
                                                    <div className="appliance-details">
                                                        <div className="detail-field">
                                                            <label className="form-label">Brand and Model Name:</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                value={formData.applianceDetails.microwave.brand}
                                                                onChange={(e) => handleApplianceDetailChange('microwave', 'brand', e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="detail-field">
                                                            <label className="form-label">
                                                                Model Number:
                                                                {formData.fieldMeasure === 'No' && <span className="required-asterisk"> *</span>}
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                value={formData.applianceDetails.microwave.model}
                                                                onChange={(e) => handleApplianceDetailChange('microwave', 'model', e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="detail-field">
                                                            <label className="form-label">Notes:</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                value={formData.applianceDetails.microwave.notes}
                                                                onChange={(e) => handleApplianceDetailChange('microwave', 'notes', e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Wall Oven */}
                                            <div className="appliance-row">
                                                <div className="appliance-checkbox">
                                                    <div className="form-check">
                                                        <input
                                                            type="checkbox"
                                                            id="appliance-oven"
                                                            className="form-check-input"
                                                            checked={formData.appliances.oven}
                                                            onChange={() => handleApplianceChange('oven')}
                                                        />
                                                        <label htmlFor="appliance-oven" className="form-check-label appliance-label clickable-label">Wall Oven</label>
                                                    </div>

                                                    {formData.appliances.oven && (
                                                        <div className="appliance-specifics">
                                                            {['Single Wall Oven', 'Double/Combo Wall Oven', 'Warming Drawer'].map(specific => (
                                                                <div key={specific} className="form-check">
                                                                    <input
                                                                        type="checkbox"
                                                                        className="form-check-input"
                                                                        checked={formData.applianceDetails.oven.specifics.includes(specific)}
                                                                        onChange={() => handleApplianceSpecificChange('oven', specific)}
                                                                    />
                                                                    <label className="form-check-label">{specific}</label>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>

                                                {formData.appliances.oven && (
                                                    <div className="appliance-details">
                                                        <div className="detail-field">
                                                            <label className="form-label">Brand and Model Name:</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                value={formData.applianceDetails.oven.brand}
                                                                onChange={(e) => handleApplianceDetailChange('oven', 'brand', e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="detail-field">
                                                            <label className="form-label">
                                                                Model Number:
                                                                {formData.fieldMeasure === 'No' && <span className="required-asterisk"> *</span>}
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                value={formData.applianceDetails.oven.model}
                                                                onChange={(e) => handleApplianceDetailChange('oven', 'model', e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="detail-field">
                                                            <label className="form-label">Notes:</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                value={formData.applianceDetails.oven.notes}
                                                                onChange={(e) => handleApplianceDetailChange('oven', 'notes', e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Dishwasher */}
                                            <div className="appliance-row">
                                                <div className="appliance-checkbox">
                                                    <div className="form-check">
                                                        <input
                                                            type="checkbox"
                                                            id="appliance-dishwasher"
                                                            className="form-check-input"
                                                            checked={formData.appliances.dishwasher}
                                                            onChange={() => handleApplianceChange('dishwasher')}
                                                        />
                                                        <label htmlFor="appliance-dishwasher" className="form-check-label appliance-label clickable-label">Dishwasher</label>
                                                    </div>

                                                    {formData.appliances.dishwasher && (
                                                        <div className="appliance-specifics">
                                                            {['Has Air Gap', 'No Air Gap', 'Dishwasher Panel'].map(specific => (
                                                                <div key={specific} className="form-check">
                                                                    <input
                                                                        type="checkbox"
                                                                        className="form-check-input"
                                                                        checked={formData.applianceDetails.dishwasher.specifics.includes(specific)}
                                                                        onChange={() => handleApplianceSpecificChange('dishwasher', specific)}
                                                                    />
                                                                    <label className="form-check-label">{specific}</label>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>

                                                {formData.appliances.dishwasher && (
                                                    <div className="appliance-details">
                                                        <div className="detail-field">
                                                            <label className="form-label">Brand and Model Name:</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                value={formData.applianceDetails.dishwasher.brand}
                                                                onChange={(e) => handleApplianceDetailChange('dishwasher', 'brand', e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="detail-field">
                                                            <label className="form-label">
                                                                Model Number:
                                                                {formData.fieldMeasure === 'No' && <span className="required-asterisk"> *</span>}
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                value={formData.applianceDetails.dishwasher.model}
                                                                onChange={(e) => handleApplianceDetailChange('dishwasher', 'model', e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="detail-field">
                                                            <label className="form-label">Notes:</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                value={formData.applianceDetails.dishwasher.notes}
                                                                onChange={(e) => handleApplianceDetailChange('dishwasher', 'notes', e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Refrigerator/Freezer */}
                                            <div className="appliance-row">
                                                <div className="appliance-checkbox">
                                                    <div className="form-check">
                                                        <input
                                                            type="checkbox"
                                                            id="appliance-refrigerator"
                                                            className="form-check-input"
                                                            checked={formData.appliances.refrigerator}
                                                            onChange={() => handleApplianceChange('refrigerator')}
                                                        />
                                                        <label htmlFor="appliance-refrigerator" className="form-check-label appliance-label clickable-label">Refrigerator/Freezer</label>
                                                    </div>

                                                    {formData.appliances.refrigerator && (
                                                        <div className="appliance-specifics">
                                                            {['Freestanding Refrigerator with Water Line', 'Built-In Refrigerator with Freezer', 'Built-In Refrigerator (Separate Unit)', 'Built-In Freezer (Separate Unit)', 'Under-Counter Refrigerator', 'Custom Panel(s)'].map(specific => (
                                                                <div key={specific} className="form-check">
                                                                    <input
                                                                        type="checkbox"
                                                                        className="form-check-input"
                                                                        checked={formData.applianceDetails.refrigerator.specifics.includes(specific)}
                                                                        onChange={() => handleApplianceSpecificChange('refrigerator', specific)}
                                                                    />
                                                                    <label className="form-check-label">{specific}</label>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>

                                                {formData.appliances.refrigerator && (
                                                    <div className="appliance-details">
                                                        <div className="detail-field">
                                                            <label className="form-label">Brand and Model Name(s):</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                value={formData.applianceDetails.refrigerator.brand}
                                                                onChange={(e) => handleApplianceDetailChange('refrigerator', 'brand', e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="detail-field">
                                                            <label className="form-label">
                                                                Model Number(s) of Each:
                                                                {formData.fieldMeasure === 'No' && <span className="required-asterisk"> *</span>}
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                value={formData.applianceDetails.refrigerator.model}
                                                                onChange={(e) => handleApplianceDetailChange('refrigerator', 'model', e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="detail-field">
                                                            <label className="form-label">Notes:</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                value={formData.applianceDetails.refrigerator.notes}
                                                                onChange={(e) => handleApplianceDetailChange('refrigerator', 'notes', e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Wine Cooler */}
                                            <div className="appliance-row">
                                                <div className="appliance-checkbox">
                                                    <div className="form-check">
                                                        <input
                                                            type="checkbox"
                                                            id="appliance-wine"
                                                            className="form-check-input"
                                                            checked={formData.appliances.wine}
                                                            onChange={() => handleApplianceChange('wine')}
                                                        />
                                                        <label htmlFor="appliance-wine" className="form-check-label appliance-label clickable-label">Wine Cooler</label>
                                                    </div>

                                                    {formData.appliances.wine && (
                                                        <div className="appliance-specifics">
                                                            {['Built-In Wine Cooler', 'Under-Counter Wine Cooler'].map(specific => (
                                                                <div key={specific} className="form-check">
                                                                    <input
                                                                        type="checkbox"
                                                                        className="form-check-input"
                                                                        checked={formData.applianceDetails.wine.specifics.includes(specific)}
                                                                        onChange={() => handleApplianceSpecificChange('wine', specific)}
                                                                    />
                                                                    <label className="form-check-label">{specific}</label>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>

                                                {formData.appliances.wine && (
                                                    <div className="appliance-details">
                                                        <div className="detail-field">
                                                            <label className="form-label">Brand and Model Name:</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                value={formData.applianceDetails.wine.brand}
                                                                onChange={(e) => handleApplianceDetailChange('wine', 'brand', e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="detail-field">
                                                            <label className="form-label">
                                                                Model Number:
                                                                {formData.fieldMeasure === 'No' && <span className="required-asterisk"> *</span>}
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                value={formData.applianceDetails.wine.model}
                                                                onChange={(e) => handleApplianceDetailChange('wine', 'model', e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="detail-field">
                                                            <label className="form-label">Notes:</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                value={formData.applianceDetails.wine.notes}
                                                                onChange={(e) => handleApplianceDetailChange('wine', 'notes', e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>


                                            {/* Under-Counter Ice Maker */}
                                            <div className="appliance-row">
                                                <div className="appliance-checkbox">
                                                    <div className="form-check">
                                                        <input
                                                            type="checkbox"
                                                            id="appliance-ice"
                                                            className="form-check-input"
                                                            checked={formData.appliances.ice}
                                                            onChange={() => handleApplianceChange('ice')}
                                                        />
                                                        <label htmlFor="appliance-ice" className="form-check-label appliance-label clickable-label">Under-Counter Ice Maker</label>
                                                    </div>
                                                </div>

                                                {formData.appliances.ice && (
                                                    <div className="appliance-details">
                                                        <div className="detail-field">
                                                            <label className="form-label">Brand and Model Name:</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                value={formData.applianceDetails.ice.brand}
                                                                onChange={(e) => handleApplianceDetailChange('ice', 'brand', e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="detail-field">
                                                            <label className="form-label">
                                                                Model Number:
                                                                {formData.fieldMeasure === 'No' && <span className="required-asterisk"> *</span>}
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                value={formData.applianceDetails.ice.model}
                                                                onChange={(e) => handleApplianceDetailChange('ice', 'model', e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="detail-field">
                                                            <label className="form-label">Notes:</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                value={formData.applianceDetails.ice.notes}
                                                                onChange={(e) => handleApplianceDetailChange('ice', 'notes', e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Garbage Disposal */}
                                            <div className="appliance-row">
                                                <div className="appliance-checkbox">
                                                    <div className="form-check">
                                                        <input
                                                            type="checkbox"
                                                            id="appliance-disposal"
                                                            className="form-check-input"
                                                            checked={formData.appliances.disposal}
                                                            onChange={() => handleApplianceChange('disposal')}
                                                        />
                                                        <label htmlFor="appliance-disposal" className="form-check-label appliance-label clickable-label">Garbage Disposal</label>
                                                    </div>

                                                    {formData.appliances.disposal && (
                                                        <div className="appliance-specifics">
                                                            {['Replacement Installation', 'New Installation'].map(specific => (
                                                                <div key={specific} className="form-check">
                                                                    <input
                                                                        type="checkbox"
                                                                        className="form-check-input"
                                                                        checked={formData.applianceDetails.disposal.specifics.includes(specific)}
                                                                        onChange={() => handleApplianceSpecificChange('disposal', specific)}
                                                                    />
                                                                    <label className="form-check-label">{specific}</label>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>

                                                {formData.appliances.disposal && (
                                                    <div className="appliance-details">
                                                        <div className="detail-field">
                                                            <label className="form-label">Brand and Model Name:</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                value={formData.applianceDetails.disposal.brand}
                                                                onChange={(e) => handleApplianceDetailChange('disposal', 'brand', e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="detail-field">
                                                            <label className="form-label">
                                                                Model Number:
                                                                {formData.fieldMeasure === 'No' && <span className="required-asterisk"> *</span>}
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                value={formData.applianceDetails.disposal.model}
                                                                onChange={(e) => handleApplianceDetailChange('disposal', 'model', e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="detail-field">
                                                            <label className="form-label">Notes:</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                value={formData.applianceDetails.disposal.notes}
                                                                onChange={(e) => handleApplianceDetailChange('disposal', 'notes', e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Trash Compactor */}
                                            <div className="appliance-row">
                                                <div className="appliance-checkbox">
                                                    <div className="form-check">
                                                        <input
                                                            type="checkbox"
                                                            id="appliance-trash"
                                                            className="form-check-input"
                                                            checked={formData.appliances.trash}
                                                            onChange={() => handleApplianceChange('trash')}
                                                        />
                                                        <label htmlFor="appliance-trash" className="form-check-label appliance-label clickable-label">Trash Compactor</label>
                                                    </div>
                                                </div>

                                                {formData.appliances.trash && (
                                                    <div className="appliance-details">
                                                        <div className="detail-field">
                                                            <label className="form-label">Brand and Model Name:</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                value={formData.applianceDetails.trash.brand}
                                                                onChange={(e) => handleApplianceDetailChange('trash', 'brand', e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="detail-field">
                                                            <label className="form-label">
                                                                Model Number:
                                                                {formData.fieldMeasure === 'No' && <span className="required-asterisk"> *</span>}
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                value={formData.applianceDetails.trash.model}
                                                                onChange={(e) => handleApplianceDetailChange('trash', 'model', e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="detail-field">
                                                            <label className="form-label">Notes:</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                value={formData.applianceDetails.trash.notes}
                                                                onChange={(e) => handleApplianceDetailChange('trash', 'notes', e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Washer/Dryer */}
                                            <div className="appliance-row">
                                                <div className="appliance-checkbox">
                                                    <div className="form-check">
                                                        <input
                                                            type="checkbox"
                                                            id="appliance-washer"
                                                            className="form-check-input"
                                                            checked={formData.appliances.washer}
                                                            onChange={() => handleApplianceChange('washer')}
                                                        />
                                                        <label htmlFor="appliance-washer" className="form-check-label appliance-label clickable-label">Washer/Dryer</label>
                                                    </div>

                                                    {formData.appliances.washer && (
                                                        <div className="appliance-specifics">
                                                            {['Washer', 'Dryer', 'Stacked Washer and Dryer', 'Pedestal(s) - Drawer', 'Pedestal(s) - Sidekick', 'Liquid Propane Conversion'].map(specific => (
                                                                <div key={specific} className="form-check">
                                                                    <input
                                                                        type="checkbox"
                                                                        className="form-check-input"
                                                                        checked={formData.applianceDetails.washer.specifics.includes(specific)}
                                                                        onChange={() => handleApplianceSpecificChange('washer', specific)}
                                                                    />
                                                                    <label className="form-check-label">{specific}</label>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>

                                                {formData.appliances.washer && (
                                                    <div className="appliance-details">
                                                        <div className="detail-field">
                                                            <label className="form-label">Brand and Model Name(s):</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                value={formData.applianceDetails.washer.brand}
                                                                onChange={(e) => handleApplianceDetailChange('washer', 'brand', e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="detail-field">
                                                            <label className="form-label">
                                                                Model Number(s) of Each:
                                                                {formData.fieldMeasure === 'No' && <span className="required-asterisk"> *</span>}
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                value={formData.applianceDetails.washer.model}
                                                                onChange={(e) => handleApplianceDetailChange('washer', 'model', e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="detail-field">
                                                            <label className="form-label">Notes:</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                value={formData.applianceDetails.washer.notes}
                                                                onChange={(e) => handleApplianceDetailChange('washer', 'notes', e.target.value)}
                                                            />
                                                        </div>

                                                        {/* Special pedestal field for washer/dryer */}
                                                        {(formData.applianceDetails.washer.specifics.includes('Pedestal(s) - Drawer') ||
                                                            formData.applianceDetails.washer.specifics.includes('Pedestal(s) - Sidekick')) && (
                                                                <div className="detail-field pedestal-field">
                                                                    <label className="form-label">
                                                                        Pedestal Model Number(s):
                                                                        {formData.fieldMeasure === 'No' && <span className="required-asterisk"> *</span>}
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        value={formData.applianceDetails.washer.pedestalModel || ''}
                                                                        onChange={(e) => handleApplianceDetailChange('washer', 'pedestalModel', e.target.value)}
                                                                    />
                                                                </div>
                                                            )}
                                                    </div>
                                                )}
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