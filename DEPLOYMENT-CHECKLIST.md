# Deployment Checklist for Pro Appliance Quote System

Use this checklist to ensure everything is properly set up and working.

## Pre-Deployment Setup

### ✅ Supabase Setup
- [ ] Supabase project created
- [ ] Database schema executed from `supabase-setup.sql`
- [ ] Verified all tables created: `quotes`, `appliance_details`, `quote_files`
- [ ] Storage bucket `quote-files` created
- [ ] Storage policies configured for service_role access
- [ ] Copied Supabase URL and Service Role Key

### ✅ Resend Email Setup  
- [ ] Resend account created
- [ ] Domain verified (or using verified sender email)
- [ ] API key generated and copied
- [ ] Test email sent successfully

### ✅ Netlify Configuration
- [ ] All environment variables added to Netlify:
  - [ ] `SUPABASE_URL`
  - [ ] `SUPABASE_SERVICE_ROLE_KEY` 
  - [ ] `RESEND_API_KEY`
- [ ] Dependencies installed (`@supabase/supabase-js`, `resend`, `lambda-multipart-parser`)
- [ ] Code committed and pushed to repository

## Post-Deployment Testing

### ✅ Function Deployment
- [ ] Netlify build completed successfully
- [ ] Function `submit-quote` appears in Netlify Functions dashboard
- [ ] No errors in Netlify deploy logs

### ✅ Form Submission Test
- [ ] Navigate to quote form on live site
- [ ] Fill out complete form with:
  - [ ] Customer information (name, email, phone)
  - [ ] At least one appliance selected with brand/model
  - [ ] Installation address
  - [ ] Optional: Upload a test file
- [ ] Submit form successfully
- [ ] See success message

### ✅ Data Verification
- [ ] Check Supabase `quotes` table - new record appears
- [ ] Check `appliance_details` table - appliance info stored
- [ ] If file uploaded: Check `quote_files` table and Storage bucket
- [ ] All data looks correct and complete

### ✅ Email Verification
- [ ] Check inbox: `pie10101011@gmail.com`
- [ ] Professional formatted email received
- [ ] Email contains all submitted information
- [ ] Appliances section shows selected items with details
- [ ] Contact information clearly displayed
- [ ] If files uploaded: File list included in email

### ✅ Error Handling Test
- [ ] Try submitting form with missing required fields
- [ ] Try uploading oversized file (>5MB) 
- [ ] Try uploading invalid file type
- [ ] Appropriate error messages shown
- [ ] Form doesn't break on errors

## Production Readiness

### ✅ Performance & Security
- [ ] Remove any test/debug console.log statements
- [ ] Verify environment variables are not exposed in client code
- [ ] Test form submission speed (should complete within 10-15 seconds)
- [ ] File uploads work reliably

### ✅ User Experience
- [ ] Form is responsive on mobile devices
- [ ] Success/error messages are clear
- [ ] Loading states work properly during submission
- [ ] File upload UI shows selected files

### ✅ Business Requirements
- [ ] All required form fields captured
- [ ] Email goes to correct business address
- [ ] Email format is professional and readable
- [ ] Data storage complies with business needs
- [ ] File uploads support business file types

## Monitoring Setup (Recommended)

### ✅ Ongoing Monitoring
- [ ] Set up email alerts for Netlify function failures
- [ ] Monitor Supabase storage usage
- [ ] Check Resend email delivery reports weekly
- [ ] Test form submission monthly

## Rollback Plan

If issues arise after deployment:

### Emergency Rollback Steps
1. **Immediate**: Revert form to use original Netlify Forms
   - Change `handleSubmit` back to original Netlify Forms logic
   - Add back `netlify` and `data-netlify="true"` to form element
   - Deploy quickly

2. **Debug**: Check these in order:
   - Netlify function logs
   - Environment variables
   - Supabase connection
   - Resend email service status

3. **Fix**: Address root cause and redeploy

## Success Criteria

✅ **System is ready for production when:**
- [ ] All checklist items above are completed
- [ ] At least 3 successful test submissions completed
- [ ] Business stakeholders have reviewed sample emails
- [ ] Form works correctly on mobile and desktop
- [ ] No errors in Netlify function logs
- [ ] Email delivery is reliable (check Resend logs)

---

**Next Steps After Deployment:**
1. Inform team that new quote system is live
2. Monitor submissions for first week
3. Collect feedback from business users
4. Document any custom workflows or follow-up processes

**Emergency Contacts:**
- Netlify Support: Via dashboard
- Supabase Support: Via dashboard  
- Resend Support: hello@resend.com