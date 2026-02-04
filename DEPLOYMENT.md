# Deployment Instructions

Since this is a Vite project, deploying to GitHub Pages is straightforward.

## Prerequisites
- A GitHub account.
- Git installed on your machine.

## Steps

1.  **Create a GitHub Repository**:
    - Go to GitHub and create a new public repository (e.g., `paws-preferences`).

2.  **Configure `vite.config.ts`**:
    - Add the `base` property to your `vite.config.ts`.
    ```typescript
    import { defineConfig } from 'vite'
    import react from '@vitejs/plugin-react'

    // https://vitejs.dev/config/
    export default defineConfig({
      plugins: [react()],
      base: '/paws-preferences/', // REPLACE THIS WITH YOUR REPO NAME
    })
    ```

3.  **Initialize Git**:
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    git branch -M main
    git remote add origin https://github.com/<YOUR_USERNAME>/paws-preferences.git
    git push -u origin main
    ```

4.  **Deploy**:
    - You can use the `gh-pages` package or a GitHub Action.
    - **Method A: GitHub Actions (Recommended)**
        - Create `.github/workflows/deploy.yml`:
        ```yaml
        name: Deploy to GitHub Pages

        on:
          push:
            branches: [main]

        permissions:
          contents: read
          pages: write
          id-token: write

        jobs:
          build:
            runs-on: ubuntu-latest
            steps:
              - uses: actions/checkout@v4
              - uses: actions/setup-node@v4
                with:
                  node-version: 20
              - run: npm install
              - run: npm run build
              - uses: actions/upload-pages-artifact@v3
                with:
                  path: dist

          deploy:
            environment:
              name: github-pages
              url: ${{ steps.deployment.outputs.page_url }}
            runs-on: ubuntu-latest
            needs: build
            steps:
              - name: Deploy to GitHub Pages
                id: deployment
                uses: actions/deploy-pages@v4
        ```
        - Push this file. GitHub will automatically build and deploy.

    - **Method B: Manual `gh-pages`**
        - Run `npm install gh-pages --save-dev`
        - Add script to `package.json`: `"deploy": "gh-pages -d dist"`
        - Run `npm run build`
        - Run `npm run deploy`

5.  **View Your Site**:
    - Your site will be live at `https://<YOUR_USERNAME>.github.io/paws-preferences/`.
