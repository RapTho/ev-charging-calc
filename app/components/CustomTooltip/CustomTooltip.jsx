const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-current p-2.5 rounded-lg ring-4">
        <p className="text-gray-50 dark:text-gray-900">{`kWh: ${payload[0].value}`}</p>
        <p className="text-gray-50 dark:text-gray-900">{`Date: ${label}`}</p>
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
