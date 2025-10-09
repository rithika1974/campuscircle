import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";

interface AddLostFoundModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (item: any) => void;
}

export const AddLostFoundModal = ({ open, onClose, onAdd }: AddLostFoundModalProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [contact, setContact] = useState("");
  const [type, setType] = useState("lost");

  const handleSubmit = () => {
    if (!name || !description || !contact) {
      toast.error("Please fill in all fields");
      return;
    }

    onAdd({
      name,
      description,
      contact,
      type,
      image: "/placeholder.svg",
    });

    toast.success(`${type === "lost" ? "Lost" : "Found"} item reported successfully!`);
    setName("");
    setDescription("");
    setContact("");
    setType("lost");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Report Lost/Found Item</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Item Status</Label>
            <RadioGroup value={type} onValueChange={setType}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="lost" id="lost" />
                <Label htmlFor="lost" className="font-normal cursor-pointer">Lost Item</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="found" id="found" />
                <Label htmlFor="found" className="font-normal cursor-pointer">Found Item</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="item-name">Item Name</Label>
            <Input
              id="item-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Black Water Bottle"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="item-description">Description</Label>
            <Textarea
              id="item-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the item and where it was lost/found..."
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="contact">Contact Information</Label>
            <Input
              id="contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="Your name and phone number"
            />
          </div>
          
          <Button onClick={handleSubmit} className="w-full">
            Report Item
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
