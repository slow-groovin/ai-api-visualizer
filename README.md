<!--# AI API Visualizer ![AI API Visualizer](/public/favicon.ico)-->
<h1 align="center">
  <img src="/public/icon-192.png" alt="icon" width="24" height="24">   AI API Visualizer
</h1>

<div align="center" style="display: flex; justify-content: center; align-items: center; gap: 4rem; flex-wrap: nowrap;">
<a href="./README_CN.md">中文README</a> 
<a href="https://ai-api-visualizer.api2o.com" target="_blank">🌐Try it</a>
<br/>
<br/>
<a href="https://vercel.com/new/clone?repository-url=https://github.com/slow-groovin/ai-api-visualizer"><img src="https://vercel.com/button" alt="Deploy with Vercel" style=""></a>
<a href="https://deploy.workers.cloudflare.com/?url=https://github.com/slow-groovin/ai-api-visualizer"><img src="https://camo.githubusercontent.com/aa3de9a0130879a84691a2286f5302105d5f3554c5d0af4e3f2f24174eeeea25/68747470733a2f2f6465706c6f792e776f726b6572732e636c6f7564666c6172652e636f6d2f627574746f6e" alt="Deploy to Cloudflare Workers" style="height: 34px;"></a>
</div>

**Replace your sensitive data before pasting it to ChatGPT, Claude, Gemini, or any other AI sites**

<video src="https://github.com/user-attachments/assets/5ef7b0ed-f9a3-4d06-af6d-4fffcdfcfdc7" controls  style="max-width: 80%;">
  Your browser does not support the video tag.
</video>


## ✨ Why AI API Visualizer?

When using AI sites like ChatGPT, Claude, or Gemini, you often need to share code snippets, logs, or documents that may contain sensitive informations. AI API Visualizer helps you redact them.

- 🎯 **Precision Control** - Use regex or exact text matching for perfect replacements
- 🚀 **Work Faster** - Paste, replace, and copy in seconds
- 💾 **Work Offline** - Everything runs locally in your browser.

## 🚀 Installation and Usage

### 1. Web

Simply visit [https://ai-api-visualizer.api2o.com](https://ai-api-visualizer.api2o.com) and start using immediately - no installation required.

**PWA Installation**

1. Visit the web app
2. Click the "Install" button in your browser's address bar
3. Use it like a native app with offline support

### 2. Self Hosted
#### Serverless
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/slow-groovin/ai-api-visualizer)

[![Deploy to Cloudflare Workers](https://camo.githubusercontent.com/aa3de9a0130879a84691a2286f5302105d5f3554c5d0af4e3f2f24174eeeea25/68747470733a2f2f6465706c6f792e776f726b6572732e636c6f7564666c6172652e636f6d2f627574746f6e)](https://deploy.workers.cloudflare.com/?url=https://github.com/slow-groovin/ai-api-visualizer)

#### 🐳 Docker
```sh
docker run -d \
  --name ai-api-visualizer \
  -p 8080:80 \
  --restart unless-stopped \
  ghcr.io/slow-groovin/ai-api-visualizer:latest
```

**Docker Compose**
```yml
services:
  ai-api-visualizer:
    image: ghcr.io/slow-groovin/ai-api-visualizer:latest
    container_name: ai-api-visualizer
    ports:
      - "8080:80"
    restart: unless-stopped
```
#### npm
```sh
npm install
npm run build
npm run preview
```

## 📊 Data Storage

AI API Visualizer stores all your data locally in your browser using the **Origin Private File System (OPFS)**.


## 🛠️ Development Setup

```bash
# Clone the repository
git clone https://github.com/slow-groovin/ai-api-visualizer.git
cd ai-api-visualizer

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test
```
