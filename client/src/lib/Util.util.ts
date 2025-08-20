import  { type DateArg,format } from "date-fns"
const formatDate=(date:DateArg<Date>)=>
{
    return format(date,'dd MMM yyyy h:mm a')
}
export default formatDate;