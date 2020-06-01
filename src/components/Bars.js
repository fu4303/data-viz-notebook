import React, { useState } from "react";
import Tooltip from "./Tooltip";

const Bars = ({
  data,
  dimensions,
  xAccessor,
  yAccessor,
  widthAccessor,
  heightAccessor,
  xLabelAccessor,
  yLabelAccessor,
}) => {
  const [isShown, setIsShown] = useState(false);
  const [tooltipInfo, setTooltipInfo] = useState([]);
  return (
    <>
      {data.map((d, i) => (
        <React.Fragment key={i}>
          {d.length && (
            <text
              x={xLabelAccessor(d)}
              y={yLabelAccessor(d)}
              fill="cornflowerblue"
              style={{
                fontSize: "12px",
                color: "grey",
                textAnchor: "middle",
              }}
            >
              {d.length}
            </text>
          )}

          <rect
            x={xAccessor(d)}
            y={yAccessor(d)}
            width={widthAccessor(d)}
            height={heightAccessor(d)}
            fill="cornflowerblue"
            onMouseEnter={() => {
              setTooltipInfo({
                x: xAccessor(d) + widthAccessor(d) / 2,
                y: yAccessor(d),
                content: [`${d.length}`],
              });
              return setIsShown(true);
            }}
            onMouseLeave={() => setIsShown(false)}
          />
        </React.Fragment>
      ))}
      <Tooltip
        x={tooltipInfo.x}
        y={tooltipInfo.y}
        isShown={isShown}
        content={tooltipInfo.content}
        dimensions={dimensions}
      />
    </>
  );
};

export default Bars;
