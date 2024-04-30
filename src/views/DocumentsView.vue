<template>
  <div id="documents" class="d-grid gap-4">
    <el-collapse>
      <el-collapse-item title="Фильтры" name="docmentFilters">
      </el-collapse-item>
    </el-collapse>
    <el-card shadow="never">
      <div class="d-flex gap-2">
        <div class="left-align-button">
          <el-button color="#626aef" @click="dialogVisible = true"
            >Загрузить</el-button
          >
        </div>
      </div>
    </el-card>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="Date" width="180" />
      <el-table-column prop="name" label="Name" width="180" />
      <el-table-column prop="address" label="Address" />
    </el-table>

    <el-dialog
      v-model="dialogVisible"
      title="Загрузка документа"
      width="600"
      destroy-on-close
      center
    >
      <SaveFile @form-closed="handleCloseDialog" />
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import SaveFile from "@/components/documents/SaveFile.vue";

const dialogVisible = ref(false);

const tableData = [
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-02",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-04",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
];

const handleCloseDialog = () => {
  dialogVisible.value = false;
};
</script>

<style>
.left-align-button {
  text-align: left;
}
</style>
