export type Interest = "artist" | "film" | "fan";

export const INTERESTS: { value: Interest; label: string }[] = [
  { value: "artist", label: "Artist" },
  { value: "film", label: "Film Enthusiast" },
  { value: "fan", label: "Fan of Tiffani D" },
];

export type Source = "tiffanid" | "htf";

export type SubscribeInput = {
  name?: string;
  email: string;
  phone?: string;
  interests?: Interest[];
};
