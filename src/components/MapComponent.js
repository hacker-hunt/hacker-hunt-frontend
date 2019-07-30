import React, { Component } from 'react';
import styled from 'styled-components';
import { XYPlot, LineSeries, MarkSeries } from 'react-vis';

class MapComponent extends Component {
  render() {
    const { mapGraph } = this.props;
    const values = Object.values(mapGraph);
    const coordinates = values.map(coordinate => coordinate[0]);
    const exits = values.map(exit => exit[1]);
    console.log(exits);
    return (
        <MapWrapper>
          <XYPlot height={400} width={800}>
            <LineSeries data={exits} color="#8158FC"/>
            <MarkSeries data={coordinates} color="#FFC15E"/>
          </XYPlot>
        </MapWrapper>
    );
  }
}

export default MapComponent;

const MapWrapper = styled.div`
  min-width: 600px;
  width: 100%;
  h1 {
    text-align: center;
  }
`;
