import Chart from 'react-google-charts';

export const data = [
    ["Task", "Hours per Day"],
    ["Work", 11],
    ["Eat", 2],
    ["Commute", 2],
    ["Watch TV", 2],
    ["Sleep", 7],
  ];
  
  export const options = {
    title: "Sentiment Analysis of Comments",
    is3D: true,
    backgroundColor: 'transparent',
    titleTextStyle:{
        color: 'white'
    },
    legend: {
        textStyle: {
            color: 'white'
        }
    }
  };
export function Pie({data = data}) {
    return (
      <Chart
        chartType="PieChart"
        data={data}
        options={options}
        width={"100%"}
        height={"400px"}
      />
    );
  }
export default Pie