import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton, Stack, Typography, DialogActions, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import DialogTransition from '../utils/DialogTransition';
import CategoryForm from './CategoryForm';
import { useCategoriesContext } from '../context/CategoriesHotContext';
import { IPartialCategory } from '../types';

const CategoryCreateForm = ({
  open,
  closeForm,
}: {
  open: boolean
  closeForm: () => void
}) => {
  const { addCategory } = useCategoriesContext();

  const defaultData = {
    id: 0,
    name: '',
    isDeleted: false,
    subCategories: [],
    updatedSubCategories: [],
    deletedSubCategories: [],
  };

  const [category, setCategory] = useState<IPartialCategory>(JSON.parse(JSON.stringify(defaultData)));

  const handleSaveClick = () => {
    if (!category.name) return;
    addCategory({
      name: category.name,
      subCategories: [],
      tempId: Number(new Date()),
    });
    setCategory(JSON.parse(JSON.stringify(defaultData)));
    closeForm();
  };

  const handleChangeName = (val: string) => {
    setCategory((prev) => ({ ...prev, name: val }));
  };
  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={open}
      onClose={closeForm}
      TransitionComponent={DialogTransition}
    >
      <DialogTitle>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={4}
          sx={{ width: '100%', }}
        >
          <Typography variant="h6">Создать новую категорию</Typography>

          <IconButton aria-label="close"onClick={closeForm}>
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <CategoryForm partialCategory={category} handleChangeName={handleChangeName} isNew={true} />
      </DialogContent>

      <DialogActions>
        <Button onClick={handleSaveClick} color="success">Сохранить</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CategoryCreateForm;