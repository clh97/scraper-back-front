import React, { Component } from 'react'
import { Bar } from 'react-chartjs-2';

// import LinearMeter from './LinearMeter';
import Loading from './Loading';

const defaultChartOptions = {
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: true
      }
    }]
  }
}

export default class BarChartCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      doneLoading: false,
      chartData: null
    }
  }

  componentDidMount() {
    const {
      chords
    } = this.props.chartData;

    this.setState({
      chartData: this.prepareChartData(chords)
    });
  }

  // https://www.paulirish.com/2009/random-hex-color-code-snippets/
  randomHexColor() {
    return '#' + (function co(lor) {
      return (lor +=
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'][Math.floor(Math.random() * 16)])
        && (lor.length == 6) ? lor : co(lor);
    })('');
  }

  // took from somewhere in the internet
  compressArray(original) {
    var compressed = [];
    // make a copy of the input array
    var copy = original.slice(0);
    // first loop goes over every element
    for (var i = 0; i < original.length; i++) {
      var myCount = 0;
      // loop over every element in the copy and see if it's the same
      for (var w = 0; w < copy.length; w++) {
        if (original[i] == copy[w]) {
          // increase amount of times duplicate is found
          myCount++;
          // sets item to undefined
          delete copy[w];
        }
      }
      if (myCount > 0) {
        var a = new Object();
        a.value = original[i];
        a.count = myCount;
        compressed.push(a);
      }
    }
    return compressed;
  };


  render() {
    const {
      doneLoading,
      chartData
    } = this.state;

    const {
      artist,
      name
    } = this.props.chartData;

    if (!doneLoading) {
      return (
        <Loading />
      );
    }

    return (
      <div className='card'>
        <CardTitle artist={artist} />
        <CardSubtitle name={name} />
        <div className='card__content'>
          {
            chartData &&
            <Bar
              data={chartData}
              options={defaultChartOptions}
            />
          }
          {/* {
            this.state.pureData &&
            <LinearMeter
              factor={33.33}
              title='Nível de dificuldade:'
              value={this.state.pureData.labels.length}
            />
          } */}
        </div>
      </div>
    )
  }

  prepareChartData(chords) {
    let values = Object.values(chords)
    let collection = this.compressArray(values); // sort of python's collection implemented in js
    
    const labels = [];
    const data = [];

    Object
      .keys(collection)
      .forEach(key => {
        labels.push(collection[key].value);
        data.push(collection[key].count)
      })

    const chartData = {
      labels: [...labels],
      datasets: [{
        label: 'Acordes',
        backgroundColor: this.randomHexColor(),
        data: [...data],
      }]
    };

    this.setState({
      doneLoading: true,
      pureData: {
        labels,
        data
      }
    })

    return chartData;
  }
}

const CardTitle = props => (
  props.artist &&
  <h5 className='card__title'>
    {props.artist}
  </h5>
)

const CardSubtitle = props => (
  props.name &&
  <h3 className='card__subtitle'>
    {props.name}
  </h3>
)