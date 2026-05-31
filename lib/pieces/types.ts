export type FoundPiece = {
  id: string;
  hue: number;
  foundAt: Date | null;
  foundBy: {
    id: string;
    name: string;
  };
};
