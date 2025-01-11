import { VideoOwner } from "@prisma/client";
import { TEntity } from "./app.type";

export type TVideo = TEntity & {
  duration: number;
  format: string;
  height: number;
  width: number;
  playbackUrl: string;
  url: string;
  assetId: string;
  videoOwner: VideoOwner;
};
