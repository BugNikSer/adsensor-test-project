import { createContext, useContext } from "react";

import { INewCategory, IUpdatedCategory, IUpdatedSubCategory, TNewSubCategory, IHotData } from '../types';

export const CategoriesHotContext = createContext<{
  hotData: IHotData,
  // Categories
  addCategory: (category: INewCategory) => void,
  updateCategory: (category: IUpdatedCategory) => void,
  deleteCategory: (id: number, isNew: boolean) => void,
  restoreCategory: (id: number) => void
  // SubCategories
  addSubCategory: (category: INewCategory | IUpdatedCategory, subCategory: TNewSubCategory, isCategoryNew: boolean) => void
  deleteSubCategory: (category: INewCategory | IUpdatedCategory, id: number, isCategoryNew: boolean, isNew: boolean) => void
  restoreSubCategory: (categoryId: number, subCategoryId: number) => void
  updateSubCategory: (category: INewCategory | IUpdatedCategory, subCategory: IUpdatedSubCategory, isCategoryNew: boolean) => void
}>({
  hotData: { newCategories: [], updatedCategories: [], deletedCategories: [] },
  // Categories
  addCategory: () => { },
  updateCategory: () => { },
  deleteCategory: () => { },
  restoreCategory: () => { },
  // SubCategories
  addSubCategory: () => { },
  deleteSubCategory: () => { },
  restoreSubCategory: () => { },
  updateSubCategory: () => { },
});



export const useCategoriesContext = () => {
  return useContext(CategoriesHotContext);
};
