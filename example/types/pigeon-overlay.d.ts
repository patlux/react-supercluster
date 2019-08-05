declare module 'pigeon-overlay' {
  import React from 'react';

  export interface PigeonOverlayProps {
    anchor: number[];
    offset?: number[];

    className?: string;
    style?: any;
  }
  const PigeonOverlay: React.ComponentType<PigeonOverlayProps>;
  export default PigeonOverlay;
}
