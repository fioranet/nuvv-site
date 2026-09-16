/**
 * Point-in-Polygon (Ray Casting) Engine for GeoJSON Geometries
 * Determines whether a geographical coordinate [lng, lat] is located within a Polygon or MultiPolygon.
 */

export type Coordinate = [number, number]; // [longitude, latitude] in WGS84

export interface GeoJSONPolygon {
  type: 'Polygon';
  coordinates: Coordinate[][]; // [0] = outer ring, [1..n] = inner rings (holes)
}

export interface GeoJSONMultiPolygon {
  type: 'MultiPolygon';
  coordinates: Coordinate[][][];
}

export interface GeoJSONFeature {
  type: 'Feature';
  properties?: Record<string, any>;
  geometry: GeoJSONPolygon | GeoJSONMultiPolygon;
}

export interface GeoJSONFeatureCollection {
  type: 'FeatureCollection';
  features: GeoJSONFeature[];
}

export interface BoundingBox {
  minLng: number;
  minLat: number;
  maxLng: number;
  maxLat: number;
}

/**
 * Calculates bounding box for quick pre-filtering
 */
export function calculateBoundingBox(ring: Coordinate[]): BoundingBox {
  let minLng = Infinity;
  let minLat = Infinity;
  let maxLng = -Infinity;
  let maxLat = -Infinity;

  for (let i = 0; i < ring.length; i++) {
    const [lng, lat] = ring[i];
    if (lng < minLng) minLng = lng;
    if (lng > maxLng) maxLng = lng;
    if (lat < minLat) minLat = lat;
    if (lat > maxLat) maxLat = lat;
  }

  return { minLng, minLat, maxLng, maxLat };
}

/**
 * Checks if a point is within a bounding box
 */
function isPointInBBox(point: Coordinate, bbox: BoundingBox): boolean {
  const [lng, lat] = point;
  return (
    lng >= bbox.minLng &&
    lng <= bbox.maxLng &&
    lat >= bbox.minLat &&
    lat <= bbox.maxLat
  );
}

/**
 * Standard Ray Casting algorithm for a single ring of coordinates
 * @param point [longitude, latitude]
 * @param ring Array of [longitude, latitude] defining a closed polygon boundary
 */
export function isPointInRing(point: Coordinate, ring: Coordinate[]): boolean {
  const [x, y] = point;
  let inside = false;

  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const xi = ring[i][0];
    const yi = ring[i][1];
    const xj = ring[j][0];
    const yj = ring[j][1];

    const intersect =
      yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;

    if (intersect) {
      inside = !inside;
    }
  }

  return inside;
}

/**
 * Checks if point is inside a GeoJSON Polygon (accounting for outer boundary and interior holes)
 */
export function isPointInPolygon(
  point: Coordinate,
  polygonCoordinates: Coordinate[][]
): boolean {
  if (!polygonCoordinates || polygonCoordinates.length === 0) return false;

  const outerRing = polygonCoordinates[0];
  const bbox = calculateBoundingBox(outerRing);

  // Fast pre-filter using Bounding Box
  if (!isPointInBBox(point, bbox)) {
    return false;
  }

  // Must be inside outer ring
  if (!isPointInRing(point, outerRing)) {
    return false;
  }

  // Must NOT be inside any inner rings (holes)
  for (let i = 1; i < polygonCoordinates.length; i++) {
    const hole = polygonCoordinates[i];
    if (isPointInRing(point, hole)) {
      return false; // Point falls inside a hole
    }
  }

  return true;
}

/**
 * Checks if point is inside a GeoJSON MultiPolygon
 */
export function isPointInMultiPolygon(
  point: Coordinate,
  multiPolygonCoordinates: Coordinate[][][]
): boolean {
  for (let i = 0; i < multiPolygonCoordinates.length; i++) {
    if (isPointInPolygon(point, multiPolygonCoordinates[i])) {
      return true;
    }
  }
  return false;
}

/**
 * Tests if a point [longitude, latitude] is inside a GeoJSON Feature or FeatureCollection
 */
export function isPointInGeoJSON(
  point: Coordinate,
  geoJson: GeoJSONFeatureCollection | GeoJSONFeature | GeoJSONPolygon | GeoJSONMultiPolygon
): { isInside: boolean; matchedFeature?: GeoJSONFeature } {
  if (!geoJson) return { isInside: false };

  if (geoJson.type === 'FeatureCollection') {
    for (const feature of geoJson.features) {
      if (isPointInGeometry(point, feature.geometry)) {
        return { isInside: true, matchedFeature: feature };
      }
    }
    return { isInside: false };
  }

  if (geoJson.type === 'Feature') {
    const isInside = isPointInGeometry(point, geoJson.geometry);
    return { isInside, matchedFeature: isInside ? geoJson : undefined };
  }

  return { isInside: isPointInGeometry(point, geoJson) };
}

/**
 * Helper to test a geometry directly
 */
function isPointInGeometry(
  point: Coordinate,
  geometry: GeoJSONPolygon | GeoJSONMultiPolygon
): boolean {
  if (!geometry) return false;

  if (geometry.type === 'Polygon') {
    return isPointInPolygon(point, geometry.coordinates);
  }

  if (geometry.type === 'MultiPolygon') {
    return isPointInMultiPolygon(point, geometry.coordinates);
  }

  return false;
}
