import logo from './logo.svg';
import './App.css';
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeRoute from "./routes/Home";
import {Container} from 'react-bootstrap'

import ProductDetailRoute from './routes/Product'
import { BrowserRouter as Router, Route } from 'react-router-dom'

const App = () => {
    return (
        <Router>
                <Header/>
            <main className={'py-3'}>
                <Container>
                <Route path='/' component={HomeRoute} exact />
                <Route path='/product/:id' component={ProductDetailRoute} exact />
                </Container>

            </main>
                <Footer/>
        </Router>
    );
}

export default App;
