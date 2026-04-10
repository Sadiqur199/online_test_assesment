# AKJ RESOURCE - Online Test Management System

A comprehensive online test management platform built with React and Tailwind CSS. The system allows employers to create and manage online tests, while candidates can take tests with real-time timing and automatic submission.

## 🚀 Features

### For Employers
- **Secure Authentication** - Login with credentials to access employer dashboard
- **Create Online Tests** - Multi-step form to create tests with:
  - Basic information (title, candidates, slots, duration)
  - Multiple question sets
  - Different question types (MCQ, Radio, Text)
- **Manage Questions** - Add, edit, and delete questions easily
- **View Candidates** - Track candidate participation (UI ready)
- **Test Management** - View all created tests in card layout

### For Candidates
- **Test Access** - Login with Test ID to access assigned tests
- **Real-time Timer** - Countdown timer showing remaining time
- **Question Navigation** - Skip questions and navigate between them
- **Auto-submission** - Automatic submission when time expires
- **Multiple Question Types**:
  - Single choice (Radio buttons)
  - Multiple choice (Checkboxes)
  - Text/Paragraph answers
- **Completion Screen** - Confirmation after test submission
- **Timeout Screen** - Professional timeout notification

### General Features
- **Responsive Design** - Works on desktop, tablet, and mobile devices
- **Modern UI** - Clean interface with Tailwind CSS
- **Role-based Access** - Separate dashboards for employers and candidates
- **Persistent Storage** - Tests and data saved in localStorage
- **Professional Branding** - AKJ RESOURCE branding throughout

## 🛠️ Tech Stack

- **Frontend Framework**: React 18
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM v6
- **State Management**: Zustand
- **Icons**: Heroicons
- **Build Tool**: Vite

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm (v6 or higher) or yarn

## 🔧 Installation

1. **Clone the repository**
```bash
git clone https://github.com/Sadiqur199/online_test_assesment
cd assessment-app