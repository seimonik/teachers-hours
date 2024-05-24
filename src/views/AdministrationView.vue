<template>
  <div id="administration-panel">
    <el-collapse v-model="activeNames">
      <el-collapse-item title="Специальности" name="1">
        <el-table :data="specialisations">
          <el-table-column prop="code" label="Код" />
          <el-table-column prop="name" label="Специальность" />
          <el-table-column label="Ступень образования">
            <template #default="{ row }">
              {{ getEducationLevel(row.educationLevel) }}
            </template>
          </el-table-column>
          <el-table-column>
            <template #default="{ row }">
              <el-button-group class="ml-4">
                <el-button type="primary" :icon="Edit" />
                <el-button
                  type="primary"
                  :icon="Delete"
                  @click="deleteSpecialization(row.code)"
                />
              </el-button-group>
            </template>
          </el-table-column>
        </el-table>
      </el-collapse-item>
      <el-collapse-item title="Нормы времени" name="2">
        <el-table :data="timeNorms">
          <el-table-column prop="name" label="Специальность" />
          <el-table-column prop="norm" label="Норма" />
          <el-table-column>
            <el-button-group class="ml-4">
              <el-button type="primary" :icon="Edit" />
              <el-button type="primary" :icon="Delete" />
            </el-button-group>
          </el-table-column>
        </el-table>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script lang="ts" setup>
import store from "@/store";
import { ISpecialization, ITimeNorm } from "@/types/interfaces/lookups";
import { ref } from "vue";
import { Delete, Edit } from "@element-plus/icons-vue";

const activeNames = ref(["1"]);
const specialisations = ref<ISpecialization[]>([]);
const timeNorms = ref<ITimeNorm[]>([]);

const getSpecializations = () => {
  store
    .dispatch("teachersHoursApi/GetSpecializationLookups")
    .then((response) => {
      specialisations.value = response.data;
    });
};
getSpecializations();

async function getTimeNorms() {
  await store.dispatch("teachersHoursApi/GetTimeNorms").then((response) => {
    timeNorms.value = response.data;
  });
}
getTimeNorms();

const getEducationLevel = (level: string) => {
  switch (level) {
    case "Bachelor":
      return "Бакалавриат";
    case "Specialty":
      return "Специалитет";
    case "Magistracy":
      return "Магистратура";
    case "Postgraduate":
      return "Аспиранутра";
  }
};

async function deleteSpecialization(code: string) {
  await store.dispatch("teachersHoursApi/DeleteSpecializationLookups", code);
  getSpecializations();
}
</script>
