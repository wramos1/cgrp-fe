import React, { useState } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // Main CSS file
import 'react-date-range/dist/theme/default.css'; // Default theme CSS
import enUS from 'date-fns/locale/en-US';
import CalendarIcon from '../icons/CalendarIcon';

const DateRangePicker = ({ onDatesChange }) => {
    const [selectionRange, setSelectionRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    });

    const [calendarOpen, setCalendarOpen] = useState(false);

    const formattedStartDate = `${selectionRange.startDate.toLocaleDateString()}`;
    const formattedEndDate = `${selectionRange.endDate.toLocaleDateString()}`

    const handleSelect = (ranges) => {
        setSelectionRange(ranges.selection);
        if (onDatesChange) {
            onDatesChange(ranges.selection);
        }
    };

    return (
        <div className='date-range-section'>
            <div className='formatted-date-button' onClick={() => setCalendarOpen(!calendarOpen)}>
                <div className="calendar-icon">
                    <CalendarIcon width='18px' height='18px' />
                </div>
                <div className="dates">
                    <p>
                        {formattedStartDate}
                    </p>
                    <span> - </span>
                    <p>
                        {formattedEndDate}
                    </p>
                </div>
            </div>

            {calendarOpen &&
                <div className="date-picker">
                    <DateRange
                        ranges={[selectionRange]}
                        onChange={handleSelect}
                        moveRangeOnFirstSelection={false}
                        editableDateInputs={false}
                        minDate={new Date()}
                        locale={enUS}
                    />
                </div>}
        </div>
    );
};

export default DateRangePicker;
