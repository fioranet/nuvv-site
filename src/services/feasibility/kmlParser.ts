import {
  Coordinate,
  GeoJSONFeature,
  GeoJSONFeatureCollection,
  GeoJSONPolygon,
} from './pointInPolygon';

/**
 * Parses raw KML text (e.g. from Google Earth or exported from KMZ) and extracts polygon geometries into GeoJSON format.
 */
export function parseKmlToGeoJSON(kmlString: string): GeoJSONFeatureCollection {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(kmlString, 'text/xml');
  const placemarks = xmlDoc.getElementsByTagName('Placemark');

  const features: GeoJSONFeature[] = [];

  for (let i = 0; i < placemarks.length; i++) {
    const placemark = placemarks[i];
    const name =
      placemark.getElementsByTagName('name')[0]?.textContent || `Polígono ${i + 1}`;
    const description =
      placemark.getElementsByTagName('description')[0]?.textContent || '';

    // Search for Polygons
    const polygons = placemark.getElementsByTagName('Polygon');
    for (let p = 0; p < polygons.length; p++) {
      const polygonEl = polygons[p];
      const outerBoundary = polygonEl.getElementsByTagName('outerBoundaryIs')[0];
      const coordsText =
        outerBoundary?.getElementsByTagName('coordinates')[0]?.textContent ||
        polygonEl.getElementsByTagName('coordinates')[0]?.textContent;

      if (coordsText) {
        const ring = parseCoordinatesString(coordsText);
        if (ring.length >= 3) {
          // Parse inner boundaries (holes) if present
          const innerBoundaries = polygonEl.getElementsByTagName('innerBoundaryIs');
          const holes: Coordinate[][] = [];

          for (let h = 0; h < innerBoundaries.length; h++) {
            const holeCoordsText =
              innerBoundaries[h].getElementsByTagName('coordinates')[0]?.textContent;
            if (holeCoordsText) {
              const holeRing = parseCoordinatesString(holeCoordsText);
              if (holeRing.length >= 3) {
                holes.push(holeRing);
              }
            }
          }

          const geometry: GeoJSONPolygon = {
            type: 'Polygon',
            coordinates: [ring, ...holes],
          };

          features.push({
            type: 'Feature',
            properties: {
              name,
              description,
              source: 'KML/KMZ',
            },
            geometry,
          });
        }
      }
    }
  }

  return {
    type: 'FeatureCollection',
    features,
  };
}

/**
 * Parses KML format coordinates: "lng,lat,alt lng,lat,alt ..." into Coordinate[] [lng, lat]
 */
function parseCoordinatesString(coordsString: string): Coordinate[] {
  const points = coordsString.trim().split(/\s+/);
  const ring: Coordinate[] = [];

  for (const point of points) {
    if (!point) continue;
    const parts = point.split(',');
    if (parts.length >= 2) {
      const lng = parseFloat(parts[0]);
      const lat = parseFloat(parts[1]);
      if (!isNaN(lng) && !isNaN(lat)) {
        ring.push([lng, lat]);
      }
    }
  }

  // Ensure closed polygon ring
  if (
    ring.length > 2 &&
    (ring[0][0] !== ring[ring.length - 1][0] || ring[0][1] !== ring[ring.length - 1][1])
  ) {
    ring.push([...ring[0]]);
  }

  return ring;
}

/**
 * Helper to safely extract string from text or zipped KMZ array buffer
 */
export async function readKmzOrKmlFile(file: File): Promise<string> {
  if (file.name.endsWith('.kmz')) {
    // If it's KMZ, try reading uncompressed text or fallback
    try {
      const arrayBuffer = await file.arrayBuffer();
      const textDecoder = new TextDecoder('utf-8');
      const rawText = textDecoder.decode(arrayBuffer);

      // Search for embedded <kml ... </kml> block inside the zip stream
      const kmlStart = rawText.indexOf('<kml');
      const kmlEnd = rawText.indexOf('</kml>');

      if (kmlStart !== -1 && kmlEnd !== -1) {
        return rawText.substring(kmlStart, kmlEnd + 6);
      }
    } catch {
      // ignore
    }
  }

  // Standard text read for .kml or .geojson
  return file.text();
}
