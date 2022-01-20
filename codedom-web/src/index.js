import { ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import CharkaCreateRepositoryFrom from './pages/repository';
import CharkaAllRepositories from './pages/repository/all-repositories';
import CharkaRepositoryDetails from './pages/repository/repository-details';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <StrictMode>
    <ColorModeScript />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route
          path="create/repo"
          element={<CharkaCreateRepositoryFrom />}
        ></Route>
        <Route path="/repos" element={<CharkaAllRepositories />}></Route>
        <Route path="repos/:repoId" element={<CharkaRepositoryDetails />}></Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
