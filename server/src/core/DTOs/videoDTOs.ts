interface VideoDTO {
  id: number;
  title: string;
  description: string;
  image_url: string;
  path: string;
}

interface CreateVideoDTO {
  title: string;
  description?: string;
  image_url?: string;
  path: string;
}

export { VideoDTO, CreateVideoDTO };
