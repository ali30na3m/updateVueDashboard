export interface WeatherTypeData {
  city: string
  lat: string
  lng: string
  country: string
  iso2: string
  admin_name: string
  capital: string
  population: string
  population_proper: string
}

export interface WeatherApi {
  current_weather: CurrentWeather
  current_weather_units: CurrentWeatherUnits
  elevation: number
  generationtime_ms: number
  latitude: number
  longitude: number
  timezone: string
  timezone_abbreviation: string
  utc_offset_seconds: number
}

export interface CurrentWeather {
  temperature: number
  windspeed: number
  winddirection: number
  weathercode: number
  is_day: number
  time: string
}

export interface CurrentWeatherUnits {
  interval: string
  is_day: string
  temperature: string
  time: string
  weathercode: string
  winddirection: string
  windspeed: string
}
