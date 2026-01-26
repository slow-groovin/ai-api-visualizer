import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './style.css'

// Initialize database and run migrations before mounting the app
import { initDatabase, runMigrations } from './database'

async function initializeApp() {
  try {
    console.log('🚀 Initializing application...')
    
    // Initialize database connection
    console.log('📊 Setting up database connection...')
    await initDatabase()
    
    // Run database migrations to ensure all tables exist
    console.log('🔄 Running database migrations...')
    await runMigrations()
    
    console.log('✅ Database ready, mounting Vue application...')
    
    const app = createApp(App)
    app.use(createPinia())
    app.use(router)
    
    app.mount('#app')
    
    console.log('🎉 Application started successfully!')
  } catch (error) {
    console.error('❌ Failed to initialize application:', error)
    
    // Show user-friendly error message
    const errorDiv = document.createElement('div')
    errorDiv.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #fee;
      border: 1px solid #fcc;
      border-radius: 8px;
      padding: 20px;
      max-width: 500px;
      text-align: center;
      font-family: system-ui, sans-serif;
    `
    errorDiv.innerHTML = `
      <h2 style="color: #c33; margin: 0 0 10px 0;">Application Error</h2>
      <p style="margin: 0 0 15px 0;">Failed to initialize the application database.</p>
      <button onclick="location.reload()" style="
        background: #369;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
      ">Reload Page</button>
    `
    document.body.appendChild(errorDiv)
  }
}

// Start the application
initializeApp()
