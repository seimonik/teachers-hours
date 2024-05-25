import { IDocument } from "./interfaces/document";
import { ISpecialization } from "./interfaces/lookups";

export interface FilesListProps {
  files: IDocument[];
}

export interface SpecialisationsListProps {
  specialisations: ISpecialization[];
}
