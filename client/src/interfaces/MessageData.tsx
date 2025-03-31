export interface MessageData {
    id: number | null;
    content: string | null;
    ownerDetails: {
      username: string
    }
    chatId: number | null;
  }