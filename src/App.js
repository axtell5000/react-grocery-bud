import React, { useState, useEffect } from 'react';
import List from './List';
import Alert from './Alert';

function App() {
  // state
  const [name, setName] = useState('');
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: true, msg: '', type: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      // warning alert
      showAlert(true, 'danger', 'please enter value');
    } else if (name && isEditing) {
      // editing
    } else {
      showAlert(true, 'success', 'item added to the list');
      // change state with new value
      const newItem = { id: new Date().getTime().toString(), title: name }; // cheating with id
      setList([...list, newItem]); // ...list is previous state
      setName('');
    }
  }

  const showAlert = (show = false, type = '', msg = '') => {
    setAlert({ show, type, msg });
  };

  const clearList = () => {
    showAlert(true, 'danger', 'empty list');
    setList([]);
  };

  const removeItem = (id) => {
    showAlert(true, 'danger', 'item removed');
    setList(list.filter(item => item.id !== id));
  };

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3>grocery buddy</h3>
        <div className="form-control">
          <input 
            type="text" 
            className="grocery" 
            placeholder="e.g. carrots" 
            value={name}
            onChange={(e) => setName(e.target.value)} />
          <button type="submit" className="submit-btn" title={isEditing ? 'Edit' : 'Submit'}>
            {isEditing ? 'edit' : 'submit'}
          </button>
        </div>
      </form>
      { 
        // only show if items in list
        list.length > 0 && (
        <div className="grocery-container">
          <List items={list} removeItem={removeItem} />
          <button className="clear-btn" title="Clear items" onClick={clearList}>clear items</button>
        </div>
      )}
    
    </section>
  );
}

export default App;
