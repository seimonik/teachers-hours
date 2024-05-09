<template>
  <div id="hours-calculation">
    <el-card shadow="never">
      <el-row>
        <el-col :span="14">
          <el-row>
            <el-select
              v-model="documentId"
              filterable
              placeholder="Select"
              style="width: 100%"
            >
              <el-option
                v-for="item in optionsFiles"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-row>
          <el-row>
            <el-button color="#626aef" @click="getTable"
              >Изменить преподавательский состав</el-button
            >
            <el-button color="#626aef" @click="addTeachers"
              >Сгенерировать отчет</el-button
            >
          </el-row>
        </el-col>
        <el-col :span="10">
          <FilesList :files="document.childDocuments" />
        </el-col>
      </el-row>
    </el-card>
    <el-table :data="subjectList" style="width: 100%">
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
        prop="teacherFullName"
        label="Преподаватель"
        width="270px"
        fixed="right"
      >
        <template #default="{ row }">
          <el-select
            v-model="row.teacherFullName"
            filterable
            placeholder="Select"
            style="width: 240px"
          >
            <el-option
              v-for="item in teachersList"
              :key="item.id"
              :label="item.fullName"
              :value="item.fullName"
            />
          </el-select>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import store from "@/store";
import FilesList from "@/components/calculations/FilesList.vue";
import { IDocument, ISubject } from "@/types/interfaces/document";
import { IGetTeacher } from "@/types/interfaces/teacher";

const documentId = ref("");
const document = ref<IDocument>({
  id: "",
  name: "",
  createdAt: "",
  documentType: "",
  childDocuments: [],
});
const optionsFiles = ref<IDocument[]>([]);
const subjectList = ref<ISubject[]>([]);
const teachersList = ref<IGetTeacher[]>();

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
  await store
    .dispatch("teachersHoursApi/GetDocumentTable", documentId.value)
    .then((response) => {
      subjectList.value = response.data;
    })
    .catch((error) => console.log(error));

  await store
    .dispatch("teachersHoursApi/GetDocument", documentId.value)
    .then((response) => {
      document.value = response.data;
    })
    .catch((error) => console.log(error));
};

const getTeachers = async () => {
  await store
    .dispatch("teachersHoursApi/GetTeachers")
    .then((response) => {
      teachersList.value = response.data;
    })
    .catch((error) => console.log(error));
};
getTeachers();

const addTeachers = async () => {
  await store
    .dispatch("teachersHoursApi/UpdateTeacher", {
      documentId: documentId.value,
      data: subjectList.value.map((x) => x.teacherFullName),
    })
    .catch((error) => console.log(error));
};
</script>

<style lang="scss">
#hours-calculation {
  .select-card {
    display: flex;
    justify-content: flex-start;
  }
  .select-card > * {
    margin-right: 10px;
    margin-left: 0px;
  }
  .el-card {
    margin-bottom: 20px;
  }
}
</style>
