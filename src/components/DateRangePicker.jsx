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

    const getDateDifference = (start, end) => {
        const startTime = new Date(start);
        const endTime = new Date(end);
        startTime.setHours(0, 0, 0, 0);
        endTime.setHours(0, 0, 0, 0);

        const diffInMilliseconds = endTime - startTime;
        const diffInDays = diffInMilliseconds / (1000 * 3600 * 24);

        const days = Math.max(diffInDays + 1, 1);

        const weeks = Math.floor(days / 7);
        const months = Math.floor(days / 30);

        let result = '';

        if (months > 0) {
            result += `${months} month${months !== 1 ? 's' : ''}`;
        }
        if (weeks > 0) {
            if (result) result += ', ';
            result += `${weeks} week${weeks !== 1 ? 's' : ''}`;
        }
        if (days > 0) {
            if (result) result += ', ';
            result += `${Math.ceil(days)} day${days !== 1 ? 's' : ''}`;
        }

        return result || '0 days';
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

            <div className="readable-time-frame">
                <p>
                    {`Duration: `}
                    <span>
                        {getDateDifference(selectionRange.startDate, selectionRange.endDate)}
                    </span>
                </p>
            </div>
        </div>
    );
};

export default DateRangePicker;
