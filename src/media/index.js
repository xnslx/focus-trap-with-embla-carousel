import media1 from "./media-1.jpeg";
import media2 from "./media-2.jpeg";
import media3 from "./media-3.jpeg";
import media4 from "./media-4.jpeg";
import media5 from "./media-5.jpeg";

export const media = [media1, media2, media3, media4, media5];
export const mediaByIndex = (index) => media[index % media.length];
export const media6 = "https://vimeo.com/621078885";
export const List = [
  {
    containerOne: [
      { type: "image", media: media1 },
      { type: "image", media: media2 },
      { type: "video", media: media6 }
    ]
  },
  {
    containerTwo: [
      { type: "image", media: media1 },
      { type: "image", media: media3 },
      { type: "video", media: media6 }
    ]
  },
  {
    containerThree: [
      { type: "image", media: media4 },
      { type: "image", media: media2 },
      { type: "video", media: media6 }
    ]
  }
];

export const mediaArray = List.map((i) => {
  return Object.values(i)[0];
});

console.log("mediaArray ", mediaArray);

export const mediaArrayTitle = List.map((i) => {
  return Object.keys(i)[0];
});
