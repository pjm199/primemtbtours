# Weather Widget - Usage Guide

A complete, self-contained Next.js weather component that you can easily integrate into any Next.js project.

## Features

- ✅ Complete weather information display
- ✅ Metric/Imperial system toggle
- ✅ City search with autocomplete
- ✅ Responsive design
- ✅ All styles included (CSS-in-JS)
- ✅ Self-contained - no external CSS files needed
- ✅ Fixed dimensions when switching unit systems

## Installation

### 1. Copy the Component

Copy `WeatherWidget.js` to your project's components folder:

```
your-project/
  components/
    WeatherWidget.js
```

### 2. Copy Weather Icons

Copy the `/public/icons/` folder to your project's public directory:

```
your-project/
  public/
    icons/
      *.svg
      *.png
```

### 3. Get API Key

Get a free API key from [OpenWeatherMap](https://openweathermap.org/api):

1. Sign up at OpenWeatherMap
2. Go to API Keys section
3. Generate a new key

## Usage

### Basic Usage

```jsx
import WeatherWidget from "@/components/WeatherWidget";

export default function Page() {
  return (
    <div>
      <WeatherWidget apiKey="your-openweathermap-api-key" />
    </div>
  );
}
```

### Advanced Usage

```jsx
import WeatherWidget from "@/components/WeatherWidget";

export default function Page() {
  return (
    <div>
      <WeatherWidget
        apiKey="your-openweathermap-api-key"
        defaultCity="London"
        predefinedCities={[
          "New York",
          "London",
          "Tokyo",
          "Paris",
          "Sydney",
          "Berlin",
          "Rome",
        ]}
        className="my-custom-class"
      />
    </div>
  );
}
```

## Props

| Prop               | Type     | Required | Default                                            | Description                      |
| ------------------ | -------- | -------- | -------------------------------------------------- | -------------------------------- |
| `apiKey`           | string   | ✅ Yes   | -                                                  | Your OpenWeatherMap API key      |
| `defaultCity`      | string   | No       | "lavagna"                                          | Initial city to display          |
| `predefinedCities` | string[] | No       | ["New York", "London", "Tokyo", "Paris", "Sydney"] | Quick-select cities in dropdown  |
| `className`        | string   | No       | ""                                                 | Additional CSS class for wrapper |

## Features Included

### Weather Information

- Current temperature (Celsius/Fahrenheit)
- Feels like temperature
- Weather description with icon
- Humidity percentage
- Wind speed and direction
- Visibility
- Sunrise/sunset times
- Current date and time

### User Interface

- Search any city worldwide
- Quick-select from predefined cities
- Toggle between Metric and Imperial systems
- Responsive design (mobile, tablet, desktop)
- Hover effects
- Loading and error states

### Technical Features

- Client-side component ('use client')
- Real-time API fetching
- Debounced search input
- CSS-in-JS (no external stylesheets needed)
- Next.js Image optimization
- Fixed dimensions when switching units

## Customization

### Styling

The component uses CSS-in-JS. To customize styles, modify the `<style jsx>` block in `WeatherWidget.js`:

```jsx
<style jsx>{`
  .weather-widget {
    max-width: 1200px; /* Change max width */
    border-radius: 10px; /* Change border radius */
    /* Add your custom styles */
  }
`}</style>
```

### Colors

Main color variables used:

- Background: `rgba(255, 255, 255, 0.95)`
- Main card: `rgb(105, 215, 219)`
- Metrics card: `rgba(240, 233, 176, 0.95)`
- Shadow: `rgba(83, 89, 179, 0.37)`

### API Configuration

The component uses the OpenWeatherMap Current Weather API:

- Endpoint: `https://api.openweathermap.org/data/2.5/weather`
- Units: Metric (Celsius, m/s, km)
- Data is converted client-side for Imperial system

## Example Integration

### In a Next.js App Router page:

```jsx
// app/weather/page.js
import WeatherWidget from "@/components/WeatherWidget";

export default function WeatherPage() {
  return (
    <main className="container">
      <h1>Weather Dashboard</h1>
      <WeatherWidget
        apiKey={process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}
        defaultCity="New York"
      />
    </main>
  );
}
```

### With Environment Variables:

Create `.env.local`:

```
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_api_key_here
```

Use in component:

```jsx
<WeatherWidget apiKey={process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY} />
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Dependencies

The component only requires:

- Next.js (for Image component)
- React (useState, useEffect)

No external libraries needed!

## Troubleshooting

### "API key is required" error

Make sure you're passing the `apiKey` prop to the component.

### Icons not showing

Ensure the `/public/icons/` folder is copied to your project.

### City not found

Check that the city name is spelled correctly. Try using major city names.

### CORS errors

The OpenWeatherMap API should work from any domain. If you get CORS errors, check your API key is valid.

## License

This component is provided as-is for use in your projects.

## Credits

Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
