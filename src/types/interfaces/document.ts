export interface IDocument {
  id: string;
  name: string;
  createdAt: string;
  documentType: string;
  childDocuments: IDocument[];
}

// export interface IDocumentWithFile extends IDocument {
//   file: Blob;
// }

export interface ISubject {
  name: string;
  specialization: string;
  semester: string;
  budget: string;
  commercial: string;
  groups: string;
  groupForm: string;
  totalHours: string;
  lectures: string;
  seminars: string;
  laboratory: string;
  selfStudy: string;
  loadPerWeek: string;
  reportingForm: string;
  remark: string;
  teacherFullName: string;
}
