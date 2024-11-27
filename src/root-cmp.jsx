import './assets/main.scss'

import { Provider } from 'react-redux';
import { store } from './store/store';
import TodoIndex from './components/TodoIndex';

export default function App() {

  return <Provider store={store}>
    <TodoIndex />
  </Provider>
}
