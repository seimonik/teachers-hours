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
              >Сохранить преподавательский состав</el-button
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
    <div class="subject-table">
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
          <el-table-column prop="commercial" label="комм." />
        </el-table-column>
        <el-table-column prop="groups" label="Группа (номер)" />
        <el-table-column prop="groupForm" label="Форма группы" />
        <el-table-column prop="totalHours" label="Всего часов" />
        <el-table-column label="Из них">
          <el-table-column label="аудиторные">
            <el-table-column prop="lectures" label="лекции" />
            <el-table-column
              prop="seminars"
              label="практич., семинар. занятия"
              width="100px"
            />
            <el-table-column prop="laboratory" label="лаб. занятия" />
          </el-table-column>
          <el-table-column
            prop="selfStudy"
            label="Самост. работа"
            width="100px"
          />
        </el-table-column>
        <el-table-column
          prop="loadPerWeek"
          label="Нагрузка в неделю"
          width="90px"
        />
        <el-table-column
          prop="reportingForm"
          label="Форма отчетности"
          width="105px"
        />
        <el-table-column prop="remark" label="Примечание" width="120px" />
        <el-table-column
          prop="teacherShow"
          label="Преподаватель"
          width="350px"
          fixed="right"
        >
          <template #default="scope">
            <el-select
              v-if="!SubjectsDividedIntoTeachers.includes(scope.row.name)"
              v-model="scope.row.teacherShow"
              filterable
              placeholder="Выберите преподавателя"
              style="width: 310px"
            >
              <el-option
                v-for="item in teachersList"
                :key="item.id"
                :label="item.fullName"
                :value="item.fullName"
              />
            </el-select>

            <div v-else>
              <div
                v-for="(item, index) in scope.row.teacherFullName"
                :key="index"
                class="gap-3"
              >
                <el-select
                  v-model="item.teacherName"
                  filterable
                  placeholder="Выберите преподавателя"
                  style="width: 240px"
                >
                  <el-option
                    v-for="teacher in teachersList"
                    :key="teacher.id"
                    :label="teacher.fullName"
                    :value="teacher.fullName"
                  />
                </el-select>
                <el-input-number
                  v-model="item.studentsCount"
                  :controls="false"
                  style="width: 45px"
                ></el-input-number>
                <el-button
                  type="danger"
                  :icon="CloseBold"
                  circle
                  :disabled="!scope.row.teacherFullName.length"
                  @click="deleteRow(scope.$index, index)"
                />
              </div>
              <el-button
                type="primary"
                :icon="Plus"
                circle
                @click="addNewRow(scope.$index)"
              />
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import store from "@/store";
import FilesList from "@/components/calculations/FilesList.vue";
import {
  IDocument,
  ISubject,
  ITeacherStudents,
} from "@/types/interfaces/document";
import { IGetTeacher } from "@/types/interfaces/teacher";
import { useRoute } from "vue-router";
import { getFormattedDate } from "@/service/formatDate";
import { Plus, CloseBold } from "@element-plus/icons-vue";
import { SubjectsDividedIntoTeachers } from "@/types/constants/subjectNames";

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
      subjectList.value?.forEach((subject) => {
        if (!SubjectsDividedIntoTeachers.includes(subject.name)) {
          subject.teacherShow = subject.teacherFullName[0].teacherName;
        }
      });
    })
    .catch((error) => console.log(error));
  console.log(subjectList.value);
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

const addNewRow = (index: number) => {
  subjectList.value[index].teacherFullName.push({
    teacherName: "",
    studentsCount: 0,
  });
};
const deleteRow = (indexSubject: number, indexTeacher: number) => {
  subjectList.value[indexSubject].teacherFullName.splice(indexTeacher, 1);
};

const addTeachers = async () => {
  subjectList.value?.forEach((subject) => {
    if (!SubjectsDividedIntoTeachers.includes(subject.name))
      subject.teacherFullName = toTeachersValue(subject.teacherShow);
  });
  console.log(subjectList.value.map((x) => x.teacherFullName));
  await store
    .dispatch("teachersHoursApi/UpdateTeacher", {
      documentId: documentId.value,
      data: subjectList.value.map((x) => x.teacherFullName),
    })
    .catch((error) => console.log(error));
};
const toTeachersValue = (fullName: string) => {
  const value: ITeacherStudents[] = [
    {
      teacherName: fullName,
      studentsCount: 0,
    },
  ];
  return value;
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
.subject-table {
  .el-table th {
    text-align: center;
  }
}
</style>
