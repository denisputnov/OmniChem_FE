import { Divider, Row } from "antd";
import PickerDate from "../pickerDate/PickerDate";
import "./analyticsСontent.css";
import StatisticsBlock from "../StatisticsBlock/StatisticsBlock";
import { statiscticData } from "../StatisticsBlock/statisticData";


function AnalyticsСontent() {
 
  return (
    <div className="AnalyticsСontent">
      <div className="AnalyticsСontent-container">
        <div className="menuTabs-wrapper">
          <PickerDate />
        </div>
        <Divider/>
        <div className="usersStat-container">
        <Row gutter={[10, 10]}>
          {statiscticData.map((userItemData) => (
            <StatisticsBlock key={statiscticData.statisticName} {...userItemData} />
        ))}
        </Row>
        </div>
      </div>
    </div>
  )
}

export default AnalyticsСontent;
