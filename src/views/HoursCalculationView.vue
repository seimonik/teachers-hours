<template>
  <div id="hours-calculation">
    <el-card shadow="never">
      <el-row>
        <el-col :span="12">
          <el-row>
            <el-text
              ><el-text tag="b" size="large">{{ document.name }} </el-text
              ><el-text tag="sup" size="small">{{
                getFormattedDate(document.createdAt)
              }}</el-text>
            </el-text>
          </el-row>
          <el-row>
            <el-button color="#626aef" @click="addTeachers"
              >Изменить преподавательский состав</el-button
            >
            <el-button color="#626aef" @click="reportGenerate"
              >Сгенерировать отчет</el-button
            >
          </el-row>
        </el-col>
        <el-col :span="12">
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
import { useRoute } from "vue-router";
import { getFormattedDate } from "@/service/formatDate";

const documentId = ref("");
const document = ref<IDocument>({
  id: "",
  name: "",
  createdAt: "",
  documentType: "",
  childDocuments: [],
});
const subjectList = ref<ISubject[]>([]);
const teachersList = ref<IGetTeacher[]>();

const getTable = async () => {
  await store
    .dispatch("teachersHoursApi/GetDocumentTable", documentId.value)
    .then((response) => {
      subjectList.value = response.data;
    })
    .catch((error) => console.log(error));
};

const route = useRoute();
if (route.params.id) {
  console.log(route.params.id as string);
  documentId.value = route.params.id as string;
  console.log(documentId.value);
  store
    .dispatch("teachersHoursApi/GetDocument", route.params.id)
    .then((response) => {
      document.value = response.data;
    })
    .catch((error) => console.log(error));
  getTable();
}

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
const reportGenerate = async () => {
  await addTeachers();
  await store
    .dispatch("teachersHoursApi/GenerateCalculationFile", documentId.value)
    .then((response) => {
      console.log(response);
      document.value.childDocuments.push(response.data);
    });
};
</script>

<style lang="scss">
#hours-calculation {
  .el-row {
    margin-bottom: 20px;
  }
  .el-row:last-child {
    margin-bottom: 0;
  }
  .select-card {
    display: flex;
    justify-content: flex-start;
  }
  .select-card > * {
    margin-right: 10px;
    margin-left: 0px;
  }
  > .el-card {
    margin-bottom: 20px;
    background-color: #ecf5ff;
  }
}
</style>
