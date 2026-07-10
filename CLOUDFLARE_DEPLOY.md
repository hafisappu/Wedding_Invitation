# Deploying to Cloudflare Pages (Static Site Mode)

This website has been configured as a **100% Static HTML Site**. This means it requires **no database configuration (Supabase/Firebase)** and **no server-side Cloudflare Workers**. It is extremely fast, highly secure, and completely free to host.

---

## 📩 How RSVP Works Statically

Instead of saving to a database, when guests fill in the RSVP Form and click "Submit RSVP":
1. A beautiful burst of gold confetti triggers on the screen.
2. The site opens a pre-filled **WhatsApp** message with the guest's RSVP responses (Name, Phone, Guest count, Attendance) directed to the wedding receiver's phone number.
3. The guest simply clicks "Send" on WhatsApp to submit their confirmation.

> [!NOTE]
> To change the phone number that receives RSVPs, open the file [src/components/RSVPForm.tsx](file:///c:/Users/hafis/Desktop/Safrad/src/components/RSVPForm.tsx) and change the `RSVP_RECEIVER_PHONE` constant (include your country code, e.g. `+919495123456`).

---

## 🚀 Step-by-Step Deployment on Cloudflare Pages

### Step 1: Connect your GitHub Account
1. Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. Navigate to **Workers & Pages** in the left sidebar.
3. Click the **Create** button and select the **Pages** tab.
4. Click **Connect to Git** and choose the repository `Wedding_Invitation`.

### Step 2: Configure Build Settings
Configure Cloudflare Pages with these build parameters:
* **Framework Preset**: **Next.js** (or *None* / *Create React App*)
* **Build Command**: `npm run build`
* **Build Output Directory**: `out`

*(Make sure the build output directory is set to **`out`** rather than `.next` or `.open-next`!)*

### Step 3: Add Node Environment Variable
Scroll down to the **Environment variables** section and add:
* **Variable Name**: `NODE_VERSION`
* **Value**: `20`

*(No database credentials like `SUPABASE_URL` or Workers parameters are needed anymore!)*

### Step 4: Save and Deploy!
Click **Save and Deploy**. Cloudflare will compile the code statically and provide you with a live `*.pages.dev` subdomain link to share!
