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
        fieldMeasure: '',

        // Appliance fields:
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
        },
        // Additional fields
        delivery: '',
        pickupLocation: '',
        pickupDate: '',
        uninstall: '',
        haulAway: '',
        street: '',
        unit: '',
        city: '',
        zip: '',
        homeType: '',
        floor: '',
        stairs: '',
        stairsNumber: '',
        stairsTurns: '',
        parking: '',
        parkingNotes: '',
        gateCode: '',
        preferredDate: '',
        preferredTime: [],
        additionalDetails: ''
    });

    // State for form submission
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null


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

    // Handle checkbox arrays (like preferred time)
    const handleCheckboxArrayChange = (name, value) => {
        setFormData(prev => {
            const currentArray = prev[name] || [];
            const newArray = currentArray.includes(value)
                ? currentArray.filter(item => item !== value)
                : [...currentArray, value];

            return {
                ...prev,
                [name]: newArray
            };
        });
    };

    // Handle file uploads
    const handleFileChange = (e, fileNumber) => {
        const file = e.target.files[0];
        if (file) {
            // Check file size (5MB limit)
            if (file.size > 5 * 1024 * 1024) {
                alert('File size must be less than 5MB');
                e.target.value = '';
                return;
            }

            setFormData(prev => ({
                ...prev,
                [`uploadFile${fileNumber}`]: file
            }));
        }
    };

    // Remove uploaded file
    const removeFile = (fileNumber) => {
        setFormData(prev => {
            const newData = { ...prev };
            delete newData[`uploadFile${fileNumber}`];
            return newData;
        });

        // Clear the file input
        const fileInput = document.querySelector(`input[name="upload-file${fileNumber}"]`);
        if (fileInput) {
            fileInput.value = '';
        }
    };


    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            // Here's where you'll integrate with Netlify Forms
            // For now, we'll simulate the submission

            console.log('Form data to submit:', formData);

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Success!
            setSubmitStatus('success');
            setIsSubmitting(false);

            // Scroll to top to show success message
            window.scrollTo({ top: 0, behavior: 'smooth' });

        } catch (error) {
            console.error('Submission error:', error);
            setSubmitStatus('error');
            setIsSubmitting(false);
        }
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
                                <form className="quote-form" onSubmit={handleSubmit} netlify encType="multipart/form-data">

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


                                    {/* Services Section */}
                                    <div className="form-section">
                                        <div className="section-header">
                                            <h3 className="form-section-title">Services</h3>
                                        </div>
                                        <hr className="section-divider" />

                                        <div className="services-grid">

                                            {/* Delivery Service */}
                                            <div className="service-row">
                                                <div className="service-question">
                                                    <label className="form-label">
                                                        <span className="required-asterisk">*</span> Delivery:
                                                    </label>
                                                    <div className="radio-group">
                                                        <div className="form-check">
                                                            <input
                                                                type="radio"
                                                                id="delivery-yes"
                                                                name="delivery"
                                                                value="Yes"
                                                                className="form-check-input"
                                                                checked={formData.delivery === 'Yes'}
                                                                onChange={handleInputChange}
                                                            />
                                                            <label htmlFor="delivery-yes" className="form-check-label">Yes</label>
                                                        </div>
                                                        <div className="form-check">
                                                            <input
                                                                type="radio"
                                                                id="delivery-no"
                                                                name="delivery"
                                                                value="No"
                                                                className="form-check-input"
                                                                checked={formData.delivery === 'No'}
                                                                onChange={handleInputChange}
                                                            />
                                                            <label htmlFor="delivery-no" className="form-check-label">No</label>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Conditional Delivery Details */}
                                                {formData.delivery === 'Yes' && (
                                                    <div className="service-details">
                                                        <div className="detail-field">
                                                            <label className="form-label">Pick-Up Location:</label>
                                                            <input
                                                                type="text"
                                                                name="pickupLocation"
                                                                className="form-control"
                                                                value={formData.pickupLocation}
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                        <div className="detail-field">
                                                            <label className="form-label">Availability Date:</label>
                                                            <input
                                                                type="text"
                                                                name="pickupDate"
                                                                className="form-control"
                                                                placeholder="e.g., March 15th or Next Week"
                                                                value={formData.pickupDate}
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Uninstall Service */}
                                            <div className="service-row">
                                                <div className="service-question">
                                                    <label className="form-label">
                                                        <span className="required-asterisk">*</span> Uninstall:
                                                    </label>
                                                    <div className="radio-group">
                                                        <div className="form-check">
                                                            <input
                                                                type="radio"
                                                                id="uninstall-yes"
                                                                name="uninstall"
                                                                value="Yes"
                                                                className="form-check-input"
                                                                checked={formData.uninstall === 'Yes'}
                                                                onChange={handleInputChange}
                                                            />
                                                            <label htmlFor="uninstall-yes" className="form-check-label">Yes</label>
                                                        </div>
                                                        <div className="form-check">
                                                            <input
                                                                type="radio"
                                                                id="uninstall-no"
                                                                name="uninstall"
                                                                value="No"
                                                                className="form-check-input"
                                                                checked={formData.uninstall === 'No'}
                                                                onChange={handleInputChange}
                                                            />
                                                            <label htmlFor="uninstall-no" className="form-check-label">No</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Haul-away Service */}
                                            <div className="service-row">
                                                <div className="service-question">
                                                    <label className="form-label">
                                                        <span className="required-asterisk">*</span> Haul-away:
                                                    </label>
                                                    <div className="radio-group">
                                                        <div className="form-check">
                                                            <input
                                                                type="radio"
                                                                id="haulaway-yes"
                                                                name="haulAway"
                                                                value="Yes"
                                                                className="form-check-input"
                                                                checked={formData.haulAway === 'Yes'}
                                                                onChange={handleInputChange}
                                                            />
                                                            <label htmlFor="haulaway-yes" className="form-check-label">Yes</label>
                                                        </div>
                                                        <div className="form-check">
                                                            <input
                                                                type="radio"
                                                                id="haulaway-no"
                                                                name="haulAway"
                                                                value="No"
                                                                className="form-check-input"
                                                                checked={formData.haulAway === 'No'}
                                                                onChange={handleInputChange}
                                                            />
                                                            <label htmlFor="haulaway-no" className="form-check-label">No</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>


                                    {/* Installation Address & Site Details Section */}
                                    <div className="form-section">
                                        <div className="section-header">
                                            <h3 className="form-section-title">Installation Address & Site Details</h3>
                                        </div>
                                        <hr className="section-divider" />

                                        {/* Address Fields */}
                                        <div className="address-grid">
                                            <div className="row">
                                                <div className="col-md-8 mb-3">
                                                    <label className="form-label">
                                                        <span className="required-asterisk">*</span> Street Address:
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="street"
                                                        className="form-control"
                                                        value={formData.street}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </div>
                                                <div className="col-md-4 mb-3">
                                                    <label className="form-label">Address Line 2:</label>
                                                    <input
                                                        type="text"
                                                        name="unit"
                                                        className="form-control"
                                                        placeholder="ie. Apartment Number"
                                                        value={formData.unit}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6 mb-3">
                                                    <label className="form-label">
                                                        <span className="required-asterisk">*</span> City:
                                                    </label>
                                                    <div className="input-group">
                                                        <input
                                                            type="text"
                                                            name="city"
                                                            className="form-control"
                                                            value={formData.city}
                                                            onChange={handleInputChange}
                                                            required
                                                        />
                                                        <span className="input-group-text">, California</span>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 mb-3">
                                                    <label className="form-label">
                                                        <span className="required-asterisk">*</span> Zip:
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="zip"
                                                        className="form-control zip-input"
                                                        value={formData.zip}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <hr className="field-divider" />

                                        {/* Site Details using compact style */}
                                        <div className="site-details-grid">

                                            {/* Home Type */}
                                            <div className="site-detail-row">
                                                <div className="site-question">
                                                    <label className="form-label">Type of Residence/Building:</label>
                                                    <div className="radio-group">
                                                        {['Single-Family Home', 'Apartment/Condo', 'Other/Commercial'].map(type => (
                                                            <div key={type} className="form-check">
                                                                <input
                                                                    type="radio"
                                                                    id={`home-${type.toLowerCase().replace(/[^a-z]/g, '')}`}
                                                                    name="homeType"
                                                                    value={type}
                                                                    className="form-check-input"
                                                                    checked={formData.homeType === type}
                                                                    onChange={handleInputChange}
                                                                />
                                                                <label htmlFor={`home-${type.toLowerCase().replace(/[^a-z]/g, '')}`} className="form-check-label">
                                                                    {type}
                                                                </label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Installation Floor */}
                                            <div className="site-detail-row">
                                                <div className="site-question">
                                                    <label className="form-label">Installation Floor/Level:</label>
                                                    <div className="radio-group">
                                                        {['1st', '2nd', 'Other'].map(floor => (
                                                            <div key={floor} className="form-check">
                                                                <input
                                                                    type="radio"
                                                                    id={`floor-${floor}`}
                                                                    name="floor"
                                                                    value={floor}
                                                                    className="form-check-input"
                                                                    checked={formData.floor === floor}
                                                                    onChange={handleInputChange}
                                                                />
                                                                <label htmlFor={`floor-${floor}`} className="form-check-label">{floor}</label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Stairs */}
                                            <div className="site-detail-row">
                                                <div className="site-question">
                                                    <label className="form-label">
                                                        <span className="required-asterisk">*</span> Will appliances need to be moved up or down stairs?
                                                    </label>
                                                    <div className="radio-group">
                                                        <div className="form-check">
                                                            <input
                                                                type="radio"
                                                                id="stairs-yes"
                                                                name="stairs"
                                                                value="Yes"
                                                                className="form-check-input"
                                                                checked={formData.stairs === 'Yes'}
                                                                onChange={handleInputChange}
                                                            />
                                                            <label htmlFor="stairs-yes" className="form-check-label">Yes</label>
                                                        </div>
                                                        <div className="form-check">
                                                            <input
                                                                type="radio"
                                                                id="stairs-no"
                                                                name="stairs"
                                                                value="No"
                                                                className="form-check-input"
                                                                checked={formData.stairs === 'No'}
                                                                onChange={handleInputChange}
                                                            />
                                                            <label htmlFor="stairs-no" className="form-check-label">No</label>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Conditional Stairs Details */}
                                                {formData.stairs === 'Yes' && (
                                                    <div className="stairs-details">
                                                        <div className="stairs-field">
                                                            <label className="form-label">How many steps?</label>
                                                            <input
                                                                type="text"
                                                                name="stairsNumber"
                                                                className="form-control stairs-input"
                                                                value={formData.stairsNumber}
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                        <div className="stairs-field">
                                                            <label className="form-label">
                                                                <span className="required-asterisk">*</span> Are there turns in the stairs?
                                                            </label>
                                                            <div className="radio-group">
                                                                <div className="form-check">
                                                                    <input
                                                                        type="radio"
                                                                        id="turns-yes"
                                                                        name="stairsTurns"
                                                                        value="Yes"
                                                                        className="form-check-input"
                                                                        checked={formData.stairsTurns === 'Yes'}
                                                                        onChange={handleInputChange}
                                                                    />
                                                                    <label htmlFor="turns-yes" className="form-check-label">Yes</label>
                                                                </div>
                                                                <div className="form-check">
                                                                    <input
                                                                        type="radio"
                                                                        id="turns-no"
                                                                        name="stairsTurns"
                                                                        value="No"
                                                                        className="form-check-input"
                                                                        checked={formData.stairsTurns === 'No'}
                                                                        onChange={handleInputChange}
                                                                    />
                                                                    <label htmlFor="turns-no" className="form-check-label">No</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Parking */}
                                            <div className="site-detail-row">
                                                <div className="site-question">
                                                    <label className="form-label">
                                                        <span className="required-asterisk">*</span> Will parking for our installer(s) be readily available?
                                                    </label>
                                                    <div className="radio-group">
                                                        <div className="form-check">
                                                            <input
                                                                type="radio"
                                                                id="parking-yes"
                                                                name="parking"
                                                                value="Yes"
                                                                className="form-check-input"
                                                                checked={formData.parking === 'Yes'}
                                                                onChange={handleInputChange}
                                                            />
                                                            <label htmlFor="parking-yes" className="form-check-label">Yes</label>
                                                        </div>
                                                        <div className="form-check">
                                                            <input
                                                                type="radio"
                                                                id="parking-no"
                                                                name="parking"
                                                                value="No"
                                                                className="form-check-input"
                                                                checked={formData.parking === 'No'}
                                                                onChange={handleInputChange}
                                                            />
                                                            <label htmlFor="parking-no" className="form-check-label">No</label>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Conditional Parking Notes */}
                                                {formData.parking === 'No' && (
                                                    <div className="parking-details">
                                                        <label className="form-label">Parking Notes:</label>
                                                        <input
                                                            type="text"
                                                            name="parkingNotes"
                                                            className="form-control"
                                                            value={formData.parkingNotes}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                )}
                                            </div>

                                            {/* Gate Code */}
                                            <div className="site-detail-row">
                                                <div className="site-question">
                                                    <label className="form-label">Is a gate code required for entry?</label>
                                                    <div className="radio-group">
                                                        <div className="form-check">
                                                            <input
                                                                type="radio"
                                                                id="gate-yes"
                                                                name="gateCode"
                                                                value="Yes"
                                                                className="form-check-input"
                                                                checked={formData.gateCode === 'Yes'}
                                                                onChange={handleInputChange}
                                                            />
                                                            <label htmlFor="gate-yes" className="form-check-label">Yes</label>
                                                        </div>
                                                        <div className="form-check">
                                                            <input
                                                                type="radio"
                                                                id="gate-no"
                                                                name="gateCode"
                                                                value="No"
                                                                className="form-check-input"
                                                                checked={formData.gateCode === 'No'}
                                                                onChange={handleInputChange}
                                                            />
                                                            <label htmlFor="gate-no" className="form-check-label">No</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>


                                    {/* Additional Project Details Section */}
                                    <div className="form-section">
                                        <div className="section-header">
                                            <h3 className="form-section-title">Additional Project Details</h3>
                                        </div>
                                        <hr className="section-divider" />

                                        <div className="project-details-grid">

                                            {/* Preferred Date */}
                                            <div className="detail-row">
                                                <div className="detail-question">
                                                    <label className="form-label">Preferred date of install:</label>
                                                    <input
                                                        type="text"
                                                        name="preferredDate"
                                                        className="form-control date-input"
                                                        value={formData.preferredDate}
                                                        onChange={handleInputChange}
                                                        placeholder="e.g., March 15th, Next Week"
                                                    />
                                                </div>
                                            </div>

                                            <div className="scheduling-note">
                                                <p className="note-text">
                                                    Please note that entering "ASAP" provides no information regarding your actual availability or assists with scheduling your project.
                                                    Also, if the appliances are to be delivered by others, please request an installation appointment at least one day after the anticipated delivery date.
                                                </p>
                                            </div>

                                            {/* Preferred Time */}
                                            <div className="detail-row">
                                                <div className="detail-question">
                                                    <label className="form-label">Preferred time of install:</label>
                                                    <div className="checkbox-group">
                                                        {['Morning', 'Mid-Day', 'Afternoon'].map(time => (
                                                            <div key={time} className="form-check">
                                                                <input
                                                                    type="checkbox"
                                                                    id={`time-${time.toLowerCase().replace('-', '')}`}
                                                                    className="form-check-input"
                                                                    checked={formData.preferredTime.includes(time)}
                                                                    onChange={() => handleCheckboxArrayChange('preferredTime', time)}
                                                                />
                                                                <label htmlFor={`time-${time.toLowerCase().replace('-', '')}`} className="form-check-label">
                                                                    {time}
                                                                </label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="scheduling-note">
                                                <p className="note-text">
                                                    We typically provide 4-hour arrival time windows. Requested dates and times are not guaranteed,
                                                    but we will do our best to accommodate your preference.
                                                </p>
                                            </div>

                                            <hr className="field-divider" />

                                            {/* Additional Details */}
                                            <div className="detail-row comments-row">
                                                <div className="detail-question full-width">
                                                    <label className="form-label">Additional project details and comments:</label>
                                                    <textarea
                                                        name="additionalDetails"
                                                        className="form-control comments-textarea"
                                                        rows="6"
                                                        maxLength="2000"
                                                        value={formData.additionalDetails}
                                                        onChange={handleInputChange}
                                                        placeholder="Please provide any additional details about your project, special requirements, access instructions, or other information that would help us prepare for your installation..."
                                                    />
                                                    <div className="character-count">
                                                        {formData.additionalDetails.length}/2000 characters
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>



                                    {/* File Uploads Section */}
                                    <div className="form-section">
                                        <div className="section-header">
                                            <h3 className="form-section-title">Supporting Files & Photos</h3>
                                        </div>
                                        <hr className="section-divider" />

                                        <div className="file-upload-container">
                                            <div className="upload-instructions">
                                                <p className="upload-description">
                                                    Upload supporting files and site photos here to help us provide the most accurate quote.
                                                </p>
                                                <div className="file-limits">
                                                    <span className="file-note">
                                                        <strong>Accepted formats:</strong> GIF, PNG, JPG, JPEG, PDF
                                                    </span>
                                                    <span className="file-note">
                                                        <strong>File size limit:</strong> 5MB per file
                                                    </span>
                                                    <span className="file-note">
                                                        <strong>Recommended:</strong> Photos of installation site, existing appliances, or project plans
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="file-upload-grid">
                                                {[1, 2, 3, 4, 5].map(num => (
                                                    <div key={num} className="file-upload-field">
                                                        <label className="file-upload-label">
                                                            <div className="file-upload-area">
                                                                <div className="upload-icon">
                                                                    <i className="fas fa-cloud-upload-alt"></i>
                                                                </div>
                                                                <div className="upload-text">
                                                                    <span className="upload-primary">Choose File {num}</span>
                                                                    <span className="upload-secondary">or drag and drop</span>
                                                                </div>
                                                            </div>
                                                            <input
                                                                type="file"
                                                                name={`upload-file${num}`}
                                                                className="file-input"
                                                                accept=".gif,.png,.jpg,.jpeg,.pdf"
                                                                onChange={(e) => handleFileChange(e, num)}
                                                            />
                                                        </label>
                                                        {formData[`uploadFile${num}`] && (
                                                            <div className="file-selected">
                                                                <i className="fas fa-file"></i>
                                                                <span className="file-name">{formData[`uploadFile${num}`].name}</span>
                                                                <button
                                                                    type="button"
                                                                    className="remove-file"
                                                                    onClick={() => removeFile(num)}
                                                                >
                                                                    <i className="fas fa-times"></i>
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="upload-note">
                                                <p className="note-text">
                                                    <i className="fas fa-info-circle"></i>
                                                    <strong>Note:</strong> To ensure photos are submitted properly, we recommend using Chrome browser.
                                                    Files are optional but help us provide more accurate quotes.
                                                </p>
                                            </div>
                                        </div>
                                    </div>


                                    {/* Submit Section */}
                                    <div className="form-section submit-section">
                                        <hr className="final-divider" />

                                        {/* Success Message */}
                                        {submitStatus === 'success' && (
                                            <div className="submit-message success-message">
                                                <div className="message-icon">
                                                    <i className="fas fa-check-circle"></i>
                                                </div>
                                                <h4 className="message-title">Quote Request Submitted Successfully!</h4>
                                                <p className="message-text">
                                                    Thank you for your detailed quote request. A representative will contact you via email or phone within 1-2 business days
                                                    with your custom quote and any follow-up questions.
                                                </p>
                                                <div className="next-steps">
                                                    <p><strong>What happens next:</strong></p>
                                                    <ul>
                                                        <li>We'll review your project details and appliance specifications</li>
                                                        <li>A team member will contact you to discuss scheduling and any questions</li>
                                                        <li>You'll receive a detailed quote tailored to your specific needs</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        )}

                                        {/* Error Message */}
                                        {submitStatus === 'error' && (
                                            <div className="submit-message error-message">
                                                <div className="message-icon">
                                                    <i className="fas fa-exclamation-triangle"></i>
                                                </div>
                                                <h4 className="message-title">Submission Error</h4>
                                                <p className="message-text">
                                                    We're sorry, but there was an issue submitting your quote request. Please try again,
                                                    or contact us directly at <a href="tel:4084265999">(408) 426-5999</a> or
                                                    <a href="mailto:info@proapplianceinstallation.com">info@proapplianceinstallation.com</a>.
                                                </p>
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-primary"
                                                    onClick={() => setSubmitStatus(null)}
                                                >
                                                    Try Again
                                                </button>
                                            </div>
                                        )}

                                        {/* Submit Button & Instructions */}
                                        {submitStatus !== 'success' && (
                                            <div className="submit-content">
                                                <div className="submit-instructions">
                                                    <h4 className="submit-title">Ready to Submit Your Quote Request?</h4>
                                                    <p className="submit-description">
                                                        Please review your information above and click "Send" only once.
                                                        Submission may take a few moments. Thank you for your patience.
                                                    </p>
                                                </div>

                                                <div className="submit-button-container">
                                                    <button
                                                        type="submit"
                                                        className="btn btn-primary btn-lg submit-button"
                                                        disabled={isSubmitting}
                                                    >
                                                        {isSubmitting ? (
                                                            <>
                                                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                                Submitting...
                                                            </>
                                                        ) : (
                                                            <>
                                                                <i className="fas fa-paper-plane me-2"></i>
                                                                Send Quote Request
                                                            </>
                                                        )}
                                                    </button>
                                                </div>

                                                <div className="privacy-note">
                                                    <p className="privacy-text">
                                                        <i className="fas fa-shield-alt me-1"></i>
                                                        Your information is secure and will only be used to provide you with pricing and project information.
                                                    </p>
                                                </div>
                                            </div>
                                        )}
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