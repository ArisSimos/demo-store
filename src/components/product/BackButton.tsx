
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BackButton: React.FC = () => {
  return (
    <Button
      variant="ghost" 
      size="sm"
      asChild
      className="mb-4 md:hidden"
    >
      <Link to="/">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Books
      </Link>
    </Button>
  );
};

export default BackButton;
