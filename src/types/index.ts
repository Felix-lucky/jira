export interface UserParams {
  username: string;
  password: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string;
}

export interface Project {
  id: number;
  name: string;
  personId: number;
  pin: boolean;
  organization: string;
  created: number;
}

export interface Kanban {
  id: number;
  name: string;
  projectId: number;
}

export interface Task {
  id: number;
  name: string;
  processorId: number;
  projectId: number;
  epicId: number;
  kanbanId: number;
  typeId: number;
  note: string;
}

export interface TaskType {
  id: number;
  name: string;
}

export interface Epic {
  id: number;
  name: string;
  projectId: number;
  start: number;
  end: number;
}
