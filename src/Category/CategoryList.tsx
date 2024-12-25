import { useState } from 'react';
import { Button, List, Stack, Typography } from '@mui/material';

import { ICategory } from '../api/categories';
import CategoryItem from './CategoryItem';
import CategoryCreateForm from '../CategoryForm/CategoryCreateDialog';
import { useCategoriesContext } from '../context/CategoriesHotContext';

const CategoryList = ({
  categories,
}: {
  categories: ICategory[]
}) => {
  const [open, setOpen] = useState(false);

  const { hotData } = useCategoriesContext();

  const hadlePrintClick = () => {
    console.log(hotData);
  };
  
  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={1}
        sx={{ width: '100%' }}
      >
        <Typography variant="h5">Категории</Typography>
        <Button variant="contained" onClick={() => setOpen(true)}>Создать категорию</Button>
      </Stack>

      <List sx={{ width: '100%', flex: 1 }}>
        {
          categories?.map((category) => (
            <CategoryItem
              key={category.id}
              category={category}
              isNew={false}
            />
          ))
        }

        {
          hotData.newCategories.map((category) => (
            <CategoryItem
              key={category.tempId}
              category={{ name: category.name, subCategories: [], id: category.tempId }}
              isNew
            />
          ))
        }

        {/* {hotData.newCategories.map((category) => JSON.stringify(category))} */}
      </List>

      <Stack direction='row' spacing={1} sx={{ width: '100%' }} alignItems='center' justifyContent='end'>
        <Button variant="contained" onClick={hadlePrintClick}>Консоль</Button>
      </Stack>

      <CategoryCreateForm open={open} closeForm={() => setOpen(false)} />
    </>
  );
};

export default CategoryList;