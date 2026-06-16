# AutoMeet - AI-Powered Meeting Scheduler

## 📌 About

**AutoMeet** is an AI-powered meeting scheduler that automates the entire meeting lifecycle — from scheduling and sending invites to generating post-meeting summaries. It eliminates manual coordination and note-taking by leveraging Groq AI to extract key points, decisions, and action items automatically.

---

## ✨ Features

- Schedule meetings with 5-field form (topic, date, time, emails, organizer)
- Auto-generate Google Calendar events with Meet links
- Auto-send email invitations via Gmail API
- Upload meeting notes → AI generates structured summary
- Extract key points, decisions, and action items with assignees & deadlines
- Dashboard to view all meetings and summaries

---

## 🛠️ Tech Stack

| Component | Technology |
|-----------|------------|
| Frontend | React.js |
| Backend | Express.js (TypeScript) |
| AI Model | Groq API (llama-3.3-70b-versatile) |
| Calendar | Google Calendar API |
| Email | Gmail API |
| Auth | Google OAuth 2.0 |

---

## 🏗️ System Architecture

```
User → React Form → Backend API → Groq/Google APIs → Output Display
```

### Components
- **User Input**: 5-field form (topic, date, time, emails, organizer)
- **Backend**: Express.js handles API requests
- **Prompt Module**: Builds prompt for AI
- **AI/API**: Groq generates summaries, Google creates calendar events
- **Output**: Dashboard shows meetings, summary page displays AI results

---

## 🤖 Prompt Engineering

### Prompt Template
```
You are an AI meeting assistant. Analyze notes from "{topic}" meeting.

Attendees: {emails}

Notes: {notes}

Return JSON with:
{
  "key_points": [...],
  "decisions": [...],
  "action_items": [{"task": "", "assignee": "", "deadline": ""}],
  "follow_up": [...]
}
```

---

## 📊 Workflow

1. User fills 5-field form → Clicks Schedule
2. Backend creates Google Calendar event → Meet link
3. Emails sent to all attendees
4. Meeting saved to localStorage
5. After meeting, user uploads notes
6. Backend sends notes to Groq API
7. Groq returns structured JSON summary
8. Summary emailed to all attendees
9. Summary displayed on dashboard

---

## 📝 Example

### Schedule Meeting
- **Input**: Topic "Project Review", Date April 15, Time 2PM, Emails: ali@gmail.com
- **Output**: Calendar event created, Meet link generated, Email sent

### Generate Summary
- **Input Notes**: "Ali will complete design by Friday. Sara will test by Monday."
- **AI Output**: Action items extracted with assignees and deadlines

---

## ⚠️ Limitations & Future Work

| Limitations | Future Improvements |
|-------------|---------------------|
| 1 person voice transcription | Add Web Speech API |
| Local storage only | Use cloud database |
| No recurring meetings | Add recurring option |

---

## 👤 Developer

**Simaab Malik**  
SAP ID: 54910  
BS Software Engineering  
Riphah International University  
**Supervisor**: Ma'am Habiba Khatoon  
**Session**: Spring 2026 - 6th Sem

---

## 📄 License

Educational Project - Generative AI Course

---

*For complete details, refer to the project report.*
