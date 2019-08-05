declare module 'pigeon-maps' {
  import React from 'react';

  export interface MapClickEvent {
    event: React.MouseEvent;
    latLng: number[];
    pixel: number[];
  }

  export interface MapState {
    center: number[];
    zoom: number;
    bounds: MapStateBounds;
  }

  export interface MapStateBounds {
    ne: number[];
    sw: number[];
  }

  export interface MapBoundsChangedEvent extends MapState {
    initial: boolean;
  }

  export interface MapProps {
    center?: number[];
    defaultCenter?: number[];

    zoom?: number;
    defaultZoom?: number;

    width?: number;
    defaultWidth?: number;

    height?: number;
    defaultHeight?: number;

    provider?: (x?: number, y?: number, z?: number, dpr?: number[]) => string;
    dprs?: number[];
    children?: React.ReactNode;

    animate?: boolean;
    animateMaxScreens?: number;

    minZoom?: number;
    maxZoom?: number;

    metaWheelZoom?: boolean;
    metaWheelZoomWarning?: string;
    twoFingerDrag?: boolean;
    twoFingerDragWarning?: string;
    warningZIndex?: number;

    attribution?: any;
    attributionPrefix?: any;

    zoomSnap?: boolean;
    mouseEvents?: boolean;
    touchEvents?: boolean;

    onClick?: (event: MapClickEvent) => void;
    onBoundsChanged?: (event: MapBoundsChangedEvent) => void;
    onAnimationStart?: () => void;
    onAnimationStop?: () => void;

    limitBounds?: 'center' | 'edge';
  }
  const Map: React.ComponentType<MapProps>;
  export default Map;
}
