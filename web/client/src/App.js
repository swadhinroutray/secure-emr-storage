import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './routes/AppRouter';
import { Provider } from 'mobx-react';
import loginStore from './models/loginModel';

function App() {
	return (
		<BrowserRouter>
			<Provider loginStore={loginStore}>
				<AppRouter />
			</Provider>
		</BrowserRouter>
	);
}
export default App;
