<template>
  <div class="save-file">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      :size="formSize"
    >
      <el-form-item prop="documentType">
        <el-select
          v-model="ruleForm.documentType"
          placeholder="Выберите"
          size="large"
          style="width: 240px"
          @change="changeDocumentType"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-upload
        ref="uploadRef"
        class="upload-demo"
        drag
        action="https://localhost:7055/api/reports/add-file"
        :limit="1"
        :data="parametersRequest"
        :auto-upload="false"
      >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
          Drop file here or <em>click to upload</em>
        </div>
        <template #tip>
          <div class="el-upload__tip">
            jpg/png files with a size less than 500kb
          </div>
        </template>
      </el-upload>
      <div class="footer-container">
        <el-button @click="handleCloseDialog">Отмена</el-button>
        <el-button type="primary" @click="submitUpload(ruleFormRef)">
          Сохранить
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { UploadFilled } from "@element-plus/icons-vue";
import { reactive, ref } from "vue";
import type {
  ComponentSize,
  FormInstance,
  FormRules,
  UploadFile,
  UploadInstance,
} from "element-plus";

const parametersRequest = ref({ documentType: "" });
const uploadRef = ref<UploadInstance>();
const options = [
  {
    value: "Ordinary",
    label: "Обычный",
  },
  {
    value: "Request",
    label: "Заявка",
  },
  {
    value: "Calculation",
    label: "Расчет",
  },
];
const emit = defineEmits(["form-closed"]);

const submitUpload = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      uploadRef.value!.submit();
      console.log("submit!");
    } else {
      console.log("error submit!", fields);
    }
  });
};

const changeDocumentType = (type: string) => {
  parametersRequest.value = { documentType: type };
};

const handleCloseDialog = () => {
  emit("form-closed");
};

const formSize = ref<ComponentSize>("default");
const ruleFormRef = ref<FormInstance>();
interface RuleForm {
  documentType: string;
  file: UploadFile | undefined;
}
const ruleForm = reactive<RuleForm>({
  documentType: "",
  file: undefined,
});
const rules = reactive<FormRules<RuleForm>>({
  documentType: [
    {
      required: true,
      message: "Пожалуйста, выберите тип документа",
      trigger: "change",
    },
  ],
});
</script>

<style>
.save-file > * {
  margin-bottom: 10px;
}
.footer-container {
  display: flex;
  justify-content: flex-end;
}
</style>
