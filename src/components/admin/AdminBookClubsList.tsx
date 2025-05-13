
import React, { useState } from 'react';
import { Users, Trash2, Calendar, Book, Edit } from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

// Mock data for book clubs - in a real app, this would come from an API
const mockBookClubs = [
  {
    id: 'mystery-lovers',
    name: 'Mystery Lovers Club',
    description: 'A club for fans of mystery and detective novels.',
    members: 24,
    currentBook: 'The Hound of the Baskervilles',
    nextMeetingDate: '2025-05-25T18:00:00',
    isPublic: true,
  },
  {
    id: 'sci-fi-explorers',
    name: 'Sci-Fi Explorers',
    description: 'Exploring new worlds and technologies through science fiction literature.',
    members: 18,
    currentBook: 'Dune',
    nextMeetingDate: '2025-05-20T19:00:00',
    isPublic: true,
  },
  {
    id: 'classic-literature',
    name: 'Classic Literature Society',
    description: 'Appreciating the timeless themes and artistry of classic literature.',
    members: 32,
    currentBook: 'Pride and Prejudice',
    nextMeetingDate: '2025-05-28T17:30:00',
    isPublic: false,
  },
];

const AdminBookClubsList = () => {
  const [bookClubs, setBookClubs] = useState(mockBookClubs);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [clubToDelete, setClubToDelete] = useState<string | null>(null);
  const { toast } = useToast();

  const filteredClubs = bookClubs.filter(club => 
    club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    club.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteClub = (clubId: string) => {
    setClubToDelete(clubId);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (clubToDelete) {
      setBookClubs(bookClubs.filter(club => club.id !== clubToDelete));
      toast({
        title: "Book club deleted",
        description: "The book club has been successfully removed.",
      });
      setDeleteConfirmOpen(false);
      setClubToDelete(null);
    }
  };

  return (
    <div>
      <Card className="mb-8">
        <CardHeader className="pb-3">
          <CardTitle>Manage Book Clubs</CardTitle>
          <CardDescription>
            View, edit, and remove book clubs from the platform.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex mb-4">
            <Input
              placeholder="Search book clubs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>

          <div className="divide-y">
            {filteredClubs.length > 0 ? (
              filteredClubs.map((club) => (
                <div key={club.id} className="py-4 flex flex-col md:flex-row justify-between">
                  <div className="flex-1 mb-3 md:mb-0">
                    <div className="flex items-center mb-1">
                      <h3 className="font-medium text-lg">{club.name}</h3>
                      <span className={`ml-3 px-2 py-0.5 text-xs rounded-full ${club.isPublic ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                        {club.isPublic ? 'Public' : 'Private'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{club.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 mt-1">
                      <span className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {club.members} members
                      </span>
                      <span className="flex items-center">
                        <Book className="h-4 w-4 mr-1" />
                        Reading: {club.currentBook}
                      </span>
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        Next meeting: {new Date(club.nextMeetingDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2 self-center">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-1" /> Edit
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      onClick={() => handleDeleteClub(club.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" /> Delete
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <p className="py-4 text-center text-muted-foreground">No book clubs found matching your search criteria.</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this book club? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex space-x-2 justify-end">
            <Button variant="outline" onClick={() => setDeleteConfirmOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete Book Club
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminBookClubsList;
