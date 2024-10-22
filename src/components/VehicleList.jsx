import React from 'react'
import VehiclePreview from './VehiclePreview'

const VehicleList = ({ vehicles }) => {

    const mapVehicles = () => {
        return vehicles.map((vehicle) => {
            return (
                <VehiclePreview
                    key={vehicle.id}
                    vehicle={vehicle}
                />
            )
        })
    }
    return (
        <div className='vehicle-list'>
            {mapVehicles()}
        </div>
    );
}

export default VehicleList;