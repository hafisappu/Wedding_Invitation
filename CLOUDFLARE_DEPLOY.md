# Deploying to Cloudflare Pages

Since you have pushed the repository to GitHub, you can deploy the wedding invitation website to **Cloudflare Pages** for free.

---

## ⚠️ Important Note on RSVP Database Storage

Because Cloudflare Pages runs your Next.js application in a serverless/edge environment (Cloudflare Workers), **writing to a local file (`data/rsvps.json`) is not supported** (the serverless filesystem is read-only).

To store RSVPs in production:
1. Create a free **Supabase** or **Firebase** project.
2. Create an `rsvps` table in Supabase with the following columns:
   - `id` (int8, primary key, auto-increment)
   - `name` (text)
   - `phone` (text)
   - `guests` (int4 or numeric)
   - `attending` (boolean)
   - `createdAt` (timestamp / timestamptz)
3. Provide your database credentials to Cloudflare Pages as Environment Variables (see Step 3 below).

---

## 🚀 Step-by-Step Deployment

### Step 1: Connect your GitHub Account
1. Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. Navigate to **Workers & Pages** in the left sidebar.
3. Click the **Create** button and select the **Pages** tab.
4. Click **Connect to Git** and choose the repository `Wedding_Invitation`.

### Step 2: Configure Build Settings
Under the build configuration screen, enter the following settings:
* **Project Name**: `wedding-invitation` (or any custom name)
* **Production Branch**: `main`
* **Framework Preset**: **Next.js**
* **Build Command**: `npx @cloudflare/next-on-pages` (or standard `npm run build` if using Static HTML export mode)
* **Build Output Directory**: `.vercel/output` (for edge SSR) or `out` (if configured for static HTML export)

> [!TIP]
> If you wish to run the app as a fully **Static Site** (no server-side runtime, which is even easier and faster on Cloudflare):
> 1. Add `output: 'export'` to your `next.config.ts` file:
>    ```typescript
>    const nextConfig = {
>      output: 'export',
>    };
>    ```
> 2. Change the RSVP Form submission to call Supabase directly from the client side rather than using Server Actions.
> 3. Cloudflare Pages will build it using standard static page hosting!

### Step 3: Add Environment Variables
Add your database environment variables under **Build settings (optional) > Environment variables**:

| Variable Name | Description | Value |
| :--- | :--- | :--- |
| `SUPABASE_URL` | Your Supabase Project API URL | `https://your-project.supabase.co` |
| `SUPABASE_ANON_KEY` | Your Supabase Project Anon API key | `eyJhbGciOi...` |
| `NODE_VERSION` | Set node version to 18 or 20 | `20` |

### Step 4: Deploy!
Click **Save and Deploy**. Cloudflare will download the repository, run the build process, and provide you with a live `*.pages.dev` subdomain link to share your invitation!
