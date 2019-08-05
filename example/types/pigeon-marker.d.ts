declare module 'pigeon-marker' {
  import React from 'react';

  export interface PigeonMarkerEvent {
    event: React.MouseEvent;
    anchor: number[];
    payload?: any;
  }

  export interface PigeonMarkerProps {
    anchor: number[];
    payload?: any;

    hover?: boolean;

    onClick?: (event: PigeonMarkerEvent) => void;
    onContextMenu?: (event: PigeonMarkerEvent) => void;
    onMouseOver?: (event: PigeonMarkerEvent) => void;
    onMouseOut?: (event: PigeonMarkerEvent) => void;
  }
  const PigeonMarker: React.ComponentType<PigeonMarkerProps>;
  export default PigeonMarker;
}
