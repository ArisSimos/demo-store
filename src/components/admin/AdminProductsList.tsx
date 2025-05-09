
import React, { useState, useEffect } from 'react';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  Dialog, DialogContent, DialogDescription, DialogFooter, 
  DialogHeader, DialogTitle 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Pencil, Trash2, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Product } from "@/types";
import { 
  getAllProducts, 
  updateProducts, 
  getAllCategories
} from "@/data/productService";

const AdminProductsList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<{id: string, name: string}[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    setProducts(getAllProducts());
    setCategories(getAllCategories());
  }, []);

  const defaultProduct: Product = {
    id: String(Date.now()),
    name: "",
    price: 0,
    description: "",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "fiction",
    inStock: true,
    featured: false,
    author: "",
    publisher: "",
    publicationDate: "",
    isbn: "",
    pages: 0,
    format: "paperback"
  };

  const handleAddProduct = () => {
    setIsEditing(false);
    setCurrentProduct({ ...defaultProduct, id: String(Date.now()) });
    setIsDialogOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setIsEditing(true);
    setCurrentProduct({ ...product });
    setIsDialogOpen(true);
  };

  const handleDeleteClick = (product: Product) => {
    setCurrentProduct(product);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (currentProduct) {
      const updatedProducts = products.filter(p => p.id !== currentProduct.id);
      setProducts(updatedProducts);
      updateProducts(updatedProducts);
      
      toast({
        title: "Product deleted",
        description: `${currentProduct.name} has been removed.`
      });
      setIsDeleteDialogOpen(false);
    }
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentProduct) return;

    let updatedProducts: Product[];
    
    if (isEditing) {
      updatedProducts = products.map(p => p.id === currentProduct.id ? currentProduct : p);
      toast({
        title: "Product updated",
        description: `${currentProduct.name} has been updated.`
      });
    } else {
      updatedProducts = [...products, currentProduct];
      toast({
        title: "Product added",
        description: `${currentProduct.name} has been added.`
      });
    }
    
    setProducts(updatedProducts);
    updateProducts(updatedProducts);
    setIsDialogOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!currentProduct) return;
    
    const { name, value } = e.target;
    setCurrentProduct({
      ...currentProduct,
      [name]: name === "price" || name === "salePrice" || name === "pages" 
        ? value === "" ? undefined : parseFloat(value) 
        : value
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    if (!currentProduct) return;
    
    setCurrentProduct({
      ...currentProduct,
      [name]: value
    });
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    if (!currentProduct) return;
    
    setCurrentProduct({
      ...currentProduct,
      [name]: checked
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Products Management</h2>
        <Button onClick={handleAddProduct}>
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="flex items-center space-x-3">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="h-10 w-10 object-cover rounded" 
                  />
                  <div>
                    <div className="font-medium">{product.name}</div>
                    {product.author && <div className="text-xs text-muted-foreground">by {product.author}</div>}
                  </div>
                </TableCell>
                <TableCell>
                  {categories.find(c => c.id === product.category)?.name || product.category}
                </TableCell>
                <TableCell>
                  {product.salePrice ? (
                    <div>
                      <span className="font-medium">${product.salePrice.toFixed(2)}</span> 
                      <span className="text-xs line-through text-muted-foreground ml-1">
                        ${product.price.toFixed(2)}
                      </span>
                    </div>
                  ) : (
                    <span className="font-medium">${product.price.toFixed(2)}</span>
                  )}
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleEditProduct(product)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDeleteClick(product)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Add/Edit Product Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Edit Product' : 'Add New Product'}</DialogTitle>
            <DialogDescription>
              {isEditing 
                ? 'Make changes to the product details.' 
                : 'Fill in the details for the new product.'}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSaveProduct}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input 
                    id="name"
                    name="name"
                    value={currentProduct?.name || ''}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={currentProduct?.price || 0}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="salePrice">Sale Price ($) (Optional)</Label>
                  <Input
                    id="salePrice"
                    name="salePrice"
                    type="number"
                    step="0.01"
                    min="0"
                    value={currentProduct?.salePrice || ''}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select 
                    name="category"
                    value={currentProduct?.category || ''}
                    onValueChange={(value) => handleSelectChange("category", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="format">Format</Label>
                  <Select 
                    name="format"
                    value={currentProduct?.format || 'paperback'}
                    onValueChange={(value) => handleSelectChange("format", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="paperback">Paperback</SelectItem>
                        <SelectItem value="hardcover">Hardcover</SelectItem>
                        <SelectItem value="ebook">E-Book</SelectItem>
                        <SelectItem value="audiobook">Audiobook</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={currentProduct?.description || ''}
                    onChange={handleInputChange}
                    rows={4}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="author">Author</Label>
                  <Input
                    id="author"
                    name="author"
                    value={currentProduct?.author || ''}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div>
                  <Label htmlFor="publisher">Publisher</Label>
                  <Input
                    id="publisher"
                    name="publisher"
                    value={currentProduct?.publisher || ''}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div>
                  <Label htmlFor="isbn">ISBN</Label>
                  <Input
                    id="isbn"
                    name="isbn"
                    value={currentProduct?.isbn || ''}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div>
                  <Label htmlFor="pages">Pages</Label>
                  <Input
                    id="pages"
                    name="pages"
                    type="number"
                    min="0"
                    value={currentProduct?.pages || ''}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div>
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    name="image"
                    value={currentProduct?.image || ''}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="publicationDate">Publication Date</Label>
                  <Input
                    id="publicationDate"
                    name="publicationDate"
                    value={currentProduct?.publicationDate || ''}
                    onChange={handleInputChange}
                    placeholder="YYYY-MM-DD"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="inStock"
                    checked={currentProduct?.inStock || false}
                    onCheckedChange={(checked) => handleSwitchChange("inStock", checked)}
                  />
                  <Label htmlFor="inStock">In Stock</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="featured"
                    checked={currentProduct?.featured || false}
                    onCheckedChange={(checked) => handleSwitchChange("featured", checked)}
                  />
                  <Label htmlFor="featured">Featured Product</Label>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{currentProduct?.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminProductsList;
