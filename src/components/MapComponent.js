import React, { Component } from 'react';
import styled from 'styled-components';
import { FlexibleXYPlot, LineSeries, MarkSeries } from 'react-vis';

class MapComponent extends Component {
  render() {
    const { mapGraph } = this.props;
    const values = Object.values(mapGraph);
    const coordinates = values.map(coordinate => coordinate[0]);
    const exits = values.map(exit => exit[1]);
    return (
      <MapWrapper>
        <FlexibleXYPlot>
          <LineSeries
            data={exits}
            color="#8158FC"
            className="line-series"
          />
          <MarkSeries
            data={coordinates}
            color="#FFC15E"
            strokeWidth={1}
            className="mark-series"
          />
        </FlexibleXYPlot>
      </MapWrapper>
    );
  }
}

export default MapComponent;

const MapWrapper = styled.div`
  //min-width: 600px;
  width: 100%;
  height: 100%;
  padding: 2.5rem;
  h1 {
    text-align: center;
  }
  .mark-series {
    &:hover {
      cursor: pointer;
    }
  }
`;
