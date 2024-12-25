import { useState, type ReactElement } from "react";

import { INewCategory, IUpdatedCategory, IUpdatedSubCategory, TNewSubCategory, IHotData } from '../types';
import { CategoriesHotContext } from "./CategoriesHotContext";

export const CategoriesHotProvider = (props: {
  children: ReactElement
}) => {
  const [hotData, setHotData] = useState<IHotData>({
    newCategories: [],
    updatedCategories: [],
    deletedCategories: [],
  });

  // Categories
  const addCategory = (category: INewCategory) => {
    setHotData((prev) => ({
      ...prev,
      newCategories: [...prev.newCategories, category],
    }));
  };

  const updateCategory = (category: IUpdatedCategory) => {
    setHotData((prev) => ({
      ...prev,
      updatedCategories: [...prev.updatedCategories.filter((c) => c.id !== category.id), category],
    }));
  };

  const deleteCategory = (id: number, isNew: boolean) => {
    if (isNew) {
      setHotData((prev) => ({
        ...prev,
        newCategories: prev.newCategories.filter((c) => c.tempId !== id),
      }));
    } else {
      setHotData((prev) => ({
        ...prev,
        deletedCategories: [...prev.deletedCategories, { id }],
      }));
    }
  };

  const restoreCategory = (id: number) => {
    setHotData((prev) => ({
      ...prev,
      deletedCategories: prev.deletedCategories.filter((c) => c.id !== id),
    }));
  };

  // SubCategories
  const addSubCategory = (category: INewCategory | IUpdatedCategory, subCategory: TNewSubCategory, isCategoryNew: boolean) => {
    if (isCategoryNew) {
      setHotData((prev) => ({
        ...prev,
        newCategories: prev.newCategories.map((c) => {
          if (c.tempId !== (category as INewCategory).tempId) return c;

          return ({
            ...c,
            subCategories: [...c.subCategories, subCategory],
          });
        })
      }));
    } else {
      setHotData((prev) => ({
        ...prev,
        updatedCategories: [
          ...prev.updatedCategories.filter((c) => c.id !== (category as IUpdatedCategory).id),
          {
            ...(category as IUpdatedCategory),
            newSubCategories: [...(category as IUpdatedCategory).newSubCategories, subCategory]
          },
        ],
      }));
    }
  };

  const updateSubCategory = (category: INewCategory | IUpdatedCategory, subCategory: IUpdatedSubCategory, isCategoryNew: boolean) => {

    if (isCategoryNew) {
      setHotData((prev) => ({
        ...prev,
        newCategories: prev.newCategories.map((c) => {
          if (c.tempId !== (category as INewCategory).tempId) return c;


          return ({
            ...c,
            subCategories: [
              ...c.subCategories.filter((s) => s.tempId !== subCategory.id),
              {
                tempId: subCategory.id,
                name: subCategory.name,
                filmIds: subCategory.filmIds,
              },
            ]
          });
        }),
      }));
    } else {
      setHotData((prev) => {
        return {
          ...prev,
          updatedCategories: [
            ...prev.updatedCategories.filter((c) => c.id !== (category as IUpdatedCategory).id),
            {
              ...(category as IUpdatedCategory),
              updatedSubCategories: [
                ...(category as IUpdatedCategory).updatedSubCategories.filter((s) => s.id !== subCategory.id),
                subCategory
              ],
            },
          ],
        };
      });
    }
  };

  const deleteSubCategory = (category: INewCategory | IUpdatedCategory, id: number, isCategoryNew: boolean, isNew: boolean) => {
    if (isCategoryNew) {
      setHotData((prev) => ({
        ...prev,
        newCategories: prev.newCategories.map((c) => {
          if (c.tempId !== (category as INewCategory).tempId) return c;

          return ({
            ...c,
            subCategories: c.subCategories.filter((s) => s.tempId !== id)
          });
        }),
      }));
    } else {
      if (isNew) {
        setHotData((prev) => ({
          ...prev,
          updatedCategories: [
            ...prev.updatedCategories.filter((c) => c.id !== (category as IUpdatedCategory).id),
            {
              ...(category as IUpdatedCategory),
              newSubCategories: (category as IUpdatedCategory).newSubCategories.filter((s) => s.tempId !== id)
            }
          ]
        }));
      } else {
        setHotData((prev) => ({
          ...prev,
          updatedCategories: [
            ...prev.updatedCategories.filter((c) => c.id !== (category as IUpdatedCategory).id),
            {
              ...(category as IUpdatedCategory),
              deletedSubCategories: [...(category as IUpdatedCategory).deletedSubCategories, { id: id }]
            }
          ]
        }));
      }
    }
  };

  const restoreSubCategory = (categoryId: number, subCategoryId: number) => {
    setHotData((prev) => ({
      ...prev,
      updatedCategories: [
        ...prev.updatedCategories.map((c) => {
          if (c.id !== categoryId) return c;

          return ({
            ...c,
            deletedSubCategories: c.deletedSubCategories.filter((s) => s.id !== subCategoryId)
          });
        })
      ],
    }));
  };

  const values = {
    hotData,
    // Category
    addCategory,
    updateCategory,
    deleteCategory,
    restoreCategory,
    // SubCategory
    addSubCategory,
    deleteSubCategory,
    restoreSubCategory,
    updateSubCategory,
  };

  return <CategoriesHotContext.Provider value={values} {...props} />;
};