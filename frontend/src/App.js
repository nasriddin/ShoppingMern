import logo from './logo.svg';
import './App.css';
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./routes/Home";

const App = () => {
    return (
        <>
            <main>
                <Header/>
                <Home />
                <Footer/>
            </main>
        </>
    );
}

export default App;
