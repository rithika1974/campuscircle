import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface AddProductModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (product: any) => void;
}

export const AddProductModal = ({ open, onClose, onAdd }: AddProductModalProps) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (!name || !price) {
      toast.error("Please fill in all required fields");
      return;
    }

    onAdd({
      name,
      price: parseInt(price),
      description,
      seller: "You",
      image: "/placeholder.svg",
    });

    toast.success("Product added successfully!");
    setName("");
    setPrice("");
    setDescription("");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Product</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Item Name *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Engineering Textbook"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="price">Price (₹) *</Label>
            <Input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="e.g., 500"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your item..."
              rows={3}
            />
          </div>
          
          <Button onClick={handleSubmit} className="w-full">
            Add Product
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
