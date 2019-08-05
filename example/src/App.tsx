import React from 'react';
import Map, { MapState, MapBoundsChangedEvent } from 'pigeon-maps';
import Marker from 'pigeon-marker';
import Overlay from 'pigeon-overlay';

import { ClusterProperties, AnyProps } from 'supercluster';
import useSupercluster from 'react-supercluster';
import { BBox, Feature, Point } from 'geojson';

const styles = {
  container: {
    paddingTop: '1rem',
  },
  map: {
    margin: '0 auto',
    width: 600,
    height: 400,
    boxShadow: '#cdcdcd 0px 1px 4px',
  },
  cluster: {
    width: 20,
    height: 20,
    lineHeight: '20px',
    backgroundColor: '#607d8b',
    color: 'white',
    borderRadius: 10,
    cursor: 'pointer',
    fontSize: 11,
  },
};

interface PointProperties {
  index: number;
}

function isClusterFeature(point: Feature): point is Feature<Point, ClusterProperties & AnyProps> {
  if (point && point.properties && point.properties.cluster) {
    return true;
  }
  return false;
}

function generateRandomPlaces(amount: number = 500) {
  const points: Feature<Point, PointProperties>[] = [];
  for (let i = 0; i < amount; i++) {
    points.push({
      type: 'Feature',
      properties: {
        index: i,
      },
      geometry: {
        type: 'Point',
        coordinates: [-180 + 360 * Math.random(), -80 + 160 * Math.random()],
      },
    });
  }
  return points;
}

const PLACES = generateRandomPlaces();

const App = () => {
  const [mapState, setMapState] = React.useState<MapState>({
    center: [-17.471730109760017, 14.732489324994077],
    zoom: 2,
    bounds: { ne: [-1, -1], sw: [-1, -1] },
  });

  const bbox = React.useMemo<BBox>(() => {
    const { sw, ne } = mapState.bounds;
    return [sw[0], sw[1], ne[0], ne[1]];
  }, [mapState.bounds]);

  const { clusters, supercluster } = useSupercluster({
    points: PLACES,
    bounds: bbox,
    zoom: mapState.zoom,
    options: {
      log: true,
    },
  });

  function handleBoundsChange({ center, zoom, bounds }: MapBoundsChangedEvent) {
    setMapState({ center, zoom, bounds });
  }

  function onClickCluster({ anchor, clusterId }: any) {
    if (!supercluster) {
      return;
    }
    const newZoom = supercluster.getClusterExpansionZoom(clusterId);
    setMapState(mapState => ({ ...mapState, center: anchor, zoom: newZoom }));
  }

  return (
    <div style={styles.container}>
      <div style={styles.map}>
        <Map
          center={mapState.center}
          zoom={mapState.zoom}
          defaultWidth={styles.map.width}
          defaultHeight={styles.map.height}
          onBoundsChanged={handleBoundsChange}
        >
          {Array.isArray(clusters) &&
            clusters.map((place, index) => {
              const anchor = place.geometry.coordinates;
              if (isClusterFeature(place)) {
                const clusterId = place.properties.cluster_id;
                return (
                  <Overlay
                    key={index}
                    anchor={anchor}
                    offset={[styles.cluster.height / 2, styles.cluster.width / 2]}
                  >
                    <div
                      style={{ ...styles.cluster, textAlign: 'center' }}
                      onClick={() => onClickCluster({ anchor, clusterId })}
                    >
                      {place.properties.point_count}
                    </div>
                  </Overlay>
                );
              }
              return <Marker key={index} anchor={anchor} payload={1} />;
            })}
        </Map>
      </div>
    </div>
  );
};
export default App;
