
import { TextField, Card, IconButton, CardContent, Stack, CardActions, Chip } from '@mui/material';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const SubCategoryForm = ({
  name,
  filmIds,
  // deletedFilmIds,
  newFilmIds,
  isDeleted,
  handleChangeName,
  handleDeleteChange,
}: {
  name: string
  filmIds: number[]
  deletedFilmIds: number[]
  newFilmIds: number[]
  isDeleted: boolean
  handleChangeName: (val: string) => void
  handleDeleteChange: (val: boolean) => void
}) => {
  const handleDelete = () => handleDeleteChange(true);
  const handleRestore = () => handleDeleteChange(false);

  return (
    <Card>
      <CardContent sx={{ pb: 0 }}>
        <Stack direction="column" spacing={2}>
          <TextField label="Название" value={name} variant='standard' onChange={(e) => handleChangeName(e.target.value)} />
          <Stack direction="row" spacing={1} alignItems={'center'}>
            { filmIds.map((id) => <Chip key={id} label={id} />) }
            { newFilmIds.map((id) => <Chip key={id} label={id} color='info' />) }
            <IconButton color="primary" size='small'>
              <AddIcon />
            </IconButton>
          </Stack>
        </Stack>
      </CardContent>
      <CardActions sx={{ pt: 0 }}>
        <Stack direction="row" justifyContent='end' sx={{ width: '100%' }}>
          {
            isDeleted ? (
              <IconButton onClick={handleRestore} color='success'>
                <RestoreFromTrashIcon />
              </IconButton>
            ) : (
              <IconButton onClick={handleDelete} color='warning'>
                <DeleteIcon />
              </IconButton>
            )
          }
        </Stack>
      </CardActions>
    </Card>
  );
};

export default SubCategoryForm;
