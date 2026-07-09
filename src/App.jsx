import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { CartProvider } from "./contexts/CartContext";
import { AuthProvider } from "./contexts/AuthContext";
import { OrderProvider } from "./contexts/OrderContext";
import { ProductProvider } from "./contexts/ProductContext";
import { StockProvider } from "./contexts/StockContext";
import { StoreProvider } from "./contexts/StoreContext";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Router>
      <StoreProvider>
        <StockProvider>
          <ProductProvider>
            <CartProvider>
              <AuthProvider>
                <OrderProvider>
                  <AppRoutes />
                  <Toaster
                    position="top-center"
                    toastOptions={{
                      style: {
                        background: "#1A1A1A",
                        color: "#fff",
                        border: "1px solid #333",
                      },
                      success: {
                        iconTheme: {
                          primary: "#F05A28",
                          secondary: "#fff",
                        },
                      },
                    }}
                  />
                </OrderProvider>
              </AuthProvider>
            </CartProvider>
          </ProductProvider>
        </StockProvider>
      </StoreProvider>
    </Router>
  );
}

export default App;
