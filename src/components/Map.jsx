/* Map.jsx — real embedded Google Map (keyless classic embed, works anywhere).
   For a styled/branded map later, swap to the Maps Embed API with the owner's key. */

const VENUE = 'Astro Kings 5-a-side, Wigman Rd, Nottingham NG8 4PB';

export function Map({ query = VENUE, zoom = 14, className = '' }){
  const src = `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=${zoom}&output=embed`;
  return (
    <iframe
      title="Astro Kings location"
      src={src}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
      className={className}
      style={{ border: 0, filter: 'grayscale(0.2) contrast(1.05)' }}
    />
  );
}
