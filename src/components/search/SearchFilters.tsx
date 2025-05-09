
import React from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';

interface SearchFiltersProps {
  categories: string[];
  selectedCategories: string[];
  onCategoryChange: (category: string) => void;
  priceRange: [number, number];
  selectedPriceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  formats: string[];
  selectedFormats: string[];
  onFormatChange: (format: string) => void;
  onResetFilters: () => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  categories,
  selectedCategories,
  onCategoryChange,
  priceRange,
  selectedPriceRange,
  onPriceRangeChange,
  formats,
  selectedFormats,
  onFormatChange,
  onResetFilters
}) => {
  return (
    <div className="bg-muted/30 rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">Filters</h3>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onResetFilters}
        >
          Reset
        </Button>
      </div>
      
      <div className="space-y-4">
        {/* Categories filter */}
        <div>
          <h4 className="text-sm font-medium mb-2">Categories</h4>
          <div className="space-y-1">
            {categories.map((category) => (
              <div key={category} className="flex items-center">
                <Button
                  variant="ghost"
                  size="sm"
                  className="justify-start px-2 py-1 h-auto text-sm"
                  onClick={() => onCategoryChange(category)}
                >
                  <span className="mr-2 h-4 w-4 rounded border flex items-center justify-center">
                    {selectedCategories.includes(category) && <Check className="h-3 w-3" />}
                  </span>
                  <span>{category}</span>
                </Button>
              </div>
            ))}
          </div>
        </div>
        
        <Separator />
        
        {/* Price range filter */}
        <div>
          <h4 className="text-sm font-medium mb-2">Price Range</h4>
          <div className="px-2">
            <Slider
              defaultValue={selectedPriceRange}
              min={priceRange[0]}
              max={priceRange[1]}
              step={1}
              onValueChange={(value) => onPriceRangeChange(value as [number, number])}
              className="my-6"
            />
            <div className="flex justify-between text-sm">
              <span>${selectedPriceRange[0]}</span>
              <span>${selectedPriceRange[1]}</span>
            </div>
          </div>
        </div>
        
        <Separator />
        
        {/* Format filter */}
        <div>
          <h4 className="text-sm font-medium mb-2">Format</h4>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="w-full justify-between">
                Format
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-52">
              {formats.map((format) => (
                <DropdownMenuCheckboxItem
                  key={format}
                  checked={selectedFormats.includes(format)}
                  onCheckedChange={() => onFormatChange(format)}
                >
                  {format}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
