"use client";

import { useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import type { Region } from "@/data/types";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface Props {
  activeRegion: Region | null;
  onSelectRegion: (region: Region | null) => void;
}

<<<<<<< Updated upstream
// ─── SVG paths projected from real lat/lon coordinates ───────────────
// viewBox "0 0 500 280"
// x = ((lon+74.5)/6.2)*440+30, y = ((20.0-lat)/2.4)*220+30
||||||| Stash base
// ─── Geographically accurate SVG paths ───────────────────────────────
// Coordinate system: viewBox "0 0 500 280"
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
// Mapped from real Hispaniola coordinates:
//   lon 74.5W → x≈30,  lon 68.3W → x≈470
//   lat 20.0N → y≈30,  lat 17.6N → y≈250
// Scale: ~71 px/°lon, ~92 px/°lat
=======
// ─── Geographically accurate SVG paths ───────────────────────────────
// Coordinate system: viewBox "0 0 500 280"
// Projected from real Hispaniola coordinates:
//   lon -74.5W → x=30,  lon -68.3W → x=470
//   lat 20.0N  → y=30,  lat 17.6N  → y=250
// Formula: x = ((lon+74.5)/6.2)*440+30, y = ((20.0-lat)/2.4)*220+30
>>>>>>> Stashed changes
||||||| Stash base
// Mapped from real Hispaniola coordinates:
//   lon 74.5W → x≈30,  lon 68.3W → x≈470
//   lat 20.0N → y≈30,  lat 17.6N → y≈250
// Scale: ~71 px/°lon, ~92 px/°lat
=======
// Projected from real Hispaniola coordinates:
//   lon -74.5W → x=30,  lon -68.3W → x=470
//   lat 20.0N  → y=30,  lat 17.6N  → y=250
// Formula: x = ((lon+74.5)/6.2)*440+30, y = ((20.0-lat)/2.4)*220+30
>>>>>>> Stashed changes
||||||| Stash base
// Mapped from real Hispaniola coordinates:
//   lon 74.5W → x≈30,  lon 68.3W → x≈470
//   lat 20.0N → y≈30,  lat 17.6N → y≈250
// Scale: ~71 px/°lon, ~92 px/°lat
=======
// Projected from real Hispaniola coordinates:
//   lon -74.5W → x=30,  lon -68.3W → x=470
//   lat 20.0N  → y=30,  lat 17.6N  → y=250
// Formula: x = ((lon+74.5)/6.2)*440+30, y = ((20.0-lat)/2.4)*220+30
>>>>>>> Stashed changes
||||||| Stash base
// Mapped from real Hispaniola coordinates:
//   lon 74.5W → x≈30,  lon 68.3W → x≈470
//   lat 20.0N → y≈30,  lat 17.6N → y≈250
// Scale: ~71 px/°lon, ~92 px/°lat
=======
// Projected from real Hispaniola coordinates:
//   lon -74.5W → x=30,  lon -68.3W → x=470
//   lat 20.0N  → y=30,  lat 17.6N  → y=250
// Formula: x = ((lon+74.5)/6.2)*440+30, y = ((20.0-lat)/2.4)*220+30
>>>>>>> Stashed changes
||||||| Stash base
// Mapped from real Hispaniola coordinates:
//   lon 74.5W → x≈30,  lon 68.3W → x≈470
//   lat 20.0N → y≈30,  lat 17.6N → y≈250
// Scale: ~71 px/°lon, ~92 px/°lat
=======
// Projected from real Hispaniola coordinates:
//   lon -74.5W → x=30,  lon -68.3W → x=470
//   lat 20.0N  → y=30,  lat 17.6N  → y=250
// Formula: x = ((lon+74.5)/6.2)*440+30, y = ((20.0-lat)/2.4)*220+30
>>>>>>> Stashed changes

<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
// Dominican Republic — ~55 coastline points, clockwise from border north
||||||| Stash base
// Dominican Republic outline — eastern 2/3 of Hispaniola
// Traced from: north coast (Puerto Plata → Samaná → east), south coast (Pedernales → Santo Domingo → east tip), Haiti border
=======
// Dominican Republic outline — ~55 points traced from real coastline
>>>>>>> Stashed changes
||||||| Stash base
// Dominican Republic outline — eastern 2/3 of Hispaniola
// Traced from: north coast (Puerto Plata → Samaná → east), south coast (Pedernales → Santo Domingo → east tip), Haiti border
=======
// Dominican Republic outline — ~55 points traced from real coastline
>>>>>>> Stashed changes
||||||| Stash base
// Dominican Republic outline — eastern 2/3 of Hispaniola
// Traced from: north coast (Puerto Plata → Samaná → east), south coast (Pedernales → Santo Domingo → east tip), Haiti border
=======
// Dominican Republic outline — ~55 points traced from real coastline
>>>>>>> Stashed changes
||||||| Stash base
// Dominican Republic outline — eastern 2/3 of Hispaniola
// Traced from: north coast (Puerto Plata → Samaná → east), south coast (Pedernales → Santo Domingo → east tip), Haiti border
=======
// Dominican Republic outline — ~55 points traced from real coastline
>>>>>>> Stashed changes
||||||| Stash base
// Dominican Republic outline — eastern 2/3 of Hispaniola
// Traced from: north coast (Puerto Plata → Samaná → east), south coast (Pedernales → Santo Domingo → east tip), Haiti border
=======
// Dominican Republic outline — ~55 points traced from real coastline
>>>>>>> Stashed changes
const DR_OUTLINE =
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  "M228,71 L230,58 L232,44 L241,39 L257,40 L271,41 L282,39" +
  " L294,46 L300,49 L312,52 L325,55 L339,61 L353,76 L360,85" +
  " L369,90 L381,95 L393,97 L410,102 L419,103" +
  " L408,111 L395,114 L381,118" +
  " L385,124 L399,133 L413,142 L427,151 L442,158 L456,164" +
  " L465,168 L469,172 L466,181 L461,190" +
  " L445,193 L427,188 L422,175 L399,173 L378,171 L356,170" +
  " L339,177 L326,188 L312,186 L298,179" +
  " L285,193 L271,195 L261,220 L250,232 L239,230 L230,218 L226,210" +
  " L224,193 L223,172 L220,156 L223,140 L227,122 L227,103 L228,87 L228,71 Z";
||||||| Stash base
  "M152,108 " + // Haiti-DR border start (north: Dajabón ~71.7W, 19.7N)
  "L160,95 L175,80 L195,68 " + // North coast: Monte Cristi, Puerto Plata approach
  "L220,55 L248,48 " + // North coast: Puerto Plata to Sosúa
  "L275,42 L300,38 " + // Cabarete, Nagua coast
  "L320,36 L338,38 " + // Approaching Samaná peninsula
  // Samaná peninsula — juts northeast
  "L355,32 L375,28 L392,30 L405,36 " + // Peninsula tip (Cabo Samaná ~69.0W, 19.3N)
  "L400,44 L388,50 " + // South side of peninsula
  "L370,54 L355,58 L340,56 " + // Samaná Bay north shore
  // Continue south side — Samaná Bay opening
  "L330,62 L340,72 " + // Bay curves south
  "L355,78 L370,88 " + // East coast: Miches, Sabana de la Mar approach
  // Eastern coast — south of Samaná
  "L385,98 L400,112 " + // Hato Mayor, El Seibo coast
  "L420,120 L440,132 " + // Higüey, approaching Punta Cana
  "L458,145 L465,158 " + // Punta Cana area (~68.4W, 18.5N)
  "L462,172 L455,185 " + // East tip curves south — Cap Cana, Bávaro
||||||| Stash base
  "M152,108 " + // Haiti-DR border start (north: Dajabón ~71.7W, 19.7N)
  "L160,95 L175,80 L195,68 " + // North coast: Monte Cristi, Puerto Plata approach
  "L220,55 L248,48 " + // North coast: Puerto Plata to Sosúa
  "L275,42 L300,38 " + // Cabarete, Nagua coast
  "L320,36 L338,38 " + // Approaching Samaná peninsula
  // Samaná peninsula — juts northeast
  "L355,32 L375,28 L392,30 L405,36 " + // Peninsula tip (Cabo Samaná ~69.0W, 19.3N)
  "L400,44 L388,50 " + // South side of peninsula
  "L370,54 L355,58 L340,56 " + // Samaná Bay north shore
  // Continue south side — Samaná Bay opening
  "L330,62 L340,72 " + // Bay curves south
  "L355,78 L370,88 " + // East coast: Miches, Sabana de la Mar approach
  // Eastern coast — south of Samaná
  "L385,98 L400,112 " + // Hato Mayor, El Seibo coast
  "L420,120 L440,132 " + // Higüey, approaching Punta Cana
  "L458,145 L465,158 " + // Punta Cana area (~68.4W, 18.5N)
  "L462,172 L455,185 " + // East tip curves south — Cap Cana, Bávaro
=======
  "M228,71 L230,58 L232,44 L241,39 L257,40 L271,41 L282,39 " +
  "L294,46 L300,49 L312,52 L325,55 L339,61 L353,76 L360,85 " +
  // Samaná peninsula — finger jutting NE
  "L369,90 L381,95 L393,97 L410,102 L419,103 " +
  // South side of peninsula + Samaná Bay
  "L408,111 L395,114 L381,118 " +
  // East coast — south of bay
  "L385,124 L399,133 L413,142 L427,151 L442,158 L456,164 " +
  // Punta Cana / eastern tip
  "L465,168 L469,172 L466,181 L461,190 " +
>>>>>>> Stashed changes
||||||| Stash base
  "M152,108 " + // Haiti-DR border start (north: Dajabón ~71.7W, 19.7N)
  "L160,95 L175,80 L195,68 " + // North coast: Monte Cristi, Puerto Plata approach
  "L220,55 L248,48 " + // North coast: Puerto Plata to Sosúa
  "L275,42 L300,38 " + // Cabarete, Nagua coast
  "L320,36 L338,38 " + // Approaching Samaná peninsula
  // Samaná peninsula — juts northeast
  "L355,32 L375,28 L392,30 L405,36 " + // Peninsula tip (Cabo Samaná ~69.0W, 19.3N)
  "L400,44 L388,50 " + // South side of peninsula
  "L370,54 L355,58 L340,56 " + // Samaná Bay north shore
  // Continue south side — Samaná Bay opening
  "L330,62 L340,72 " + // Bay curves south
  "L355,78 L370,88 " + // East coast: Miches, Sabana de la Mar approach
  // Eastern coast — south of Samaná
  "L385,98 L400,112 " + // Hato Mayor, El Seibo coast
  "L420,120 L440,132 " + // Higüey, approaching Punta Cana
  "L458,145 L465,158 " + // Punta Cana area (~68.4W, 18.5N)
  "L462,172 L455,185 " + // East tip curves south — Cap Cana, Bávaro
=======
  "M228,71 L230,58 L232,44 L241,39 L257,40 L271,41 L282,39 " +
  "L294,46 L300,49 L312,52 L325,55 L339,61 L353,76 L360,85 " +
  // Samaná peninsula — finger jutting NE
  "L369,90 L381,95 L393,97 L410,102 L419,103 " +
  // South side of peninsula + Samaná Bay
  "L408,111 L395,114 L381,118 " +
  // East coast — south of bay
  "L385,124 L399,133 L413,142 L427,151 L442,158 L456,164 " +
  // Punta Cana / eastern tip
  "L465,168 L469,172 L466,181 L461,190 " +
>>>>>>> Stashed changes
||||||| Stash base
  "M152,108 " + // Haiti-DR border start (north: Dajabón ~71.7W, 19.7N)
  "L160,95 L175,80 L195,68 " + // North coast: Monte Cristi, Puerto Plata approach
  "L220,55 L248,48 " + // North coast: Puerto Plata to Sosúa
  "L275,42 L300,38 " + // Cabarete, Nagua coast
  "L320,36 L338,38 " + // Approaching Samaná peninsula
  // Samaná peninsula — juts northeast
  "L355,32 L375,28 L392,30 L405,36 " + // Peninsula tip (Cabo Samaná ~69.0W, 19.3N)
  "L400,44 L388,50 " + // South side of peninsula
  "L370,54 L355,58 L340,56 " + // Samaná Bay north shore
  // Continue south side — Samaná Bay opening
  "L330,62 L340,72 " + // Bay curves south
  "L355,78 L370,88 " + // East coast: Miches, Sabana de la Mar approach
  // Eastern coast — south of Samaná
  "L385,98 L400,112 " + // Hato Mayor, El Seibo coast
  "L420,120 L440,132 " + // Higüey, approaching Punta Cana
  "L458,145 L465,158 " + // Punta Cana area (~68.4W, 18.5N)
  "L462,172 L455,185 " + // East tip curves south — Cap Cana, Bávaro
=======
  "M228,71 L230,58 L232,44 L241,39 L257,40 L271,41 L282,39 " +
  "L294,46 L300,49 L312,52 L325,55 L339,61 L353,76 L360,85 " +
  // Samaná peninsula — finger jutting NE
  "L369,90 L381,95 L393,97 L410,102 L419,103 " +
  // South side of peninsula + Samaná Bay
  "L408,111 L395,114 L381,118 " +
  // East coast — south of bay
  "L385,124 L399,133 L413,142 L427,151 L442,158 L456,164 " +
  // Punta Cana / eastern tip
  "L465,168 L469,172 L466,181 L461,190 " +
>>>>>>> Stashed changes
||||||| Stash base
  "M152,108 " + // Haiti-DR border start (north: Dajabón ~71.7W, 19.7N)
  "L160,95 L175,80 L195,68 " + // North coast: Monte Cristi, Puerto Plata approach
  "L220,55 L248,48 " + // North coast: Puerto Plata to Sosúa
  "L275,42 L300,38 " + // Cabarete, Nagua coast
  "L320,36 L338,38 " + // Approaching Samaná peninsula
  // Samaná peninsula — juts northeast
  "L355,32 L375,28 L392,30 L405,36 " + // Peninsula tip (Cabo Samaná ~69.0W, 19.3N)
  "L400,44 L388,50 " + // South side of peninsula
  "L370,54 L355,58 L340,56 " + // Samaná Bay north shore
  // Continue south side — Samaná Bay opening
  "L330,62 L340,72 " + // Bay curves south
  "L355,78 L370,88 " + // East coast: Miches, Sabana de la Mar approach
  // Eastern coast — south of Samaná
  "L385,98 L400,112 " + // Hato Mayor, El Seibo coast
  "L420,120 L440,132 " + // Higüey, approaching Punta Cana
  "L458,145 L465,158 " + // Punta Cana area (~68.4W, 18.5N)
  "L462,172 L455,185 " + // East tip curves south — Cap Cana, Bávaro
=======
  "M228,71 L230,58 L232,44 L241,39 L257,40 L271,41 L282,39 " +
  "L294,46 L300,49 L312,52 L325,55 L339,61 L353,76 L360,85 " +
  // Samaná peninsula — finger jutting NE
  "L369,90 L381,95 L393,97 L410,102 L419,103 " +
  // South side of peninsula + Samaná Bay
  "L408,111 L395,114 L381,118 " +
  // East coast — south of bay
  "L385,124 L399,133 L413,142 L427,151 L442,158 L456,164 " +
  // Punta Cana / eastern tip
  "L465,168 L469,172 L466,181 L461,190 " +
>>>>>>> Stashed changes
  // South coast — east to west
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  "L440,195 L420,202 " + // La Romana coast
  "L395,208 L375,212 " + // San Pedro de Macorís
  "L350,218 L325,220 " + // Boca Chica approach
  "L305,218 " + // Santo Domingo (~69.9W, 18.47N) — x≈327, y≈141 but south coast
  "L280,222 L258,225 " + // Baní, Azua
  "L235,228 L215,232 " + // Azua to Barahona approach
  "L195,238 L178,242 " + // Barahona
  "L162,240 L150,232 " + // Pedernales approach
  "L140,220 L135,205 " + // Pedernales (~71.75W, 18.03N)
  // Haiti-DR border — south to north (irregular line)
  "L138,190 L142,175 " + // Border going north
  "L148,160 L150,145 " + // Mid-border (Jimani area)
  "L152,130 L150,118 " + // Approaching Dajabón
  "L152,108 Z"; // Close at start
=======
  "M228,71 L230,58 L232,44 L241,39 L257,40 L271,41 L282,39 " +
  "L294,46 L300,49 L312,52 L325,55 L339,61 L353,76 L360,85 " +
  // Samaná peninsula — finger jutting NE
  "L369,90 L381,95 L393,97 L410,102 L419,103 " +
  // South side of peninsula + Samaná Bay
  "L408,111 L395,114 L381,118 " +
  // East coast — south of bay
  "L385,124 L399,133 L413,142 L427,151 L442,158 L456,164 " +
  // Punta Cana / eastern tip
  "L465,168 L469,172 L466,181 L461,190 " +
  // South coast — east to west
  "L445,193 L427,188 L422,175 L399,173 L378,171 L356,170 " +
  // Santo Domingo area → west
  "L339,177 L326,188 L312,186 L298,179 " +
  // Barahona bulge — distinctive southward extension
  "L285,193 L271,195 L261,220 L250,232 L239,230 L230,218 L226,210 " +
  // Haiti-DR border — south to north
  "L224,193 L223,172 L220,156 L223,140 L227,122 L227,103 L228,87 L228,71 Z";
>>>>>>> Stashed changes
||||||| Stash base
  "L440,195 L420,202 " + // La Romana coast
  "L395,208 L375,212 " + // San Pedro de Macorís
  "L350,218 L325,220 " + // Boca Chica approach
  "L305,218 " + // Santo Domingo (~69.9W, 18.47N) — x≈327, y≈141 but south coast
  "L280,222 L258,225 " + // Baní, Azua
  "L235,228 L215,232 " + // Azua to Barahona approach
  "L195,238 L178,242 " + // Barahona
  "L162,240 L150,232 " + // Pedernales approach
  "L140,220 L135,205 " + // Pedernales (~71.75W, 18.03N)
  // Haiti-DR border — south to north (irregular line)
  "L138,190 L142,175 " + // Border going north
  "L148,160 L150,145 " + // Mid-border (Jimani area)
  "L152,130 L150,118 " + // Approaching Dajabón
  "L152,108 Z"; // Close at start
=======
  "L445,193 L427,188 L422,175 L399,173 L378,171 L356,170 " +
  // Santo Domingo area → west
  "L339,177 L326,188 L312,186 L298,179 " +
  // Barahona bulge — distinctive southward extension
  "L285,193 L271,195 L261,220 L250,232 L239,230 L230,218 L226,210 " +
  // Haiti-DR border — south to north
  "L224,193 L223,172 L220,156 L223,140 L227,122 L227,103 L228,87 L228,71 Z";
>>>>>>> Stashed changes
||||||| Stash base
  "L440,195 L420,202 " + // La Romana coast
  "L395,208 L375,212 " + // San Pedro de Macorís
  "L350,218 L325,220 " + // Boca Chica approach
  "L305,218 " + // Santo Domingo (~69.9W, 18.47N) — x≈327, y≈141 but south coast
  "L280,222 L258,225 " + // Baní, Azua
  "L235,228 L215,232 " + // Azua to Barahona approach
  "L195,238 L178,242 " + // Barahona
  "L162,240 L150,232 " + // Pedernales approach
  "L140,220 L135,205 " + // Pedernales (~71.75W, 18.03N)
  // Haiti-DR border — south to north (irregular line)
  "L138,190 L142,175 " + // Border going north
  "L148,160 L150,145 " + // Mid-border (Jimani area)
  "L152,130 L150,118 " + // Approaching Dajabón
  "L152,108 Z"; // Close at start
=======
  "L445,193 L427,188 L422,175 L399,173 L378,171 L356,170 " +
  // Santo Domingo area → west
  "L339,177 L326,188 L312,186 L298,179 " +
  // Barahona bulge — distinctive southward extension
  "L285,193 L271,195 L261,220 L250,232 L239,230 L230,218 L226,210 " +
  // Haiti-DR border — south to north
  "L224,193 L223,172 L220,156 L223,140 L227,122 L227,103 L228,87 L228,71 Z";
>>>>>>> Stashed changes
||||||| Stash base
  "L440,195 L420,202 " + // La Romana coast
  "L395,208 L375,212 " + // San Pedro de Macorís
  "L350,218 L325,220 " + // Boca Chica approach
  "L305,218 " + // Santo Domingo (~69.9W, 18.47N) — x≈327, y≈141 but south coast
  "L280,222 L258,225 " + // Baní, Azua
  "L235,228 L215,232 " + // Azua to Barahona approach
  "L195,238 L178,242 " + // Barahona
  "L162,240 L150,232 " + // Pedernales approach
  "L140,220 L135,205 " + // Pedernales (~71.75W, 18.03N)
  // Haiti-DR border — south to north (irregular line)
  "L138,190 L142,175 " + // Border going north
  "L148,160 L150,145 " + // Mid-border (Jimani area)
  "L152,130 L150,118 " + // Approaching Dajabón
  "L152,108 Z"; // Close at start
=======
  "L445,193 L427,188 L422,175 L399,173 L378,171 L356,170 " +
  // Santo Domingo area → west
  "L339,177 L326,188 L312,186 L298,179 " +
  // Barahona bulge — distinctive southward extension
  "L285,193 L271,195 L261,220 L250,232 L239,230 L230,218 L226,210 " +
  // Haiti-DR border — south to north
  "L224,193 L223,172 L220,156 L223,140 L227,122 L227,103 L228,87 L228,71 Z";
>>>>>>> Stashed changes
||||||| Stash base
  "L440,195 L420,202 " + // La Romana coast
  "L395,208 L375,212 " + // San Pedro de Macorís
  "L350,218 L325,220 " + // Boca Chica approach
  "L305,218 " + // Santo Domingo (~69.9W, 18.47N) — x≈327, y≈141 but south coast
  "L280,222 L258,225 " + // Baní, Azua
  "L235,228 L215,232 " + // Azua to Barahona approach
  "L195,238 L178,242 " + // Barahona
  "L162,240 L150,232 " + // Pedernales approach
  "L140,220 L135,205 " + // Pedernales (~71.75W, 18.03N)
  // Haiti-DR border — south to north (irregular line)
  "L138,190 L142,175 " + // Border going north
  "L148,160 L150,145 " + // Mid-border (Jimani area)
  "L152,130 L150,118 " + // Approaching Dajabón
  "L152,108 Z"; // Close at start
=======
  "L445,193 L427,188 L422,175 L399,173 L378,171 L356,170 " +
  // Santo Domingo area → west
  "L339,177 L326,188 L312,186 L298,179 " +
  // Barahona bulge — distinctive southward extension
  "L285,193 L271,195 L261,220 L250,232 L239,230 L230,218 L226,210 " +
  // Haiti-DR border — south to north
  "L224,193 L223,172 L220,156 L223,140 L227,122 L227,103 L228,87 L228,71 Z";
>>>>>>> Stashed changes

<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
// Haiti — simplified context shape
||||||| Stash base
// Haiti — western 1/3 of Hispaniola (low-contrast context shape)
=======
// Haiti — simplified western Hispaniola (context shape)
>>>>>>> Stashed changes
||||||| Stash base
// Haiti — western 1/3 of Hispaniola (low-contrast context shape)
=======
// Haiti — simplified western Hispaniola (context shape)
>>>>>>> Stashed changes
||||||| Stash base
// Haiti — western 1/3 of Hispaniola (low-contrast context shape)
=======
// Haiti — simplified western Hispaniola (context shape)
>>>>>>> Stashed changes
||||||| Stash base
// Haiti — western 1/3 of Hispaniola (low-contrast context shape)
=======
// Haiti — simplified western Hispaniola (context shape)
>>>>>>> Stashed changes
||||||| Stash base
// Haiti — western 1/3 of Hispaniola (low-contrast context shape)
=======
// Haiti — simplified western Hispaniola (context shape)
>>>>>>> Stashed changes
const HAITI =
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  "M228,71 L228,87 L227,103 L227,122 L223,140 L220,156 L223,172 L224,193 L226,210" +
  " L215,211 L197,197 L170,193 L147,197 L119,197 L83,195" +
  " L60,193 L41,197" +
  " L48,175 L58,163 L83,156 L108,163" +
  " L129,154 L147,149 L161,166 L183,164" +
  " L186,149 L179,131 L172,112 L159,94" +
  " L147,76 L129,67 L109,48" +
  " L129,46 L151,50 L172,52 L193,52 L207,56 L218,62 L228,71 Z";
||||||| Stash base
  "M152,108 " + // Border start (shared with DR)
  "L150,118 L152,130 " + // Border south
  "L150,145 L148,160 " + // Mid-border
  "L142,175 L138,190 " + // Border south
  "L135,205 L140,220 " + // Border near Pedernales
  // Haiti south coast — west from border
  "L128,228 L112,235 " + // Anse-à-Pitre to Jacmel approach
  "L92,240 L75,238 " + // Southern peninsula base
  "L58,232 L42,225 " + // Tiburon peninsula
  "L30,218 L22,208 " + // Tip of Tiburon (~74.5W)
  "L28,195 L38,185 " + // North side of southern peninsula
  "L55,178 L68,172 " + // Approaching Port-au-Prince
  "L78,162 L82,150 " + // Gonâve channel
  "L75,138 L65,128 " + // Gulf of Gonâve
  // Haiti north coast
  "L58,118 L52,108 " + // Saint-Marc area
  "L48,95 L52,82 " + // Gonaïves
  "L60,70 L72,60 " + // Northern coast
  "L88,52 L105,48 " + // Cap-Haïtien approach
  "L120,50 L135,55 " + // Cap-Haïtien to Ouanaminthe
  "L148,65 L155,78 " + // Approaching border
  "L158,90 L152,108 Z"; // Close at border
=======
  // Shared border (reversed from DR)
  "M228,71 L228,87 L227,103 L227,122 L223,140 L220,156 L223,172 L224,193 L226,210 " +
  // South coast of Tiburon peninsula
  "L215,211 L197,197 L170,193 L147,197 L119,197 L83,195 " +
  // Tiburon tip
  "L60,193 L41,197 " +
  // North side of Tiburon + Gulf of Gonâve
  "L48,175 L58,163 L83,156 L108,163 " +
  // Port-au-Prince area
  "L129,154 L147,149 L161,166 L183,164 " +
  // North coast
  "L186,149 L179,131 L172,112 L159,94 " +
  // NW peninsula
  "L147,76 L129,67 L109,48 " +
  // North coast east to border
  "L129,46 L151,50 L172,52 L193,52 L207,56 L218,62 L228,71 Z";
>>>>>>> Stashed changes
||||||| Stash base
  "M152,108 " + // Border start (shared with DR)
  "L150,118 L152,130 " + // Border south
  "L150,145 L148,160 " + // Mid-border
  "L142,175 L138,190 " + // Border south
  "L135,205 L140,220 " + // Border near Pedernales
  // Haiti south coast — west from border
  "L128,228 L112,235 " + // Anse-à-Pitre to Jacmel approach
  "L92,240 L75,238 " + // Southern peninsula base
  "L58,232 L42,225 " + // Tiburon peninsula
  "L30,218 L22,208 " + // Tip of Tiburon (~74.5W)
  "L28,195 L38,185 " + // North side of southern peninsula
  "L55,178 L68,172 " + // Approaching Port-au-Prince
  "L78,162 L82,150 " + // Gonâve channel
  "L75,138 L65,128 " + // Gulf of Gonâve
  // Haiti north coast
  "L58,118 L52,108 " + // Saint-Marc area
  "L48,95 L52,82 " + // Gonaïves
  "L60,70 L72,60 " + // Northern coast
  "L88,52 L105,48 " + // Cap-Haïtien approach
  "L120,50 L135,55 " + // Cap-Haïtien to Ouanaminthe
  "L148,65 L155,78 " + // Approaching border
  "L158,90 L152,108 Z"; // Close at border
=======
  // Shared border (reversed from DR)
  "M228,71 L228,87 L227,103 L227,122 L223,140 L220,156 L223,172 L224,193 L226,210 " +
  // South coast of Tiburon peninsula
  "L215,211 L197,197 L170,193 L147,197 L119,197 L83,195 " +
  // Tiburon tip
  "L60,193 L41,197 " +
  // North side of Tiburon + Gulf of Gonâve
  "L48,175 L58,163 L83,156 L108,163 " +
  // Port-au-Prince area
  "L129,154 L147,149 L161,166 L183,164 " +
  // North coast
  "L186,149 L179,131 L172,112 L159,94 " +
  // NW peninsula
  "L147,76 L129,67 L109,48 " +
  // North coast east to border
  "L129,46 L151,50 L172,52 L193,52 L207,56 L218,62 L228,71 Z";
>>>>>>> Stashed changes
||||||| Stash base
  "M152,108 " + // Border start (shared with DR)
  "L150,118 L152,130 " + // Border south
  "L150,145 L148,160 " + // Mid-border
  "L142,175 L138,190 " + // Border south
  "L135,205 L140,220 " + // Border near Pedernales
  // Haiti south coast — west from border
  "L128,228 L112,235 " + // Anse-à-Pitre to Jacmel approach
  "L92,240 L75,238 " + // Southern peninsula base
  "L58,232 L42,225 " + // Tiburon peninsula
  "L30,218 L22,208 " + // Tip of Tiburon (~74.5W)
  "L28,195 L38,185 " + // North side of southern peninsula
  "L55,178 L68,172 " + // Approaching Port-au-Prince
  "L78,162 L82,150 " + // Gonâve channel
  "L75,138 L65,128 " + // Gulf of Gonâve
  // Haiti north coast
  "L58,118 L52,108 " + // Saint-Marc area
  "L48,95 L52,82 " + // Gonaïves
  "L60,70 L72,60 " + // Northern coast
  "L88,52 L105,48 " + // Cap-Haïtien approach
  "L120,50 L135,55 " + // Cap-Haïtien to Ouanaminthe
  "L148,65 L155,78 " + // Approaching border
  "L158,90 L152,108 Z"; // Close at border
=======
  // Shared border (reversed from DR)
  "M228,71 L228,87 L227,103 L227,122 L223,140 L220,156 L223,172 L224,193 L226,210 " +
  // South coast of Tiburon peninsula
  "L215,211 L197,197 L170,193 L147,197 L119,197 L83,195 " +
  // Tiburon tip
  "L60,193 L41,197 " +
  // North side of Tiburon + Gulf of Gonâve
  "L48,175 L58,163 L83,156 L108,163 " +
  // Port-au-Prince area
  "L129,154 L147,149 L161,166 L183,164 " +
  // North coast
  "L186,149 L179,131 L172,112 L159,94 " +
  // NW peninsula
  "L147,76 L129,67 L109,48 " +
  // North coast east to border
  "L129,46 L151,50 L172,52 L193,52 L207,56 L218,62 L228,71 Z";
>>>>>>> Stashed changes
||||||| Stash base
  "M152,108 " + // Border start (shared with DR)
  "L150,118 L152,130 " + // Border south
  "L150,145 L148,160 " + // Mid-border
  "L142,175 L138,190 " + // Border south
  "L135,205 L140,220 " + // Border near Pedernales
  // Haiti south coast — west from border
  "L128,228 L112,235 " + // Anse-à-Pitre to Jacmel approach
  "L92,240 L75,238 " + // Southern peninsula base
  "L58,232 L42,225 " + // Tiburon peninsula
  "L30,218 L22,208 " + // Tip of Tiburon (~74.5W)
  "L28,195 L38,185 " + // North side of southern peninsula
  "L55,178 L68,172 " + // Approaching Port-au-Prince
  "L78,162 L82,150 " + // Gonâve channel
  "L75,138 L65,128 " + // Gulf of Gonâve
  // Haiti north coast
  "L58,118 L52,108 " + // Saint-Marc area
  "L48,95 L52,82 " + // Gonaïves
  "L60,70 L72,60 " + // Northern coast
  "L88,52 L105,48 " + // Cap-Haïtien approach
  "L120,50 L135,55 " + // Cap-Haïtien to Ouanaminthe
  "L148,65 L155,78 " + // Approaching border
  "L158,90 L152,108 Z"; // Close at border
=======
  // Shared border (reversed from DR)
  "M228,71 L228,87 L227,103 L227,122 L223,140 L220,156 L223,172 L224,193 L226,210 " +
  // South coast of Tiburon peninsula
  "L215,211 L197,197 L170,193 L147,197 L119,197 L83,195 " +
  // Tiburon tip
  "L60,193 L41,197 " +
  // North side of Tiburon + Gulf of Gonâve
  "L48,175 L58,163 L83,156 L108,163 " +
  // Port-au-Prince area
  "L129,154 L147,149 L161,166 L183,164 " +
  // North coast
  "L186,149 L179,131 L172,112 L159,94 " +
  // NW peninsula
  "L147,76 L129,67 L109,48 " +
  // North coast east to border
  "L129,46 L151,50 L172,52 L193,52 L207,56 L218,62 L228,71 Z";
>>>>>>> Stashed changes
||||||| Stash base
  "M152,108 " + // Border start (shared with DR)
  "L150,118 L152,130 " + // Border south
  "L150,145 L148,160 " + // Mid-border
  "L142,175 L138,190 " + // Border south
  "L135,205 L140,220 " + // Border near Pedernales
  // Haiti south coast — west from border
  "L128,228 L112,235 " + // Anse-à-Pitre to Jacmel approach
  "L92,240 L75,238 " + // Southern peninsula base
  "L58,232 L42,225 " + // Tiburon peninsula
  "L30,218 L22,208 " + // Tip of Tiburon (~74.5W)
  "L28,195 L38,185 " + // North side of southern peninsula
  "L55,178 L68,172 " + // Approaching Port-au-Prince
  "L78,162 L82,150 " + // Gonâve channel
  "L75,138 L65,128 " + // Gulf of Gonâve
  // Haiti north coast
  "L58,118 L52,108 " + // Saint-Marc area
  "L48,95 L52,82 " + // Gonaïves
  "L60,70 L72,60 " + // Northern coast
  "L88,52 L105,48 " + // Cap-Haïtien approach
  "L120,50 L135,55 " + // Cap-Haïtien to Ouanaminthe
  "L148,65 L155,78 " + // Approaching border
  "L158,90 L152,108 Z"; // Close at border
=======
  // Shared border (reversed from DR)
  "M228,71 L228,87 L227,103 L227,122 L223,140 L220,156 L223,172 L224,193 L226,210 " +
  // South coast of Tiburon peninsula
  "L215,211 L197,197 L170,193 L147,197 L119,197 L83,195 " +
  // Tiburon tip
  "L60,193 L41,197 " +
  // North side of Tiburon + Gulf of Gonâve
  "L48,175 L58,163 L83,156 L108,163 " +
  // Port-au-Prince area
  "L129,154 L147,149 L161,166 L183,164 " +
  // North coast
  "L186,149 L179,131 L172,112 L159,94 " +
  // NW peninsula
  "L147,76 L129,67 L109,48 " +
  // North coast east to border
  "L129,46 L151,50 L172,52 L193,52 L207,56 L218,62 L228,71 Z";
>>>>>>> Stashed changes

<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
// Samaná peninsula — narrow finger, not the bay
||||||| Stash base
// Samaná peninsula — the distinct NE jut with the bay beneath
// This is the clickable region, slightly expanded from the coastline for interaction
=======
// Samaná peninsula — narrow finger shape (not the bay underneath)
>>>>>>> Stashed changes
||||||| Stash base
// Samaná peninsula — the distinct NE jut with the bay beneath
// This is the clickable region, slightly expanded from the coastline for interaction
=======
// Samaná peninsula — narrow finger shape (not the bay underneath)
>>>>>>> Stashed changes
||||||| Stash base
// Samaná peninsula — the distinct NE jut with the bay beneath
// This is the clickable region, slightly expanded from the coastline for interaction
=======
// Samaná peninsula — narrow finger shape (not the bay underneath)
>>>>>>> Stashed changes
||||||| Stash base
// Samaná peninsula — the distinct NE jut with the bay beneath
// This is the clickable region, slightly expanded from the coastline for interaction
=======
// Samaná peninsula — narrow finger shape (not the bay underneath)
>>>>>>> Stashed changes
||||||| Stash base
// Samaná peninsula — the distinct NE jut with the bay beneath
// This is the clickable region, slightly expanded from the coastline for interaction
=======
// Samaná peninsula — narrow finger shape (not the bay underneath)
>>>>>>> Stashed changes
const SAMANA_PATH =
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  "M362,86 L369,89 L381,93 L393,96 L406,100 L419,103" +
  " L417,109 L404,107 L393,104 L381,100 L369,96 L362,93 L362,86 Z";
||||||| Stash base
  "M330,36 " + // West base of peninsula on north coast
  "L338,34 L355,30 L375,26 L392,28 L408,35 " + // North shore of peninsula to tip
  "L402,44 L390,50 " + // Around the tip, south side
  "L372,55 L355,58 L340,56 " + // South shore of peninsula
  "L332,52 L328,44 " + // Bay entrance, back to base
  "L330,36 Z";
=======
  "M362,86 L369,89 L381,93 L393,96 L406,100 L419,103 " +
  "L417,109 L404,107 L393,104 L381,100 L369,96 L362,93 L362,86 Z";
>>>>>>> Stashed changes
||||||| Stash base
  "M330,36 " + // West base of peninsula on north coast
  "L338,34 L355,30 L375,26 L392,28 L408,35 " + // North shore of peninsula to tip
  "L402,44 L390,50 " + // Around the tip, south side
  "L372,55 L355,58 L340,56 " + // South shore of peninsula
  "L332,52 L328,44 " + // Bay entrance, back to base
  "L330,36 Z";
=======
  "M362,86 L369,89 L381,93 L393,96 L406,100 L419,103 " +
  "L417,109 L404,107 L393,104 L381,100 L369,96 L362,93 L362,86 Z";
>>>>>>> Stashed changes
||||||| Stash base
  "M330,36 " + // West base of peninsula on north coast
  "L338,34 L355,30 L375,26 L392,28 L408,35 " + // North shore of peninsula to tip
  "L402,44 L390,50 " + // Around the tip, south side
  "L372,55 L355,58 L340,56 " + // South shore of peninsula
  "L332,52 L328,44 " + // Bay entrance, back to base
  "L330,36 Z";
=======
  "M362,86 L369,89 L381,93 L393,96 L406,100 L419,103 " +
  "L417,109 L404,107 L393,104 L381,100 L369,96 L362,93 L362,86 Z";
>>>>>>> Stashed changes
||||||| Stash base
  "M330,36 " + // West base of peninsula on north coast
  "L338,34 L355,30 L375,26 L392,28 L408,35 " + // North shore of peninsula to tip
  "L402,44 L390,50 " + // Around the tip, south side
  "L372,55 L355,58 L340,56 " + // South shore of peninsula
  "L332,52 L328,44 " + // Bay entrance, back to base
  "L330,36 Z";
=======
  "M362,86 L369,89 L381,93 L393,96 L406,100 L419,103 " +
  "L417,109 L404,107 L393,104 L381,100 L369,96 L362,93 L362,86 Z";
>>>>>>> Stashed changes
||||||| Stash base
  "M330,36 " + // West base of peninsula on north coast
  "L338,34 L355,30 L375,26 L392,28 L408,35 " + // North shore of peninsula to tip
  "L402,44 L390,50 " + // Around the tip, south side
  "L372,55 L355,58 L340,56 " + // South shore of peninsula
  "L332,52 L328,44 " + // Bay entrance, back to base
  "L330,36 Z";
=======
  "M362,86 L369,89 L381,93 L393,96 L406,100 L419,103 " +
  "L417,109 L404,107 L393,104 L381,100 L369,96 L362,93 L362,86 Z";
>>>>>>> Stashed changes

<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
// Tenares — Cibao Valley, north-interior
||||||| Stash base
// Tenares region — Cibao valley, north-central interior
// Between Santiago (~70.7W,19.45N) and San Francisco de Macorís (~70.25W,19.3N)
// Tenares is at ~70.35W, 19.38N — x≈295, y≈57
=======
// Tenares region — Cibao Valley, north-interior (~70.35W, 19.45N)
>>>>>>> Stashed changes
||||||| Stash base
// Tenares region — Cibao valley, north-central interior
// Between Santiago (~70.7W,19.45N) and San Francisco de Macorís (~70.25W,19.3N)
// Tenares is at ~70.35W, 19.38N — x≈295, y≈57
=======
// Tenares region — Cibao Valley, north-interior (~70.35W, 19.45N)
>>>>>>> Stashed changes
||||||| Stash base
// Tenares region — Cibao valley, north-central interior
// Between Santiago (~70.7W,19.45N) and San Francisco de Macorís (~70.25W,19.3N)
// Tenares is at ~70.35W, 19.38N — x≈295, y≈57
=======
// Tenares region — Cibao Valley, north-interior (~70.35W, 19.45N)
>>>>>>> Stashed changes
||||||| Stash base
// Tenares region — Cibao valley, north-central interior
// Between Santiago (~70.7W,19.45N) and San Francisco de Macorís (~70.25W,19.3N)
// Tenares is at ~70.35W, 19.38N — x≈295, y≈57
=======
// Tenares region — Cibao Valley, north-interior (~70.35W, 19.45N)
>>>>>>> Stashed changes
||||||| Stash base
// Tenares region — Cibao valley, north-central interior
// Between Santiago (~70.7W,19.45N) and San Francisco de Macorís (~70.25W,19.3N)
// Tenares is at ~70.35W, 19.38N — x≈295, y≈57
=======
// Tenares region — Cibao Valley, north-interior (~70.35W, 19.45N)
>>>>>>> Stashed changes
const TENARES_PATH =
  "M300,62 L314,58 L330,62 L336,70 L334,79 L322,84 L308,81 L300,73 L300,62 Z";

// Santo Domingo (~69.9W, 18.47N)
const SANTO_DOMINGO = { x: 356, y: 170 };

// Cordillera Central — faint mountain range
const CORDILLERA_PATH =
  "M236,117 L261,123 L285,129 L310,133 L335,138 L364,142 L385,145";

export const DRMap = ({ activeRegion, onSelectRegion }: Props) => {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const shouldReduceMotion = useReducedMotion();
  const animate = isInView && !shouldReduceMotion;

  const handleClick = useCallback(
    (region: Region) => {
      onSelectRegion(activeRegion === region ? null : region);
    },
    [activeRegion, onSelectRegion],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, region: Region) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleClick(region);
      }
      if (e.key === "Escape") {
        onSelectRegion(null);
      }
    },
    [handleClick, onSelectRegion],
  );

  return (
    <svg
      ref={ref}
      viewBox="0 0 500 280"
      className="w-full h-auto max-w-[550px]"
      role="group"
      aria-label="Interactive map of Dominican Republic showing Samaná and Tenares regions"
    >
      {/* Haiti — context shape */}
      <path d={HAITI} fill="#D6D3D1" fillOpacity={0.3} stroke="none" />

      {/* DR outline — draw-on animation */}
      <motion.path
        d={DR_OUTLINE}
        fill="#F5F0E8"
        fillOpacity={0.5}
        stroke="#A89F91"
        strokeWidth={1.5}
        strokeLinejoin="round"
        initial={animate ? { pathLength: 0 } : {}}
        animate={isInView ? { pathLength: 1 } : {}}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      />

      {/* Cordillera Central — faint mountain range line */}
      <motion.path
        d={CORDILLERA_PATH}
        fill="none"
        stroke="#A89F91"
        strokeWidth={0.8}
        strokeOpacity={0.25}
        strokeDasharray="4 3"
        strokeLinecap="round"
        initial={animate ? { pathLength: 0 } : {}}
        animate={isInView ? { pathLength: 1 } : {}}
        transition={{
          delay: animate ? 1.0 : 0,
          duration: 0.8,
          ease: "easeInOut",
        }}
      />

      {/* Samaná region */}
      <motion.path
        d={SAMANA_PATH}
        fill="#B45309"
        fillOpacity={activeRegion === "samana" ? 0.35 : 0.15}
        stroke={activeRegion === "samana" ? "#B45309" : "#A89F91"}
        strokeWidth={activeRegion === "samana" ? 2 : 1}
        className="cursor-pointer outline-none"
        tabIndex={0}
        role="button"
        aria-label="Samaná region — Coco Concon Refrescante"
        aria-pressed={activeRegion === "samana"}
        onClick={() => handleClick("samana")}
        onKeyDown={(e) => handleKeyDown(e, "samana")}
        whileHover={{ fillOpacity: 0.3, scale: 1.05 }}
        whileFocus={{ stroke: "#B45309", strokeWidth: 2 }}
        initial={animate ? { opacity: 0 } : {}}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: animate ? 1.3 : 0, duration: 0.5 }}
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
        style={{ transformOrigin: "392px 97px" }}
||||||| Stash base
        style={{ transformOrigin: "370px 42px" }}
=======
        style={{ transformOrigin: "392px 105px" }}
>>>>>>> Stashed changes
||||||| Stash base
        style={{ transformOrigin: "370px 42px" }}
=======
        style={{ transformOrigin: "392px 105px" }}
>>>>>>> Stashed changes
||||||| Stash base
        style={{ transformOrigin: "370px 42px" }}
=======
        style={{ transformOrigin: "392px 105px" }}
>>>>>>> Stashed changes
||||||| Stash base
        style={{ transformOrigin: "370px 42px" }}
=======
        style={{ transformOrigin: "392px 105px" }}
>>>>>>> Stashed changes
||||||| Stash base
        style={{ transformOrigin: "370px 42px" }}
=======
        style={{ transformOrigin: "392px 105px" }}
>>>>>>> Stashed changes
      />

      {/* Tenares region */}
      <motion.path
        d={TENARES_PATH}
        fill="#78350F"
        fillOpacity={activeRegion === "tenares" ? 0.35 : 0.15}
        stroke={activeRegion === "tenares" ? "#78350F" : "#A89F91"}
        strokeWidth={activeRegion === "tenares" ? 2 : 1}
        className="cursor-pointer outline-none"
        tabIndex={0}
        role="button"
        aria-label="Tenares region — El Tabaquero Francés"
        aria-pressed={activeRegion === "tenares"}
        onClick={() => handleClick("tenares")}
        onKeyDown={(e) => handleKeyDown(e, "tenares")}
        whileHover={{ fillOpacity: 0.3, scale: 1.05 }}
        whileFocus={{ stroke: "#78350F", strokeWidth: 2 }}
        initial={animate ? { opacity: 0 } : {}}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: animate ? 1.5 : 0, duration: 0.5 }}
        style={{ transformOrigin: "318px 71px" }}
      />

      {/* Labels */}
      <motion.g
        initial={animate ? { opacity: 0 } : {}}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: animate ? 1.8 : 0, duration: 0.4 }}
      >
        {/* DR label */}
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
        <text
          x="340"
          y="155"
          fill="#78350F"
          fillOpacity={0.5}
          fontSize="11"
          fontFamily="var(--font-sans)"
          fontWeight="500"
          textAnchor="middle"
          letterSpacing="2"
        >
||||||| Stash base
        <text x="300" y="185" fill="#78350F" fillOpacity={0.5} fontSize="11" fontFamily="var(--font-sans)" fontWeight="500" textAnchor="middle" letterSpacing="2">
=======
        <text x="335" y="155" fill="#78350F" fillOpacity={0.5} fontSize="11" fontFamily="var(--font-sans)" fontWeight="500" textAnchor="middle" letterSpacing="2">
>>>>>>> Stashed changes
||||||| Stash base
        <text x="300" y="185" fill="#78350F" fillOpacity={0.5} fontSize="11" fontFamily="var(--font-sans)" fontWeight="500" textAnchor="middle" letterSpacing="2">
=======
        <text x="335" y="155" fill="#78350F" fillOpacity={0.5} fontSize="11" fontFamily="var(--font-sans)" fontWeight="500" textAnchor="middle" letterSpacing="2">
>>>>>>> Stashed changes
||||||| Stash base
        <text x="300" y="185" fill="#78350F" fillOpacity={0.5} fontSize="11" fontFamily="var(--font-sans)" fontWeight="500" textAnchor="middle" letterSpacing="2">
=======
        <text x="335" y="155" fill="#78350F" fillOpacity={0.5} fontSize="11" fontFamily="var(--font-sans)" fontWeight="500" textAnchor="middle" letterSpacing="2">
>>>>>>> Stashed changes
||||||| Stash base
        <text x="300" y="185" fill="#78350F" fillOpacity={0.5} fontSize="11" fontFamily="var(--font-sans)" fontWeight="500" textAnchor="middle" letterSpacing="2">
=======
        <text x="335" y="155" fill="#78350F" fillOpacity={0.5} fontSize="11" fontFamily="var(--font-sans)" fontWeight="500" textAnchor="middle" letterSpacing="2">
>>>>>>> Stashed changes
||||||| Stash base
        <text x="300" y="185" fill="#78350F" fillOpacity={0.5} fontSize="11" fontFamily="var(--font-sans)" fontWeight="500" textAnchor="middle" letterSpacing="2">
=======
        <text x="335" y="155" fill="#78350F" fillOpacity={0.5} fontSize="11" fontFamily="var(--font-sans)" fontWeight="500" textAnchor="middle" letterSpacing="2">
>>>>>>> Stashed changes
          DOMINICAN REPUBLIC
        </text>

        {/* Samaná label */}
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
        <text
          x="399"
          y="80"
          fill="#B45309"
          fillOpacity={activeRegion === "samana" ? 0.9 : 0.6}
          fontSize="9"
          fontFamily="var(--font-sans)"
          fontWeight="600"
          textAnchor="middle"
        >
||||||| Stash base
        <text x="380" y="20" fill="#B45309" fillOpacity={activeRegion === "samana" ? 0.9 : 0.6} fontSize="9" fontFamily="var(--font-sans)" fontWeight="600" textAnchor="middle">
=======
        <text x="399" y="82" fill="#B45309" fillOpacity={activeRegion === "samana" ? 0.9 : 0.6} fontSize="9" fontFamily="var(--font-sans)" fontWeight="600" textAnchor="middle">
>>>>>>> Stashed changes
||||||| Stash base
        <text x="380" y="20" fill="#B45309" fillOpacity={activeRegion === "samana" ? 0.9 : 0.6} fontSize="9" fontFamily="var(--font-sans)" fontWeight="600" textAnchor="middle">
=======
        <text x="399" y="82" fill="#B45309" fillOpacity={activeRegion === "samana" ? 0.9 : 0.6} fontSize="9" fontFamily="var(--font-sans)" fontWeight="600" textAnchor="middle">
>>>>>>> Stashed changes
||||||| Stash base
        <text x="380" y="20" fill="#B45309" fillOpacity={activeRegion === "samana" ? 0.9 : 0.6} fontSize="9" fontFamily="var(--font-sans)" fontWeight="600" textAnchor="middle">
=======
        <text x="399" y="82" fill="#B45309" fillOpacity={activeRegion === "samana" ? 0.9 : 0.6} fontSize="9" fontFamily="var(--font-sans)" fontWeight="600" textAnchor="middle">
>>>>>>> Stashed changes
||||||| Stash base
        <text x="380" y="20" fill="#B45309" fillOpacity={activeRegion === "samana" ? 0.9 : 0.6} fontSize="9" fontFamily="var(--font-sans)" fontWeight="600" textAnchor="middle">
=======
        <text x="399" y="82" fill="#B45309" fillOpacity={activeRegion === "samana" ? 0.9 : 0.6} fontSize="9" fontFamily="var(--font-sans)" fontWeight="600" textAnchor="middle">
>>>>>>> Stashed changes
||||||| Stash base
        <text x="380" y="20" fill="#B45309" fillOpacity={activeRegion === "samana" ? 0.9 : 0.6} fontSize="9" fontFamily="var(--font-sans)" fontWeight="600" textAnchor="middle">
=======
        <text x="399" y="82" fill="#B45309" fillOpacity={activeRegion === "samana" ? 0.9 : 0.6} fontSize="9" fontFamily="var(--font-sans)" fontWeight="600" textAnchor="middle">
>>>>>>> Stashed changes
          Samaná
        </text>

        {/* Tenares label */}
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
        <text
          x="318"
          y="96"
          fill="#78350F"
          fillOpacity={activeRegion === "tenares" ? 0.9 : 0.6}
          fontSize="9"
          fontFamily="var(--font-sans)"
          fontWeight="600"
          textAnchor="middle"
        >
||||||| Stash base
        <text x="295" y="92" fill="#78350F" fillOpacity={activeRegion === "tenares" ? 0.9 : 0.6} fontSize="9" fontFamily="var(--font-sans)" fontWeight="600" textAnchor="middle">
=======
        <text x="318" y="96" fill="#78350F" fillOpacity={activeRegion === "tenares" ? 0.9 : 0.6} fontSize="9" fontFamily="var(--font-sans)" fontWeight="600" textAnchor="middle">
>>>>>>> Stashed changes
||||||| Stash base
        <text x="295" y="92" fill="#78350F" fillOpacity={activeRegion === "tenares" ? 0.9 : 0.6} fontSize="9" fontFamily="var(--font-sans)" fontWeight="600" textAnchor="middle">
=======
        <text x="318" y="96" fill="#78350F" fillOpacity={activeRegion === "tenares" ? 0.9 : 0.6} fontSize="9" fontFamily="var(--font-sans)" fontWeight="600" textAnchor="middle">
>>>>>>> Stashed changes
||||||| Stash base
        <text x="295" y="92" fill="#78350F" fillOpacity={activeRegion === "tenares" ? 0.9 : 0.6} fontSize="9" fontFamily="var(--font-sans)" fontWeight="600" textAnchor="middle">
=======
        <text x="318" y="96" fill="#78350F" fillOpacity={activeRegion === "tenares" ? 0.9 : 0.6} fontSize="9" fontFamily="var(--font-sans)" fontWeight="600" textAnchor="middle">
>>>>>>> Stashed changes
||||||| Stash base
        <text x="295" y="92" fill="#78350F" fillOpacity={activeRegion === "tenares" ? 0.9 : 0.6} fontSize="9" fontFamily="var(--font-sans)" fontWeight="600" textAnchor="middle">
=======
        <text x="318" y="96" fill="#78350F" fillOpacity={activeRegion === "tenares" ? 0.9 : 0.6} fontSize="9" fontFamily="var(--font-sans)" fontWeight="600" textAnchor="middle">
>>>>>>> Stashed changes
||||||| Stash base
        <text x="295" y="92" fill="#78350F" fillOpacity={activeRegion === "tenares" ? 0.9 : 0.6} fontSize="9" fontFamily="var(--font-sans)" fontWeight="600" textAnchor="middle">
=======
        <text x="318" y="96" fill="#78350F" fillOpacity={activeRegion === "tenares" ? 0.9 : 0.6} fontSize="9" fontFamily="var(--font-sans)" fontWeight="600" textAnchor="middle">
>>>>>>> Stashed changes
          Tenares
        </text>

        {/* Santo Domingo marker */}
        <circle
          cx={SANTO_DOMINGO.x}
          cy={SANTO_DOMINGO.y}
          r={3}
          fill="#78350F"
          fillOpacity={0.4}
        />
        <circle
          cx={SANTO_DOMINGO.x}
          cy={SANTO_DOMINGO.y}
          r={1.5}
          fill="#78350F"
          fillOpacity={0.7}
        />
        <text
          x={SANTO_DOMINGO.x + 8}
          y={SANTO_DOMINGO.y + 4}
          fill="#78350F"
          fillOpacity={0.45}
          fontSize="7.5"
          fontFamily="var(--font-sans)"
          fontWeight="500"
        >
          Santo Domingo
        </text>

<<<<<<< Updated upstream
        {/* Cordillera Central label */}
        <text
          x="310"
          y="130"
          fill="#A89F91"
          fillOpacity={0.35}
          fontSize="6"
          fontFamily="var(--font-sans)"
          fontWeight="400"
          fontStyle="italic"
          textAnchor="middle"
        >
||||||| Stash base
        {/* Cordillera Central label — tiny, near the dashed line */}
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
        <text x="265" y="122" fill="#A89F91" fillOpacity={0.35} fontSize="6" fontFamily="var(--font-sans)" fontWeight="400" fontStyle="italic" textAnchor="middle">
=======
        {/* Cordillera Central label — tiny, near the dashed line */}
        <text x="310" y="130" fill="#A89F91" fillOpacity={0.35} fontSize="6" fontFamily="var(--font-sans)" fontWeight="400" fontStyle="italic" textAnchor="middle">
>>>>>>> Stashed changes
||||||| Stash base
        <text x="265" y="122" fill="#A89F91" fillOpacity={0.35} fontSize="6" fontFamily="var(--font-sans)" fontWeight="400" fontStyle="italic" textAnchor="middle">
=======
        <text x="310" y="130" fill="#A89F91" fillOpacity={0.35} fontSize="6" fontFamily="var(--font-sans)" fontWeight="400" fontStyle="italic" textAnchor="middle">
>>>>>>> Stashed changes
||||||| Stash base
        <text x="265" y="122" fill="#A89F91" fillOpacity={0.35} fontSize="6" fontFamily="var(--font-sans)" fontWeight="400" fontStyle="italic" textAnchor="middle">
=======
        <text x="310" y="130" fill="#A89F91" fillOpacity={0.35} fontSize="6" fontFamily="var(--font-sans)" fontWeight="400" fontStyle="italic" textAnchor="middle">
>>>>>>> Stashed changes
||||||| Stash base
        <text x="265" y="122" fill="#A89F91" fillOpacity={0.35} fontSize="6" fontFamily="var(--font-sans)" fontWeight="400" fontStyle="italic" textAnchor="middle">
=======
        <text x="310" y="130" fill="#A89F91" fillOpacity={0.35} fontSize="6" fontFamily="var(--font-sans)" fontWeight="400" fontStyle="italic" textAnchor="middle">
>>>>>>> Stashed changes
||||||| Stash base
        <text x="265" y="122" fill="#A89F91" fillOpacity={0.35} fontSize="6" fontFamily="var(--font-sans)" fontWeight="400" fontStyle="italic" textAnchor="middle">
=======
        <text x="310" y="130" fill="#A89F91" fillOpacity={0.35} fontSize="6" fontFamily="var(--font-sans)" fontWeight="400" fontStyle="italic" textAnchor="middle">
>>>>>>> Stashed changes
          Cordillera Central
        </text>
      </motion.g>
    </svg>
  );
};

// Mobile-only card-based region selector
export const RegionSelector = ({
  activeRegion,
  onSelectRegion,
}: {
  activeRegion: Region | null;
  onSelectRegion: (region: Region | null) => void;
}) => {
  const regions: {
    id: Region;
    name: string;
    drink: string;
    color: string;
  }[] = [
    {
      id: "samana",
      name: "Samaná",
      drink: "Coco Concon Refrescante",
      color: "#B45309",
    },
    {
      id: "tenares",
      name: "Tenares",
      drink: "El Tabaquero Francés",
      color: "#78350F",
    },
  ];

  return (
    <div className="flex gap-3 md:hidden">
      {regions.map((r) => (
        <button
          key={r.id}
          onClick={() =>
            onSelectRegion(activeRegion === r.id ? null : r.id)
          }
          className={`flex-1 p-4 rounded-xl border-2 text-left transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber/40 ${
            activeRegion === r.id
              ? "border-amber bg-amber/5"
              : "border-border/50 bg-white/40 hover:border-amber/30"
          }`}
          aria-pressed={activeRegion === r.id}
        >
          <div
            className="w-2 h-2 rounded-full mb-2"
            style={{ backgroundColor: r.color }}
          />
          <p className="font-serif text-lg text-text-primary">{r.name}</p>
          <p className="text-xs text-text-muted mt-0.5">{r.drink}</p>
        </button>
      ))}
    </div>
  );
};
