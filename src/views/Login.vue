<template>
  <div class="scale-wrapper">
    <el-form
      ref="ruleFormRef"
      style="max-width: 600px;"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="auto"
      class="demo-ruleForm demo-border"
    >
      <el-form-item label="账 号" prop="username">
        <el-input v-model="ruleForm.username" type="username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密 码" prop="pass">
        <el-input
          v-model="ruleForm.pass"
          type="password"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item>
        <el-space :size="size" spacer="|">
          <el-button type="primary" @click="submitForm(ruleFormRef)">
          提交
        </el-button>
        <el-button @click="resetForm(ruleFormRef)">重置</el-button>
        <el-button @click="goToRegister">注册</el-button>
        </el-space>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useRouter } from 'vue-router'

const ruleFormRef = ref<FormInstance>()
const size = ref(10)

//获取路由实例
const router = useRouter()


const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('密码不能为空!'))
  }else if(value.length<6) {
    callback(new Error('密码至少为6位'))
  }else {
    callback()
  }
}

const validateUsername = (rule:any,value:any,callback:any) => {
  if(value === '') {
    callback(new Error('用户名不能为空！'))
  }else {
    callback()
  }
}

//注册函数
const goToRegister = ()=> {
  router.push('/register')
}

const ruleForm = reactive({
  username: '',
  pass: '',
})

const rules = reactive<FormRules<typeof ruleForm>>({
  pass: [{ validator: validatePass, trigger: 'blur' }],
  username: [{ validator: validateUsername, trigger: 'blur' }]
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!')
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<style scoped>
.demo-border {
  border: 2px solid #e4e7ed;
  border-radius: 4px; /* 可选圆角 */
  padding: 50px; /* 内边距避免内容紧贴边框 */
  max-width: 600px;
}
.scale-wrapper {
  transform:scale(1.2);
  transform-origin: top center;
}
</style>