'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import HomeChevron from '../components/HomeChevron';
import Map, { Marker, NavigationControl } from 'react-map-gl/mapbox';
import Supercluster from 'supercluster';
import 'mapbox-gl/dist/mapbox-gl.css';
import { photos } from '../data/photos';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

const STREET_STYLE = 'mapbox://styles/mapbox/light-v11';
const SATELLITE_STYLE = 'mapbox://styles/mapbox/satellite-streets-v12';

type PhotoFeature = GeoJSON.Feature<GeoJSON.Point, {
  photoId: string;
  cluster: false;
}>;

function formatDate(dateStr: string) {
  const [year, month] = dateStr.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

export default function MapPage() {
  const [isSatellite, setIsSatellite] = useState(false);
  const [viewState, setViewState] = useState({
    longitude: 0,
    latitude: 20,
    zoom: 1.5,
  });
  const [clusters, setClusters] = useState<any[]>([]);
  const [hoveredCluster, setHoveredCluster] = useState<any>(null);
  const [hoverPos, setHoverPos] = useState<{ x: number; y: number } | null>(null);

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxPhotos, setLightboxPhotos] = useState<typeof photos>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [infoVisible, setInfoVisible] = useState(true);

  const mapRef = useRef<any>(null);
  const superclusterRef = useRef<Supercluster | null>(null);

  // Only photos with coordinates
  const geoPhotos = useMemo(() =>
    photos.filter(p => p.lat != null && p.lng != null),
    []
  );

  // Build GeoJSON features
  const points: PhotoFeature[] = useMemo(() =>
    geoPhotos.map(p => ({
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [p.lng!, p.lat!] },
      properties: { photoId: p.id, cluster: false },
    })),
    [geoPhotos]
  );

  // Initialize supercluster
  useEffect(() => {
    superclusterRef.current = new Supercluster({ radius: 30, maxZoom: 16 });
    superclusterRef.current.load(points);
    updateClusters();
  }, [points]);

  const updateClusters = useCallback(() => {
    if (!superclusterRef.current || !mapRef.current) return;
    const map = mapRef.current.getMap();
    const bounds = map.getBounds();
    const zoom = Math.floor(map.getZoom());
    const bbox: [number, number, number, number] = [
      bounds.getWest(), bounds.getSouth(),
      bounds.getEast(), bounds.getNorth()
    ];
    const newClusters = superclusterRef.current.getClusters(bbox, zoom);
    setClusters(newClusters);
  }, []);

  const handleMapMove = useCallback((evt: any) => {
    setViewState(evt.viewState);
    updateClusters();
  }, [updateClusters]);

  const handleMapLoad = useCallback(() => {
    updateClusters();
  }, [updateClusters]);

  const handleClusterClick = useCallback((cluster: any) => {
    setHoveredCluster(null);
    if (cluster.properties.cluster) {
      // Zoom into cluster
      const [lng, lat] = cluster.geometry.coordinates;
      const expansionZoom = Math.min(
        superclusterRef.current!.getClusterExpansionZoom(cluster.properties.cluster_id),
        20
      );
      mapRef.current?.flyTo({ center: [lng, lat], zoom: expansionZoom, duration: 600 });
    } else {
      // Single photo — open lightbox
      const photo = geoPhotos.find(p => p.id === cluster.properties.photoId);
      if (photo) {
        setLightboxPhotos([photo]);
        setLightboxIndex(0);
        setInfoVisible(true);
        setLightboxOpen(true);
      }
    }
  }, [geoPhotos]);

  const handleClusterHover = useCallback((cluster: any, e: React.MouseEvent) => {
    setHoveredCluster(cluster);
    setHoverPos({ x: e.clientX, y: e.clientY });
  }, []);

  const handleClusterHoverMove = useCallback((e: React.MouseEvent) => {
    setHoverPos({ x: e.clientX, y: e.clientY });
  }, []);

  // When hovering a cluster, gather its photos for preview
  const hoveredPhotos = useMemo(() => {
    if (!hoveredCluster || !superclusterRef.current) return [];
    if (hoveredCluster.properties.cluster) {
      const leaves = superclusterRef.current.getLeaves(
        hoveredCluster.properties.cluster_id, Infinity
      );
      return leaves
        .map((l: any) => geoPhotos.find(p => p.id === l.properties.photoId))
        .filter(Boolean) as typeof photos;
    } else {
      const photo = geoPhotos.find(p => p.id === hoveredCluster.properties.photoId);
      return photo ? [photo] : [];
    }
  }, [hoveredCluster, geoPhotos]);

  const handleClusterClick2 = useCallback((cluster: any) => {
    setHoveredCluster(null);
    if (cluster.properties.cluster) {
      const [lng, lat] = cluster.geometry.coordinates;
      const expansionZoom = Math.min(
        superclusterRef.current!.getClusterExpansionZoom(cluster.properties.cluster_id),
        20
      );
      mapRef.current?.flyTo({ center: [lng, lat], zoom: expansionZoom, duration: 600 });
    } else {
      const photo = geoPhotos.find(p => p.id === cluster.properties.photoId);
      if (photo) {
        setLightboxPhotos([photo]);
        setLightboxIndex(0);
        setInfoVisible(true);
        setLightboxOpen(true);
      }
    }
  }, [geoPhotos]);

  const openClusterLightbox = useCallback((cluster: any) => {
    setHoveredCluster(null);
    if (cluster.properties.cluster) {
      const leaves = superclusterRef.current!.getLeaves(
        cluster.properties.cluster_id, Infinity
      );
      const clusterPhotos = leaves
        .map((l: any) => geoPhotos.find(p => p.id === l.properties.photoId))
        .filter(Boolean) as typeof photos;
      setLightboxPhotos(clusterPhotos);
      setLightboxIndex(0);
      setInfoVisible(true);
      setLightboxOpen(true);
    } else {
      const photo = geoPhotos.find(p => p.id === cluster.properties.photoId);
      if (photo) {
        setLightboxPhotos([photo]);
        setLightboxIndex(0);
        setInfoVisible(true);
        setLightboxOpen(true);
      }
    }
  }, [geoPhotos]);

  // Keyboard nav in lightbox
  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') setLightboxIndex(i => Math.max(0, i - 1));
      if (e.key === 'ArrowRight') setLightboxIndex(i => Math.min(lightboxPhotos.length - 1, i + 1));
      if (e.key === 'Escape') setLightboxOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, lightboxPhotos.length]);

  // Fly to location from URL params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const lat = parseFloat(params.get('lat') || '');
    const lng = parseFloat(params.get('lng') || '');
    const zoom = parseFloat(params.get('zoom') || '10');
    if (!isNaN(lat) && !isNaN(lng)) {
      setTimeout(() => {
        mapRef.current?.flyTo({ center: [lng, lat], zoom, duration: 1200 });
      }, 500);
    }
  }, []);

  const currentPhoto = lightboxPhotos[lightboxIndex];

  return (
    <div className="flex flex-col h-screen bg-white">

      {/* Header */}
      <div className="flex items-center gap-4 px-8 pt-6 pb-4 flex-shrink-0">
        <HomeChevron />
        <h1 className="text-2xl font-light tracking-[0.3em] uppercase text-gray-900">Places</h1>
      </div>

      <div className="flex-1 relative">

        {/* Map */}
        <Map
          ref={mapRef}
          {...viewState}
          onMove={handleMapMove}
          onLoad={handleMapLoad}
          mapStyle={isSatellite ? SATELLITE_STYLE : STREET_STYLE}
          mapboxAccessToken={MAPBOX_TOKEN}
          projection={{ name: 'globe' } as any}
          style={{ width: '100%', height: '100%' }}
          onMouseLeave={() => setHoveredCluster(null)}
        >
          <NavigationControl position="bottom-right" />


          {/* Clusters and pins */}
          {clusters.map((cluster, i) => {
            const [lng, lat] = cluster.geometry.coordinates;
            const isCluster = cluster.properties.cluster;
            const count = cluster.properties.point_count;

            if (isCluster) {
              // Get first photo in cluster for thumbnail
              const leaves = superclusterRef.current!.getLeaves(cluster.properties.cluster_id, 1);
              const previewPhoto = leaves.length > 0
                ? geoPhotos.find(p => p.id === leaves[0].properties.photoId)
                : null;

              return (
                <Marker key={i} longitude={lng} latitude={lat} anchor="center">
                  <div
                    className="relative cursor-pointer group"
                    onMouseEnter={e => handleClusterHover(cluster, e)}
                    onMouseMove={handleClusterHoverMove}
                    onMouseLeave={() => setHoveredCluster(null)}
                    onClick={() => openClusterLightbox(cluster)}
                  >
                    {/* Cluster thumbnail with count badge */}
                    <div
                      className="rounded-full border-2 border-white overflow-hidden transition-transform group-hover:scale-110"
                      style={{
                        width: 48,
                        height: 48,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.3)',
                      }}
                    >
                      {previewPhoto ? (
                        <img
                          src={previewPhoto.src}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-400" />
                      )}
                    </div>
                    {/* Count badge */}
                    <div
                      className="absolute -top-1.5 -right-1.5 bg-gray-900 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white"
                      style={{ width: 22, height: 22, boxShadow: '0 1px 4px rgba(0,0,0,0.4)' }}
                    >
                      {count}
                    </div>
                  </div>
                </Marker>
              );
            }

            // Single pin
            const photo = geoPhotos.find(p => p.id === cluster.properties.photoId);
            if (!photo) return null;

            return (
              <Marker key={i} longitude={lng} latitude={lat} anchor="center">
                <div
                  className="relative cursor-pointer group"
                  onMouseEnter={e => handleClusterHover(cluster, e)}
                  onMouseMove={handleClusterHoverMove}
                  onMouseLeave={() => setHoveredCluster(null)}
                  onClick={() => openClusterLightbox(cluster)}
                >
                  <div
                    className="rounded-full border-2 border-white overflow-hidden transition-transform group-hover:scale-110"
                    style={{
                      width: 40,
                      height: 40,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.3)',
                    }}
                  >
                    <img
                      src={photo.src}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </Marker>
            );
          })}


        </Map>

        {/* Satellite / Street toggle */}
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={() => setIsSatellite(s => !s)}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-lg border border-gray-200 text-sm font-medium text-gray-900 hover:bg-gray-50 transition-all"
          >
            {isSatellite ? (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                Street View
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                </svg>
                Satellite
              </>
            )}
          </button>
        </div>

        {/* Hover preview card */}
        {hoveredCluster && hoveredPhotos.length > 0 && hoverPos && (
          <div
            className="fixed z-20 pointer-events-none"
            style={{ left: hoverPos.x + 16, top: hoverPos.y - 16 }}
          >
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden w-48">
              <div className="relative">
                <img
                  src={hoveredPhotos[0].src}
                  alt={hoveredPhotos[0].caption || ''}
                  className="w-full h-32 object-cover"
                />
                {hoveredPhotos.length > 1 && (
                  <div className="absolute top-2 right-2 bg-black/70 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {hoveredPhotos.length} photos
                  </div>
                )}
              </div>
              {hoveredPhotos[0].location && (
                <div className="px-3 py-2">
                  <p className="text-xs font-semibold text-gray-900 leading-snug">{hoveredPhotos[0].location}</p>
                  {hoveredPhotos[0].date && (
                    <p className="text-xs text-gray-500 mt-0.5">{formatDate(hoveredPhotos[0].date)}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Lightbox */}
        {lightboxOpen && currentPhoto && (
          <div
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center lightbox-fade"
            onClick={e => { if (e.target === e.currentTarget) setLightboxOpen(false); }}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-5 right-5 z-30 w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full text-white text-xl transition-all"
            >
              ×
            </button>

            <button
              onClick={() => setInfoVisible(v => !v)}
              className="absolute bottom-5 right-5 z-30 flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-white text-xs font-medium transition-all"
            >
              {infoVisible ? 'Hide Info' : 'Show Info'}
            </button>

            <button
              onClick={() => setLightboxIndex(i => Math.max(0, i - 1))}
              disabled={lightboxIndex === 0}
              className="absolute left-4 z-20 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 disabled:opacity-20 rounded-full text-white text-2xl transition-all"
            >
              ‹
            </button>

            <button
              onClick={() => setLightboxIndex(i => Math.min(lightboxPhotos.length - 1, i + 1))}
              disabled={lightboxIndex === lightboxPhotos.length - 1}
              className="absolute right-4 z-20 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 disabled:opacity-20 rounded-full text-white text-2xl transition-all"
            >
              ›
            </button>

            <div className="flex items-center justify-center gap-6 w-full h-full px-20 py-10 max-w-[1400px] mx-auto">
              <div className="flex-1 h-full flex items-center justify-center">
                <img
                  src={currentPhoto.src}
                  alt={currentPhoto.caption || ''}
                  className="max-h-[85vh] max-w-full object-contain"
                />
              </div>

              {infoVisible && (
                <div className="w-64 flex-shrink-0 bg-white rounded-2xl shadow-2xl p-6 flex flex-col gap-5 self-center">
                  {currentPhoto.caption && (
                    <h2 className="text-base font-bold text-gray-900 leading-snug">
                      {currentPhoto.caption}
                    </h2>
                  )}
                  {currentPhoto.location && (
                    <div className="flex items-start gap-3">
                      <span className="text-lg mt-0.5">📍</span>
                      <div>
                        <div className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-0.5">Location</div>
                        <div className="text-sm font-semibold text-gray-900 leading-snug">{currentPhoto.location}</div>
                      </div>
                    </div>
                  )}
                  {currentPhoto.date && (
                    <div className="flex items-start gap-3">
                      <span className="text-lg mt-0.5">📅</span>
                      <div>
                        <div className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-0.5">Date</div>
                        <div className="text-sm font-semibold text-gray-900">{formatDate(currentPhoto.date)}</div>
                      </div>
                    </div>
                  )}
                  {currentPhoto.tags && currentPhoto.tags.length > 0 && (
                    <div>
                      <div className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-2">Tags</div>
                      <div className="flex flex-wrap gap-1.5">
                        {currentPhoto.tags.map(tag => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 bg-gray-100 rounded-lg text-xs font-medium text-gray-700 capitalize"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="text-xs text-gray-400 text-center pt-1">
                    {lightboxIndex + 1} / {lightboxPhotos.length}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}