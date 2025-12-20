import  { type DateArg,format,formatDistanceToNow } from "date-fns"
const formatDate=(date:DateArg<Date>)=>
{
    return format(date,'dd MMM yyyy h:mm a')
}
export default formatDate;
export function timeAgo(date:DateArg<Date>)
{
    return formatDistanceToNow(date)+ " ago "
}