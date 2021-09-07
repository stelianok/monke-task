interface Task {
  name: string;
  description: string;
  date: string;
}

interface Due {
  recurring: boolean;
  string: string;
  date: string;
}
interface TodoistTask {
  "id": number;
  "assigner": number;
  "project_id": number;
  "section_id": number;
  "order": number;
  "content": string;
  "description": string;
  "completed": boolean;
  "label_ids": number[];
  "priority": number;
  "comment_count": number;
  "creator": number;
  "created": string;
  "due": Due;
  "url": string;
}

export { Task, TodoistTask };
