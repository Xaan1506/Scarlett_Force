import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { mockEvents } from '../data/events';
import { Calendar, MapPin, Tag, User, DollarSign } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Fix default Leaflet marker icon broken in Webpack/Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Color-coded icon by category
const categoryColors = {
  Tech: '#10b981',       // emerald
  Music: '#8b5cf6',      // violet
  Art: '#f59e0b',        // amber
  Sports: '#3b82f6',     // blue
  Networking: '#ec4899', // pink
};

function createCategoryIcon(category) {
  const color = categoryColors[category] || '#64748b';
  return L.divIcon({
    className: '',
    html: `
      <div style="
        width: 34px; height: 34px;
        background: ${color};
        border: 3px solid white;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      "></div>
    `,
    iconSize: [34, 34],
    iconAnchor: [17, 34],
    popupAnchor: [0, -36],
  });
}

function MapView() {
  const [selectedEvent, setSelectedEvent] = useState(null);

  return (
    <div className="flex h-[calc(100vh-4rem)]">

      {/* === MAP PANEL === */}
      <div className="flex-1 relative">
        <MapContainer
          center={[39.5, -98.35]}  // centre of USA
          zoom={4}
          style={{ width: '100%', height: '100%' }}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {mockEvents.map(event => (
            <Marker
              key={event.id}
              position={[event.lat, event.lng]}
              icon={createCategoryIcon(event.category)}
              eventHandlers={{ click: () => setSelectedEvent(event) }}
            >
              <Popup>
                <div className="min-w-[180px]">
                  <p className="font-bold text-slate-800 text-sm leading-tight mb-1">{event.title}</p>
                  <p className="text-xs text-slate-500 flex items-center gap-1">
                    <span>📍</span> {event.location}
                  </p>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                    <span>📅</span> {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                  <span className={`inline-block mt-2 px-2 py-0.5 rounded-full text-xs font-semibold ${event.price === 'Free' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                    {event.price}
                  </span>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Legend */}
        <div className="absolute bottom-6 left-6 z-[1000] bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-4 border border-slate-100">
          <p className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-3">Category</p>
          <div className="flex flex-col gap-2">
            {Object.entries(categoryColors).map(([cat, color]) => (
              <div key={cat} className="flex items-center gap-2 text-sm">
                <span style={{ background: color }} className="w-3 h-3 rounded-full inline-block flex-shrink-0"></span>
                <span className="text-slate-700 font-medium">{cat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* === SIDEBAR PANEL === */}
      <div className="w-80 xl:w-96 bg-white border-l border-slate-200 overflow-y-auto flex flex-col">
        <div className="p-5 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-800">Events on Map</h2>
          <p className="text-sm text-slate-500 mt-0.5">{mockEvents.length} events across the US — click a pin to see details</p>
        </div>

        <div className="flex-1 divide-y divide-slate-100">
          {mockEvents.map(event => (
            <button
              key={event.id}
              onClick={() => setSelectedEvent(event === selectedEvent ? null : event)}
              className={`w-full text-left px-5 py-4 transition-all hover:bg-slate-50 ${selectedEvent?.id === event.id ? 'bg-emerald-50 border-l-4 border-emerald-500' : ''}`}
            >
              <div className="flex items-start gap-3">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-800 text-sm leading-tight truncate">{event.title}</p>
                  <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                    <MapPin size={11} /> {event.location}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                    <Calendar size={11} /> {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </p>
                  <div className="flex gap-1.5 mt-2 flex-wrap">
                    <span
                      style={{ background: categoryColors[event.category] + '20', color: categoryColors[event.category] }}
                      className="px-2 py-0.5 rounded-full text-xs font-semibold"
                    >
                      {event.category}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${event.price === 'Free' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                      {event.price}
                    </span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Detail panel */}
        <AnimatePresence>
          {selectedEvent && (
            <motion.div
              key={selectedEvent.id}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ type: 'spring', damping: 22, stiffness: 200 }}
              className="border-t border-slate-200 bg-white p-5"
            >
              <img src={selectedEvent.image} alt={selectedEvent.title} className="w-full h-36 object-cover rounded-2xl mb-4" />
              <p className="font-bold text-slate-800 text-base leading-snug mb-1">{selectedEvent.title}</p>
              <p className="text-sm text-slate-500 mb-3 leading-relaxed">{selectedEvent.description}</p>
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                <span className="flex items-center gap-1.5"><MapPin size={12} className="text-emerald-500" />{selectedEvent.location}</span>
                <span className="flex items-center gap-1.5"><Calendar size={12} className="text-emerald-500" />{new Date(selectedEvent.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                <span className="flex items-center gap-1.5"><Tag size={12} className="text-emerald-500" />{selectedEvent.eventType}</span>
                <span className="flex items-center gap-1.5"><DollarSign size={12} className="text-emerald-500" />{selectedEvent.price}</span>
              </div>
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-100">
                <img src={selectedEvent.host.avatar} alt={selectedEvent.host.name} className="w-8 h-8 rounded-full" />
                <span className="text-xs text-slate-600">Hosted by <span className="font-semibold text-slate-800">{selectedEvent.host.name}</span></span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default MapView;
