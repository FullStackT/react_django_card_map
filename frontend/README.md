# Started with commands:
    python -m venv .venv
    source .venv/Scripts/activate
    pip install django djangorestframework django-cors-headers

# Then used vite to create the frontend:
    npm create vite@latest frontend -- --template react

# Clean up frontend App.jsx (get rid of the return stuff and images you don't need)

# After that, used Django to scaffold backend:
    cd backend
    django-admin startproject myapp
    cd myapp
    python manage.py startapp api

# Define models and then in the terminal (this creates a database):
    python manage.py makemigrations
    python manage.py migrate

# Create a serializer in api/ to create JSON output for REST API calls:


# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
