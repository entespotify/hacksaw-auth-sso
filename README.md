# Hacksaw Auth

Hacksaw Auth is the central authentication hub for all Hacksaw services. Log in once and access everything, no more juggling passwords, sticky notes, or that one spreadsheet you swore you’d never lose. Built with React, Redux Toolkit, Material UI, and TypeScript.

---

## Features

- Single sign-on for all Hacksaw services
- Modern dark-themed UI with Material UI
- Secure token storage and session management
- Responsive design for desktop and mobile
- "Forgot password" and "Create account" flows

---

## 🗂️ Folder Structure

```
hacksaw-auth/
├── public/                   # Static assets and index.html
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── backdrop/
│   │   └── login-form/
│   ├── pages/                # App pages (home, login, etc.)
│   ├── services/
│   │   ├── api/              # API logic (RTK Query, etc.)
│   │   └── slice/            # Redux slices (auth, etc.)
│   ├── App.tsx               # Main app component
│   ├── index.tsx             # Entry point
│   └── ...                   # Other utilities and types
├── package.json
└── README.md
```

---

## 🛠️ Common Commands

| Command              | Description                                  |
|----------------------|----------------------------------------------|
| `npm install`        | Install all dependencies                     |
| `npm start`          | Start the development server                 |
| `npm run build`      | Build the app for production                 |
| `npm test`           | Run tests                                    |
| `npm run deploy`     | Deploy to GitHub Pages (see below)           |
| `npm run eject`      | Eject from Create React App (irreversible)   |

---

## 🌐 Deployment

This app is set up for deployment to GitHub Pages.  
To deploy:

1. Set the `homepage` field in `package.json` to your GitHub Pages URL.
2. Run:
    ```
    npm run deploy
    ```
3. Or push to `main` branch and let GitHub Actions handle deployment automatically.

---

## 🐞 Debugging & Troubleshooting

- **TypeScript errors:**  
  Check the terminal or Problems tab in VS Code for details. Most issues are due to missing types or incorrect imports.

- **Module not found:**  
  Run `npm install` to ensure all dependencies are installed.

- **UI not updating:**  
  Make sure you save your files and check the browser console for errors.

- **Redux/State issues:**  
  Use the [Redux DevTools](https://github.com/reduxjs/redux-devtools) browser extension to inspect state.

- **Build/Deploy errors:**  
  - Ensure your `homepage` in `package.json` is correct.
  - Check GitHub Actions logs under the "Actions" tab in your repo.

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📚 Learn More

- [React documentation](https://reactjs.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Material UI](https://mui.com/)
- [Create React App docs](https://facebook.github.io/create-react-app/docs/getting-started)

---

**Enjoy your stay. Your credentials are (probably) safe
