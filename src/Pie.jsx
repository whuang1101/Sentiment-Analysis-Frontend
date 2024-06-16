import Chart from 'react-google-charts';
  
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

      />
    );
  }
export default Pie