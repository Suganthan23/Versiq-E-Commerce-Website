import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import productsData from "../data/products.json";
import AnimatedProductCard from '../components/AnimatedProductCard';
import Container from '@/components/Container';
import { Checkbox } from "@/components/ui/checkbox";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';
import { Search, SlidersHorizontal } from 'lucide-react';
import ProductGridSkeleton from '@/components/ProductGridSkeleton';
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const filterOptions = {
  pattern: ["Solid", "Printed", "Checked", "Striped", "Crochet"],
  color: ["Green", "Plum", "Charcoal", "Orange", "Blue", "Red", "Beige", "Black", "Brown", "White", "Yellow", "Pink", "Rose", "Lavender", "Burgundy", "Dark Green", "Taupe"],
  arrival: [{ label: "New", value: "New" }, { label: "Old", value: "Old" }],
};

const FiltersPanel = ({ filters, handleFilterChange, clearFilters, sortOrder, setSortOrder }) => (
  <div className="p-6 h-full overflow-y-auto">
    <div className="flex justify-between items-center mb-6 pt-6">
      <h3 className="text-xl font-semibold text-foreground">Filter & Sort</h3>
      <Button variant="ghost" size="sm" onClick={clearFilters} className="text-muted-foreground hover:text-primary">Clear all</Button>
    </div>
    <Accordion type="multiple" defaultValue={['sort', 'pattern', 'color', 'arrival']} className="w-full">
      <AccordionItem value="sort">
        <AccordionTrigger>Sort by</AccordionTrigger>
        <AccordionContent className="pt-4">
          <RadioGroup value={sortOrder} onValueChange={setSortOrder}>
            <div className="flex items-center space-x-2"><RadioGroupItem value="price-asc" id="sort-asc" /><Label htmlFor="sort-asc">Price: Low to High</Label></div>
            <div className="flex items-center space-x-2"><RadioGroupItem value="price-desc" id="sort-desc" /><Label htmlFor="sort-desc">Price: High to Low</Label></div>
          </RadioGroup>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="pattern">
        <AccordionTrigger>Pattern</AccordionTrigger>
        <AccordionContent className="pt-4 grid grid-cols-2 gap-2">
          {filterOptions.pattern.map(p => (
            <div key={p} className="flex items-center space-x-2">
              <Checkbox id={`pattern-${p}`} checked={filters.pattern.includes(p)} onCheckedChange={() => handleFilterChange('pattern', p)} />
              <label htmlFor={`pattern-${p}`} className="text-sm font-medium leading-none cursor-pointer">{p}</label>
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="color">
        <AccordionTrigger>Color</AccordionTrigger>
        <AccordionContent className="pt-4 grid grid-cols-2 gap-2">
          {filterOptions.color.map(c => (
            <div key={c} className="flex items-center space-x-2">
              <Checkbox id={`color-${c}`} checked={filters.color.includes(c)} onCheckedChange={() => handleFilterChange('color', c)} />
              <label htmlFor={`color-${c}`} className="text-sm font-medium leading-none cursor-pointer">{c}</label>
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="arrival">
        <AccordionTrigger>Arrival</AccordionTrigger>
        <AccordionContent className="pt-4 grid grid-cols-2 gap-2">
          {filterOptions.arrival.map(a => (
            <div key={a.value} className="flex items-center space-x-2">
              <Checkbox id={`arrival-${a.value}`} checked={filters.arrival.includes(a.value)} onCheckedChange={() => handleFilterChange('arrival', a.value)} />
              <label htmlFor={`arrival-${a.value}`} className="text-sm font-medium leading-none cursor-pointer">{a.label}</label>
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>
);

const CollectionsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ pattern: [], color: [], arrival: [] });
  const [sortOrder, setSortOrder] = useState('newest');
  const [priceRange, setPriceRange] = useState([0, 4000]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setProducts(productsData);
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);
  const handleFilterChange = useCallback((category, value) => {
    setFilters(prev => {
      const currentCategoryFilters = prev[category] || [];
      const newCategoryFilters = currentCategoryFilters.includes(value)
        ? currentCategoryFilters.filter(item => item !== value)
        : [...currentCategoryFilters, value];
      return { ...prev, [category]: newCategoryFilters };
    });
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({ pattern: [], color: [], arrival: [] });
    setSearchTerm('');
    setPriceRange([0, 4000]);
    setSortOrder('newest');
  }, []);

  const filteredAndSortedProducts = useMemo(() => {
    if (!products || products.length === 0) return [];
    let productList = [...products];

    productList = productList.filter(product => {
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesSearch = product.name?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPattern = filters.pattern.length === 0 || filters.pattern.includes(product.pattern);
      const matchesColor = filters.color.length === 0 || filters.color.includes(product.color);
      const matchesArrival = filters.arrival.length === 0 || filters.arrival.includes(product.arrival);
      return matchesPrice && matchesSearch && matchesPattern && matchesColor && matchesArrival;
    });

    switch (sortOrder) {
      case 'price-asc':
        productList.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        productList.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
      default:
        productList.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        break;
    }
    return productList;
  }, [filters, sortOrder, searchTerm, products, priceRange]);

  if (error) {
    return <Container className="py-24 text-center"><p className="text-destructive">Error: {error}</p></Container>;
  }

  return (
    <div className="pt-40 pb-24 bg-card min-h-screen">
      <Container>
        <div className="text-center pb-16">
          <h1 className="text-4xl sm:text-5xl font-display font-bold tracking-tight text-primary">Our Collections</h1>
          <p className="mt-4 max-w-xl mx-auto text-lg text-muted-foreground">Discover curated styles and timeless pieces from the world's leading brands.</p>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 mb-8 p-4 border rounded-lg bg-background shadow-sm">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="flex items-center bg-card gap-2 w-full md:w-auto flex-shrink-0">
                <SlidersHorizontal className="h-4 w-4" />
                <span>Filter & Sort</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full sm:max-w-xs p-0">
              <FiltersPanel filters={filters} handleFilterChange={handleFilterChange} clearFilters={clearFilters} sortOrder={sortOrder} setSortOrder={setSortOrder} />
            </SheetContent>
          </Sheet>

          <div className="relative w-full md:flex-1">
            <Input
              type="search"
              placeholder="Search in collection..."
              className="pl-10 bg-card"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          </div>

          <div className="w-full md:w-auto">
          </div>
        </div>

        {loading ? (
          <ProductGridSkeleton count={9} className="grid-cols-2 md:grid-cols-3" />
        ) : (
          <motion.div layout className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-16 mt-20">
            <AnimatePresence>
              {filteredAndSortedProducts.length > 0 ? (
                filteredAndSortedProducts.map((product, index) => (
                  <AnimatedProductCard key={product.id} product={product} index={index} />
                ))
              ) : (
                <div className="col-span-full text-center text-muted-foreground py-16">
                  <p className="text-lg font-semibold">No products found</p>
                  <p className="mt-2">Try adjusting your filters.</p>
                  <Button variant="link" onClick={clearFilters} className="mt-4">Clear all filters</Button>
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </Container>
    </div>
  );
};

export default CollectionsPage;