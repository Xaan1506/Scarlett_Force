import React from 'react';
import { Calendar, MapPin, Tag } from 'lucide-react';
import { motion } from 'framer-motion';

const EventCard = ({ event, onClick }) => {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 group cursor-pointer"
      onClick={() => onClick(event)}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={event.image} 
          alt={event.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-emerald-700 shadow-sm">
          {event.price}
        </div>
        <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-white shadow-sm">
          {event.eventType}
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-2 font-medium">
          <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          <span>•</span>
          <span className="flex items-center gap-1"><MapPin size={14} /> {event.location}</span>
        </div>
        
        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">{event.title}</h3>
        <p className="text-sm text-slate-600 line-clamp-2 mb-4 leading-relaxed">
          {event.description}
        </p>
        
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {event.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="inline-flex items-center gap-1 text-[10px] font-medium bg-emerald-50 text-emerald-700 px-2 py-1 rounded-md">
              <Tag size={10} />
              {tag}
            </span>
          ))}
          {event.tags.length > 3 && (
            <span className="inline-flex items-center text-[10px] font-medium bg-slate-100 text-slate-600 px-2 py-1 rounded-md">
              +{event.tags.length - 3} more
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;
