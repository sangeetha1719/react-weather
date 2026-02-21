const WeatherDetail = ({ label, value, icon, className = 'value' }) => (
  <div className="grid-item">
    <p className="label">{label}</p>
    <p className={className}>{value}</p>
    {icon && <img src={icon} alt={label} />}
  </div>
);

export default WeatherDetail;
