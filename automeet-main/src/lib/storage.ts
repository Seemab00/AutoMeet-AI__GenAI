const STORAGE_KEY = 'automeet_meetings';

export interface Meeting {
  _id: string;
  topic: string;
  date: string;
  time: string;
  attendees: string[];
  organizer: string;
  meetLink?: string;
  eventId?: string;
  status: 'upcoming' | 'past';
  createdAt: string;
  hasSummary?: boolean;
  summary?: {
    key_points: string[];
    decisions: string[];
    action_items: { task: string; assignee: string; deadline: string }[];
    follow_up: string[];
  };
}

export const getMeetings = (): Meeting[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch (e) {
    console.error('Failed to parse meetings from localStorage', e);
    return [];
  }
};

export const saveMeetings = (meetings: Meeting[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(meetings));
};

export const addMeeting = (meeting: Meeting) => {
  const meetings = getMeetings();
  meetings.push(meeting);
  saveMeetings(meetings);
};

export const updateMeeting = (id: string, updates: Partial<Meeting>) => {
  const meetings = getMeetings();
  const index = meetings.findIndex(m => m._id === id);
  if (index !== -1) {
    meetings[index] = { ...meetings[index], ...updates };
    saveMeetings(meetings);
  }
};

export const deleteMeeting = (id: string) => {
  const meetings = getMeetings();
  const filtered = meetings.filter(m => m._id !== id);
  saveMeetings(filtered);
};

export const getMeetingById = (id: string): Meeting | undefined => {
  return getMeetings().find(m => m._id === id);
};
