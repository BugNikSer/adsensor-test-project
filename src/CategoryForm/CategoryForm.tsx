import { Stack, TextField } from '@mui/material';

import { IPartialCategory } from '../types';
import SubCategoryContainer from '../SubCategoryForm/SubCategoryContainer';
import SubCategoryAdd from '../SubCategoryForm/SubCategoryAdd';

const CategoryForm = ({
  partialCategory,
  isNew,
  handleChangeName,
}: {
  partialCategory: IPartialCategory
  isNew: boolean
  handleChangeName: (val: string) => void
}) => {

  return (
    <Stack spacing={1}>
      <TextField label="Название" variant="standard" value={partialCategory.name} onChange={(e) => handleChangeName(e.target.value)} />

      {
        partialCategory.subCategories.map((subCategory) => (
          <SubCategoryContainer
            key={subCategory.id}
            partialCategory={partialCategory}
            isCategoryNew={isNew}
            isNew={false}
            subCategory={subCategory}
          />
        ))
      }

      {
        partialCategory.newSubCategories.map((subCategory) => (
          <SubCategoryContainer
            key={subCategory.tempId}
            partialCategory={partialCategory}
            isCategoryNew={isNew}
            isNew={true}
            subCategory={{
              id: subCategory.tempId,
              name: subCategory.name,
              filmIds: [],
            }}
          />
        ))
      }

      <SubCategoryAdd partialCategory={partialCategory} isCategoryNew={isNew} />
    </Stack>
  );
};

export default CategoryForm;
