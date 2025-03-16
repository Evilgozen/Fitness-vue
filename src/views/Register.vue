<template>
    <el-form
      ref="ruleFormRef"
      style="max-width: 600px"
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
        <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input
          v-model="ruleForm.checkPass"
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
        <el-button @click="goToLogin">登录</el-button>
        </el-space>
      </el-form-item>
    </el-form>
  </template>
  
  <script lang="ts" setup>
  import { reactive, ref } from 'vue'
  import type { FormInstance, FormRules } from 'element-plus'
  import { useRouter } from 'vue-router'
  
  const ruleFormRef = ref<FormInstance>()
  const size = ref(20)

  //路由实例
  const router = useRouter()

  //返回登录路由
  const goToLogin = () => {
    router.push('/login')
  }

  const validateUsername = (rule:any,value:any,callback:any) => {
  if(value === '') {
    callback(new Error('用户名不能为空！'))
  }else {
    callback()
  }
}
  
  const validatePass = (rule: any, value: any, callback: any) => {
    if (value === '') {
      callback(new Error('请输入你的密码!'))
    } else {
      if (ruleForm.checkPass !== '') {
        if (!ruleFormRef.value) return
        ruleFormRef.value.validateField('checkPass')
      }
      callback()
    }
  }
  const validatePass2 = (rule: any, value: any, callback: any) => {
    if (value === '') {
      callback(new Error('请重复密码一遍!'))
    } else if (value !== ruleForm.pass) {
      callback(new Error("您输入的两遍密码不同!"))
    } else {
      callback()
    }
  }
  
  const ruleForm = reactive({
    username:'',
    pass: '',
    checkPass: '',
  })
  
  const rules = reactive<FormRules<typeof ruleForm>>({
    pass: [{ validator: validatePass, trigger: 'blur' }],
    checkPass: [{ validator: validatePass2, trigger: 'blur' }],
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
</style>