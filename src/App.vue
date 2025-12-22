<script setup>
import { ref, onMounted } from 'vue'
import LoginForm from './components/LoginForm.vue'
import PasswordManager from './components/PasswordManager.vue'

const authKey = ref('')

onMounted(() => {
  const savedToken = localStorage.getItem('pm_token')
  if (savedToken) {
    authKey.value = savedToken
  }
})

const handleLogin = (key) => {
  authKey.value = key
  localStorage.setItem('pm_token', key)
}

const handleLogout = () => {
  authKey.value = ''
  localStorage.removeItem('pm_token')
}
</script>

<template>
  <div class="app-container">
    <LoginForm v-if="!authKey" @login="handleLogin" />
    <div v-else class="main-layout">
      <header class="top-bar">
        <div class="logo-area">
          <div class="logo-icon">🛡️</div>
          <div class="logo-text">Password Manager</div>
        </div>
        <el-button type="danger" plain round size="small" @click="handleLogout">Logout</el-button>
      </header>
      <main class="content-area">
        <PasswordManager :authKey="authKey" />
      </main>
    </div>
  </div>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
  background-color: #f5f7fa;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
}

.main-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  height: 64px;
  background-color: #ffffff;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.logo-area {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-icon {
  font-size: 24px;
}

.logo-text {
  font-weight: 600;
  font-size: 1.25rem;
  color: #1a1a1a;
  letter-spacing: -0.5px;
}

.content-area {
  flex: 1;
  padding: 24px;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
}
</style>
