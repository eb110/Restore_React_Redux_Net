import { createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import { HomePage } from "../../features/home/HomePage";
import { AboutPage } from "../../features/about/AboutPage";
import { ContactPage } from "../../features/contact/ContactPage";
import { ProductDetails } from "../../features/catalog/ProductDetails";
import { Catalog } from "../../features/catalog/Catalog";
import { ServerError } from "../errors/ServerError";
import { NotFound } from "../errors/NotFound";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {path: '', element: <HomePage />},
            {path: 'about', element: <AboutPage />},
            {path: 'contact', element: <ContactPage />},
            {path: 'catalog/:id', element: <ProductDetails />},
            {path: 'catalog', element: <Catalog />},
            {path: 'server-error', element: <ServerError />},
            {path: 'not-found', element: <NotFound />},
            {path: '*', element: <NotFound />},
        ]
    }
])