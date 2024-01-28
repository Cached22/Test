import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { completeTask, setCourtDate } from '../redux/actions';
import { TASK_COMPLETED, COURT_DATE_SET } from '../utilities/messageNames';
import { api } from '../utilities/api';
import { validation } from '../utilities/validation';
import { helpers } from '../utilities/helpers';

const WorkflowComponent = () => {
  const dispatch = useDispatch();
  const { tasks, courtDates } = useSelector(state => state.workflow);
  const [newTask, setNewTask] = useState('');
  const [newCourtDate, setNewCourtDate] = useState('');

  useEffect(() => {
    // Fetch tasks and court dates when component mounts
    api.getTasks().then(data => {
      // Handle task data
    });
    api.getCourtDates().then(data => {
      // Handle court date data
    });
  }, []);

  const handleCompleteTask = (taskId) => {
    if (validation.validateTaskId(taskId)) {
      api.completeTask(taskId).then(() => {
        dispatch(completeTask(taskId));
        helpers.showToast(TASK_COMPLETED);
      });
    }
  };

  const handleSetCourtDate = (date) => {
    if (validation.validateDate(date)) {
      api.setCourtDate(date).then(() => {
        dispatch(setCourtDate(date));
        helpers.showToast(COURT_DATE_SET);
      });
    }
  };

  const handleTaskInputChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleCourtDateInputChange = (e) => {
    setNewCourtDate(e.target.value);
  };

  return (
    <div id="workflowComponent">
      <h2>Workflow Management</h2>
      <div>
        <h3>Tasks</h3>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              {task.description}
              <button onClick={() => handleCompleteTask(task.id)}>Complete Task</button>
            </li>
          ))}
        </ul>
        <input type="text" value={newTask} onChange={handleTaskInputChange} placeholder="New task" />
        <button onClick={() => handleCompleteTask(newTask)}>Add Task</button>
      </div>
      <div>
        <h3>Court Dates</h3>
        <ul>
          {courtDates.map(courtDate => (
            <li key={courtDate.id}>
              {courtDate.date}
              <button onClick={() => handleSetCourtDate(courtDate.date)}>Set Date</button>
            </li>
          ))}
        </ul>
        <input type="date" value={newCourtDate} onChange={handleCourtDateInputChange} />
        <button onClick={() => handleSetCourtDate(newCourtDate)}>Add Court Date</button>
      </div>
    </div>
  );
};

export default WorkflowComponent;