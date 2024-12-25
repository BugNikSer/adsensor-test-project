import { ThemeProvider } from '@mui/material/styles';
import { darkTheme } from './utils/theme';
import { CategoryList } from './Category';
import { Layout } from './Layout';

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Layout>
        <CategoryList />
      </Layout>
      
    </ThemeProvider>
  )
}

export default App
