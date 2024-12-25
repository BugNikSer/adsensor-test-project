import EditIcon from '@mui/icons-material/Edit';
import { Chip, IconButton, ListItem, Stack, Typography } from '@mui/material';
import { useMemo, useState } from 'react';

import { ICategory } from '../api/categories';
import { useCategoriesContext } from '../context/CategoriesHotContext';
import CategoryEditDialog from '../CategoryForm/CategoryEditDialog';

const CategoryItem = ({
  category,
}: {
  category: ICategory
  isNew: boolean
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const { hotData } = useCategoriesContext();

  const currentData = useMemo(() => {
    const updated = hotData.updatedCategories.find((cat) => cat.id === category?.id);
    const isDeleted = hotData.deletedCategories.some((cat) => cat.id === category?.id);

    return {
      id: category.id,
      name: updated?.name || category.name,
      subCategories: category.subCategories,
      newSubCategories: updated?.newSubCategories || [],
      updatedSubCategories: updated?.updatedSubCategories || [],
      deletedSubCategories: updated?.deletedSubCategories || [],
      isDeleted,
    };
  }, [hotData.updatedCategories, hotData.deletedCategories, category]);

  const secondaryAction = <IconButton aria-label="edit" onClick={() => setIsOpen(true)}><EditIcon /></IconButton>;

  return (
    <ListItem
      divider
      secondaryAction={secondaryAction}
    >
      <Stack direction="column" spacing={1}>
        <Typography variant='subtitle1' sx={{ textDecoration: currentData.isDeleted ? 'line-through' : undefined }}>
          {currentData.name}
        </Typography>
        <Stack direction="row" spacing={1}>
          {category.subCategories.map((subcategory) => (
            <Chip key={subcategory.id} label={subcategory.name} size="small" />
          ))}
        </Stack>
        <CategoryEditDialog partialCategory={currentData} isOpen={isOpen} closeForm={() => setIsOpen(false)} />
      </Stack>
    </ListItem>
  );
};

export default CategoryItem;
