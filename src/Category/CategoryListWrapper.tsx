import { getAll } from '../api/categories';
import ApiHandler from '../utils/ApiHandler';
import useApi from '../utils/useApi';
import CategoryList from './CategoryList';
import { CategoriesHotProvider } from '../context/CategoriesHotProvider';

const CategoryListWrapper = () => {
  const { data: categories, error, loading, refresh: refreshCategories } = useApi(getAll);

  return (
    <CategoriesHotProvider>
      <ApiHandler loading={loading} error={error} refresh={refreshCategories}>
        <CategoryList categories={categories || []} />
      </ApiHandler>
    </CategoriesHotProvider>
  );
};

export default CategoryListWrapper;
