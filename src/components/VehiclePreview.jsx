const VehiclePreview = ({ vehicle }) => {
    return (
        <div className='vehicle-preview-card'>
            <div className='vehicle-header'>
                <h1>{vehicle.year} {vehicle.make}</h1>
            </div>
            <div className='vehicle-img-preview'>
                <img src="https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?cs=srgb&dl=pexels-mikebirdy-170811.jpg&fm=jpg" alt="" />
            </div>
            <div className="vehicle-description">
                <p>This car is cool</p>
            </div>
        </div>
    );
}

export default VehiclePreview;