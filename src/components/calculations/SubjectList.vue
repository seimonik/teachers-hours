<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column
      prop="name"
      label="Наименование дисциплины"
      width="150px"
    />
    <el-table-column
      prop="specialization"
      label="Специальность"
      width="150px"
    />
    <el-table-column prop="semester" label="Семестр" width="150px" />
    <el-table-column label="Количество студентов">
      <el-table-column prop="budget" label="бюджет" />
      <el-table-column prop="commercial" label="коммерч." width="100px" />
    </el-table-column>
    <el-table-column prop="groups" label="Группа (номер)" />
    <el-table-column prop="groupForm" label="Форма группы" />
    <el-table-column prop="totalHours" label="Всего часов" />
    <el-table-column label="Из них">
      <el-table-column label="аудиторные">
        <el-table-column prop="lectures" label="лекции" />
        <el-table-column prop="seminars" label="практич., семинар. занятия" />
        <el-table-column prop="laboratory" label="лаборатор. занятия" />
      </el-table-column>
      <el-table-column prop="selfStudy" label="Самостоятельная работа" />
    </el-table-column>
    <el-table-column prop="loadPerWeek" label="Нагрузка в неделю" />
    <el-table-column prop="reportingForm" label="Форма отчетности" />
    <el-table-column prop="remark" label="Примечание" />
    <el-table-column
      prop="teacher"
      label="Преподаватель"
      width="270px"
      fixed="right"
    >
      <template #default="scope">
        <el-select
          v-model="value[scope.$index]"
          filterable
          placeholder="Select"
          style="width: 240px"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </template>
    </el-table-column>
  </el-table>
  <el-button @click="test">Test</el-button>
</template>

<script lang="ts" setup>
import store from "@/store";
import { ref } from "vue";

const tableData = [
  {
    name: "История и методология компьютерных наук",
    specialization: "01.04.02, 09.04.02",
  },
  {
    name: "Методика преподавания компьютерных наук",
    specialization: "01.04.02, 09.04.02",
  },
  {
    name: "Экономико-правовые основы рынка программного обеспечения",
    specialization: "01.04.02, 09.04.02",
  },
];

const value = ref([]);
const options = [
  {
    value: "Option1",
    label: "Option1",
  },
  {
    value: "Option2",
    label: "Option2",
  },
  {
    value: "Option3",
    label: "Option3",
  },
  {
    value: "Option4",
    label: "Option4",
  },
  {
    value: "Option5",
    label: "Option5",
  },
];
const test = async () => {
  // await store
  //   .dispatch(
  //     "teachersHoursApi/GetDocumentFile",
  //     "2175d443-bb6c-4526-aab5-3460275556f1"
  //   )
  //   .then((response) => {
  //     const data = new Blob([response.data]);
  //     const url = URL.createObjectURL(data);
  //     const fileLink = document.createElement("a");
  //     fileLink.href = url;
  //     fileLink.setAttribute("download", "yrtre.docx");
  //     document.body.appendChild(fileLink);
  //     fileLink.click();
  //     document.body.removeChild(fileLink);
  //   })
  //   .catch((error) => console.log(error));
  await store
    .dispatch("teachersHoursApi/UpdateTeacher", {
      teacherId: "c3613802-fe5d-4f9c-b0e2-e632c17f3c33",
      data: value.value,
    })
    .then((response) => {
      const blob = new Blob([response.data]);
      const fileURL = window.URL.createObjectURL(blob);
      const fileLink = document.createElement("a");
      fileLink.href = fileURL;
      fileLink.setAttribute("download", `popopo.xlsx`);
      document.body.appendChild(fileLink);
      fileLink.click();
      document.body.removeChild(fileLink);
    })
    .catch((error) => console.log(error));
};

const downloadFileTest = (
  responseData: any,
  fileName: string,
  fileExtantion: string
) => {
  const blob = new Blob([responseData]);
  const fileUrl = window.URL.createObjectURL(blob);
  const fileLink = document.createElement("a");
  fileLink.href = fileUrl;
  fileLink.setAttribute("download", `${fileName}${fileExtantion}`);
  document.body.appendChild(fileLink);
  fileLink.click();
  document.body.removeChild(fileLink);
};
</script>
