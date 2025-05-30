'use client';
import { DateRange,Range,RangeKeyDict } from "react-date-range";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';


interface DatePickerProps{
    value:Range,
    onchange:(value :RangeKeyDict)=>void;
    bookedDates?:Date[];
}
const DatePicker=({value,onchange,bookedDates}:DatePickerProps)=>{
 return(
    <DateRange
    className="w-full border border-gray-400 rounded-xl mb-4"
    rangeColors={['#262626']}
    ranges={[value]}
    date={new Date()}
    onChange={onchange}
    direction='vertical'
    showDateDisplay={false}
    minDate={new Date()}
    disabledDates={bookedDates}
    />
 )
}
export default DatePicker