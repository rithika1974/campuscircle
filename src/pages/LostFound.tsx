import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Plus, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AddLostFoundModal } from "@/components/AddLostFoundModal";
import { ChatModal } from "@/components/ChatModal";
import lostItemImg from "@/assets/lost-item-sample.png";

const sampleLostItems = [
  {
    id: 1,
    name: "Black Water Bottle",
    description: "Lost near library on 5th floor",
    reporter: "Arun",
    image: lostItemImg,
    type: "lost",
  },
  {
    id: 2,
    name: "Blue Notebook",
    description: "Engineering notes inside",
    reporter: "Meera",
    image: lostItemImg,
    type: "lost",
  },
];

const sampleFoundItems = [
  {
    id: 3,
    name: "Student ID Card",
    description: "Found near cafeteria",
    reporter: "Security Office",
    image: lostItemImg,
    type: "found",
  },
];

const LostFound = () => {
  const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [lostItems, setLostItems] = useState(sampleLostItems);
  const [foundItems, setFoundItems] = useState(sampleFoundItems);

  const handleAddItem = (item: any) => {
    if (item.type === "lost") {
      setLostItems([...lostItems, { ...item, id: lostItems.length + 1 }]);
    } else {
      setFoundItems([...foundItems, { ...item, id: foundItems.length + 1 }]);
    }
  };

  const ItemCard = ({ item }: { item: any }) => (
    <div 
      onClick={() => {
        setSelectedItem(item);
        setShowChatModal(true);
      }}
      className="bg-card rounded-xl shadow-[var(--card-shadow)] hover:shadow-[var(--card-hover-shadow)] transition-all overflow-hidden cursor-pointer"
    >
      <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="font-semibold text-foreground mb-2">{item.name}</h3>
        <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
        <p className="text-sm text-primary font-medium">Reporter: {item.reporter}</p>
      </div>
    </div>
  );

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

          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-foreground">Lost & Found</h1>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-primary hover:bg-accent text-primary-foreground px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Plus className="h-5 w-5" />
              Report Item
            </button>
          </div>

          <Tabs defaultValue="lost" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
              <TabsTrigger value="lost">Lost Items</TabsTrigger>
              <TabsTrigger value="found">Found Items</TabsTrigger>
            </TabsList>
            
            <TabsContent value="lost">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {lostItems.map((item) => (
                  <ItemCard key={item.id} item={item} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="found">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {foundItems.map((item) => (
                  <ItemCard key={item.id} item={item} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <AddLostFoundModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddItem}
      />

      {selectedItem && (
        <ChatModal
          open={showChatModal}
          onClose={() => setShowChatModal(false)}
          itemName={selectedItem.name}
          otherUser={selectedItem.reporter}
        />
      )}
    </div>
  );
};

export default LostFound;
