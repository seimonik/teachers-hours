<template>
  <div id="documents" class="d-grid gap-4">
    <el-collapse>
      <el-collapse-item title="Фильтры" name="docmentFilters">
      </el-collapse-item>
    </el-collapse>
    <el-card shadow="never">
      <div class="left-align-button">
        <el-button size="large" color="#626aef" @click="dialogVisible = true"
          >Загрузить</el-button
        >
      </div>
    </el-card>

    <div class="documents-table">
      <el-table :data="documentsTable" style="width: 100%">
        <el-table-column prop="name" label="Название" />
        <el-table-column prop="documentType" label="Тип документа" width="250">
          <template #default="{ row }">
            <el-tag size="large" :type="getDocumentTypeTag(row.documentType)">
              {{ getDocumentType(row.documentType) }}</el-tag
            ></template
          ></el-table-column
        >
        <el-table-column prop="createdAt" label="Дата создания" width="250">
          <template #default="{ row }">
            {{ getFormattedDate(row.createdAt) }}</template
          >
        </el-table-column>
        <el-table-column width="200px">
          <template #default="{ row }">
            <el-button-group class="ml-4">
              <router-link
                :to="{
                  name: 'calculation-generate',
                  params: { id: row.id },
                }"
                custom
                v-slot="{ navigate }"
              >
                <el-button
                  v-if="row.documentType === 'Request'"
                  type="primary"
                  @click="navigate"
                  :icon="DocumentAdd"
                />
              </router-link>
              <el-button
                type="primary"
                :icon="Download"
                @click="downloadDocument(row.id, row.name)"
              />
              <el-button
                type="primary"
                :icon="Delete"
                @click="deleteDocument(row.id)"
              />
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog
      v-model="dialogVisible"
      title="Загрузка документа"
      width="600"
      destroy-on-close
      center
    >
      <SaveFile
        @form-closed="handleCloseDialog"
        @update-documents-list="reloadDocumentsList"
      />
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import SaveFile from "@/components/documents/SaveFile.vue";
import store from "@/store";
import { getFormattedDate } from "@/service/formatDate";
import { DocumentAdd, Delete, Download } from "@element-plus/icons-vue";
import { IDocument } from "@/types/interfaces/document";
import { downloadFile } from "@/service/downloadFile";

const dialogVisible = ref(false);

const documentsTable = ref<IDocument[]>();

const getDocuments = async () => {
  await store
    .dispatch("teachersHoursApi/GetFiles", { params: null })
    .then((response) => {
      documentsTable.value = response.data;
    })
    .catch((error) => console.log(error));
};
getDocuments();

const deleteDocument = async (documentId: string) => {
  await store
    .dispatch("teachersHoursApi/DeleteDocument", documentId)
    .then(() => {
      getDocuments();
    });
};

const downloadDocument = async (documentId: string, documentName: string) => {
  await store
    .dispatch("teachersHoursApi/DownloadFile", documentId)
    .then((response) => {
      downloadFile(response.data, documentName);
    });
};

const reloadDocumentsList = async () => {
  dialogVisible.value = false;
  await getDocuments();
};

const handleCloseDialog = () => {
  dialogVisible.value = false;
};

const getDocumentType = (type: string) => {
  switch (type) {
    case "Ordinary":
      return "Обычный";
    case "Request":
      return "Заявка";
    case "Calculation":
      return "Расчет";
    default:
      return "Обычный";
  }
};
const getDocumentTypeTag = (type: string) => {
  switch (type) {
    case "Ordinary":
      return "info";
    case "Request":
      return "success";
    case "Calculation":
      return "primary";
    default:
      return "info";
  }
};
</script>

<style lang="scss">
.documents-table {
  .el-table th {
    color: #19191a;
    text-align: center;
    background-color: #f6f6f8;
    font-size: 16px;
  }

  .el-table td {
    text-align: center;
  }
}
#documents {
  .left-align-button {
    text-align: left;
  }
  .el-collapse {
    margin-bottom: 20px;
  }
  .el-card {
    margin-bottom: 20px;
  }
}
</style>
