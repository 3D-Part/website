import { cached } from "../../../../../services/setup";
/**
 * The two tiles under the home slider, as the admin set them in the settings
 * (`homeTiles`). Read on the server so they are in the first HTML; kept for a
 * minute. Until the admin saves them, or when the API cannot be reached, the
 * tiles the home page always had.
 */
export type HomeTile = {
  id: string;
  title: string;
  text: string;
  buttonLabel: string;
  link: string;
  // key of an uploaded picture in the image bucket; '' for the site's own
  image: string;
};

export const DEFAULT_HOME_TILES: HomeTile[] = [
  {
    id: "filaments",
    title: "3D filamenti",
    text: "Pronađite savršeni filament za vaše 3D projekte! Bilo da radite sa PLA, ABS ili TPU, kvalitetan materijal je ključ za vrhunske rezultate. Eksperimentišite i kreirajte bez ograničenja!",
    buttonLabel: "Pogledaj ponudu",
    link: "/shop/category/filamenti",
    image: "",
  },
  {
    id: "printers",
    title: "3D printeri",
    text: "Otključajte svijet mogućnosti uz vrhunske 3D štampače! Preciznost, pouzdanost i lakoća korišćenja za svaki vaš projekat. Kreirajte budućnost već danas!",
    buttonLabel: "Pogledaj ponudu",
    link: "/shop/category/3d-printeri",
    image: "",
  },
];

export const getHomeTiles = async (): Promise<HomeTile[]> => {
  const base = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!base) return DEFAULT_HOME_TILES;
  try {
    const response = await fetch(`${base}shop/settings`, { next: cached });
    if (!response.ok) return DEFAULT_HOME_TILES;
    const data = await response.json();
    const tiles = data?.settings?.homeTiles;
    return Array.isArray(tiles) && tiles.length > 0 ? tiles : DEFAULT_HOME_TILES;
  } catch {
    return DEFAULT_HOME_TILES;
  }
};
