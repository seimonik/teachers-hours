<template>
  <div id="teachers">
    <el-card shadow="never">
      <div class="left-align-button">
        <el-button color="#626aef" @click="handleAdd">Добавить</el-button>
      </div>
    </el-card>

    <div class="teachers-table">
      <el-table :data="teachersTable" style="width: 100%">
        <el-table-column prop="surname" label="Фамилия" width="200" />
        <el-table-column prop="name" label="Имя" width="200" />
        <el-table-column prop="patronymic" label="Отчество" width="200" />
        <el-table-column prop="rate" label="Ставка" />
        <el-table-column prop="action" label="Действие">
          <template #default="scope">
            <el-button
              size="small"
              @click="handleEdit(scope.$index, scope.row)"
            >
              Редактировать
            </el-button>
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >
              Удалить
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog
      v-model="dialogVisible"
      title="Добавить преподавателя"
      width="400"
      destroy-on-close
      center
    >
      <el-form
        ref="ruleFormRef"
        :model="teacherForm"
        :rules="rules"
        label-position="right"
        label-width="auto"
      >
        <el-form-item label="Фамилия" prop="surname">
          <el-input v-model="teacherForm.surname" style="width: 240px" />
        </el-form-item>
        <el-form-item label="Имя" prop="name">
          <el-input v-model="teacherForm.name" style="width: 240px" />
        </el-form-item>
        <el-form-item label="Отчество" prop="patronymic">
          <el-input v-model="teacherForm.patronymic" style="width: 240px" />
        </el-form-item>
        <el-form-item label="Ставка" prop="rate">
          <el-input v-model="teacherForm.rate" style="width: 240px" />
        </el-form-item>
        <el-form-item>
          <el-button
            id="add-button"
            type="primary"
            @click="submitForm(ruleFormRef)"
          >
            Добавить
          </el-button>
          <el-button
            id="update-button"
            type="primary"
            @click="submitForm(ruleFormRef, teacherUpdateId)"
          >
            Обновить
          </el-button>
          <el-button>Отмена</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { ITeacher, IGetTeacher } from "@/types/interfaces/teacher";
import { FormInstance, FormRules } from "element-plus";
import store from "@/store";
import { toggleVisibility } from "@/service/visibility";

const teachersTable = ref<IGetTeacher[]>();
const getTeachers = async () => {
  await store
    .dispatch("teachersHoursApi/GetTeachers")
    .then((response) => {
      teachersTable.value = response.data;
    })
    .catch((error) => console.log(error));
};
getTeachers();

const dialogVisible = ref(false);
const teacherForm = ref<ITeacher>({
  name: "",
  surname: "",
  patronymic: "",
  rate: undefined,
});
const teacherUpdateId = ref<string>();
const ruleFormRef = ref<FormInstance>();
// const checkRate = (rule: any, value: any, callback: any) => {
//   if (!value) {
//     return callback(new Error("Пожалуйста, введите ставку"));
//   }
//   if (!Number.isInteger(value)) {
//     callback(new Error("Введите число"));
//   }
// };
const rules = reactive<FormRules<ITeacher>>({
  name: [
    {
      required: true,
      message: "Пожалуйста, введите имя",
      trigger: "blur",
    },
  ],
  surname: [
    {
      required: true,
      message: "Пожалуйста, введите фамилию",
      trigger: "blur",
    },
  ],
  patronymic: [
    {
      required: true,
      message: "Пожалуйста, введите отчество",
      trigger: "change",
    },
  ],
  rate: [
    {
      required: true,
      message: "Пожалуйста, введите ставку",
      trigger: "blur",
    },
  ],
});

const submitForm = async (
  formEl: FormInstance | undefined,
  teacherUpdateId: string | undefined = undefined
) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log("submit!");
      if (teacherUpdateId) {
        updateTeacher(teacherUpdateId, teacherForm.value);
      } else {
        addTeacher(teacherForm.value);
      }
    } else {
      console.log("error submit!", fields);
    }
  });
};

const addTeacher = async (teacher: ITeacher) => {
  await store
    .dispatch("teachersHoursApi/AddTeacher", teacher)
    .then((response) => {
      console.log("success");
    })
    .catch((error) => console.log(error));
};
const updateTeacher = async (teacherId: string, teacher: ITeacher) => {
  await store
    .dispatch("teachersHoursApi/UpdateTeacher", {
      teacherId: teacherId,
      data: teacher,
    })
    .then((response) => {
      console.log("success");
    })
    .catch((error) => console.log(error));
};

const handleAdd = async () => {
  dialogVisible.value = true;
  await dialogVisible;
  visibilityAddOrUpdateButton("add");
};

const handleEdit = async (index: number, row: IGetTeacher) => {
  dialogVisible.value = true;
  await dialogVisible;
  visibilityAddOrUpdateButton("update");
  teacherForm.value = row;
  teacherUpdateId.value = row.id;
};
const handleDelete = (index: number, row: IGetTeacher) => {
  console.log(index, row);
};

const visibilityAddOrUpdateButton = (button: string) => {
  if (button === "add") {
    toggleVisibility("add-button", true);
    toggleVisibility("update-button", false);
  } else {
    toggleVisibility("add-button", false);
    toggleVisibility("update-button", true);
  }
};
</script>

<style lang="scss">
.teachers-table {
  .el-table th {
    color: #19191a;
    text-align: center;
    background-color: #f6f6f8;
  }

  .el-table td {
    text-align: center;
  }
}
#teachers {
  .left-align-button {
    text-align: left;
  }
  .el-card {
    margin-bottom: 20px;
  }
}
</style>
