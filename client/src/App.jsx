import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import TaskManager from './components/task-manager';

function App() {


  return (
    <RecoilRoot>
      <TaskManager />
    </RecoilRoot>
  )
}

export default App
