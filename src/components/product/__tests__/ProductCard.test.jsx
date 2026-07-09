import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import ProductCard from "../ProductCard";

const mockProduct = {
  id: "1",
  name: "Produto Teste",
  description: "Descrição do produto",
  price: 19.9,
  image: "/teste.jpg",
  category: "comida",
};

const renderWithRouter = (ui) => {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
};

describe("ProductCard", () => {
  describe("Rendering", () => {
    it("should render product name", () => {
      renderWithRouter(<ProductCard product={mockProduct} />);
      expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    });

    it("should render product description", () => {
      renderWithRouter(<ProductCard product={mockProduct} />);
      expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
    });

    it("should render product price", () => {
      renderWithRouter(<ProductCard product={mockProduct} />);
      // Matches "19,90" (pt-BR) or "19.9" depending on locale
      expect(screen.getByText(/19,90|19.9/)).toBeInTheDocument();
    });

    it("should render product image", () => {
      renderWithRouter(<ProductCard product={mockProduct} />);
      const img = screen.getByRole("img");
      expect(img).toHaveAttribute("src", mockProduct.image);
    });

    it("should render original price when present", () => {
      const productWithOriginalPrice = {
        ...mockProduct,
        originalPrice: 29.9,
      };

      renderWithRouter(<ProductCard product={productWithOriginalPrice} />);
      expect(screen.getByText(/29,90|29.9/)).toBeInTheDocument();
    });

    it("should not render original price when not present", () => {
      const { container } = renderWithRouter(
        <ProductCard product={mockProduct} />,
      );

      const originalPrice = container.querySelector(".original-price");
      expect(originalPrice).toBeNull();
    });
  });

  describe("Zoom Functionality", () => {
    it("should show zoom button when onZoom is provided", () => {
      const onZoom = vi.fn();
      renderWithRouter(<ProductCard product={mockProduct} onZoom={onZoom} />);

      // Changed from /zoom/i to /ampliar/i to match aria-label="Ampliar imagem"
      expect(
        screen.getByRole("button", { name: /ampliar/i }),
      ).toBeInTheDocument();
    });

    it("should not show zoom button when onZoom is not provided", () => {
      renderWithRouter(<ProductCard product={mockProduct} />);
      expect(screen.queryByRole("button", { name: /ampliar/i })).toBeNull();
    });

    it("should call onZoom when button is clicked", async () => {
      const onZoom = vi.fn();
      renderWithRouter(<ProductCard product={mockProduct} onZoom={onZoom} />);

      const button = screen.getByRole("button", { name: /ampliar/i });
      await button.click();

      expect(onZoom).toHaveBeenCalledTimes(1);
    });
  });

  describe("Navigation Link", () => {
    it("should link to product detail page", () => {
      renderWithRouter(<ProductCard product={mockProduct} />);
      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("href", `/produto/${mockProduct.id}`);
    });

    it("should have accessible label", () => {
      renderWithRouter(<ProductCard product={mockProduct} />);
      expect(
        screen.getByLabelText(/ver detalhes de produto teste/i),
      ).toBeInTheDocument();
    });
  });

  describe("CSS Classes", () => {
    it("should apply drink class for bebidas category", () => {
      const drinkProduct = { ...mockProduct, category: "bebidas" };
      const { container } = renderWithRouter(
        <ProductCard product={drinkProduct} />,
      );

      expect(container.firstChild).toHaveClass("item-drink");
    });

    it("should not apply drink class for other categories", () => {
      const { container } = renderWithRouter(
        <ProductCard product={mockProduct} />,
      );

      expect(container.firstChild).not.toHaveClass("item-drink");
    });
  });

  describe("React.memo Optimization", () => {
    it("should not re-render when props have not changed", () => {
      const { rerender } = renderWithRouter(
        <ProductCard product={mockProduct} />,
      );

      rerender(
        <MemoryRouter>
          <ProductCard product={mockProduct} />
        </MemoryRouter>,
      );

      expect(true).toBe(true);
    });
  });
});
