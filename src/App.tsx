
// App.tsx

// import { Provider } from 'react-redux';
// import { store } from './redux';
import { Toaster } from '@/components/ui/toaster';
import { AppRouter } from './routes/AppRouter';

function App() {
  return (
    <>
      {/* <Provider store={store}> */}
        <AppRouter />
        <Toaster />
      {/* </Provider> */}
    </>

  );
}

export default App;