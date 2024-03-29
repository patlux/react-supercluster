# react-supercluster

[![NPM](https://img.shields.io/npm/v/react-supercluster.svg)](https://www.npmjs.com/package/react-supercluster)

> A react hook for mapbox's [supercluster](https://github.com/mapbox/supercluster) library

```tsx
const { clusters } = useSupercluster({
  points: geojsonPoints,
  bounds: mapBoundaries,
  zoom: mapZoomLevel,
});
```

Easy, right? 😎

![patlux github io_react-supercluster_](https://user-images.githubusercontent.com/4481570/62493318-5342c780-b7c0-11e9-84ed-e05f3f2f5cb1.png)

[**Live Example**](https://patlux.github.io/react-supercluster/)

## Install

You need to have React [16.8.0](https://reactjs.org/blog/2019/02/06/react-v16.8.0.html) or later installed to use this library.

**yarn**

```bash
yarn add react-supercluster supercluster
```

**npm**

```bash
npm install --save react-supercluster supercluster
```

**Typescript**

If you use typescript, also install the type definitions `@types/supercluster`.

## Usage

You can find a working example in the folder `example/`. The example uses [pigeon-map](https://github.com/mariusandra/pigeon-maps) for demonstration purpose, but you can use any map library you want.

Say you have a list of items:

```tsx
const items = [
  {
    "id": "5d443711277ad1bb99d7db7d",
    "name": "Your really cool stuff",
    "coordinates": { "lat": 49.0214124, "lng": 11.2141024 }
  },
  ...
]
```

Then you have to transform your list to the expected format, which is the following:

```tsx
const geojsonPoints = items.map(item => {
  return {
    type: 'Feature',
    properties: {
      itemId: item.id,
    },
    geometry: {
      type: 'Point',
      coordinates: [item.coordinates.lng, item.coordinates.lat],
    },
  };
});
```

Then you can pass the points to `useSupercluster`:

```tsx
import useSupercluster from 'react-supercluster';

const { clusters } = useSupercluster({
  points: geojsonPoints,
  bounds: mapBoundaries,
  zoom: mapZoomLevel,
});

<YourMap>
  {clusters.map(cluster => {
    if (cluster.properties.cluster) {
      return <YourMapClusterMarker />;
    }
    return <YourMapPinMarker />;
  })}
</YourMap>;
```

## License

MIT © [patlux](https://github.com/patlux)
