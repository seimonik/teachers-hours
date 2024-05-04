<template>
  <div id="hours-calculation">
    <el-card shadow="never">
      <div class="left-align-button">
        <el-select
          v-model="value"
          filterable
          placeholder="Select"
          style="width: 240px"
        >
          <el-option
            v-for="item in optionsFiles"
            :key="item.createdAt"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
        <el-button color="#626aef" @click="getTable"
          >Изменить преподавательский состав</el-button
        >
      </div>
    </el-card>
    <SubjectList :subject-list="requestTable" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import store from "@/store";
import SubjectList from "@/components/calculations/SubjectList.vue";
import { IDocument, ISubject } from "@/types/interfaces/document";

const value = ref<IDocument>();
const optionsFiles = ref<IDocument[]>([]);
const requestTable = ref<ISubject[]>([]);

const getDocuments = async () => {
  await store
    .dispatch("teachersHoursApi/GetFiles", {
      params: { DocumentType: "Request" },
    })
    .then((response) => {
      optionsFiles.value = response.data;
      console.log(optionsFiles.value);
    })
    .catch((error) => console.log(error));
};
getDocuments();

const getTable = async () => {
  console.log(value.value);
  await store
    .dispatch("teachersHoursApi/GetDocumentTable", value.value)
    .then((response) => {
      requestTable.value = response.data;
      console.log(response);
    })
    .catch((error) => console.log(error));
};
</script>
