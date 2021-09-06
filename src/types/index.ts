export type PredictionType = {
    description: string
    place_id: string
    reference: string
    matched_substrings: any[]
    tructured_formatting: Object
    terms: Object[]
    types: string[]
  }

 export type Region = {
    latitude: number
    longitude: number
    latitudeDelta: number
    longitudeDelta: number
  }
  
  export type Restaurant = {
    business_status?: string
    geometry: Geometry
    icon?: string 
    icon_background_color?: string
    name: string 
    opening_hours?: {open_now: boolean}
    photos?: Photos[]
    photo_url?: string
    place_id: string
    rating: number
    user_ratings_total: number
    vicinity: string
    action?: () => void
  }


  export type Reviews = {
    author_name: string,
    profile_photo_url: string,
    rating: number,
    text: string,
    relative_time_description: string,
    time: number
  }

  type Photos = {
    height: number
    width: number
    photo_reference: string
  }

  type Geometry = {
    location: {lat: number, lng: number} 
  }