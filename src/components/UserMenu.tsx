
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

const UserMenu = () => {
  const { user, isAuthenticated, logout } = useAuth();
  
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
        <Button variant="ghost" size="sm" className="rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          <div className="flex flex-col">
            <p>{user?.name}</p>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuItem asChild>
          <Link to="/bookshelf" className="flex w-full cursor-pointer items-center">
            <Book className="mr-2 h-4 w-4" />
            My Bookshelf
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuItem asChild>
          <Link to="/wishlist" className="flex w-full cursor-pointer items-center">
            <BookHeart className="mr-2 h-4 w-4" />
            My Wishlist
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuItem asChild>
          <Link to="/book-clubs" className="flex w-full cursor-pointer items-center">
            <Users className="mr-2 h-4 w-4" />
            Book Clubs
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        {user?.isAdmin && (
          <DropdownMenuItem asChild>
            <Link to="/admin" className="flex w-full cursor-pointer items-center">
              <ShieldCheck className="mr-2 h-4 w-4" />
              Admin Dashboard
            </Link>
          </DropdownMenuItem>
        )}
        
        <DropdownMenuItem onClick={logout} className="text-red-500 cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
