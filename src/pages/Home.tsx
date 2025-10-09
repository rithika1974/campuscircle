import { Navigation } from "@/components/Navigation";
import { ShoppingBag, Search, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";

const features = [
  {
    title: "Marketplace",
    description: "Buy and sell items within the campus community",
    icon: ShoppingBag,
    path: "/marketplace",
    gradient: "from-blue-400 to-cyan-400",
  },
  {
    title: "Lost & Found",
    description: "Help reunite lost items with their owners",
    icon: Search,
    path: "/lost-found",
    gradient: "from-cyan-400 to-teal-400",
  },
  {
    title: "Feedback",
    description: "Share your thoughts and suggestions",
    icon: MessageSquare,
    path: "/feedback",
    gradient: "from-teal-400 to-blue-400",
  },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-3">
              Welcome to Campus Circle
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your one-stop platform for campus marketplace, lost & found, and community feedback
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <button
                  key={feature.title}
                  onClick={() => navigate(feature.path)}
                  className="group relative bg-card rounded-2xl p-8 shadow-[var(--card-shadow)] hover:shadow-[var(--card-hover-shadow)] transition-all duration-300 hover:scale-105 text-left"
                >
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    {feature.title}
                  </h2>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
