import React, {Component} from 'react';
import styled from 'styled-components';
import {FlexibleXYPlot, LineSeries, MarkSeries} from 'react-vis';

const getConnections = (currentCoordinates, directionData, values) => {
  const connections = [];
  if (Number.isInteger(directionData.n)) {
    const { x, y } = values[directionData.n][0];
    connections.push(currentCoordinates);
    connections.push({ x, y });
  }
  if (Number.isInteger(directionData.s)) {
    const { x, y } = values[directionData.s][0];
    connections.push(currentCoordinates);
    connections.push({ x, y });
  }
  if (Number.isInteger(directionData.e)) {
    const { x, y } = values[directionData.e][0];
    connections.push(currentCoordinates);
    connections.push({ x, y });
  }
  if (Number.isInteger(directionData.w)) {
    const { x, y } = values[directionData.w][0];
    connections.push(currentCoordinates);
    connections.push({ x, y });
  }
  return connections;
};

class MapComponent extends Component {
  render() {
    const {mapGraph} = this.props;
    const values = Object.values(mapGraph);
    const coordinates = values.map(coordinate => coordinate[0]);
    const exits = values.map(exit => exit[1]);

    const lineDisplay = values.map((value, index) => {
      const connections = getConnections(coordinates[index], exits[index], values);
      return (
        <LineSeries
          data={connections}
          color="#8158FC"
          strokeWidth={1}
          className="line-series"
        />
      );
    });

    return (
      <MapWrapper>
        <FlexibleXYPlot>
          <MarkSeries
            data={coordinates}
            color="#FFC15E"
            strokeWidth={1}
            className="mark-series"
          />
          {lineDisplay}
        </FlexibleXYPlot>
      </MapWrapper>
    );
  }
}

export default MapComponent;

const MapWrapper = styled.div`
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
