Happy Cookiez / SugarNest Demo - Running Instructions
====================================================

This fixed version includes:
- Backend API in the main folder
- Next.js frontend in the web folder
- Root npm run dev script that starts both together
- Local demo cart instead of Shopify checkout
- Fake checkout page
- Fake address/map/name
- Homepage limited to 3 cookies
- Frontend fallback data, so pages still show cookies if the backend is not running
- Basic SEO files: sitemap and robots

Option A - easiest:
1. Open PowerShell here:
   C:\Users\raksh\Downloads\happys-cookiez-current-fixed-v2\happys-cookiez
2. Run:
   npm install
   npm --prefix web install
   npx prisma generate
   npm run dev
3. Open:
   http://localhost:3000

Option B - run separately:
Backend PowerShell:
   cd C:\Users\raksh\Downloads\happys-cookiez-current-fixed-v2\happys-cookiez
   npm install
   npx prisma generate
   node src/index.js

Frontend PowerShell:
   cd C:\Users\raksh\Downloads\happys-cookiez-current-fixed-v2\happys-cookiez\web
   npm install
   npm run dev

Frontend: http://localhost:3000
Backend:  http://localhost:4000/health

If npm times out, run:
   npm config set registry https://registry.npmjs.org/


WINDOWS FALLBACK IF npm run dev FAILS
1) Open PowerShell #1:
   cd C:\Users\raksh\Downloads\happys-cookiez-current-fixed-v3\happys-cookiez
   npm run api:dev

2) Open PowerShell #2:
   cd C:\Users\raksh\Downloads\happys-cookiez-current-fixed-v3\happys-cookiez
   npm run web:dev

3) Open http://localhost:3000
