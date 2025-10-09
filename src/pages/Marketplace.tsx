import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Plus, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AddProductModal } from "@/components/AddProductModal";
import productImg1 from "@/assets/product-sample-1.png";
import productImg2 from "@/assets/product-sample-2.png";

const sampleProducts = [
  {
    id: 1,
    name: "Engineering Textbook",
    price: 500,
    seller: "Rahul Kumar",
    image: productImg1,
  },
  {
    id: 2,
    name: "Laptop - Dell",
    price: 25000,
    seller: "Priya Sharma",
    image: productImg2,
  },
  {
    id: 3,
    name: "Study Desk",
    price: 1500,
    seller: "Amit Patel",
    image: productImg1,
  },
  {
    id: 4,
    name: "Calculator",
    price: 300,
    seller: "Sneha Singh",
    image: productImg2,
  },
];

const Marketplace = () => {
  const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);
  const [products, setProducts] = useState(sampleProducts);

  const handleAddProduct = (product: any) => {
    setProducts([...products, { ...product, id: products.length + 1 }]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Home
          </button>

          <h1 className="text-3xl font-bold text-foreground mb-8">Marketplace</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-card rounded-xl shadow-[var(--card-shadow)] hover:shadow-[var(--card-hover-shadow)] transition-all overflow-hidden"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-foreground mb-1">{product.name}</h3>
                  <p className="text-2xl font-bold text-primary mb-2">₹{product.price}</p>
                  <p className="text-sm text-muted-foreground">Seller: {product.seller}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <button
        onClick={() => setShowAddModal(true)}
        className="fixed bottom-8 right-8 w-14 h-14 bg-primary hover:bg-accent text-primary-foreground rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
      >
        <Plus className="h-6 w-6" />
      </button>

      <AddProductModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddProduct}
      />
    </div>
  );
};

export default Marketplace;
