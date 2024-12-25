import { useMemo } from "react";

import { ISubCategory } from '../api/categories';
import { IPartialCategory, IPartialSubCategory } from '../types';
import SubCategoryForm from './SubCategoryForm';
import { useCategoriesContext } from '../context/CategoriesHotContext';

const SubCategoryContainer = ({
  partialCategory,
  isCategoryNew,
  isNew,
  subCategory,
}: {
  partialCategory: IPartialCategory
  isCategoryNew: boolean
  isNew: boolean
  subCategory: ISubCategory
}) => {
  const { updateSubCategory, deleteSubCategory, restoreSubCategory } = useCategoriesContext();

  const currentData = useMemo(() => {
    const updated = partialCategory.updatedSubCategories.find((cat) => cat.id === subCategory?.id);
    const isDeleted = partialCategory.deletedSubCategories.some((cat) => cat.id === subCategory?.id);

    return {
      categoryId: partialCategory.id,
      id: subCategory.id,
      name: updated?.name || subCategory.name,
      films: [],
      filmIds: subCategory.filmIds,
      newFilmIds: updated?.newFilmIds || [],
      updatedFilmIds: updated?.filmIds || [],
      deletedFilmIds: updated?.deletedFilmIds || [],
      isDeleted,
    } as IPartialSubCategory;
  }, [partialCategory, subCategory]);

  const handleChangeName = (val: string) => {
    updateSubCategory({
      id: partialCategory.id,
      name: partialCategory.name,
      newSubCategories: partialCategory.newSubCategories,
      updatedSubCategories: partialCategory.updatedSubCategories,
      deletedSubCategories: partialCategory.deletedSubCategories,
    }, {
      id: subCategory.id,
      name: val,
      filmIds: currentData.filmIds,
      newFilmIds: currentData.newFilmIds,
      deletedFilmIds: currentData.deletedFilmIds,
    }, isCategoryNew);
  };

  const handleDeleteChange = (isDeleting: boolean) => {
    if (isDeleting) deleteSubCategory(partialCategory, subCategory.id, isCategoryNew, isNew);
    else restoreSubCategory(partialCategory.id, subCategory.id);
  };

  return (
    <SubCategoryForm
      name={currentData.name}
      isDeleted={currentData.isDeleted}
      filmIds={currentData.filmIds}
      newFilmIds={currentData.newFilmIds}
      deletedFilmIds={currentData.deletedFilmIds}
      handleChangeName={handleChangeName}
      handleDeleteChange={handleDeleteChange}
    />
  );
};

export default SubCategoryContainer;