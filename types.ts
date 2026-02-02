
export interface User {
  id: string;
  name: string;
  fbId: string;
  coins: number;
  avatar: string;
}

export interface Task {
  id: string;
  userId: string;
  postUrl: string;
  reactionType: 'LIKE' | 'LOVE' | 'HAHA' | 'WOW' | 'SAD' | 'ANGRY';
  coinsOffered: number;
  completedCount: number;
  targetCount: number;
  createdAt: string;
}

export enum ReactionType {
  LIKE = 'LIKE',
  LOVE = 'LOVE',
  HAHA = 'HAHA',
  WOW = 'WOW',
  SAD = 'SAD',
  ANGRY = 'ANGRY'
}
