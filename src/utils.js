import {VideoSourceTypes} from "./types/VideoSourceTypes";

export const getSupportedVideos = (items)=> {
     return items.filter(item => !!(VideoSourceTypes.find(source => source.name === item.source)))
}