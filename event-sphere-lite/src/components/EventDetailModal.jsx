import React from 'react';
import { X, Calendar, MapPin, Tag, Users, Clock, Share2, Bookmark, CheckCircle2, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSavedEvents } from '../context/SavedEventsContext';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const EventDetailModal = ({ event, isOpen, onClose }) => {
  const { toggleSave, isSaved } = useSavedEvents();
  const { isJoined, joinEvent } = useUser();
  const navigate = useNavigate();

  if (!event) return null;

  const saved = isSaved(event.id);
  const joined = isJoined(event.id);

  const handleSave = (e) => {
    e.stopPropagation();
    toggleSave(event.id);
  };

  const handleJoin = (e) => {
    e.stopPropagation();
    joinEvent(event.id);
  };

  const handleChat = (e) => {
    e.stopPropagation();
    navigate('/messages', { state: { host: event.host } });
    onClose();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: event.description,
        url: window.location.href
      });
    }
  };

  const getBadgeColor = (type) => {
    switch (type) {
      case 'Workshop': return 'bg-purple-500';
      case 'Meetup': return 'bg-blue-500';
      case 'Party': return 'bg-pink-500';
      case 'Conference': return 'bg-amber-500';
      default: return 'bg-emerald-500';
    }
  };

  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString('en-US', { 
    weekday: 'long',
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              {/* Header Image */}
              <div className="relative h-80 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Top Controls */}
                <div className="absolute top-6 right-6 flex gap-3">
                  <button
                    onClick={handleSave}
                    className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 shadow-lg hover:scale-110 active:scale-95 ${
                      saved
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white/80 text-emerald-600 hover:bg-emerald-500 hover:text-white'
                    }`}
                  >
                    <Bookmark size={20} fill={saved ? 'currentColor' : 'none'} />
                  </button>
                  <button
                    onClick={onClose}
                    className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center hover:bg-white transition-all duration-300 shadow-lg hover:scale-110 active:scale-95"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Badge */}
                <div className={`absolute bottom-6 left-6 ${getBadgeColor(event.eventType)} text-white px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg`}>
                  {event.eventType}
                </div>

                {/* Price Badge */}
                <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full font-bold text-emerald-600 shadow-lg">
                  {event.price}
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                {/* Title */}
                <h1 className="text-4xl font-bold text-slate-900 mb-2">{event.title}</h1>
                
                {/* Host Info */}
                <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-100">
                  <img
                    src={event.host.avatar}
                    alt={event.host.name}
                    className="w-12 h-12 rounded-full border-2 border-emerald-200"
                  />
                  <div>
                    <p className="text-sm text-slate-600">Hosted by</p>
                    <p className="font-bold text-slate-900">{event.host.name}</p>
                  </div>
                </div>

                {/* Key Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {/* Date */}
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                        <Calendar size={24} className="text-emerald-600" />
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Date & Time</p>
                      <p className="text-lg font-bold text-slate-900">{formattedDate}</p>
                      {event.time && <p className="text-sm text-slate-600 flex items-center gap-1 mt-1"><Clock size={14} /> {event.time}</p>}
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                        <MapPin size={24} className="text-emerald-600" />
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Location</p>
                      <p className="text-lg font-bold text-slate-900">{event.location}</p>
                      {event.address && <p className="text-sm text-slate-600 mt-1">{event.address}</p>}
                    </div>
                  </div>

                  {/* Attendees */}
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                        <Users size={24} className="text-emerald-600" />
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Attendees</p>
                      <p className="text-lg font-bold text-slate-900">{event.attendees || '0'} Going</p>
                      <p className="text-sm text-slate-600 mt-1">Max {event.capacity || 'Unlimited'}</p>
                    </div>
                  </div>

                  {/* Category */}
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                        <Tag size={24} className="text-emerald-600" />
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Category</p>
                      <p className="text-lg font-bold text-slate-900">{event.category}</p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-slate-900 mb-3">About This Event</h2>
                  <p className="text-slate-700 leading-relaxed text-base">{event.description}</p>
                </div>

                {/* Tags */}
                {event.tags && event.tags.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-sm font-bold text-slate-600 uppercase tracking-wider mb-3">Topics</h3>
                    <div className="flex flex-wrap gap-2">
                      {event.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-medium hover:bg-emerald-100 transition-colors"
                        >
                          <Tag size={14} />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 pt-6 border-t border-slate-100">
                  {joined ? (
                    <>
                      <button
                        onClick={handleChat}
                        className="flex-1 px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 active:scale-95"
                      >
                        <MessageSquare size={20} />
                        Ask Host
                      </button>
                      <button
                        onClick={handleShare}
                        className="px-6 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-colors flex items-center justify-center gap-2 active:scale-95"
                      >
                        <Share2 size={20} />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={handleJoin}
                        className="flex-1 px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 active:scale-95"
                      >
                        <CheckCircle2 size={20} />
                        Join Event
                      </button>
                      <button
                        onClick={handleShare}
                        className="px-6 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-colors flex items-center justify-center gap-2 active:scale-95"
                      >
                        <Share2 size={20} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default EventDetailModal;
