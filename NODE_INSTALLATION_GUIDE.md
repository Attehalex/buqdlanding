# Node.js Installation Guide for Windows

## Step-by-Step Instructions

### Step 1: Download Node.js

1. **Open your browser** and go to: https://nodejs.org/
   
2. **You'll see two download options:**
   - **LTS** (Left side) - Recommended, Stable version
   - **Current** (Right side) - Latest features, may be unstable
   
3. **Click the LTS button** - It will automatically download the Windows installer

   ![Expected to see two buttons - choose LTS]

### Step 2: Run the Installer

1. **Open your Downloads folder** (or wherever the file downloaded)

2. **Look for a file named:** `node-v*.*.*.msi`
   - Example: `node-v20.10.0-x64.msi`

3. **Double-click the file** to open the installer

4. **A setup wizard will appear** - Follow these steps:
   - Click **Next** on the welcome screen
   - **Accept the license agreement** (check the box, then Next)
   - **Keep the default installation path** (usually `C:\Program Files\nodejs`)
   - Click **Next** again
   - **Check all options** on the "Tools for Native Modules" screen
   - Click **Install**

5. **Wait for installation to complete** (may take 2-5 minutes)

6. **Click Finish** when done

### Step 3: Restart Your Terminal

1. **Close all terminal windows** in VS Code (or PowerShell)

2. **Open a NEW terminal** in VS Code:
   - Press `Ctrl + ~` (backtick key)
   - Or go to Terminal > New Terminal

3. **This ensures the PATH is updated**

### Step 4: Verify Installation

In your new terminal, run these commands:

```powershell
node --version
npm --version
```

**Expected output:**
```
v20.10.0        (or similar version number)
10.2.4          (or similar version number)
```

If you see version numbers, **Node.js is installed successfully!** ✓

### Step 5: Install Project Dependencies

1. **Navigate to your project folder:**
   ```powershell
   cd "c:\VS CODE Projects\dev\bugd landing page"
   ```

2. **Install all dependencies:**
   ```powershell
   npm install
   ```

   This will create a `node_modules` folder and install:
   - express (web server)
   - nodemailer (email sending)
   - cors (cross-origin requests)
   - dotenv (environment variables)

### Step 6: Set Up Email Credentials

1. **Open the `.env` file** in your project

2. **Add your email configuration:**
   ```
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-specific-password
   EMAIL_TO=recipient@example.com
   PORT=3000
   ```

   **Important:** If using Gmail:
   - Enable 2-Factor Authentication on your Gmail account
   - Generate an "App Password" here: https://myaccount.google.com/apppasswords
   - Use that generated password in `EMAIL_PASSWORD`

### Step 7: Start Your Server

```powershell
npm start
```

**You should see:**
```
Server is running on http://localhost:3000
```

### Step 8: Open Your App

1. **Open your browser**
2. **Go to:** http://localhost:3000
3. **Test the feedback form!**

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| `node: not recognized` | Close and reopen your terminal after installation |
| `npm ERR!` during install | Try: `npm cache clean --force` then `npm install` again |
| Port 3000 already in use | Change `PORT=3000` to `PORT=3001` in `.env` file |
| Email not sending | Check your `.env` credentials and ensure 2FA is enabled on Gmail |

---

## Quick Reference Commands

```powershell
# Check if Node is installed
node --version

# Navigate to project
cd "c:\VS CODE Projects\dev\bugd landing page"

# Install dependencies
npm install

# Start the server
npm start

# Stop the server
Ctrl + C

# Update all dependencies
npm update
```

---

## Still Need Help?

If you encounter any issues:
1. Copy the error message from the terminal
2. Let me know what command you ran
3. I'll help you troubleshoot!
