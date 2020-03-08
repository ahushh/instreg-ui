import React from 'react';

import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { AdvocacyData } from '../data/Advocacy';
import { toPercent } from '../utils';
import Heading from 'arui-feather/heading';

const barStyle = { stroke: '#667788', strokeWidth: 1 };

class CustomizedAxisTick extends React.PureComponent<any> {
  render() {
    const {
      x, y, stroke, payload,
    } = this.props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={0} textAnchor="end" fill="#666" transform="rotate(-90)">{payload.value}</text>
      </g>
    );
  }
}


const DiagonalHatch = (props: any) => {
  const {
    fill, x, y, width, height,
  } = props;

  return (<g>
    <pattern id="diagonalHatch" width="10" height="10" patternTransform="rotate(-45 0 0)" patternUnits="userSpaceOnUse">
      <line x1="0" y1="0" x2="0" y2="10" style={{ stroke: 'black', strokeWidth: 7 }} />
    </pattern>
    <rect x={x} y={y} width={width} height={height} fill="url(#diagonalHatch)" style={barStyle} />
  </g>)
};


interface IProps {
  type: 'tel' | 'thal' | 'ind' | 'all';
}

export class Chart extends React.Component<IProps> {

  toChartsData(data: Array<string[]>) {
    return data.map(([name, thal, tel, ind]) => {
      let obj: any = {
        name
      };
      if (this.props.type === 'all') {
        obj = {
          ...obj,
          thal: toPercent(+thal),
          tel: toPercent(+tel),
          ind: toPercent(+ind)
        };
      } else if (this.props.type === 'tel') {
        obj = {
          ...obj,
          tel: toPercent(+tel),
        };
      } else if (this.props.type === 'thal') {
        obj = {
          ...obj,
          thal: toPercent(+thal),
        };
      } else if (this.props.type === 'ind') {
        obj = {
          ...obj,
          ind: toPercent(+ind)
        };
      }
      return obj;
    });
  }

  render() {
    const data = this.toChartsData(AdvocacyData);
    return (
      <div style={{ padding: '10px' }}>
        <Heading size='xs'>
          Поддержка выбранными странами
        </Heading>
        <BarChart
          width={1500}
          height={500}
          data={data}
        // margin={{
        //   top: 5, right: 30, left: 20, bottom: 5,
        // }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis height={200} dataKey="name" tick={<CustomizedAxisTick />} interval={0} padding={{ bottom: 150 } as any} />
          <YAxis domain={[0, 100]} unit='%' />
          <Tooltip formatter={x => `${x}%`} />
          <Legend />
          <Bar dataKey="tel" style={barStyle} name='Теллурократия' fill="#ffffff" />
          <Bar dataKey="thal" style={barStyle} name='Талассократия' fill="#667788" />
          <Bar dataKey="ind" style={barStyle} name='Независимый' shape={<DiagonalHatch />} />
        </BarChart>
      </div>);
  }

}