import React from 'react';
import { filterCategories } from '../data/events';
import { Filter, X, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FilterSection = ({ title, options, selectedFilters, toggleFilter }) => {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <div className="py-4 border-b border-slate-100 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between font-semibold text-slate-800 text-sm mb-2 hover:text-emerald-600 transition-colors"
      >
        {title}
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden space-y-2 mt-3"
          >
            {options.map((option) => (
              <label key={option} className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input 
                    type="checkbox" 
                    className="filter-checkbox appearance-none"
                    checked={selectedFilters.includes(option)}
                    onChange={() => toggleFilter(option)}
                  />
                  {selectedFilters.includes(option) && (
                    <svg className="absolute w-3 h-3 text-emerald-600 pointer-events-none" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.6666 3.5L5.24992 9.91667L2.33325 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
                <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors select-none">
                  {option}
                </span>
              </label>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FilterSidebar = ({ selectedFilters, toggleFilter, clearFilters, closeMobileSidebar }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 h-full overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Filter size={18} className="text-emerald-600" /> 
          Filters
        </h2>
        {selectedFilters.length > 0 && (
          <button 
            onClick={clearFilters}
            className="text-xs font-semibold text-slate-500 hover:text-red-500 transition-colors flex items-center gap-1"
          >
            <X size={12} /> Clear 
          </button>
        )}
        <button 
          className="lg:hidden p-1 text-slate-400 hover:text-slate-600"
          onClick={closeMobileSidebar}
        >
          <X size={20} />
        </button>
      </div>

      <div className="space-y-1">
        <FilterSection 
          title="Environment" 
          options={filterCategories.environment} 
          selectedFilters={selectedFilters} 
          toggleFilter={toggleFilter} 
        />
        <FilterSection 
          title="Crowd Size" 
          options={filterCategories.crowdSize} 
          selectedFilters={selectedFilters} 
          toggleFilter={toggleFilter} 
        />
        <FilterSection 
          title="Interest Area" 
          options={filterCategories.interest} 
          selectedFilters={selectedFilters} 
          toggleFilter={toggleFilter} 
        />
        <FilterSection 
          title="Personality" 
          options={filterCategories.personality} 
          selectedFilters={selectedFilters} 
          toggleFilter={toggleFilter} 
        />
        <FilterSection 
          title="Energy Level" 
          options={filterCategories.energy} 
          selectedFilters={selectedFilters} 
          toggleFilter={toggleFilter} 
        />
        <FilterSection 
          title="Price" 
          options={filterCategories.price} 
          selectedFilters={selectedFilters} 
          toggleFilter={toggleFilter} 
        />
        <FilterSection 
          title="Event Type" 
          options={filterCategories.eventType} 
          selectedFilters={selectedFilters} 
          toggleFilter={toggleFilter} 
        />
      </div>
    </div>
  );
};

export default FilterSidebar;
