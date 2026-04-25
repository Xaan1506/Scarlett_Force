import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Compass, ArrowRight, Calendar, MapPin, Zap, Users, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import heroImage from '../assets/hero-visual.png';

const features = [
  {
    icon: <Calendar className="text-emerald-500" size={24} />,
    title: "Discover Events",
    description: "Find the most exciting concerts, workshops, and meetups happening near you."
  },
  {
    icon: <MapPin className="text-emerald-500" size={24} />,
    title: "Interactive Maps",
    description: "Easily navigate to event venues with our integrated real-time map system."
  },
  {
    icon: <Zap className="text-emerald-500" size={24} />,
    title: "Instant Booking",
    description: "Secure your spot in seconds with our seamless and lightning-fast checkout."
  },
  {
    icon: <Users className="text-emerald-500" size={24} />,
    title: "Community First",
    description: "Connect with like-minded people and share your experiences with the world."
  }
];

const stats = [
  { label: "Active Users", value: "50k+" },
  { label: "Daily Events", value: "1,200+" },
  { label: "Cities Covered", value: "85+" },
  { label: "Happy Hosts", value: "5k+" }
];

function Home() {
  return (
    <main className="relative min-h-screen bg-slate-50 overflow-hidden">
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-emerald-100/50 rounded-full blur-3xl" />
        <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] bg-teal-100/50 rounded-full blur-3xl" />
        <div className="absolute -bottom-[10%] left-[20%] w-[35%] h-[35%] bg-emerald-50/50 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
        {/* Hero Section */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium mb-6">
              <Sparkles size={16} />
              <span>Redefining Event Experiences</span>
            </div>
            
            <h1 className="text-6xl sm:text-7xl font-extrabold text-slate-900 mb-6 leading-[1.1]">
              Every Moment <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500">
                Matters
              </span>
            </h1>
            
            <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-xl">
              Experience the world's most vibrant events at your fingertips. From underground gigs to global summits, EventSphere brings the community to you.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/explore"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white text-lg font-semibold rounded-2xl shadow-xl shadow-emerald-600/20 transition-all active:scale-95 group"
              >
                <Compass size={22} className="group-hover:rotate-45 transition-transform" />
                Start Exploring
                <ArrowRight size={20} />
              </Link>
              
              <button className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border border-slate-200 text-slate-700 text-lg font-semibold rounded-2xl hover:bg-slate-50 transition-all active:scale-95">
                <ShieldCheck size={22} />
                Learn More
              </button>
            </div>

            {/* Stats Row */}
            <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index}>
                  <div className="text-3xl font-bold text-slate-900">{stat.value}</div>
                  <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Hero Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
            className="hidden lg:block relative"
          >
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-emerald-500/20 border-8 border-white">
              <img 
                src={heroImage} 
                alt="EventSphere Experience" 
                className="w-full h-auto object-cover"
              />
            </div>
            
            {/* Decorative element behind image */}
            <div className="absolute -bottom-6 -left-6 w-full h-full bg-emerald-500/10 rounded-[2.5rem] -z-10" />
            <div className="absolute -top-6 -right-6 w-full h-full bg-teal-500/10 rounded-[2.5rem] -z-10" />
          </motion.div>
        </div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-40"
        >
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Everything You Need</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">
              Powerful tools designed to help you discover, book, and enjoy events like never before.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                className="p-8 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-emerald-500/5 transition-all group"
              >
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center mb-6 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                  {React.cloneElement(feature.icon, { className: "group-hover:text-white transition-colors" })}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
}

export default Home;
