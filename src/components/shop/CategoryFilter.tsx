import React from 'react';
import { PRODUCT_CATEGORIES } from '../../data/products';

interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="flex items-center justify-center flex-wrap gap-2.5 mb-12">
      <button
        onClick={() => onSelectCategory('all')}
        className={`px-6 py-2.5 rounded-full text-xs font-black transition-all cursor-pointer ${
          selectedCategory === 'all'
            ? 'bg-slate-950 text-amber-400 shadow-md border-2 border-amber-400/50 scale-105'
            : 'bg-white hover:bg-amber-50/70 text-slate-700 hover:text-amber-600 border border-gray-200 font-bold'
        }`}
      >
        Todas
      </button>

      {PRODUCT_CATEGORIES.map((cat) => {
        const isSelected = selectedCategory === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`px-6 py-2.5 rounded-full text-xs transition-all cursor-pointer ${
              isSelected
                ? 'bg-slate-950 text-amber-400 font-black shadow-md border-2 border-amber-400/50 scale-105'
                : 'bg-white hover:bg-amber-50/70 text-slate-700 hover:text-amber-600 border border-gray-200 font-bold'
            }`}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
};
