# Pro Appliance Installation Quote System Setup Guide

This guide walks you through setting up the complete quote system with Netlify Functions, Supabase, and Resend email service.

## Table of Contents
1. [Supabase Setup](#supabase-setup)
2. [Resend Email Setup](#resend-email-setup)
3. [Netlify Environment Variables](#netlify-environment-variables)
4. [Netlify Functions Deployment](#netlify-functions-deployment)
5. [Testing the System](#testing-the-system)
6. [Troubleshooting](#troubleshooting)

## 1. Supabase Setup

### Step 1: Create a Supabase Project
1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - **Name**: `pro-appliance-quotes`
   - **Database Password**: Generate a secure password (save this!)
   - **Region**: Choose closest to your users
5. Click "Create new project"
6. Wait for the project to be ready (2-3 minutes)

### Step 2: Set Up Database Schema
1. In your Supabase dashboard, go to "SQL Editor"
2. Click "New Query"
3. Copy and paste the entire contents of `supabase-setup.sql` from this repository
4. Click "Run" to execute the SQL
5. Verify tables were created by going to "Table Editor"

### Step 3: Set Up Storage for File Uploads
1. In Supabase dashboard, go to "Storage"
2. Click "New Bucket"
3. Enter bucket details:
   - **Name**: `quote-files`
   - **Public**: Leave unchecked (private)
4. Click "Create Bucket"

### Step 4: Configure Storage Policies
1. In Storage section, click on the `quote-files` bucket
2. Go to "Policies" tab
3. Add a new policy:
   - **Policy name**: `Service role upload access`
   - **Allowed operation**: INSERT
   - **Target roles**: `service_role`
   - **Policy definition**: `true`
4. Add another policy:
   - **Policy name**: `Service role read access`
   - **Allowed operation**: SELECT
   - **Target roles**: `service_role`
   - **Policy definition**: `true`

### Step 5: Get Supabase Credentials
1. In your Supabase dashboard, go to "Settings" → "API"
2. Copy these values (you'll need them for Netlify):
   - **Project URL** (looks like: `https://abc123def.supabase.co`)
   - **Service Role Key** (starts with `eyJ...`, this is the secret key)

⚠️ **Important**: Use the Service Role key (not the anon/public key) for the Netlify Function since it needs full database access.

## 2. Resend Email Setup

### Step 1: Create Resend Account
1. Go to [resend.com](https://resend.com) and sign up
2. Verify your email address

### Step 2: Add Your Domain (Recommended)
1. In Resend dashboard, go to "Domains"
2. Click "Add Domain"
3. Enter your domain: `proapplianceinstallation.com`
4. Follow the DNS configuration instructions
5. Wait for verification (can take up to 24 hours)

### Step 3: Create API Key
1. In Resend dashboard, go to "API Keys"
2. Click "Create API Key"
3. Enter name: `Pro Appliance Netlify Function`
4. Select permissions: "Sending access"
5. Click "Create"
6. **Copy the API key** (starts with `re_...`) - you won't see it again!

### Step 4: Verify Email Address (If Not Using Custom Domain)
If you haven't set up a custom domain yet:
1. In Resend dashboard, go to "Domains"
2. Click on the default domain
3. Add `quotes@proapplianceinstallation.com` as a verified sender
4. Check email and verify

## 3. Netlify Environment Variables

### Step 1: Access Netlify Environment Variables
1. Go to your Netlify dashboard
2. Select your Pro Appliance site
3. Go to "Site settings" → "Environment variables"

### Step 2: Add Required Variables
Click "Add variable" for each of these:

```
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
RESEND_API_KEY=re_123abc456def...
```

⚠️ **Replace the values above with your actual credentials from steps 1 and 2.**

### Step 3: Deploy Environment Variables
1. After adding all variables, they'll be available on the next deploy
2. No need to restart anything - Netlify will use them automatically

## 4. Netlify Functions Deployment

### Step 1: Install Dependencies
The Netlify Function requires additional npm packages. You have two options:

#### Option A: Add to your main package.json (Recommended)
Add these dependencies to your existing `package.json`:

```json
{
  "dependencies": {
    "@supabase/supabase-js": "^2.39.0",
    "resend": "^3.2.0",
    "lambda-multipart-parser": "^1.0.1"
  }
}
```

Then run:
```bash
npm install
```

#### Option B: Separate Functions Package
The separate `netlify/functions/package.json` is already created. To install:

```bash
cd netlify/functions
npm install
cd ../..
```

### Step 2: Deploy to Netlify
1. Commit all changes to your repository:
   ```bash
   git add .
   git commit -m "Add custom quote submission system with Netlify Functions"
   git push
   ```

2. Netlify will automatically build and deploy
3. Check the deploy log for any errors

### Step 3: Verify Function Deployment
1. In Netlify dashboard, go to "Functions"
2. You should see `submit-quote` function listed
3. Click on it to see the logs and test

## 5. Testing the System

### Step 1: Test the Form Submission
1. Go to your live site's quote form
2. Fill out the form completely:
   - Add client information
   - Select at least one appliance with details
   - Upload a test file (optional)
   - Add site details and project information
3. Submit the form
4. You should see a success message

### Step 2: Verify Database Storage
1. Go to Supabase dashboard → "Table Editor"
2. Click on "quotes" table
3. You should see your test submission
4. Check "appliance_details" and "quote_files" tables too

### Step 3: Verify Email Delivery
1. Check the email address: `info@proapplianceinstallation.com`
2. You should receive a formatted email with all the quote details
3. If using Resend dashboard, check "Logs" section for email status

### Step 4: Check File Uploads (if applicable)
1. In Supabase dashboard, go to "Storage" → "quote-files"
2. You should see uploaded files organized by quote ID

## 6. Troubleshooting

### Common Issues and Solutions

#### "Function not found" or 404 Error
- **Cause**: Function not deployed properly
- **Solution**: 
  1. Check that `netlify/functions/submit-quote.js` exists in your repo
  2. Redeploy by pushing a new commit
  3. Check Netlify deploy logs for errors

#### "Database connection failed"
- **Cause**: Wrong Supabase credentials
- **Solution**:
  1. Double-check `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in Netlify environment variables
  2. Make sure you're using the Service Role key, not the anon key
  3. Verify the URL format: `https://projectid.supabase.co`

#### "Email not sending"
- **Cause**: Resend configuration issues
- **Solution**:
  1. Verify `RESEND_API_KEY` is correct
  2. Check if sender email domain is verified
  3. Look at Netlify function logs for detailed error messages
  4. Check Resend dashboard logs

#### "File upload failed"
- **Cause**: Storage bucket or permissions issues
- **Solution**:
  1. Verify `quote-files` bucket exists in Supabase Storage
  2. Check bucket policies allow service_role access
  3. Ensure files are under 5MB and are allowed types

#### "Form submission hangs or times out"
- **Cause**: Function timeout or infinite loop
- **Solution**:
  1. Check Netlify function logs for errors
  2. Verify all environment variables are set
  3. Test with a simpler form submission (no files)

### Debugging Tips

1. **Check Netlify Function Logs**:
   - Go to Netlify dashboard → Functions → submit-quote
   - View real-time logs during form submission

2. **Enable Detailed Logging**:
   Add `console.log` statements to the function to debug:
   ```javascript
   console.log('Form fields received:', Object.keys(formFields));
   console.log('Files received:', files.length);
   ```

3. **Test Individual Components**:
   - Test database connection separately
   - Test email sending separately
   - Test file upload separately

4. **Check Browser Network Tab**:
   - Open browser developer tools
   - Watch the network requests during form submission
   - Look for error responses

## Success Indicators

When everything is working correctly, you should see:

✅ Form submits without errors  
✅ Success message appears on the website  
✅ Data appears in Supabase `quotes` table  
✅ Appliance details appear in `appliance_details` table  
✅ Files appear in Supabase Storage `quote-files` bucket  
✅ File records appear in `quote_files` table  
✅ Professional email arrives at `pie10101011@gmail.com`  
✅ Email is marked as sent in `quotes` table  

## Maintenance

### Regular Tasks
1. **Monitor Email Delivery**: Check Resend dashboard weekly for any failed emails
2. **Database Cleanup**: Consider archiving old quotes after 1+ years
3. **Storage Management**: Monitor Supabase storage usage for uploaded files
4. **Security**: Rotate API keys every 6-12 months

### Updates
When updating the system:
1. Test in a staging environment first
2. Always backup the Supabase database before major changes
3. Monitor error logs after deployment

## Support

If you encounter issues not covered in this guide:

1. Check Netlify function logs first
2. Verify all environment variables are set correctly
3. Test each component (database, email, storage) individually
4. Check that your dependencies are up to date

For additional help, the error messages in the function logs are usually very descriptive and will point you to the specific issue.