import type { ReactNode } from "react"

export type Props = {
  children: ReactNode
}

type RelationshipType = {
  id: string;
  name: string;
  username: string;
}

export interface AccountType {
  id: string;
  name: string;
  username: string;
  relationship: RelationshipType | null;
}

export interface AlbumsType {
  _id: string;
  name: string;
  description: string;
  media: MediaType[];
  cover: string;
  mediaCount: number;
}

export interface MediaType {
  _id: string;
  albumId: string;
  url: string;
  caption: string;
  type: string;
}

export interface NotesType {
  _id?: string;
  title: string;
  content: string;
  date: string;
  time: string;
  createdAt: string;
}

export interface MusicType {
  id: string;
  name: string;
  imageUrl: string;
  accessToken: string;
  expiresIn: string;
}