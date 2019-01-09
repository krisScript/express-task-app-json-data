const fs = require('fs');
const path = require('path');
const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'tasks.json'
);

const uuidv4 = require('uuid/v4');
const getTasksFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Task {
  constructor(title, description, id,date) {
    (this.title = title),
     (this.description = description), 
     (this.id = id),
     this.date = date
  }
  save() {
    if(! this.date){
     this.date  = this.createDate()
    }
    getTasksFromFile(tasks => {
      if (this.id) {
        const existingTaskIndex = tasks.findIndex(task => task.id === this.id);
        const updatedTasks = [...tasks];
        updatedTasks[existingTaskIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedTasks), err => {
  
        });
      } else {
        this.id = uuidv4();
        tasks.push(this);

        fs.writeFile(p, JSON.stringify(tasks), err => {
         
        });
      }
    });
  }
  createDate(){
    const dateData = new Date();
    const dateMachineReadable = new Date(Date.parse(dateData));
    const dateHumanReadable = dateMachineReadable.toDateString();
    return  {
      dateMachineReadable,
      dateHumanReadable
    }
  }
  static fetchAll(cb) {
    getTasksFromFile(cb);
  }
  static deleteTask(id, tasks) {
    const editedTasks = tasks.filter(task => task.id !== id);

    fs.writeFile(p, JSON.stringify(editedTasks), err => {});
  }
  static findById(id, cb) {
    getTasksFromFile(tasks => {
      const task = tasks.find(tsk => tsk.id === id);
      cb(task);
    });
  }
};
