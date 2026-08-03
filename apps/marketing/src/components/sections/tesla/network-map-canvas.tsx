'use client';

import { useEffect, useRef } from 'react';
import { Maximize } from 'lucide-react';
import type { Map as LeafletMap } from 'leaflet';

const HUBS: { name: string; lat: number; lng: number }[] = [
  { name: 'Mumbai', lat: 19.076, lng: 72.8777 },
  { name: 'Delhi NCR', lat: 28.6139, lng: 77.209 },
  { name: 'Chennai', lat: 13.0827, lng: 80.2707 },
  { name: 'Bengaluru', lat: 12.9716, lng: 77.5946 },
  { name: 'Kolkata', lat: 22.5726, lng: 88.3639 },
  { name: 'Hyderabad', lat: 17.385, lng: 78.4867 },
];

export function NetworkMapCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || mapRef.current) return;

    let cancelled = false;
    let resizeCleanup: (() => void) | undefined;

    void (async () => {
      const leaflet = await import('leaflet');
      const L = leaflet.default;
      if (cancelled || !containerRef.current) return;

      const hubIcon = L.divIcon({
        className: 'ch-hub-marker',
        html: `<span style="
          display:block;
          width:12px;
          height:12px;
          margin:-6px 0 0 -6px;
          border-radius:9999px;
          background:#e82127;
          box-shadow:0 0 0 5px rgba(232,33,39,0.25);
        "></span>`,
        iconSize: [12, 12],
        iconAnchor: [6, 6],
      });

      const map = L.map(containerRef.current, {
        center: [20.5, 78.5],
        zoom: 5,
        scrollWheelZoom: false,
        zoomControl: true,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18,
      }).addTo(map);

      for (const hub of HUBS) {
        L.marker([hub.lat, hub.lng], { icon: hubIcon })
          .addTo(map)
          .bindPopup(`<strong>${hub.name}</strong><br/>ChaseHorse hub`);
      }

      mapRef.current = map;

      const onResize = () => map.invalidateSize();
      window.addEventListener('resize', onResize);
      document.addEventListener('fullscreenchange', onResize);
      const t = window.setTimeout(onResize, 100);
      resizeCleanup = () => {
        window.clearTimeout(t);
        window.removeEventListener('resize', onResize);
        document.removeEventListener('fullscreenchange', onResize);
      };
    })();

    return () => {
      cancelled = true;
      resizeCleanup?.();
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  const toggleFullscreen = () => {
    const el = containerRef.current?.parentElement;
    if (!el) return;
    if (document.fullscreenElement) {
      void document.exitFullscreen();
    } else {
      void el.requestFullscreen?.();
    }
  };

  return (
    <div className="relative h-[420px] w-full bg-[#e8e8e8] sm:h-[520px] md:h-[640px] [[:fullscreen]_&]:h-screen">
      <div ref={containerRef} className="absolute inset-0 z-0 h-full w-full" />
      <button
        type="button"
        aria-label="Expand map"
        onClick={toggleFullscreen}
        className="absolute bottom-4 left-4 z-[1000] flex h-9 w-9 items-center justify-center rounded-[4px] border border-tesla-black/15 bg-white/90 text-tesla-black shadow-sm transition hover:bg-white"
      >
        <Maximize className="h-4 w-4" strokeWidth={1.75} />
      </button>
    </div>
  );
}
