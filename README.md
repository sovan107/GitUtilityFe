# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


--- 
ocp login

I'll provide a comprehensive description of the aliases defined in your .bashrc file. These aliases are primarily focused on OpenShift operations and can be grouped into several categories:

1. Authentication Aliases:
•  ocplogin: Quick login using the saved token and configured server
•  ocptoken: Logs in using a token stored in ~/.ocp-token file
•  ocpdev: Logs in and switches to the default project
2. Resource Viewing Aliases:
•  ocpstatus: Shows cluster status (oc status)
•  ocpproj: Shows current project
•  ocpprojs: Lists all projects
•  ocppods: Lists all pods
•  ocpnodes: Shows all nodes
•  ocpsvc: Lists all services
•  ocpdeploy: Shows all deployments
•  ocpall: Shows all resources
•  ocpdesc: Shorthand for describe command
•  ocplogs: Shows logs
•  ocpwatch: Watches pods in real-time
•  ocpreset: Resets to the default context for your configured server

These aliases significantly simplify common OpenShift operations by reducing the amount of typing needed for frequent commands. They're particularly useful for daily OpenShift administration and development tasks.

Note: Since you're using zsh, you'll need to either source this file from your .zshrc or copy these aliases there to use them in your current shell environment.
