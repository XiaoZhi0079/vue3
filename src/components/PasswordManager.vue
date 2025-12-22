<script setup lang="ts">
import { ref, onMounted, reactive, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { Plus, Edit, Delete, CopyDocument, Refresh, Search, View, Hide } from '@element-plus/icons-vue'
import axios from 'axios'
import type { PasswordItem, ApiResponse } from '../types'

const props = defineProps<{
  authKey: string
}>()

const items = ref<PasswordItem[]>([])
const loading = ref(false)
const dialogVisible = ref(false)
const dialogType = ref<'add' | 'edit'>('add')
const formRef = ref<FormInstance>()
const searchQuery = ref('')
const visiblePasswords = reactive<Record<string, boolean>>({})

const form = reactive<Omit<PasswordItem, 'id' | 'updatedAt'>>({
  platform: '',
  account: '',
  password: '',
  remark: ''
})

const currentId = ref<string>('')

const rules = reactive<FormRules>({
  platform: [{ required: true, message: 'Please input platform name', trigger: 'blur' }],
  account: [{ required: true, message: 'Please input account', trigger: 'blur' }],
  password: [{ required: true, message: 'Please input password', trigger: 'blur' }]
})

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Authorization': `Bearer ${props.authKey}`
  }
})

const fetchData = async () => {
  loading.value = true
  try {
    const res = await api.get<ApiResponse<PasswordItem[]>>('/passwords')
    if (res.data.success && res.data.data) {
      items.value = res.data.data
    } else {
      ElMessage.error(res.data.message || 'Failed to fetch data')
    }
  } catch (error: any) {
    if (error.response?.status === 401) {
      ElMessage.error('Session expired, please login again')
      // Ideally emit logout event
    } else {
      ElMessage.error('Network error')
    }
  } finally {
    loading.value = false
  }
}

const filteredItems = computed(() => {
  if (!searchQuery.value) return items.value
  const query = searchQuery.value.toLowerCase()
  return items.value.filter(item => 
    item.platform.toLowerCase().includes(query) || 
    item.account.toLowerCase().includes(query) ||
    item.remark.toLowerCase().includes(query)
  )
})

const togglePasswordVisibility = (id: string) => {
  visiblePasswords[id] = !visiblePasswords[id]
}

const handleAdd = () => {
  dialogType.value = 'add'
  currentId.value = ''
  form.platform = ''
  form.account = ''
  form.password = ''
  form.remark = ''
  dialogVisible.value = true
}

const handleEdit = (row: PasswordItem) => {
  dialogType.value = 'edit'
  currentId.value = row.id
  form.platform = row.platform
  form.account = row.account
  form.password = row.password
  form.remark = row.remark
  dialogVisible.value = true
}

const handleDelete = (row: PasswordItem) => {
  ElMessageBox.confirm(
    'Are you sure you want to delete this item?',
    'Warning',
    {
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }
  ).then(async () => {
    try {
      const res = await api.delete('/passwords', { data: { id: row.id } })
      if (res.data.success) {
        ElMessage.success('Deleted successfully')
        fetchData()
      } else {
        ElMessage.error(res.data.message || 'Delete failed')
      }
    } catch (error) {
      ElMessage.error('Error deleting item')
    }
  })
}

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      try {
        const payload = { ...form, id: currentId.value }
        const method = dialogType.value === 'add' ? 'post' : 'put'
        const res = await api[method]('/passwords', payload)
        
        if (res.data.success) {
          ElMessage.success(dialogType.value === 'add' ? 'Added successfully' : 'Updated successfully')
          dialogVisible.value = false
          fetchData()
        } else {
          ElMessage.error(res.data.message || 'Operation failed')
        }
      } catch (error) {
        ElMessage.error('Error submitting form')
      }
    }
  })
}

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text).then(() => {
    ElMessage.success('Password copied to clipboard')
  }).catch(() => {
    ElMessage.error('Failed to copy')
  })
}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <div class="manager-container">
    <div class="header-actions">
      <div class="search-box">
        <el-input
          v-model="searchQuery"
          placeholder="Search passwords..."
          :prefix-icon="Search"
          size="large"
          clearable
        />
      </div>
      <div class="buttons">
        <el-button :icon="Refresh" circle size="large" @click="fetchData" />
        <el-button type="primary" :icon="Plus" size="large" @click="handleAdd">Add Password</el-button>
      </div>
    </div>

    <div v-loading="loading" class="content-wrapper">
      <el-row :gutter="24">
        <el-col :xs="24" :sm="12" :md="8" :lg="6" v-for="item in filteredItems" :key="item.id" class="mb-4">
          <el-card shadow="hover" class="password-card">
            <template #header>
              <div class="card-header">
                <div class="platform-info">
                  <div class="platform-icon">{{ item.platform.charAt(0).toUpperCase() }}</div>
                  <span class="platform-name" :title="item.platform">{{ item.platform }}</span>
                </div>
                <el-dropdown trigger="click">
                  <span class="el-dropdown-link">
                    <el-icon class="more-icon"><Edit /></el-icon>
                  </span>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item :icon="Edit" @click="handleEdit(item)">Edit</el-dropdown-item>
                      <el-dropdown-item :icon="Delete" class="text-danger" @click="handleDelete(item)">Delete</el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </div>
            </template>
            <div class="card-content">
              <div class="info-group">
                <label>Account</label>
                <div class="value-row">
                  <span class="text-value">{{ item.account }}</span>
                  <el-button link type="primary" :icon="CopyDocument" @click="copyToClipboard(item.account)" />
                </div>
              </div>
              
              <div class="info-group">
                <label>Password</label>
                <div class="value-row">
                  <span class="text-value password-text">
                    {{ visiblePasswords[item.id] ? item.password : '••••••••' }}
                  </span>
                  <div class="actions">
                    <el-button link type="info" :icon="visiblePasswords[item.id] ? Hide : View" @click="togglePasswordVisibility(item.id)" />
                    <el-button link type="primary" :icon="CopyDocument" @click="copyToClipboard(item.password)" />
                  </div>
                </div>
              </div>

              <div class="info-group" v-if="item.remark">
                <label>Remark</label>
                <p class="remark-text">{{ item.remark }}</p>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>

      <el-empty v-if="!loading && filteredItems.length === 0" description="No passwords found">
        <el-button type="primary" @click="handleAdd">Create your first password</el-button>
      </el-empty>
    </div>

    <el-dialog
      v-model="dialogVisible"
      :title="dialogType === 'add' ? 'Add Password' : 'Edit Password'"
      width="500px"
      destroy-on-close
      class="custom-dialog"
    >
      <el-form ref="formRef" :model="form" :rules="rules" label-position="top" size="large">
        <el-form-item label="Platform Name" prop="platform">
          <el-input v-model="form.platform" placeholder="e.g. Google, Netflix" />
        </el-form-item>
        <el-form-item label="Account / Email" prop="account">
          <el-input v-model="form.account" placeholder="username@example.com" />
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input v-model="form.password" show-password placeholder="Enter password" />
        </el-form-item>
        <el-form-item label="Notes (Optional)" prop="remark">
          <el-input v-model="form.remark" type="textarea" :rows="3" placeholder="Any additional details..." />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="submitForm(formRef)">Save Password</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.manager-container {
  max-width: 1400px;
  margin: 0 auto;
}

.header-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  gap: 16px;
  flex-wrap: wrap;
}

.search-box {
  flex: 1;
  max-width: 400px;
}

.buttons {
  display: flex;
  gap: 12px;
}

.mb-4 {
  margin-bottom: 24px;
}

.password-card {
  height: 100%;
  border-radius: 12px;
  border: 1px solid #ebeef5;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.password-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0,0,0,0.08);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 0;
}

.platform-info {
  display: flex;
  align-items: center;
  gap: 12px;
  overflow: hidden;
}

.platform-icon {
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #409eff, #3a8ee6);
  color: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 18px;
  flex-shrink: 0;
}

.platform-name {
  font-weight: 600;
  font-size: 1.1rem;
  color: #2c3e50;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.more-icon {
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  color: #909399;
}

.more-icon:hover {
  background-color: #f5f7fa;
  color: #409eff;
}

.card-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.info-group label {
  display: block;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #909399;
  margin-bottom: 4px;
  font-weight: 600;
}

.value-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f8f9fa;
  padding: 8px 12px;
  border-radius: 6px;
  min-height: 36px;
}

.text-value {
  font-family: 'Roboto Mono', monospace;
  font-size: 0.9rem;
  color: #303133;
  word-break: break-all;
}

.password-text {
  letter-spacing: 1px;
}

.actions {
  display: flex;
  gap: 4px;
}

.remark-text {
  font-size: 0.9rem;
  color: #606266;
  line-height: 1.4;
  margin: 0;
  background-color: #f8f9fa;
  padding: 8px 12px;
  border-radius: 6px;
}

.text-danger {
  color: #f56c6c;
}

:deep(.el-card__header) {
  padding: 16px 20px;
  border-bottom: 1px solid #f0f2f5;
}

:deep(.el-card__body) {
  padding: 20px;
  flex: 1;
}
</style>
