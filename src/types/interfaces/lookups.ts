export interface ISpecialization extends ILookup {
  educationLevel: string;
}

export interface ITimeNorm extends ILookup {
  norm: string;
}

interface ILookup {
  code: string;
  name: string;
}
