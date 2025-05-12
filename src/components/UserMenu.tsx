
import React from "react";
import { Link } from "react-router-dom";
import { User, LogOut, ShieldCheck, BookHeart, Book, Users } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";

const UserMenu = () => {
  const { user, isAuthenticated, logout } = useAuth();
  
  const handleLogout = () => {
    logout();
    toast.success("Successfully logged out");
  };
  
  if (!isAuthenticated) {
    return (
      <Button variant="ghost" size="sm" asChild>
        <Link to="/login" className="flex items-center">
          <User className="h-5 w-5 mr-2" />
          <span>Login</span>
        </Link>
      </Button>
    );
  }
  
  const initials = user?.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
    
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="rounded-full relative hover:bg-primary/10 transition-colors"
          aria-label="User menu"
        >
          <Avatar className="h-8 w-8 border-2 border-primary/20">
            <AvatarFallback className="bg-primary/10 text-primary">{initials}</AvatarFallback>
          </Avatar>
          <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-background"></span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col">
            <p className="font-medium">{user?.name}</p>
            <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuItem asChild>
          <Link to="/bookshelf" className="flex w-full cursor-pointer items-center transition-colors">
            <Book className="mr-2 h-4 w-4" />
            My Bookshelf
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuItem asChild>
          <Link to="/wishlist" className="flex w-full cursor-pointer items-center transition-colors">
            <BookHeart className="mr-2 h-4 w-4" />
            My Wishlist
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuItem asChild>
          <Link to="/book-clubs" className="flex w-full cursor-pointer items-center transition-colors">
            <Users className="mr-2 h-4 w-4" />
            Book Clubs
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        {user?.isAdmin && (
          <DropdownMenuItem asChild>
            <Link to="/admin" className="flex w-full cursor-pointer items-center transition-colors">
              <ShieldCheck className="mr-2 h-4 w-4" />
              Admin Dashboard
            </Link>
          </DropdownMenuItem>
        )}
        
        <DropdownMenuItem onClick={handleLogout} className="text-red-500 cursor-pointer focus:text-red-500 focus:bg-red-50">
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
