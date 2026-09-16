import React, { useMemo } from 'react';
import { Coordinate, GeoJSONFeatureCollection } from '../../services/feasibility/pointInPolygon';
import { MapPin, ZoomIn, ZoomOut, Compass, Layers, CheckCircle2, AlertCircle } from 'lucide-react';

interface CoverageRadarMapProps {
  userCoordinate: Coordinate; // [lng, lat]
  geoJson: GeoJSONFeatureCollection;
  isInside: boolean;
  serviceColor?: string;
  serviceName?: string;
  matchedZoneName?: string;
}

export const CoverageRadarMap: React.FC<CoverageRadarMapProps> = ({
  userCoordinate,
  geoJson,
  isInside,
  serviceColor = '#5A45DE',
  serviceName = 'Fibra Óptica',
  matchedZoneName,
}) => {
  // Compute bounds and project coordinates to normalized SVG space (0-500, 0-350)
  const mapData = useMemo(() => {
    let minLng = userCoordinate[0];
    let maxLng = userCoordinate[0];
    let minLat = userCoordinate[1];
    let maxLat = userCoordinate[1];

    // Collect all points from polygon features
    const allRings: Coordinate[][] = [];

    for (const feature of geoJson.features) {
      if (feature.geometry.type === 'Polygon') {
        const ring = feature.geometry.coordinates[0];
        allRings.push(ring);
        for (const [lng, lat] of ring) {
          if (lng < minLng) minLng = lng;
          if (lng > maxLng) maxLng = lng;
          if (lat < minLat) minLat = lat;
          if (lat > maxLat) maxLat = lat;
        }
      } else if (feature.geometry.type === 'MultiPolygon') {
        for (const poly of feature.geometry.coordinates) {
          const ring = poly[0];
          allRings.push(ring);
          for (const [lng, lat] of ring) {
            if (lng < minLng) minLng = lng;
            if (lng > maxLng) maxLng = lng;
            if (lat < minLat) minLat = lat;
            if (lat > maxLat) maxLat = lat;
          }
        }
      }
    }

    // Add margin around bounds
    const lngMargin = Math.max((maxLng - minLng) * 0.15, 0.04);
    const latMargin = Math.max((maxLat - minLat) * 0.15, 0.04);

    const mapMinLng = minLng - lngMargin;
    const mapMaxLng = maxLng + lngMargin;
    const mapMinLat = minLat - latMargin;
    const mapMaxLat = maxLat + latMargin;

    const width = 500;
    const height = 320;

    // Projection function from [lng, lat] to SVG (x, y)
    const project = (coord: Coordinate): [number, number] => {
      const x = ((coord[0] - mapMinLng) / (mapMaxLng - mapMinLng)) * width;
      // Invert Y because latitude goes up but SVG Y goes down
      const y = height - ((coord[1] - mapMinLat) / (mapMaxLat - mapMinLat)) * height;
      return [x, y];
    };

    // Generate SVG path string for each polygon ring
    const polygonPaths = allRings.map((ring) => {
      const projected = ring.map(project);
      if (projected.length === 0) return '';
      return (
        `M ${projected[0][0]},${projected[0][1]} ` +
        projected
          .slice(1)
          .map((p) => `L ${p[0]},${p[1]}`)
          .join(' ') +
        ' Z'
      );
    });

    const userPoint = project(userCoordinate);

    return {
      width,
      height,
      polygonPaths,
      userPoint,
    };
  }, [userCoordinate, geoJson]);

  return (
    <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-700/80 shadow-inner">
      {/* Top Map Status Overlay */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        <div
          className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-black shadow-md backdrop-blur-md ${
            isInside
              ? 'bg-emerald-500/90 text-white border border-emerald-400'
              : 'bg-amber-500/90 text-white border border-amber-400'
          }`}
        >
          {isInside ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>DENTRO DA ÁREA DE COBERTURA</span>
            </>
          ) : (
            <>
              <AlertCircle className="w-3.5 h-3.5" />
              <span>FORA DO POLÍGONO PRINCIPAL</span>
            </>
          )}
        </div>

        <div className="bg-slate-950/80 border border-white/10 px-2.5 py-1 rounded-lg text-[10px] text-gray-300 font-mono flex items-center space-x-1 backdrop-blur-md">
          <Layers className="w-3 h-3 text-nuvv-green" />
          <span>{serviceName}</span>
        </div>
      </div>

      {/* SVG Map Canvas */}
      <svg
        viewBox={`0 0 ${mapData.width} ${mapData.height}`}
        className="w-full h-56 sm:h-64 bg-[#0d131f] select-none"
      >
        {/* Subtle Map Grid lines */}
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="rgba(255, 255, 255, 0.04)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width={mapData.width} height={mapData.height} fill="url(#grid)" />

        {/* Polygons of Coverage Layer */}
        {mapData.polygonPaths.map((path, idx) => (
          <g key={idx}>
            {/* Polygon fill with glow */}
            <path
              d={path}
              fill={serviceColor}
              fillOpacity="0.22"
              stroke={serviceColor}
              strokeWidth="2.5"
              strokeDasharray="4 2"
              className="transition-all duration-500"
            />
          </g>
        ))}

        {/* User Location Radar Effect */}
        <g transform={`translate(${mapData.userPoint[0]}, ${mapData.userPoint[1]})`}>
          {/* Animated radar rings */}
          <circle r="22" fill={isInside ? '#00C853' : '#F59E0B'} opacity="0.2" className="animate-ping" />
          <circle r="14" fill={isInside ? '#00C853' : '#F59E0B'} opacity="0.35" />
          <circle
            r="6"
            fill={isInside ? '#00E676' : '#FBBF24'}
            stroke="#ffffff"
            strokeWidth="2"
            className="shadow-md"
          />
        </g>
      </svg>

      {/* Bottom Map Legend */}
      <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-gray-300">
        <div className="flex items-center space-x-2">
          <span
            className="w-3 h-3 rounded-sm border inline-block"
            style={{ backgroundColor: `${serviceColor}44`, borderColor: serviceColor }}
          />
          <span className="text-[11px] text-gray-300">
            Polígono: <strong className="text-white">{matchedZoneName || 'Zona de Atendimento'}</strong>
          </span>
        </div>

        <div className="flex items-center space-x-1 text-[11px] text-gray-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
          <span>Seu Endereço</span>
        </div>
      </div>
    </div>
  );
};
