export interface INoticeCreatePayload {
  title: string;
  content: string;
  universityId: string;
}

export interface INotice extends INoticeCreatePayload {
  id: string;
  publishedAt: Date;
}

