import * as React from 'react';
import { BBox, GeoJsonProperties } from 'geojson';
import Supercluster from 'supercluster';

export interface UseSuperclusterArgument<P, C> {
  points: Array<Supercluster.PointFeature<P>>;
  bounds?: BBox;
  zoom?: number;
  options?: Supercluster.Options<P, C>;
}

const useSupercluster = <
  P extends GeoJsonProperties = Supercluster.AnyProps,
  C extends GeoJsonProperties = Supercluster.AnyProps
>({
  points,
  bounds,
  zoom,
  options,
}: UseSuperclusterArgument<P, C>) => {
  const superclusterRef = React.useRef<Supercluster<P, C>>();
  const [clusters, setClusters] = React.useState<
    Array<Supercluster.ClusterFeature<C> | Supercluster.PointFeature<P>>
  >([]);

  React.useEffect(() => {
    if (!superclusterRef.current) {
      superclusterRef.current = new Supercluster(options);
    }

    superclusterRef.current.load(points);
    if (bounds && zoom) {
      setClusters(superclusterRef.current.getClusters(bounds, zoom));
    }
  }, [points]);

  React.useEffect(() => {
    if (superclusterRef.current && bounds && zoom) {
      setClusters(superclusterRef.current.getClusters(bounds, zoom));
    }
  }, [bounds, zoom]);

  return {
    clusters,
    supercluster: superclusterRef.current,
  };
};

export default useSupercluster;
