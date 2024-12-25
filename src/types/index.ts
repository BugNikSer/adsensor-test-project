import { ISubCategory } from "../api/categories";
import { IFilm } from "../api/films";

export type TNewSubCategory = Omit<ISubCategory, 'id'> & { tempId: number }

export type IUpdatedSubCategory = ISubCategory & { newFilmIds: number[], deletedFilmIds: number[] }

export interface IDeletedSubCategory { id: number }

export interface INewCategory {
  tempId: number // when there is no id
  name: string
  subCategories: TNewSubCategory[]
}

export interface IUpdatedCategory {
  id: number;
  name: string;
  newSubCategories: TNewSubCategory[]
  updatedSubCategories: IUpdatedSubCategory[]
  deletedSubCategories: IDeletedSubCategory[]
}

export interface IDeletedCategory { id: number }

export interface IPartialCategory {
  id: number
  name: string
  isDeleted: boolean
  subCategories: ISubCategory[]
  newSubCategories: TNewSubCategory[]
  updatedSubCategories: IUpdatedSubCategory[]
  deletedSubCategories: IDeletedSubCategory[]
}

export interface IPartialSubCategory {
  categoryId: number
  id: number
  name: string
  isDeleted: boolean
  films: IFilm[]
  filmIds: number[]
  newFilmIds: number[]
  updatedFilmIds: number[]
  deletedFilmIds: number[]
}

// Hot data
export interface IHotData {
  newCategories: INewCategory[]
  updatedCategories: IUpdatedCategory[]
  deletedCategories: IDeletedCategory[]
}
