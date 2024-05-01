export interface ITeacher {
  name: string;
  surname: string;
  patronymic: string;
  rate: number | undefined;
}

export interface IGetTeacher extends ITeacher {
  id: string;
  fullName: string;
}
