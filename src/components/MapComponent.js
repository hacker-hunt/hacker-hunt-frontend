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
  state = {
    roomValue: null
  };
  render() {
    const { roomValue } = this.state;
    const {mapGraph } = this.props;
    const values = Object.values(mapGraph);
    const keys = Object.keys(mapGraph);
    const coordinates = values.map(coordinate => coordinate[0]);
    const exits = values.map(exit => exit[1]);

    const lineDisplay = values.map((value, index) => {
      const connections = getConnections(coordinates[index], exits[index], values);
      return (
        <LineSeries
          data={connections}
          color="#5C578C"
          strokeWidth={1}
          className="line-series"
          key={`line-series${index}`}
        />
      );
    });

    return (
      <MapWrapper>
        {roomValue ? <button>{roomValue}</button> : null}
        <FlexibleXYPlot>
          {lineDisplay}
          <MarkSeries
            data={coordinates}
            color="#FFC15E"
            strokeWidth={1}
            size={4}
            className="mark-series"
            onValueMouseOver={(datapoint) => {
              // display room number on mouseover
              keys.map(keyValue => {
                if (mapGraph[keyValue][0].x === datapoint.x &&
                      mapGraph[keyValue][0].y === datapoint.y
                ) {
                  this.setState({ roomValue: keyValue})
                }
                return keyValue;
              })
            }}
            onValueMouseOut={() => this.setState({roomValue: null})}
          />
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
    z-index: 1000 !important;
    &:hover {
      cursor: pointer;
    }
  }
  button {
    position: absolute;
    right: 2rem;
    background: none;
    border: 2px solid #FFC15E;
    border-radius: 4px;
    padding: 1rem 2rem;
    font-size: 2rem;
    color: #FFC15E;
  }
`;
