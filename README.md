# Maida

A guest bill-splitting app built with Next.js. Requires Node.js 24 or newer for the built-in SQLite module.

```sh
npm install
npm run dev
```

Open http://localhost:3000. Run `npm test`, `npm run lint`, and `npm run build` for checks.

## Local storage and sharing

Bills are saved in SQLite under `.data/maida.sqlite` on the machine running the server. Set `MAIDA_DATA_DIR` to use another persistent directory. Back up this database if the bills matter. Guest owner credentials and friend labels are stored in the creating browser's local storage; clearing that storage loses owner access and its history, and there is currently no recovery process. Keep the server and its database running to access bills.

After reviewing and saving a bill, create a link or QR code. Anyone with the link can view and join for seven days. Only the owner can edit, create a replacement link, or revoke it. Joining changes the bill; the owner should reload and reopen it before editing. A stale owner save is rejected to prevent overwriting a join. Shared links are bearer credentials: share them only with the intended people. Friend labels in history explicitly match people across outings on that browser. Balances show gross amounts owed, without payment tracking or netting.

A localhost link works only on the machine running the app. To share with another device, the server must be reachable at the generated address. SQLite on local disk is intended for a single persistent server, not ephemeral or multi-instance hosting. Hosting, TLS, durable storage, backups, access recovery, and service selection need to be addressed before public deployment.

## Firebase and Vercel setup

Vercel production is configured to use Firestore (`MAIDA_STORAGE=firestore`). The server requires a Firebase service account with Firestore access in the sensitive `FIREBASE_SERVICE_ACCOUNT` environment variable. Never commit or expose this value. Enable the Firestore API and create the default Firestore database before deployment. Local development continues to use SQLite unless `MAIDA_STORAGE=firestore` is set. Firestore access is server-side only; owner and share credentials are not database authentication credentials and are checked by the application.
