import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface ChatModalProps {
  open: boolean;
  onClose: () => void;
  itemName: string;
  otherUser: string;
}

interface Message {
  id: number;
  text: string;
  sender: "me" | "other";
  timestamp: Date;
}

export const ChatModal = ({ open, onClose, itemName, otherUser }: ChatModalProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm interested in this item.",
      sender: "me",
      timestamp: new Date(),
    },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (!newMessage.trim()) return;

    setMessages([
      ...messages,
      {
        id: messages.length + 1,
        text: newMessage,
        sender: "me",
        timestamp: new Date(),
      },
    ]);
    setNewMessage("");
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Chat about: {itemName}</DialogTitle>
          <p className="text-sm text-muted-foreground">Chatting with {otherUser}</p>
        </DialogHeader>

        <div className="flex flex-col h-[400px]">
          <div className="flex-1 overflow-y-auto space-y-4 p-4 bg-muted/30 rounded-lg">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg px-4 py-2 ${
                    message.sender === "me"
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border border-border"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2 mt-4">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your message..."
            />
            <Button onClick={handleSend} size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
