
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Book, BookOpen, Timer } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface ReadingProgressProps {
  bookId: string;
  totalPages?: number;
}

const ReadingProgress: React.FC<ReadingProgressProps> = ({ bookId, totalPages = 100 }) => {
  const [currentPage, setCurrentPage] = React.useState<number>(() => {
    const saved = localStorage.getItem(`reading-progress-${bookId}`);
    return saved ? parseInt(saved, 10) : 0;
  });
  const { toast } = useToast();
  
  const progressPercentage = Math.min(Math.round((currentPage / totalPages) * 100), 100);
  
  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPage = parseInt(e.target.value, 10) || 0;
    const validPage = Math.max(0, Math.min(newPage, totalPages));
    setCurrentPage(validPage);
    localStorage.setItem(`reading-progress-${bookId}`, validPage.toString());
    
    if (validPage === totalPages) {
      toast({
        title: "Congratulations!",
        description: "You've completed this book! 🎉",
      });
    }
  };

  return (
    <div className="space-y-4 p-4 bg-amber-50 rounded-md border border-amber-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <BookOpen className="h-5 w-5 text-amber-800" />
          <h3 className="font-medium text-amber-900">Reading Progress</h3>
        </div>
        <div className="text-sm font-medium text-amber-800">
          {progressPercentage}%
        </div>
      </div>
      
      <Progress value={progressPercentage} className="h-2 bg-amber-200" />
      
      <div className="flex items-center justify-between text-sm text-amber-700">
        <div className="flex items-center gap-1">
          <Book className="h-4 w-4" />
          <span>Page {currentPage} of {totalPages}</span>
        </div>
        <div className="flex items-center gap-1">
          <Timer className="h-4 w-4" />
          <span>~{Math.ceil((totalPages - currentPage) / 20)} days left</span>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <Label htmlFor="current-page" className="text-amber-800">Update progress:</Label>
        <Input 
          id="current-page"
          type="number"
          min="0"
          max={totalPages}
          value={currentPage}
          onChange={handleProgressChange}
          className="w-20 bg-white border-amber-300"
        />
      </div>
    </div>
  );
};

export default ReadingProgress;
