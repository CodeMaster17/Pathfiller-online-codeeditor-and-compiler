import './App.css'
import { Alert } from './components/ui/alert'
import { Button } from './components/ui/button'
import { Provider } from 'react-redux'
import { store } from './redux/store'
function App() {

  return (
    <Provider store={store}>
      <Button>
        Button
      </Button>
      <Alert />
    </Provider>
  )
}

export default App
