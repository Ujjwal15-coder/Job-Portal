# Deployment Guide

To deploy this project to the internet so anyone can access it, you will need to deploy the **Backend** and the **Frontend** separately. 

Here are the standard steps for deploying this MERN stack application.

## 1. Deploy the Backend (e.g., Render, Heroku, Railway)
We recommend using [Render.com](https://render.com/) for an easy and free backend deployment.

1. Create an account on Render and click **New > Web Service**.
2. Connect your GitHub repository and select the `Job-Portal` repo.
3. Configure the service:
   - **Root Directory**: `backend` (or `bbd_batch-1/backend` if that's where your package.json is)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Add Environment Variables:
   - `PORT`: `5000` (Render might also set this automatically)
   - `MONGO_URI`: Your MongoDB Atlas connection string.
   - `JWT_SECRET`: A secure random string for JWT.
   - `FRONTEND_URL`: The URL of your deployed frontend (you will get this in the next step, so you can update this variable later).
5. Deploy and copy your backend URL (e.g., `https://job-portal-api.onrender.com`).

## 2. Deploy the Frontend (e.g., Vercel, Netlify)
We recommend using [Vercel](https://vercel.com/) for deploying Vite + React apps.

1. Create an account on Vercel and click **Add New > Project**.
2. Import your `Job-Portal` GitHub repository.
3. Configure the project:
   - **Root Directory**: `frontend` (or `bbd_batch-1/frontend`)
   - **Framework Preset**: `Vite` (Vercel usually detects this automatically)
   - **Build Command**: `npm run build`
   - **Install Command**: `npm install`
4. Add Environment Variables:
   - `VITE_API_URL`: The URL of your deployed backend (e.g., `https://job-portal-api.onrender.com`).
5. Click **Deploy**.

## 3. Final Connection
1. Once your frontend is deployed on Vercel, copy its URL (e.g., `https://job-portal-frontend.vercel.app`).
2. Go back to your Backend dashboard (e.g., Render) and update the `FRONTEND_URL` environment variable with this frontend URL.
3. Restart your backend server.

Now your application should be live and fully functional!
