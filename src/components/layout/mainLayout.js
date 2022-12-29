import { Provider } from "react-redux";
import store from "../app/store";
import Footer from "../footer/footer";
import { Header } from "../header/header";

const MainLayout = ({ children }) => {
    return (
        <Provider store={store}>
            <div>
                <Header />
                {children}
                <Footer />
            </div>
        </Provider>
    );
};

export default MainLayout;