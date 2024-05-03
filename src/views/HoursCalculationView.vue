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
            :value="item.createdAt"
          />
        </el-select>
        <el-button color="#626aef">Изменить преподавательский состав</el-button>
      </div>
    </el-card>
    <SubjectList />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import store from "@/store";
import SubjectList from "@/components/calculations/SubjectList.vue";

const value = ref("");
const optionsFiles = ref([]);

const getDocuments = async () => {
  await store
    .dispatch("teachersHoursApi/GetFiles", {
      params: { DocumentType: "Request" },
    })
    .then((response) => {
      optionsFiles.value = response.data;
    })
    .catch((error) => console.log(error));
};
getDocuments();
</script>
