// pages/employer/CreateTest.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useExamStore } from '../../store/useExamStore';
import {
  ArrowLeftIcon,
  PlusIcon,
  TrashIcon,
  PencilIcon,
  XMarkIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';

export default function CreateTest() {
  const navigate = useNavigate();
  const addExam = useExamStore((state) => state.addExam);
  const [step, setStep] = useState(1);
  const [basicInfo, setBasicInfo] = useState({
    title: '',
    totalCandidates: '',
    totalSlots: '',
    questionSets: '',
    questionType: 'MCQ',
    startTime: '',
    endTime: '',
    duration: '',
  });
  const [questions, setQuestions] = useState([]);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [questionForm, setQuestionForm] = useState({
    title: '',
    type: 'radio',
    options: ['', ''],
    correctAnswer: '',
  });

  const handleBasicChange = (e) => {
    setBasicInfo({ ...basicInfo, [e.target.name]: e.target.value });
  };

  const openModal = (question = null) => {
    if (question) {
      setEditingQuestion(question);
      setQuestionForm({
        title: question.title,
        type: question.type,
        options: [...question.options],
        correctAnswer: question.correctAnswer || '',
      });
    } else {
      setEditingQuestion(null);
      setQuestionForm({
        title: '',
        type: 'radio',
        options: ['', ''],
        correctAnswer: '',
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingQuestion(null);
  };

  const addOption = () => {
    setQuestionForm((prev) => ({
      ...prev,
      options: [...prev.options, ''],
    }));
  };

  const updateOption = (index, value) => {
    const newOptions = [...questionForm.options];
    newOptions[index] = value;
    setQuestionForm({ ...questionForm, options: newOptions });
  };

  const removeOption = (index) => {
    const newOptions = questionForm.options.filter((_, i) => i !== index);
    setQuestionForm({ ...questionForm, options: newOptions });
  };

  const saveQuestion = () => {
    if (!questionForm.title.trim()) {
      alert('Please enter question title');
      return;
    }

    if (questionForm.type !== 'text' && questionForm.options.some((opt) => !opt.trim())) {
      alert('Please fill all option fields');
      return;
    }

    const newQuestion = {
      id: editingQuestion ? editingQuestion.id : Date.now(),
      title: questionForm.title,
      type: questionForm.type,
      options: questionForm.type !== 'text' ? [...questionForm.options] : [],
      correctAnswer: questionForm.correctAnswer,
    };

    if (editingQuestion) {
      setQuestions(questions.map((q) => (q.id === editingQuestion.id ? newQuestion : q)));
    } else {
      setQuestions([...questions, newQuestion]);
    }
    closeModal();
  };

  const deleteQuestion = (id) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const handleSubmit = () => {
    if (!basicInfo.title) {
      alert('Please enter test title');
      return;
    }
    if (questions.length === 0) {
      alert('Please add at least one question');
      return;
    }

    addExam({
      id: Date.now(),
      title: basicInfo.title,
      candidates: basicInfo.totalCandidates || 'Not Set',
      sets: basicInfo.questionSets || 'Not Set',
      slots: basicInfo.totalSlots || 'Not Set',
      questionType: basicInfo.questionType,
      startTime: basicInfo.startTime,
      endTime: basicInfo.endTime,
      duration: basicInfo.duration,
      questions: questions,
    });
    alert('Exam Created Successfully!');
    navigate('/employer/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <button onClick={() => navigate('/employer/dashboard')} className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeftIcon className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold text-gray-800">Manage Online Test</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Step Indicators */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-2 ${step === 1 ? 'text-indigo-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${step === 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}>1</div>
              <span>Basic Info</span>
            </div>
            <div className="w-16 h-0.5 bg-gray-200"></div>
            <div className={`flex items-center gap-2 ${step === 2 ? 'text-indigo-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${step === 2 ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}>2</div>
              <span>Questions</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-200 bg-gray-50 px-6 py-3">
            <div className="flex gap-6">
              <button
                onClick={() => setStep(1)}
                className={`pb-2 font-medium ${step === 1 ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
              >
                Basic Info
              </button>
              <button
                onClick={() => setStep(2)}
                className={`pb-2 font-medium ${step === 2 ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
              >
                Questions List
              </button>
            </div>
          </div>

          <div className="p-6">
            {step === 1 && (
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Online Test Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={basicInfo.title}
                    onChange={handleBasicChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g., Psychometric Test for Management Trainee Officer"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Total Candidates *</label>
                    <input
                      type="number"
                      name="totalCandidates"
                      value={basicInfo.totalCandidates}
                      onChange={handleBasicChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      placeholder="Enter total candidates"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Total Slots *</label>
                    <input
                      type="number"
                      name="totalSlots"
                      value={basicInfo.totalSlots}
                      onChange={handleBasicChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      placeholder="Enter exam slots"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Total Question Sets *</label>
                    <input
                      type="number"
                      name="questionSets"
                      value={basicInfo.questionSets}
                      onChange={handleBasicChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      placeholder="Select total question set"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Duration (Minutes)</label>
                    <input
                      type="number"
                      name="duration"
                      value={basicInfo.duration}
                      onChange={handleBasicChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      placeholder="Duration per slot"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Time *</label>
                    <input
                      type="datetime-local"
                      name="startTime"
                      value={basicInfo.startTime}
                      onChange={handleBasicChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Time *</label>
                    <input
                      type="datetime-local"
                      name="endTime"
                      value={basicInfo.endTime}
                      onChange={handleBasicChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Question Type</label>
                  <select
                    name="questionType"
                    value={basicInfo.questionType}
                    onChange={handleBasicChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="MCQ">MCQ</option>
                    <option value="Mixed">Mixed (MCQ & Text)</option>
                  </select>
                </div>
                <div className="flex justify-end pt-4">
                  <button onClick={() => setStep(2)} className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700">
                    Save & Continue
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium">Questions List</h3>
                  <button onClick={() => openModal()} className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm">
                    <PlusIcon className="w-4 h-4" /> Add Question
                  </button>
                </div>

                {questions.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed">
                    <DocumentTextIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-500">No questions added yet</p>
                    <button onClick={() => openModal()} className="mt-3 text-indigo-600 text-sm font-medium">+ Add your first question</button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {questions.map((q, idx) => (
                      <div key={q.id} className="border rounded-lg p-4 bg-gray-50">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <p className="font-medium text-gray-800">Question {idx + 1}: {q.title}</p>
                            <div className="mt-2 space-y-1">
                              {q.type !== 'text' ? (
                                q.options.map((opt, optIdx) => (
                                  <div key={optIdx} className="flex items-center gap-2 text-sm">
                                    {q.type === 'radio' ? (
                                      <span className="w-4 h-4 rounded-full border border-gray-400 inline-block"></span>
                                    ) : (
                                      <span className="w-4 h-4 border border-gray-400 inline-block"></span>
                                    )}
                                    <span>{opt}</span>
                                  </div>
                                ))
                              ) : (
                                <div className="text-sm text-gray-500 italic">Text answer question</div>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button onClick={() => openModal(q)} className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                              <PencilIcon className="w-5 h-5" />
                            </button>
                            <button onClick={() => deleteQuestion(q.id)} className="p-1 text-red-600 hover:bg-red-50 rounded">
                              <TrashIcon className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex justify-between pt-6 border-t mt-6">
                  <button onClick={() => setStep(1)} className="px-6 py-2 border rounded-lg hover:bg-gray-50">Back</button>
                  <button onClick={handleSubmit} className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">Create Test</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Question Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-5 border-b">
              <h3 className="text-lg font-semibold">{editingQuestion ? 'Edit Question' : 'Add New Question'}</h3>
              <button onClick={closeModal} className="p-1 hover:bg-gray-100 rounded">
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Question Title</label>
                <textarea
                  value={questionForm.title}
                  onChange={(e) => setQuestionForm({ ...questionForm, title: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  rows="3"
                  placeholder="Enter your question here..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Question Type</label>
                <select
                  value={questionForm.type}
                  onChange={(e) => setQuestionForm({ ...questionForm, type: e.target.value, options: e.target.value === 'text' ? [] : ['', ''] })}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="radio">Radio (Single Choice)</option>
                  <option value="checkbox">Checkbox (Multiple Choice)</option>
                  <option value="text">Text (Paragraph)</option>
                </select>
              </div>

              {questionForm.type !== 'text' && (
                <div>
                  <label className="block text-sm font-medium mb-2">Options</label>
                  <div className="space-y-2">
                    {questionForm.options.map((opt, idx) => (
                      <div key={idx} className="flex gap-2 items-center">
                        <span className="w-6 text-gray-500">{String.fromCharCode(65 + idx)}.</span>
                        <input
                          type="text"
                          value={opt}
                          onChange={(e) => updateOption(idx, e.target.value)}
                          className="flex-1 px-3 py-2 border rounded-lg"
                          placeholder={`Option ${idx + 1}`}
                        />
                        <button onClick={() => removeOption(idx)} className="p-1 text-red-500">
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <button onClick={addOption} className="text-sm text-indigo-600 flex items-center gap-1 mt-2">
                      <PlusIcon className="w-4 h-4" /> Add Option
                    </button>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium mb-1">Correct Answer</label>
                    <input
                      type="text"
                      value={questionForm.correctAnswer}
                      onChange={(e) => setQuestionForm({ ...questionForm, correctAnswer: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                      placeholder="e.g., A, B, C, D or A,B for multiple"
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="flex justify-end gap-3 p-5 border-t">
              <button onClick={closeModal} className="px-4 py-2 border rounded-lg">Cancel</button>
              <button onClick={saveQuestion} className="px-4 py-2 bg-indigo-600 text-white rounded-lg">Save Question</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}