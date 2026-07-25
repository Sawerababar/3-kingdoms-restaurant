import React from 'react';
import { INSTAGRAM_POSTS, RESTAURANT_INFO } from '../data/restaurantData';
import { Instagram, Heart, MessageCircle, ExternalLink, Play } from 'lucide-react';

interface InstagramWallProps {
  onOpenReelModal?: (reelId?: string) => void;
}

export const InstagramWall: React.FC<InstagramWallProps> = ({ onOpenReelModal }) => {
  return (
    <section className="py-20 bg-stone-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-800 text-amber-400 text-xs font-bold tracking-wider uppercase mb-3">
              <Instagram className="w-4 h-4 text-pink-500" />
              <span>Follow Our Food Journey</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-black tracking-tight text-white">
              Instagram <span className="text-pink-500">{RESTAURANT_INFO.instagram}</span>
            </h2>
            <p className="mt-2 text-stone-400 text-sm max-w-xl">
              Tag us in your photos & posts at Uptown Brisbane for a chance to be featured on our social wall! Click any post to explore our menu.
            </p>
          </div>

          <a
            href={RESTAURANT_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="instagram-follow-btn"
            className="inline-flex items-center gap-2.5 bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:opacity-90 text-white text-xs font-bold px-6 py-3.5 rounded-2xl shadow-lg transition-all transform hover:-translate-y-0.5"
          >
            <Instagram className="w-4 h-4" />
            <span>Follow @3kingdoms_brisbane</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </a>
        </div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {INSTAGRAM_POSTS.map((post) => (
            <a
              key={post.id}
              href="#menu"
              className="group relative bg-stone-950 rounded-3xl overflow-hidden border border-stone-800 shadow-xl transition-all hover:border-pink-500/50 cursor-pointer block"
            >
              <div className="relative h-72 overflow-hidden">
                <img
                  src={post.image}
                  alt="Instagram Post"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Popular Post Badge */}
                {post.isReel && (
                  <div className="absolute top-3 right-3 bg-stone-900/80 backdrop-blur-md text-white px-2.5 py-1.5 rounded-xl text-xs flex items-center gap-1 font-bold shadow-lg">
                    <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
                    <span>Popular Post</span>
                  </div>
                )}

                {/* Hover Overlay with Likes & Caption */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end">
                  <p className="text-xs text-stone-200 line-clamp-3 mb-4 leading-relaxed font-sans">
                    {post.caption}
                  </p>

                  <div className="flex items-center justify-between text-xs font-bold text-stone-300 border-t border-stone-800 pt-3">
                    <div className="flex items-center gap-1.5 text-pink-400">
                      <Heart className="w-4 h-4 fill-pink-500" />
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-stone-400">
                      <MessageCircle className="w-4 h-4" />
                      <span>{post.comments}</span>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};
