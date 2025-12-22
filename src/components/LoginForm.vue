<script setup>
import { ref, reactive } from 'vue'
import { Lock, User } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import axios from 'axios'

const emit = defineEmits(['login'])

const isRegister = ref(false)
const loading = ref(false)
const form = reactive({
  username: '',
  password: ''
})

const handleSubmit = async () => {
  if (!form.username || !form.password) {
    ElMessage.warning('Please fill in all fields')
    return
  }

  loading.value = true
  try {
    const type = isRegister.value ? 'register' : 'login'
    const res = await axios.post('/api/auth', {
      type,
      username: form.username,
      password: form.password
    })

    if (res.data.success) {
      if (isRegister.value) {
        ElMessage.success('Registration successful! Please login.')
        isRegister.value = false
        form.password = ''
      } else {
        ElMessage.success('Login successful')
        emit('login', res.data.data.token)
      }
    } else {
      ElMessage.error(res.data.message || 'Operation failed')
    }
  } catch (error) {
    ElMessage.error(error.response?.data?.message || 'Network error')
  } finally {
    loading.value = false
  }
}

const toggleMode = () => {
  isRegister.value = !isRegister.value
  form.username = ''
  form.password = ''
}
</script>

<template>
  <div class="login-container">
    <div class="login-content">
      <div class="brand-header">
        <div class="logo-icon">🛡️</div>
        <h1>Password Manager</h1>
        <p>Securely store and manage your credentials</p>
      </div>
      
      <el-card class="login-card" shadow="always">
        <template #header>
          <div class="card-header">
            <span>{{ isRegister ? 'Create Account' : 'Welcome Back' }}</span>
          </div>
        </template>
        <el-form @submit.prevent="handleSubmit" size="large" class="login-form">
          <el-form-item>
            <el-input
              v-model="form.username"
              placeholder="Username"
              :prefix-icon="User"
            />
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="form.password"
              type="password"
              placeholder="Password"
              :prefix-icon="Lock"
              show-password
              @keyup.enter="handleSubmit"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="w-100 submit-btn" :loading="loading" @click="handleSubmit">
              {{ isRegister ? 'Sign Up' : 'Sign In' }}
            </el-button>
          </el-form-item>
          <div class="text-center">
            <el-button link type="primary" @click="toggleMode">
              {{ isRegister ? 'Already have an account? Sign In' : 'New here? Create Account' }}
            </el-button>
          </div>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 20px;
}

.login-content {
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.brand-header {
  text-align: center;
  color: #2c3e50;
}

.logo-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.brand-header h1 {
  margin: 0;
  font-size: 2rem;
  font-weight: 700;
  color: #1a1a1a;
}

.brand-header p {
  margin: 8px 0 0;
  color: #606266;
  font-size: 1rem;
}

.login-card {
  border-radius: 16px;
  border: none;
  box-shadow: 0 10px 25px rgba(0,0,0,0.05);
}

.card-header {
  text-align: center;
  font-weight: 600;
  font-size: 1.1rem;
  color: #303133;
  padding: 8px 0;
}

.login-form {
  padding: 10px 0;
}

.submit-btn {
  font-weight: 600;
  letter-spacing: 0.5px;
  height: 44px;
  border-radius: 8px;
}

.w-100 {
  width: 100%;
}

.text-center {
  text-align: center;
  margin-top: 8px;
}

:deep(.el-input__wrapper) {
  border-radius: 8px;
  box-shadow: 0 0 0 1px #dcdfe6 inset;
}

:deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 1px #409eff inset !important;
}
</style>
