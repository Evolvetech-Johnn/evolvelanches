import React from "react";
import { useProducts } from "../../contexts/ProductContext";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, Plus, Search, Edit, Trash } from "lucide-react";

const Inventory = () => {
  const { products, deleteProduct } = useProducts();
  const navigate = useNavigate();

  const handleDelete = (id) => {
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      deleteProduct(id);
    }
  };

  return (
    <div>
      <div className="section-header-admin">
        <h1>Gerenciar Itens do Cardápio</h1>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => navigate("/admin/produtos/novo")}
        >
          <Plus size={16} /> Novo Produto
        </button>
      </div>

      <div
        className="admin-section"
        style={{
          background: "var(--bg-card)",
          padding: "1.5rem",
          borderRadius: "var(--radius-lg)",
          border: "1px solid var(--color-accent)",
        }}
      >
        <div style={{ marginBottom: "1.5rem", position: "relative" }}>
          <Search
            size={20}
            style={{
              position: "absolute",
              left: "1rem",
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--text-secondary)",
            }}
          />
          <input
            type="text"
            placeholder="Buscar produto..."
            style={{
              width: "100%",
              padding: "0.75rem 1rem 0.75rem 3rem",
              background: "var(--bg-input)",
              border: "1px solid var(--color-accent)",
              borderRadius: "var(--radius-md)",
              color: "var(--text-main)",
            }}
          />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "1rem",
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              style={{
                background: "var(--bg-body)",
                padding: "1rem",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--color-accent)",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "start",
                }}
              >
                <h4 style={{ color: "var(--text-main)", margin: 0 }}>
                  {product.name}
                </h4>
                <span
                  style={{
                    fontSize: "0.75rem",
                    padding: "0.2rem 0.5rem",
                    borderRadius: "1rem",
                    background: "var(--bg-input)",
                    color: "var(--text-secondary)",
                  }}
                >
                  {product.category}
                </span>
              </div>

              <p
                style={{
                  fontSize: "0.9rem",
                  color: "var(--text-secondary)",
                  flex: 1,
                }}
              >
                {product.description?.substring(0, 50)}...
              </p>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "0.5rem",
                }}
              >
                <span
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: "bold",
                    color: "var(--color-primary)",
                  }}
                >
                  R$ {product.price.toFixed(2)}
                </span>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button
                    className="btn btn-outline btn-sm"
                    style={{ padding: "0.4rem" }}
                    onClick={() =>
                      navigate(`/admin/produtos/editar/${product.id}`)
                    }
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    className="btn btn-outline btn-sm"
                    style={{
                      padding: "0.4rem",
                      borderColor: "#ef4444",
                      color: "#ef4444",
                    }}
                    onClick={() => handleDelete(product.id)}
                  >
                    <Trash size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Inventory;
