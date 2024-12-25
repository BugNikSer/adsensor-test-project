import { Dialog, DialogContent, DialogActions, DialogTitle, IconButton, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import DeleteIcon from '@mui/icons-material/Delete';

import DialogTransition from '../utils/DialogTransition';
import { useCategoriesContext } from '../context/CategoriesHotContext';
import { IPartialCategory } from '../types';
import CategoryForm from './CategoryForm';

const CategoryEditDialog = ({
  partialCategory,
  isOpen,
  closeForm,
}: {
  partialCategory: IPartialCategory
  isOpen: boolean
  closeForm: () => void
}) => {
  const {
    deleteCategory,
    restoreCategory,
    updateCategory,
  } = useCategoriesContext();

  const theme = useTheme();

  const handleChangeName = (val: string) => {
    updateCategory({
      id: partialCategory.id,
      name: val,
      newSubCategories: partialCategory.newSubCategories,
      updatedSubCategories: partialCategory.updatedSubCategories,
      deletedSubCategories: partialCategory.deletedSubCategories,
    });
  };

  const handleDelete = () => {
    deleteCategory(partialCategory.id, false);
  };
  const handleRestore = () => {
    restoreCategory(partialCategory.id);
  };

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={isOpen}
      onClose={closeForm}
      TransitionComponent={DialogTransition}
      sx={{ boxShadow: partialCategory.isDeleted ? `0 0 0.3rem ${theme.palette.warning.main}` : undefined }}
    >
      <DialogTitle>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={4}
          sx={{ width: '100%', }}
        >
          <Typography variant="h6">Редактирование категории</Typography>

          <IconButton aria-label="close"onClick={closeForm}>
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>

      <DialogContent>
        <CategoryForm partialCategory={partialCategory} handleChangeName={handleChangeName} isNew={false} />
      </DialogContent>

      <DialogActions>
        {
          partialCategory.isDeleted ? (
            <IconButton onClick={handleRestore} color='success'>
              <RestoreFromTrashIcon />
            </IconButton>
          ) : (
            <IconButton onClick={handleDelete} color='warning'>
              <DeleteIcon />
            </IconButton>
          )
        }
      </DialogActions>
    </Dialog>
  );
};

export default CategoryEditDialog;
