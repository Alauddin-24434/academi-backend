export interface ICircularCreatePayload {
  title: string;
  description?: string;
  fileUrl?: string;
  universityId?: string;
  year:number;
}

export interface ICircular extends ICircularCreatePayload {
  id: string;
  publishedAt: Date;
}
