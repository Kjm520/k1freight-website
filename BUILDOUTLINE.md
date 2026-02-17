Code in VS Code
Push to GitHub (master branch).
Cloud Build trigger fires on that branch push.
Cloud Build pulls the repo at that commit and reads cloudbuild.yaml.
Cloud Build runs the steps:
docker build runs your Dockerfile:
installs deps
runs next build (standalone output)
produces a runnable Node server (server.js) + minimal files
docker push uploads the built image to Artifact Registry (web-apps/k1freight:<sha>).
gcloud run deploy tells Cloud Run to use that new image.
Cloud Run creates a new revision and shifts traffic to it (100% in your config).