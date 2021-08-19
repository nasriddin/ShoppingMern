import './App.css';
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeRoute from "./routes/Home";
import {Container} from 'react-bootstrap'

import ProductDetailRoute from './routes/Product'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import CartRoute from "./routes/Cart";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Profile from "./routes/Profile";
import Shipping from "./routes/Shipping";
import Payment from "./routes/Payment";
import PlaceOrder from "./routes/PlaceOrder";
import Order from "./routes/Order";
import UserList from "./routes/UserList";
import UserEdit from "./routes/UserEdit";
import ProductList from "./routes/ProductList";
import ProductEdit from "./routes/ProductEdit";
import OrderList from "./routes/OrderList";

const App = () => {
    return (
        <Router>
                <Header/>
            <main className={'py-3'}>
                <Container>
                <Route path='/' component={HomeRoute} exact />
                <Route path='/login' component={Login} exact />
                <Route path='/shipping' component={Shipping} exact />
                <Route path='/payment' component={Payment} exact />
                <Route path='/placeorder' component={PlaceOrder} exact />
                <Route path='/order/:id' component={Order} exact />
                <Route path='/register' component={Register} exact />
                <Route path='/profile' component={Profile} exact />
                <Route path='/admin/users-list' component={UserList} exact />
                <Route path='/admin/products-list' component={ProductList} exact />
                <Route path='/admin/orders-list' component={OrderList} exact />
                <Route path='/admin/user/:id/edit' component={UserEdit} exact />
                <Route path='/admin/product/:id/edit' component={ProductEdit} exact />
                <Route path='/product/:id' component={ProductDetailRoute} exact />
                <Route path='/cart/:id?' component={CartRoute} exact />
                </Container>

            </main>
                <Footer/>
        </Router>
    );
}

export default App;
