import { Button } from "@mui/material";

import { useCategoriesContext } from '../context/CategoriesHotContext';
import { INewCategory, IUpdatedCategory, IPartialCategory } from '../types';

const SubCategoryAdd = ({
  partialCategory,
  isCategoryNew,
}: {
  partialCategory: IPartialCategory
  isCategoryNew: boolean
}) => {
  const { addSubCategory } = useCategoriesContext();

  const handleAdd = () => {
    const category = isCategoryNew
      ? {
        tempId: partialCategory.id,
        name: partialCategory.name,
        subCategories: partialCategory.newSubCategories,
      } as INewCategory
      : {
        id: partialCategory.id,
        name: partialCategory.name,
        newSubCategories: partialCategory.newSubCategories,
        updatedSubCategories: partialCategory.updatedSubCategories,
        deletedSubCategories: partialCategory.deletedSubCategories,
      } as IUpdatedCategory;
    addSubCategory(
      category,
      { tempId: Number(new Date()), name: '', filmIds: [] }, isCategoryNew
    );
  };

  return (
    <Button variant="contained" onClick={handleAdd}>Добавить</Button>
  );
};

export default SubCategoryAdd;
