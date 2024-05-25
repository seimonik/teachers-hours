<template>
  <div class="save-file">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      :size="formSize"
      label-position="top"
    >
      <el-form-item prop="documentType" label="Тип документа">
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
        :on-success="reloadDocumentsList"
        :before-upload="beforeUpload"
      >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
          Перетащите файл сюда или <em>нажмите, чтобы загрузить</em>
        </div>
        <template #tip>
          <div class="el-upload__tip">docx/xlsx файлы размером менее 20 МБ</div>
        </template>
      </el-upload>
      <div class="footer-container">
        <el-button @click="handleCloseDialog">Отмена</el-button>
        <el-button type="primary" @click="submitUpload(ruleFormRef)">
          Сохранить
        </el-button>
      </div>
    </el-form>
    <el-dialog v-model="errorDialogVisible" width="300">
      <el-result
        icon="warning"
        title="Ошибка"
        sub-title="В файле обнаружены валидационные ошибки"
      >
        <template #extra>
          <el-button @click="downloadFileWithValidateErrors">Скачать</el-button>
          <el-button @click="errorDialogVisible = false">Отмена</el-button>
        </template>
      </el-result>
    </el-dialog>
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
  UploadProps,
} from "element-plus";
import store from "@/store";
import { downloadFile } from "@/service/downloadFile";

const errorDialogVisible = ref(false);
const parametersRequest = ref<IRequest>({
  documentType: "",
});
interface IRequest {
  documentType: string;
}
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
const emit = defineEmits(["form-closed", "update-documents-list"]);

const submitUpload = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      uploadRef.value!.submit();
      console.log("submit TESTTTT!");
    } else {
      console.log("error submit!", fields);
    }
  });
};

const fileError = ref();
const fileName = ref();
const beforeUpload: UploadProps["beforeUpload"] = async (rawFile) => {
  if (parametersRequest.value.documentType === "Request") {
    let result = true;
    await store
      .dispatch("teachersHoursApi/ValidateFile", { file: rawFile })
      .then((response) => {
        console.log(response.data);
        if (response.data.size !== 0) {
          result = false;
          errorDialogVisible.value = true;
          fileError.value = response.data;
          fileName.value = rawFile.name.replace(/\.[^.]*$/, "");
          // downloadFile(response.data, `${fileName}(валидационные ошибки).xlsx`);
        }
      });
    return result;
  } else {
    return true;
  }
};

const downloadFileWithValidateErrors = () => {
  downloadFile(fileError.value, `${fileName.value}(валидационные ошибки).xlsx`);
  errorDialogVisible.value = false;
};

const reloadDocumentsList = () => {
  emit("update-documents-list");
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
