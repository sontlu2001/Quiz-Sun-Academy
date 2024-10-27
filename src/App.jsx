import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import store from './store';
import Login from './pages/auth/Login/Login.jsx';
import PrivateRouter from './routers/PrivateRoute.jsx';
import Home from './pages/home/Home.jsx';
import Quiz from './pages/quiz/Quiz.jsx';
import Main from './layouts/Main.jsx';
import { ChakraProvider } from '@chakra-ui/react';
import QuizResult from './pages/quiz/QuizResult.jsx';

function App() {
  return (
    <>
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      <ChakraProvider>
        <Provider store={store}>
          <Routes>
            <Route element={<Main />}>
              <Route
                path="/"
                element={
                  <PrivateRouter>
                    <Home />
                  </PrivateRouter>
                }
              />
              <Route
                path="/quiz/:quizId"
                element={
                  <PrivateRouter>
                    <Quiz />
                  </PrivateRouter>
                }
              />
               <Route
                path="/quiz-result/:quizId"
                element={
                  <PrivateRouter>
                    <QuizResult />
                  </PrivateRouter>
                }
              />
            </Route>

            <Route path="/login" element={<Login />} />
          </Routes>
        </Provider>
      </ChakraProvider>
    </>
  );
}

export default App;
